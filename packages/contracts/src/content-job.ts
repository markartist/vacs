export type ContentJobChannel = "email" | "social" | "web" | "collateral";
export type ContentJobStatus = "draft" | "queued" | "running" | "review" | "completed" | "failed";

export interface ContentJobInputRef {
  source: "data-pond" | "gsc" | "ga4" | "gbp" | "market-context" | "manual";
  referenceId: string;
  snapshotAt?: string;
}

export interface DraftContentJob {
  id: string;
  propertyId: string;
  campaignId?: string;
  channel: ContentJobChannel;
  status: ContentJobStatus;
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
  inputs: ContentJobInputRef[];
  promptVersion?: string;
  policyVersion?: string;
  notes?: string;
}
