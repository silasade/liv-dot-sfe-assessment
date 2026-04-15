# Liv.dot Streaming Operations Dashboard

A highly responsive React 19 application built out with the Next.js App Router for monitoring and managing real-time streaming events. This dashboard gives operators the capability to track event progression, complete required pre-stream checklists, toggle live states safely, and preview broadcasts via an integrated video player.

> Project is live at [https://liv-dot-assessment.vercel.app](https://liv-dot-assessment.vercel.app)

---

## Technology Stack & Core Choices

This project leverages modern frontend paradigms for maximum performance, clean developer ergonomics, and rock-solid validation:

* **Core Framework**: Next.js (App Router paradigm) with React 19.
* **Server-State Management**: Tanstack React Query orchestrates data fetching, caching strategies, and optimistic mutations. It heavily replaces the need for legacy global state stores.
* **Styling & Theming**: Tailwind CSS v4 constructs atomic utility scaling alongside base components assembled from Shadcn UI.
* **Integrity & Validation**: Zod serves as my schema verification layer, ensuring responses match my stringent types before hitting the render phase.
* **Testing Infrastructure**: Vitest paired with React Testing Library ensures core components safely transition between their loading, error, draft, and streaming environments.

---

## State Modeling

The UI accurately reflects the real-time operational readiness of the event by separating the backend models from UI views. 

**How UI State is Structured**
The UI state relies heavily on derived values calculated within custom hooks (like `useEventStat`). Instead of storing everything in `useState`, the hook aggregates the raw TanStack Query cache. By checking `event.state` and the satisfied conditions of `event.requirements`, the hook calculates derived booleans like `isReady` and `allowStreaming`. 

**Handling State Transitions**
When a host triggers an action—like toggling from "Draft" to "Live"—a TanStack Query mutation is executed via the `useUpdateEvent` hook. On a successful mutation, the query cache is updated immediately in place. Because my UI explicitly subscribes to this query cache via `useEventStat`, the dashboard structurally re-renders to reflect the new state (e.g. mounting the Video Player) without needing manual propagation.

**Blocked or Incomplete States**
State progression is inherently guarded. The transition to `Ready for Streaming` or `Live` is strictly disabled if `isReady` returns false. The UI clearly visualizes the specific roadblocks; the `RequirementsCheckList` component maps through incomplete technical requirements, showing hosts exactly which parameters (like production crew or stream ingest) are failing validation before they can broadcast.

---

## Implementation Notes

**Component Structure**
The repository groups files tightly by Feature Scope (Locality of Behavior). The core interface lives in `app/(dashboard)`. Components specific strictly to the operations dashboard are kept under `_local_components/` right alongside `page.tsx`. If a component ever needs to be shared across multiple routes or components, it is promoted out to `_global_components/`.

**State Management Approach**
I deliberately avoided a general-purpose global client state library (e.g., Redux, Zustand).
- **Server/Async State** is managed entirely by TanStack Query. It serves as my single source of truth for remote event data, maintaining loading patterns and cache invalidation automatically.
- **Local/Ephemeral UI State** is handled natively with React `useState` kept close to where it's used inside individual feature components.

**Assumptions & Tradeoffs**
- *Mocked Backend*: I assume all event configurations simulate network latency. Mock data delays are implemented within the `lib/services/mockData` layer to demonstrate Loading and Error threshold boundaries cleanly without needing an actual database.
- *Strict Separation over DRY*: I aggressively decouple UI components (View) from logic (ViewModel hooks). This adds slight boilerplate but massively scales automated testability (as demonstrated in my setup via Vitest).

---

## Local Development Guide

### 1. Source Code Retrieval
Start by pulling down the project:
```bash
git clone https://github.com/silasade/liv-dot-sfe-assessment
cd liv-dot-sfe-assessment
```

### 2. Dependency Initialization
Use NPM to download the necessary packages:
```bash
npm install
```

### 3. Running the Dev Server
The project is completely self-contained with mock networking. No `.env` configs are mandatory.
```bash
npm run dev
```
Access the dashboard application physically at **[http://localhost:3000](http://localhost:3000)**.

---

## Validations & Testing

A testing layer exists to guarantee that the operations lifecycle toggles gracefully depending on network behaviors.

- Run the unit & integration test coverage via Vitest:
  ```bash
  npm run test
  ```
- Initiate code linting:
  ```bash
  npm run lint
  ```