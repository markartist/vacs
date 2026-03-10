export type VacsModuleId =
  | "dashboard"
  | "blog-workflow"
  | "content-jobs"
  | "prompts"
  | "policies"
  | "governance"
  | "admin";

export interface VacsNavigationItem {
  id: VacsModuleId;
  label: string;
  href: string;
  description: string;
  requiresRole?: "editor" | "admin";
  enabled: boolean;
}

export interface VacsModuleRegistry {
  generatedAt: string;
  modules: VacsNavigationItem[];
}
