import { MongoClient } from 'mongodb';

let connectDB: MongoClient;
let globalWithMongo = global as typeof globalThis & {
  mongoClient: MongoClient;
};
const MONGO_DB_URL = process.env.MONGO_DB_URL as string;

async function setMognoConnect() {
  if (process.env.NODE_ENV === 'development') {
    if (!globalWithMongo.mongoClient) {
      globalWithMongo.mongoClient = await new MongoClient(
        MONGO_DB_URL
      ).connect();
    }
    connectDB = globalWithMongo.mongoClient;
  } else {
    connectDB = await new MongoClient(MONGO_DB_URL).connect();
  }
}

await setMognoConnect();

export { connectDB };
