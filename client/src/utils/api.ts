export async function api<T>(
  url: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return (res.json() as unknown) as T;
}
