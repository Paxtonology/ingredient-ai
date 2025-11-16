import { useRef, ChangeEvent } from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploaderProps {
  onImageCapture: (imageData: string) => void;
  isProcessing: boolean;
}

const ImageUploader = ({ onImageCapture, isProcessing }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handles both camera and file uploads
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onImageCapture(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-card/50 shadow-md">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Scan Ingredients</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Use Camera Button */}
          <Button
            size="lg"
            onClick={() => cameraInputRef.current?.click()}
            disabled={isProcessing}
            className="h-32 flex flex-col items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 transition-all"
          >
            <Camera className="w-12 h-12" />
            <span className="text-lg font-medium">Use Camera</span>
          </Button>

          {/* Upload Image Button */}
          <Button
            size="lg"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="h-32 flex flex-col items-center justify-center gap-2"
          >
            <Upload className="w-12 h-12" />
            <span className="text-lg font-medium">Upload Image</span>
          </Button>
        </div>

        {/* Hidden Inputs */}
        {/* Opens Camera directly (works best on mobile) */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Opens file picker for gallery upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </Card>
  );
};

export default ImageUploader;
