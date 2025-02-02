

export async function fetchData() {
    const response = await fetch('/api/choose', {
        next: { revalidate: 1000 },
        cache: 'force-cache',
    }
       
    ); 
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
}