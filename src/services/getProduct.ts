/**
 * Fetches products matching a search query.
 *
 * - Used for server-side search
 * - Supports request cancellation via AbortController
 *
 */
import { API_BASE } from "../utilities/api";
export const getProductByQuery = async (
  params: URLSearchParams,
  controller: AbortController
) => {
  const result = await fetch(
    `${API_BASE}/products/search?${params.toString()}`,
    {
      signal: controller.signal,
    }
  );

  return result;
};
