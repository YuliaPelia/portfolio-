
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI!;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function connectToDatabase() {
    try {
        await client.connect();
        const db = await client.db("services");
        const collection = db.collection("choose");
        const data = await collection.find().toArray();
        
        console.log("Pinged your deployment. You successfully connected to MongoDB!", data);
        return data;
    } finally {
        await client.close();
    }
}




async function readData(colectionName: string) {
    const db = client.db("services");
    const collection = db.collection(colectionName);

    try {
        const items = await collection.find().toArray();
        console.log("Зчитані дані:", items);
        return items;
    } catch (error) {
        console.error("Помилка при зчитуванні даних:", error);
    }
}
export { readData }

