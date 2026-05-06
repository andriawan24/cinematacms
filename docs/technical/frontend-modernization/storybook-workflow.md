# Storybook Workflow

This document explains how Storybook is used in the modern frontend track, how to add and maintain stories, and how to build or publish the static Storybook site.

## Scope

Storybook in this repository is the isolated workbench for modern React components under `frontend/src/features/`.

Use it for:

- shared component development
- interaction and visual-state review
- prop documentation
- light and dark theme checks
- design review before wiring components into application screens

It is not the runtime for legacy page development under `frontend/src/static/js/`.

## Relevant Files

- Storybook config: `frontend/.storybook/main.mjs`
- Preview globals and sorting: `frontend/.storybook/preview.mjs`
- Storybook UI theme: `frontend/.storybook/manager.mjs`
- Intro docs pages: `frontend/src/storybook/Introduction.mdx`
- Contributor guide page: `frontend/src/storybook/Guide.mdx`
- Shared component source: `frontend/src/features/shared/components/`

## Local Usage

Run all Storybook commands from `frontend/`.

### Start Storybook

```bash
npm run storybook
```

This starts the local Storybook dev server on port `6006`.

### Build Static Storybook

```bash
npm run build-storybook
```

This creates a production-ready static build in:

```text
frontend/storybook-static/
```

### Run Component Tests

```bash
npm run test:components
```

or a focused run:

```bash
npm run test:run -- src/features/shared/components/TabView/TabView.test.jsx
```

### Lint Modern Storybook and Component Files

```bash
npm run lint:modern
```

## How Storybook Is Organized

Storybook currently loads:

- `../src/**/*.mdx`
- `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`

Stories should stay colocated with the component they document:

```text
frontend/src/features/shared/components/<ComponentName>/<ComponentName>.stories.jsx
```

The sidebar ordering is controlled in `frontend/.storybook/preview.mjs`.

Current top-level structure:

- `Introduction`
- `Components`
- `Notification`

Current `Components` subgroups:

- `Actions`
- `Display`
- `Inputs`

## Theme and Preview Behavior

Storybook uses the same theme classes as the application shell.

- `html.dark` enables Tailwind dark utilities
- `body.light_theme` enables the light theme
- `body.dark_theme` enables the dark theme

Use the `Color mode` toolbar control to switch between light and dark previews.

This setup is defined in `frontend/.storybook/preview.mjs`.

## How To Add a New Story

1. Create or update the component in `frontend/src/features/shared/components/<ComponentName>/`.
2. Add a colocated `*.stories.jsx` file.
3. Export meaningful states, not just one catch-all story.
4. Add prop descriptions in `argTypes` so the Docs table stays readable.
5. Add or update tests for the component state logic.
6. Verify the story in both light and dark mode.

## Story Authoring Conventions

Use these rules so the Storybook docs remain useful:

- Prefer realistic labels, content, and placeholder text.
- Keep the default story close to real product usage.
- Add focused, error, disabled, and empty states when they matter.
- Use `play` functions for interaction states such as focus or open menus.
- Document each public prop with a short description.
- Keep layout overrides in `className` examples intentional and minimal.

## Recommended Story API Style

For shared components, prefer APIs that are easy to read in documentation.

Example:

```jsx
<TabView>
	<TabContent title="Single Film Upload" content={<p>Upload one title.</p>} />
	<TabContent title="Bulk Upload" content={<p>Upload many titles.</p>} />
</TabView>
```

When a component supports controlled behavior, document the controlled prop explicitly in Storybook controls and examples.

## Writing Better Docs Tables

When using `argTypes`, aim for:

- clear behavior-focused descriptions
- explicit type summaries
- explicit default summaries when helpful
- public API names instead of internal implementation details

Good docs tables should answer:

- what the prop changes
- whether it is controlled or uncontrolled
- what values it expects
- when consumers should use it

## Static Build and Deployment

Storybook can already be built as a static site, but there is currently no dedicated Storybook deployment workflow checked into this repository.

That means the current deploy model is:

1. Build Storybook locally or in CI with `npm run build-storybook`.
2. Publish the generated `frontend/storybook-static/` directory to any static host.

Examples of valid hosting targets:

- GitHub Pages
- Netlify
- Vercel static hosting
- S3 + CloudFront
- an internal static file server

## Manual Deployment Steps

From `frontend/`:

```bash
npm run build-storybook
```

Then publish the contents of:

```text
frontend/storybook-static/
```

Important notes:

- The output is self-contained and intended to be served as static files.
- Treat `storybook-static/` as a build artifact, not as source.
- Rebuild after story, styling, token, or asset changes.

## Suggested CI Publishing Flow

If you want to automate Storybook publishing later, the usual CI flow is:

1. install frontend dependencies
2. run `npm run build-storybook` from `frontend/`
3. upload `frontend/storybook-static/` as a build artifact
4. deploy that artifact to your static host

This repository does not currently define that workflow, so any automated deployment should be added explicitly in CI rather than assumed.

## When To Use Storybook vs the App

Use Storybook when:

- building or refining a reusable component
- reviewing props and visual states
- validating light and dark themes quickly
- documenting a component contract

Use the real application when:

- validating data fetching and page composition
- checking integration with stores, routes, or Django templates
- testing legacy-track pages
- confirming behavior in production-like flows

## Related Documents

- `frontend/src/storybook/Introduction.mdx`
- `frontend/src/storybook/Guide.mdx`
- `docs/technical/frontend-modernization/svg-icon-system.md`
- `docs/technical/FRONTEND_WORKFLOW.md`
