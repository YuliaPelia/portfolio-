import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI!;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        await client.connect();
        const db = client.db("services");
        const collection = db.collection("choose");
        const data = await collection.find().toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error("Помилка під час отримання даних:", error);
        res.status(500).json({ message: 'Помилка сервера' });
    } finally {
        await client.close();
    }
}
