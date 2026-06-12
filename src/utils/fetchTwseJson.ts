export async function fetchTwseJson<T>(url: string, options?: RequestInit) {
    const controller = new AbortController();
    const { signal } = controller;

    try {
        const res = await fetch(url, { ...options, signal });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const rawjson = await res.json();
        return rawjson as T;
    } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
            //throw new Error("Request aborted");
        }
        throw e instanceof Error ? e : new Error(String(e));
    }

}