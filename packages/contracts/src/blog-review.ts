import type { DraftContractMeta } from "./content-blueprint";

export type BlogDraftRevisionStatus =
  | "not_started"
  | "in_review"
  | "changes_requested"
  | "ready_for_approval"
  | "approved";

export interface BlogDraftReviewNote {
  noteId: string;
  reviewerIdentityPlaceholder: string;
  sectionId?: string;
  note: string;
  createdAt?: string;
}

export interface BlogDraftReviewerMarker {
  reviewerIdentityPlaceholder: string;
  rolePlaceholder?: string;
  completed: boolean;
  completedAt?: string;
}

export interface BlogDraftApprovalMarker {
  approved: boolean;
  approverIdentityPlaceholder?: string;
  approvedAt?: string;
  approvalNotes?: string;
}

export interface BlogDraftHumanReview {
  draftId: string;
  revisionStatus: BlogDraftRevisionStatus;
  reviewNotes: BlogDraftReviewNote[];
  reviewerMarkers: BlogDraftReviewerMarker[];
  approvalMarker: BlogDraftApprovalMarker;
  lifecycle: DraftContractMeta;
}
