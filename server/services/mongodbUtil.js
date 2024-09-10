/* eslint-env node */
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const DB_NAME = "DecisionForge";
let client;
let isConnected = false;

// Connect to MongoDB with connection pooling and retry options
const connect = async () => {
  if (client && isConnected) {
    console.log("Reusing existing MongoDB connection");
    return;
  }

  try {
    // Set options for connection pool and retrying writes
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,  // Connection pool size, adjust if needed
      serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds of no response
      retryWrites: true,  // Retry failed writes
      connectTimeoutMS: 10000,  // Timeout for initial connection (10s)
    });

    // Connect the client and log success
    await client.connect();
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    throw e;
  }
};

// Get database
const db = (dbName = DB_NAME) => {
  if (!client || !isConnected) {
    throw new Error("You have to connect to the database first");
  }
  return client.db(dbName);
};

// Close connection
const close = async () => {
  if (!client || !isConnected) {
    throw new Error("You have to connect to the database first");
  }
  await client.close();
  isConnected = false;
};

// Find all documents
const findAll = async (collectionName, query = {}, projection = {}) => {
  const database = db();  // Retrieve the connected db instance
  const collection = database.collection(collectionName);
  return await collection.find(query, { projection }).toArray();
};

// Find specific document
const findOne = async (collectionName, query = {}) => {
  const database = db();  // Retrieve the connected db instance
  const collection = database.collection(collectionName);
  return await collection.findOne(query);
};

module.exports = {
  connect,
  db,
  close,
  findOne,
  findAll,
};
