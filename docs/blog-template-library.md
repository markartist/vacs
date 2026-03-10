# Blog Template Library (Draft)

Purpose: provide a scaffold-level structure for maintaining multiple long-form blog templates linked to Blueprint records.

Status: draft, no generation behavior.

## Contract Location
- `packages/contracts/src/blog-template.ts`

## Library Scaffold Location
- `packages/core/src/template-library/blog/library.ts`

## Template Supports
- Global blog properties:
  - title
  - slug
  - meta title
  - meta description
  - primary keyword
  - secondary keywords
  - associated blueprint id
- Section blocks:
  - section id
  - heading
  - purpose/notes
  - body content placeholder
  - optional image slot
  - optional SEO notes

## Current Draft Templates
- `blog-longform-standard-v1`
- `blog-neighborhood-focus-v1`

## Non-Goals
- No auto-generated copy
- No prompt orchestration
- No publishing pipeline
