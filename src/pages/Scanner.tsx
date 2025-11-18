import { useState, useEffect } from "react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ImageUploader from "@/components/scanner/ImageUploader";
import ManualInput from "@/components/scanner/ManualInput";
import AnalysisResult from "@/components/scanner/AnalysisResult";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ingredient {
  name: string;
  status: "healthy" | "moderate" | "harmful";
  reason: string;
}

interface Analysis {
  ingredients: Ingredient[];
  summary: string;
}

interface ScanHistoryItem {
  id: string;
  type: "manual" | "image";
  input: string; // text or image URL/base64
  analysis: Analysis;
  date: string;
}

const Scanner = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  // Load scan history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("scanHistory");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const saveToHistory = (item: ScanHistoryItem) => {
    const updatedHistory = [item, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
  };

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

      const analysisResult: Analysis = data.analysis;
      setAnalysis(analysisResult);

      // Save scan in Supabase - handle potential errors gracefully
      try {
        const { error: insertError } = await supabase.from("ingredient_scans").insert({
          ingredients_text: data.extractedText || ingredientsText || "",
          analysis_result: analysisResult as any, // Cast to any to bypass type checking
          image_url: imageBase64 || null,
        });

        if (insertError) {
          console.warn("Failed to save to Supabase:", insertError);
          // Don't throw here, just log and continue
        }
      } catch (dbError) {
        console.warn("Database save failed:", dbError);
        // Continue with local storage even if DB fails
      }

      // Save locally
      saveToHistory({
        id: generateId(),
        type: imageBase64 ? "image" : "manual",
        input: imageBase64 || ingredientsText || "",
        analysis: analysisResult,
        date: new Date().toLocaleString(),
      });

      toast.success("Analysis complete!");
    } catch (err) {
      console.error("Analysis error:", err);
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

  const clearHistory = () => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
    toast.success("Scan history cleared!");
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
          <AnalysisResult ingredients={analysis.ingredients} summary={analysis.summary} />
        ) : (
          <>
            <ImageUploader onImageCapture={handleImageCapture} isProcessing={isProcessing} />
            <ManualInput onSubmit={handleManualSubmit} isProcessing={isProcessing} />
          </>
        )}

        {/* Scan History */}
        {history.length > 0 && (
          <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Scan History</h2>
              <Button variant="destructive" size="sm" onClick={clearHistory} className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Clear History
              </Button>
            </div>
            <ul className="space-y-2">
              {history.map((item) => (
                <li key={item.id} className="border rounded p-3 bg-card dark:bg-gray-800">
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                  {item.type === "image" ? (
                    <img src={item.input} alt="Scan" className="max-h-40 object-contain my-2 rounded" />
                  ) : (
                    <p className="my-2">{item.input}</p>
                  )}
                  <p className="font-semibold">Summary:</p>
                  <p>{item.analysis.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Scanner;