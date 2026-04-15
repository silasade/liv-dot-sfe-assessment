# Liv.dot Streaming Operations Dashboard

A highly responsive React 19 application built out with the Next.js App Router for monitoring and managing real-time streaming events. This dashboard gives operators the capability to track event progression, complete required pre-stream checklists, toggle live states safely, and preview broadcasts via an integrated video player.

> Project is [live](https://liv-dot-sfe-assessment.vercel.app/)

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

**Folder & Component Architecture**
The codebase follows a locality-first organizing principle. The main user interface is housed within the `app/(dashboard)` directory. To maintain separation of concerns, components that exclusively serve the dashboard are scoped directly within its directory under `_local_components/`. Components that are reused across different parts of the application are elevated to a central `_global_components/` folder for broader access.

**Data Service Layer**
All remote asynchronous operations are strictly organized inside the `/lib/services/` directory to prevent data logic from leaking into UI components:
- `/lib/services/mockData`: Maintains the initial dataset and static payload structures for the API.
- `/lib/services/queries`: Encapsulates reusable TanStack Query fetchers (`useQuery`), serving as the single source of truth for read operations.
- `/lib/services/mutations`: Isolates data manipulation (`useMutation`), cleanly orchestrating cache invalidations alongside Next.js API requests.
- `/lib/services/schemas`: Houses all Zod definitions to enforce an ironclad data contract across the entire service ecosystem.

**State Architecture**
Rather than relying on heavy global state containers like Redux or Zustand, I adopted a split approach tailored for modern React:
- **Remote Data Synchronization**: TanStack Query acts as the primary data orchestrator for server state, automatically handling background fetching, caching, and status indicators without manual boilerplate.
- **Component-Level State**: Given that UI states are mostly ephemeral, React's native `useState` is used exclusively within local component boundaries to maintain tight encapsulation.

**Design Decisions & Context**
- *Next.js Route Handlers*: The application fetches data and performs asynchronous operations through Next.js API endpoints (`app/api`) mapped directly to TanStack Query. This establishes a clean, realistic data-fetching lifecycle—automatically powering the UI's loading, fetching, and error states.
- *Prioritizing Decoupling*: The architecture intentionally separates presentational components from the underlying business logic hooks. While this introduces slightly more code than a tightly coupled approach, it significantly improves modularity and makes unit testing (via Vitest) completely frictionless.

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