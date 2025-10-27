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
    const variants = {
      success: "bg-success/10 text-success border-success/20",
      pending: "bg-muted text-muted-foreground border-border",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status as keyof typeof variants] || variants.success;
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium">ID</TableHead>
            <TableHead className="text-muted-foreground font-medium">Channel</TableHead>
            <TableHead className="text-muted-foreground font-medium">Title</TableHead>
            <TableHead className="text-muted-foreground font-medium">Video ID</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Timestamp</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                No uploads yet. Generate your first video to get started.
              </TableCell>
            </TableRow>
          ) : (
            uploads.map((upload) => (
              <TableRow key={upload.id} className="border-border hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-sm">{upload.id}</TableCell>
                <TableCell>
                  <span className="font-medium">{upload.channel}</span>
                </TableCell>
                <TableCell className="max-w-xs truncate">{upload.title}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{upload.videoId}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusBadge(upload.status)} capitalize font-normal`}>
                    {upload.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{upload.timestamp}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/70 transition-colors"
                    onClick={() => window.open(`https://youtube.com/watch?v=${upload.videoId}`, '_blank')}
                  >
                    <span>View</span>
                    <ExternalLink className="h-3.5 w-3.5" />
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
