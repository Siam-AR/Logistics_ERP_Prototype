import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not set in .env");
}

// Single cached client (survives hot reload in dev)
const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

const clientPromise: Promise<MongoClient> =
  globalForMongo._mongoClient ?? (globalForMongo._mongoClient = new MongoClient(uri).connect());

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "Logistics_ERP_Prototype");
}
