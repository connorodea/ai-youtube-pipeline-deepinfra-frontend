import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Clock } from "lucide-react";
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
        return "bg-primary";
      case "uploading":
        return "bg-secondary";
      case "completed":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="group relative overflow-hidden border-border bg-card hover:shadow-elegant transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{theme}</p>
          </div>
          <Badge className={`${getStatusColor()} text-foreground`}>
            {status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Tone: {tone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-accent" />
            <span>Voice: {ttsVoice}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-accent">●</span>
            <span>Mode: {visualMode}</span>
          </div>
        </div>

        <div className="pt-4 space-y-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Videos Generated</span>
            <span className="font-bold text-primary">{videoCount}</span>
          </div>
          {lastUpload && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Upload</span>
              <span className="text-foreground">{lastUpload}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Video"}
        </Button>
      </div>
    </Card>
  );
};
