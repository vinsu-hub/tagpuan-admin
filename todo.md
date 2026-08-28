# Tagpuan Admin Missing Tabs Checklist

- [x] Define shared patterns for list, review, gallery, and campaign-management layouts.
- [x] Build Event Recaps layout with recap cards, photo completeness states, filters, and actions.
- [x] Build Wall moderation layout with search, status tabs, note cards, reports, and moderation actions.
- [x] Build Passion Projects layout with project cards, tags, status, and review controls.
- [x] Build Applicants layout with applicant summary metrics, searchable table, status filters, and detail drawer-style state.
- [x] Build Member Spotlights layout with draft/published tabs, spotlight cards, and review actions.
- [x] Build Hear Me Out layout with submission cards, category/status filters, and publish workflow controls.
- [x] Build Media layout with upload area, asset filters, media grid, and selection actions.
- [x] Build Newsletter layout with audience metrics, campaign list, composer preview, and send/schedule actions.
- [x] Update routing and sidebar active states for all missing layouts.
- [x] Run responsive visual QA and type/build checks.
- [ ] Save a new checkpoint and deliver the updated project version.

## Review Drawer Enhancement

- [x] Define a shared responsive detail drawer with backdrop, close action, metadata, and footer actions.
- [x] Add applicant review drawer with approve, waitlist, and decline states.
- [x] Add Wall moderation drawer with pin, archive, and report-resolution actions.
- [x] Add Hear Me Out review drawer with publish, keep in review, and archive actions.
- [x] Add Event Recap drawer with photo completeness and publish controls.
- [x] Add Member Spotlight drawer with story preview and publish controls.
- [x] Verify keyboard-friendly close behavior, mobile presentation, and build output.
- [ ] Save a new checkpoint and deliver the enhancement.

## Standalone Local Asset Setup

- [x] Audit all Manus storage references and current GitHub branch state.
- [x] Copy the generated visual assets into a tracked local public asset directory.
- [x] Replace `/manus-storage/...` references with local asset paths.
- [x] Add local asset and development notes to the repository README.
- [x] Verify `pnpm install`, `pnpm check`, `pnpm build`, and `pnpm dev` behavior.
- [ ] Save a checkpoint and deliver the local setup guidance.

## Local Asset Optimization Follow-up

- [x] Create compressed local copies of the Tagpuan event images and brand mark below the checkpoint media limit.
- [x] Keep the same public asset filenames and confirm all UI references remain unchanged.
- [x] Verify optimized files, type check, and production build.
- [ ] Save a successful checkpoint and deliver the cloneable local setup.

## Routing Regression Cleanup

- [x] Audit all Wouter routes, sidebar targets, and fallback paths.
- [x] Reproduce the secondary-tab to Overview 404 transition.
- [x] Fix the route/fallback behavior without breaking direct deep links.
- [x] Verify every admin tab returns to Overview correctly on desktop and mobile.
- [x] Run type check, production build, and final preview checks.
- [ ] Save a checkpoint and deliver the routing fix.

## Passion Projects Workflow Enhancement

- [x] Audit the existing project card actions, overflow controls, and drawer state.
- [x] Add a working three-dot menu with Edit and Delete actions.
- [x] Build the project edit layout with editable title, description, owner, tags, status, and image preview.
- [x] Make Add project open a create layout with empty editable fields and save/cancel feedback.
- [x] Add delete confirmation and remove the selected project from the local list.
- [x] Verify responsive behavior, TypeScript, production build, and key interactions.
- [ ] Save a checkpoint and deliver the updated Passion Projects workflow.
