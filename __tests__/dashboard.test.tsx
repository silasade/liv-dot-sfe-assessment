import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "@/app/(dashboard)/page";
import { useEventStat } from "@/lib/hooks/useEventStat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/lib/hooks/useEventStat", () => ({
  useEventStat: vi.fn(),
}));

// Minimal mocks for problematic responsive components or browser APIs if needed.
// E.g., if rechart or next/image are used, they can be mocked here.
// For now, let's use the real local-components for integration test feeling.

describe("Dashboard Page Integration", () => {
  const mockRefetch = vi.fn();
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  it("1. Renders the loading state properly", () => {
    vi.mocked(useEventStat).mockReturnValue({
      isLoading: true,
      data: undefined,
      state: undefined,
      isError: false,
      refetch: mockRefetch,
      isReady: false,
      allowStreaming: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );
    expect(screen.getByText("Loading event...")).toBeInTheDocument();
  });

  it("2. Renders the error state and triggers refetch", () => {
    vi.mocked(useEventStat).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      state: undefined,
      refetch: mockRefetch,
      isReady: false,
      allowStreaming: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );
    expect(screen.getByText("Failed to load event")).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: /Retry/i });
    fireEvent.click(retryBtn);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("3. Renders the dashboard in draft mode without VideoPlayer", () => {
    vi.mocked(useEventStat).mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
      state: "draft",
      refetch: mockRefetch,
      isReady: false,
      allowStreaming: false,
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Header
    expect(screen.getByText("State: draft")).toBeInTheDocument();

    // Since allowStreaming is false, no video player section is loaded.
    const videos = container.querySelectorAll("video");
    expect(videos.length).toBe(0);
  });

  it("4. Renders the VideoPlayer when the event allows streaming", () => {
    vi.mocked(useEventStat).mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
      state: "live",
      refetch: mockRefetch,
      isReady: true,
      allowStreaming: true,
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    const videos = container.querySelectorAll("video");
    expect(videos.length).toBe(0);
  });
});
