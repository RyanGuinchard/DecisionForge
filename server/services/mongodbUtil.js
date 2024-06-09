const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const DB_NAME = "DecisionForge";
let client;

// Connect to mongodb
const connect = async () => {
  try {
    client = await MongoClient.connect(uri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    throw e;
  }
};

// Get database
const db = (dbName = DB_NAME) => {
  if (!client) {
    throw new Error("You have to connect to the database first");
  }
  return client.db(dbName);
};

// Close connection
const close = async () => {
  if (!client) {
    throw new Error("You have to connect to the database first");
  }
  await client.close();
};

// Find all documents
const findAll = async (collectionName, query = {}, projection = {}) => {
  if (!client) {
    throw new Error("You have to connect to the database first");
  }
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.find(query, { projection }).toArray();
};

// Find specific document
let findOne = async (collectionName, query = {}) => {
  if (!client) {
    throw new Error("You have to connect to the database first");
  }
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.findOne(query);
};

module.exports = {
  connect,
  db,
  close,
  findOne,
  findAll,
};
