import type { DraftContractMeta } from "./content-blueprint";

export interface BlogTemplateImageSlotRef {
  slotId: string;
  label: string;
  required?: boolean;
}

export interface BlogTemplateSection {
  sectionId: string;
  heading: string;
  purposeNotes?: string;
  bodyContentPlaceholder: string;
  imageSlot?: BlogTemplateImageSlotRef;
  seoNotes?: string;
}

export interface BlogTemplateGlobalProperties {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  associatedBlueprintId: string;
}

export interface BlogTemplateContract {
  templateId: string;
  templateName: string;
  lifecycle: DraftContractMeta;
  globalProperties: BlogTemplateGlobalProperties;
  sections: BlogTemplateSection[];
}

export interface BlogTemplateLibrary {
  libraryId: string;
  libraryName: string;
  lifecycle: DraftContractMeta;
  templates: BlogTemplateContract[];
}
