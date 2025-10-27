import { ChannelCard } from "@/components/ChannelCard";
import { UploadLogsTable } from "@/components/UploadLogsTable";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Video, TrendingUp, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [uploads] = useState([
    {
      id: 1,
      channel: "SpiritualMind",
      title: "The Journey Within: Awakening Your True Self",
      videoId: "dQw4w9WgXcQ",
      timestamp: "2025-01-15 14:30",
      status: "success" as const,
    },
    {
      id: 2,
      channel: "PhilosophyPulse",
      title: "Stoic Wisdom for Modern Life",
      videoId: "xvFZjo5PgG0",
      timestamp: "2025-01-15 12:15",
      status: "success" as const,
    },
    {
      id: 3,
      channel: "NeuralDreams",
      title: "AI and the Future of Human Consciousness",
      videoId: "jNQXAC9IVRw",
      timestamp: "2025-01-15 10:00",
      status: "pending" as const,
    },
  ]);

  const channels = [
    {
      name: "SpiritualMind",
      theme: "spiritual awakening and consciousness",
      tone: "cinematic and meditative",
      ttsVoice: "af_bella",
      visualMode: "motion",
      videoCount: 47,
      lastUpload: "2h ago",
      status: "idle" as const,
    },
    {
      name: "PhilosophyPulse",
      theme: "stoicism, meaning, and self-mastery",
      tone: "calm and intellectual",
      ttsVoice: "am_michael",
      visualMode: "image",
      videoCount: 32,
      lastUpload: "4h ago",
      status: "idle" as const,
    },
    {
      name: "NeuralDreams",
      theme: "AI, technology, and digital consciousness",
      tone: "futuristic and inspiring",
      ttsVoice: "bf_emma",
      visualMode: "motion",
      videoCount: 28,
      lastUpload: "6h ago",
      status: "generating" as const,
    },
  ];

  const handleGenerateAll = () => {
    toast({
      title: "Generating All Channels",
      description: "Starting pipeline for all channels...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-subtle">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                🎬 AI YouTube Automation
              </h1>
              <p className="text-muted-foreground">
                Multi-channel autonomous video generation powered by DeepInfra
              </p>
            </div>
            <Button
              onClick={handleGenerateAll}
              size="lg"
              className="bg-gradient-secondary hover:shadow-glow transition-all duration-300"
            >
              <Zap className="mr-2 h-5 w-5" />
              Generate All Channels
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Videos"
            value={107}
            icon={Video}
            trend="+12 this week"
            trendUp={true}
          />
          <StatsCard
            title="Active Channels"
            value={3}
            icon={TrendingUp}
            trend="All operational"
            trendUp={true}
          />
          <StatsCard
            title="Avg. Generation Time"
            value="8.5m"
            icon={Clock}
            trend="-2m faster"
            trendUp={true}
          />
          <StatsCard
            title="Success Rate"
            value="98.3%"
            icon={Zap}
            trend="+1.2% this month"
            trendUp={true}
          />
        </div>

        {/* Channels Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Channels</h2>
            <span className="text-sm text-muted-foreground">
              {channels.length} active channels
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <ChannelCard key={channel.name} {...channel} />
            ))}
          </div>
        </section>

        {/* Upload Logs Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Upload Logs</h2>
            <span className="text-sm text-muted-foreground">
              {uploads.length} recent uploads
            </span>
          </div>
          <UploadLogsTable uploads={uploads} />
        </section>
      </main>
    </div>
  );
};

export default Index;
