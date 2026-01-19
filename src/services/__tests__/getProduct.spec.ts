import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProductByQuery } from "../getProduct";

describe("getProductByQuery", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls fetch with correct search URL and passes AbortSignal", async () => {
    const params = new URLSearchParams({ q: "phone", limit: "10", skip: "0" });
    const controller = new AbortController();

    const mockResponse = { ok: true } as Response;

    const fetchMock = vi.fn().mockResolvedValue(mockResponse);

    Object.defineProperty(globalThis, "fetch", {
      value: fetchMock,
      writable: true,
      configurable: true,
    });

    const res = await getProductByQuery(params, controller);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];

    expect(url).toBe(`/api/products/search?${params.toString()}`);
    expect(options).toBeTruthy();
    expect(options.signal).toBe(controller.signal);

    expect(res).toBe(mockResponse);
  });
});
