import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { ingredientsText, imageBase64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service not configured");
    }

    console.log("Analyzing ingredients:", ingredientsText ? "text" : "image");

    let extractedText = ingredientsText;
    
    // If image is provided, extract text from it first
    if (imageBase64 && !ingredientsText) {
      console.log("Extracting text from image using AI vision...");
      
      const visionResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Extract all ingredient text from this food product label image. Return ONLY the ingredients list as plain text, comma-separated. If you can't find ingredients, say 'No ingredients found'."
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageBase64
                  }
                }
              ]
            }
          ],
        }),
      });

      if (!visionResponse.ok) {
        const errorText = await visionResponse.text();
        console.error("Vision AI error:", visionResponse.status, errorText);
        throw new Error("Failed to extract text from image");
      }

      const visionData = await visionResponse.json();
      extractedText = visionData.choices[0].message.content.trim();
      console.log("Extracted text:", extractedText);
    }

    if (!extractedText || extractedText === "No ingredients found") {
      return new Response(
        JSON.stringify({ error: "No ingredients could be extracted from the image" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Analyze the extracted ingredients
    console.log("Analyzing ingredients with AI...");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a nutritional expert analyzing food ingredients. Categorize each ingredient as 'healthy', 'moderate', or 'harmful' with a brief reason. Return ONLY valid JSON in this exact format:
{
  "ingredients": [
    {"name": "ingredient name", "status": "healthy|moderate|harmful", "reason": "brief explanation"}
  ],
  "summary": "X harmful, Y moderate, Z healthy ingredients found"
}`
          },
          {
            role: "user",
            content: `Analyze these ingredients: ${extractedText}`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI error:", response.status, errorText);
      throw new Error("Failed to analyze ingredients");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    console.log("AI analysis response:", aiResponse);

    // Parse the AI response as JSON
    let analysisResult;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, aiResponse];
      analysisResult = JSON.parse(jsonMatch[1].trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", aiResponse);
      throw new Error("Invalid AI response format");
    }

    return new Response(
      JSON.stringify({
        extractedText,
        analysis: analysisResult
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-ingredients:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});