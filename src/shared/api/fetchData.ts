export async function fetchData() {
    const response = await fetch('/api/choose'); 
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
}