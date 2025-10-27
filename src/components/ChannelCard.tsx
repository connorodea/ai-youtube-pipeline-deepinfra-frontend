import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Clock, Circle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ChannelCardProps {
  name: string;
  theme: string;
  tone: string;
  ttsVoice: string;
  visualMode: string;
  status?: "idle" | "generating" | "uploading" | "completed";
  lastUpload?: string;
  videoCount?: number;
}

export const ChannelCard = ({
  name,
  theme,
  tone,
  ttsVoice,
  visualMode,
  status = "idle",
  lastUpload,
  videoCount = 0,
}: ChannelCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast({
      title: "Pipeline Started",
      description: `Generating video for ${name}...`,
    });

    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Video Generated",
        description: `${name} video completed successfully!`,
      });
    }, 3000);
  };

  const getStatusColor = () => {
    switch (status) {
      case "generating":
        return "border-primary bg-primary/5";
      case "uploading":
        return "border-muted-foreground bg-muted";
      case "completed":
        return "border-success bg-success/5";
      default:
        return "border-border bg-background";
    }
  };

  return (
    <Card className="border border-border hover:border-foreground/20 transition-all duration-200">
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{theme}</p>
          </div>
          <Badge 
            variant="outline" 
            className={`${getStatusColor()} capitalize font-normal`}
          >
            <Circle className="h-2 w-2 mr-1.5 fill-current" />
            {status}
          </Badge>
        </div>

        <div className="space-y-3 text-sm pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tone</span>
            <span className="text-foreground font-medium">{tone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Voice</span>
            <span className="text-foreground font-medium">{ttsVoice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Mode</span>
            <span className="text-foreground font-medium capitalize">{visualMode}</span>
          </div>
        </div>

        <div className="pt-3 space-y-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Videos</span>
            <span className="font-semibold text-foreground">{videoCount}</span>
          </div>
          {lastUpload && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last upload</span>
              <span className="text-foreground">{lastUpload}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
        >
          <Play className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Video"}
        </Button>
      </div>
    </Card>
  );
};
