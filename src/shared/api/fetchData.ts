export async function fetchData() {
    const response = await fetch('/api/choose', {
        cache: 'no-cache',
        next: { revalidate: 0 },
    }); 
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
}