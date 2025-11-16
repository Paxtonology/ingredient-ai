import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ManualInputProps {
  onSubmit: (text: string) => void;
  isProcessing: boolean;
}

const ManualInput = ({ onSubmit, isProcessing }: ManualInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50">
      <h3 className="text-xl font-semibold mb-4">Or Type Ingredients Manually</h3>
      <div className="space-y-4">
        <Textarea
          placeholder="Paste or type ingredients here (e.g., Water, Sugar, Palm Oil, Sodium Benzoate, Citric Acid)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32 resize-none"
        />
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() || isProcessing}
          className="w-full gap-2"
          size="lg"
        >
          <CheckCircle className="w-5 h-5" />
          Analyze Ingredients
        </Button>
      </div>
    </Card>
  );
};

export default ManualInput;