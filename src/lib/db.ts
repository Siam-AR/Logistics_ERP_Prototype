import { MongoClient, Db } from "mongodb";

// DNS servers are set in src/instrumentation.ts (runs at server start).

const globalForMongo = globalThis as unknown as {
    _mongoClient?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not set");
    }
    if (!globalForMongo._mongoClient) {
        globalForMongo._mongoClient = new MongoClient(uri)
            .connect()
            .catch((err) => {
                // Don't cache a failed connection, otherwise every later request fails too.
                globalForMongo._mongoClient = undefined;
                throw err;
            });
    }
    return globalForMongo._mongoClient;
}

export async function getDb(): Promise<Db> {
    const client = await getClient();
    return client.db(process.env.MONGODB_DB || "logistics_erp");
}
