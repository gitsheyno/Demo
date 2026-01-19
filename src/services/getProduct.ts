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
