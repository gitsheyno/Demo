/**
 * Fetches a paginated list of products.
 *
 * - Accepts query parameters for pagination
 * - Supports request cancellation via AbortController
 *
 */
import { API_BASE } from "../utilities/api";
export const getProducts = async (
  params: URLSearchParams,
  controller?: AbortController
) => {
  const result = await fetch(`${API_BASE}/products?${params.toString()}`, {
    signal: controller?.signal,
  });

  return result;
};
