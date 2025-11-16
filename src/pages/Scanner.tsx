import { useState } from "react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ImageUploader from "@/components/scanner/ImageUploader";
import ManualInput from "@/components/scanner/ManualInput";
import AnalysisResult from "@/components/scanner/AnalysisResult";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Ingredient {
  name: string;
  status: "healthy" | "moderate" | "harmful";
  reason: string;
}

interface Analysis {
  ingredients: Ingredient[];
  summary: string;
}

const Scanner = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const analyzeIngredients = async (ingredientsText?: string, imageBase64?: string) => {
    setIsProcessing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-ingredients", {
        body: { ingredientsText, imageBase64 },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setAnalysis(data.analysis);
      
      // Save to database
      await supabase.from("ingredient_scans").insert({
        ingredients_text: data.extractedText,
        analysis_result: data.analysis,
        image_url: imageBase64 || null,
      });

      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze ingredients. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageCapture = async (imageData: string) => {
    setCapturedImage(imageData);
    await analyzeIngredients(undefined, imageData);
  };

  const handleManualSubmit = async (text: string) => {
    setCapturedImage(null);
    await analyzeIngredients(text);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ingredient Scanner
          </h1>
          <p className="text-muted-foreground">
            Scan or type ingredient lists to get instant health analysis
          </p>
        </div>

        {capturedImage && (
          <div className="rounded-lg overflow-hidden border-2 border-primary/20">
            <img
              src={capturedImage}
              alt="Captured ingredient list"
              className="w-full max-h-96 object-contain bg-muted"
            />
          </div>
        )}

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg font-medium">Analyzing ingredients...</p>
            <p className="text-sm text-muted-foreground">This may take a few moments</p>
          </div>
        ) : analysis ? (
          <AnalysisResult
            ingredients={analysis.ingredients}
            summary={analysis.summary}
          />
        ) : (
          <>
            <ImageUploader onImageCapture={handleImageCapture} isProcessing={isProcessing} />
            <ManualInput onSubmit={handleManualSubmit} isProcessing={isProcessing} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Scanner;