import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface Ingredient {
  name: string;
  status: "healthy" | "moderate" | "harmful";
  reason: string;
}

interface AnalysisResultProps {
  ingredients: Ingredient[];
  summary: string;
}

const AnalysisResult = ({ ingredients, summary }: AnalysisResultProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "moderate":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "harmful":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-300";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "harmful":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <h3 className="text-xl font-bold mb-2">Analysis Summary</h3>
        <p className="text-lg">{summary}</p>
      </Card>

      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <Card key={index} className={`p-4 border-2 ${getStatusColor(ingredient.status)}`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getStatusIcon(ingredient.status)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-lg">{ingredient.name}</h4>
                  <Badge variant="outline" className="capitalize">
                    {ingredient.status}
                  </Badge>
                </div>
                <p className="text-sm opacity-90">{ingredient.reason}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalysisResult;