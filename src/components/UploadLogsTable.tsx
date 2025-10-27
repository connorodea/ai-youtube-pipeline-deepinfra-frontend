import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Upload {
  id: number;
  channel: string;
  title: string;
  videoId: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

interface UploadLogsTableProps {
  uploads: Upload[];
}

export const UploadLogsTable = ({ uploads }: UploadLogsTableProps) => {
  const getStatusBadge = (status: string) => {
    const colors = {
      success: "bg-success text-success-foreground",
      pending: "bg-primary text-primary-foreground",
      failed: "bg-destructive text-destructive-foreground",
    };
    return colors[status as keyof typeof colors] || colors.success;
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-muted-foreground">ID</TableHead>
            <TableHead className="text-muted-foreground">Channel</TableHead>
            <TableHead className="text-muted-foreground">Title</TableHead>
            <TableHead className="text-muted-foreground">Video ID</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Timestamp</TableHead>
            <TableHead className="text-muted-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No uploads yet. Generate your first video to get started!
              </TableCell>
            </TableRow>
          ) : (
            uploads.map((upload) => (
              <TableRow key={upload.id} className="border-border hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-sm">{upload.id}</TableCell>
                <TableCell>
                  <span className="font-medium text-primary">{upload.channel}</span>
                </TableCell>
                <TableCell className="max-w-xs truncate">{upload.title}</TableCell>
                <TableCell className="font-mono text-sm text-accent">{upload.videoId}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(upload.status)}>
                    {upload.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{upload.timestamp}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-glow transition-colors"
                    onClick={() => window.open(`https://youtube.com/watch?v=${upload.videoId}`, '_blank')}
                  >
                    <span className="text-sm">View</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
