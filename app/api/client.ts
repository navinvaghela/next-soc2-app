export async function api<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "same-origin", // if you rely on cookies
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || json.error || res.statusText);
    } catch {
      throw new Error(text || res.statusText);
    }
  }

  // some endpoints may return no content
  if (res.status === 204) return {} as T;
  return res.json() as Promise<T>;
}
