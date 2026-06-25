export async function fetchJson<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	const res = await fetch(url, options);

	if (!res.ok)
		throw new Error(`HTTP ${res.status}: ${res.statusText}`);

	const data = await res.json();

	return data;
}
