export interface VideoJobStatus {
    status: "pending" | "processing" | "completed" | "failed";
    manifestKey?: string;
    error?: string;
  }
  