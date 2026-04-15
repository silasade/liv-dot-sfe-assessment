import { APIResponse } from "../types/common";


export async function requests<T>(
  path: string,
  init?: RequestInit,
  token?: string,
): Promise<APIResponse<T>> {
  const res = await fetch(`api/${path}`, {
    method: init?.method ?? "GET",
    headers: {
      ...init?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-store",
    body: init?.body,
  });
  

  const result: APIResponse<T> = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || res.statusText);
  }

  return result;
}
