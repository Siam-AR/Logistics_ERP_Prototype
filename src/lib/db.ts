import { MongoClient, Db } from "mongodb";
import { register } from "./instrumentation";

// Ensure DNS servers are set before resolving MongoDB SRV records
if (process.env.NEXT_RUNTIME === "nodejs" || typeof window === "undefined") {
    register().catch(() => {});
}

const globalForMongo = globalThis as unknown as {
    _mongoClient?: Promise<MongoClient>;
};

async function getClient(): Promise<MongoClient> {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not set");
    }
    if (!globalForMongo._mongoClient) {
        globalForMongo._mongoClient = new MongoClient(uri, {
            maxPoolSize: 10,
            minPoolSize: 1,
            maxIdleTimeMS: 60000,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        })
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
