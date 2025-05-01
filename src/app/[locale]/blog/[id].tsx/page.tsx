export default function BlogPage({ params }: { params: { id: string } }) {

    const { id } = params;

    return (
        <div>
            <h1>Blog Page {id}</h1>
        </div>
    )
}