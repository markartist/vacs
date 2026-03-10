# Blueprint Reconciliation Plan (Draft)

Purpose: hold current Blueprint structure steady and define the reconciliation method once Alex's narrative arrives.

Status: draft; no schema lock decisions are made in this plan.

## Reconciliation Inputs
- Spreadsheet field structure (Riverbend workbook)
- Existing mapping document
- Alex narrative workflow explanation

## Comparison Method
1. Build a side-by-side matrix:
   - spreadsheet field
   - mapped blueprint destination
   - narrative interpretation
2. Classify each mapped item into:
   - confirmed
   - revise
   - add
   - operational artifact (non-canonical system input)
3. Record impacts on:
   - contracts
   - UI/data review flow
   - workflow states

## Required Outputs
- Confirmed Blueprint fields list
- Revision list for existing fields
- Additional field/state proposals
- Operational artifact inventory vs true system inputs
- Decision log entries for approved changes

## Guardrails
- Do not implement generation during reconciliation.
- Preserve current Blueprint contract unless explicitly approved.
- Treat spreadsheet and narrative as methodology inputs, not immediate production schema.
