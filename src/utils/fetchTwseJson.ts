export async function fetchTwseJson<T>(
    url: string, options?: RequestInit
): Promise<T> {
    const controller = new AbortController();

    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        if (!res.ok) throw new Error(res.statusText);
        const rawjson = await res.json();
        return rawjson as T;
    } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
            throw new DOMException("Request aborted", "AbortError");
        }
        throw e instanceof Error ? e : new Error(String(e));
    }
}
