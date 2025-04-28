

export async function fetchData() {
    const response = await fetch('/api/choose', {
        next: { revalidate: 10 },
        cache: 'no-store',
    }

    );
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
}


// export async function fetchDataSteps() {
//     const response = await fetch("/api/steps", {
//         next: { revalidate: 1000 },
//         cache: 'force-cache',
//     })
//     if (!response.ok) throw new Error("Failed to fetch data");
//     return response.json();
// }