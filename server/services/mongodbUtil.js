/* eslint-env node */
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const DB_NAME = "DecisionForge";
let client;

// Connect to mongodb
const connect = async () => {
  try {
    client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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

// Helper function to ensure connection is open
const ensureConnection = async () => {
  if (!client) {
    await connect();
  }
};

// Find all documents
const findAll = async (collectionName, query = {}, projection = {}) => {
  await ensureConnection();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.find(query).project(projection).toArray();
};

// Find specific document
const findOne = async (collectionName, query = {}) => {
  await ensureConnection();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.findOne(query);
};

// Insert a document
const insertOne = async (collectionName, document) => {
  await ensureConnection();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.insertOne(document);
};

// Update a document
const updateOne = async (collectionName, query, update, options = {}) => {
  await ensureConnection();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.findOneAndUpdate(query, update, { returnDocument: 'after', ...options });
};

// Delete a document
const deleteOne = async (collectionName, query) => {
  await ensureConnection();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.findOneAndDelete(query);
};

module.exports = {
  connect,
  db,
  close,
  ensureConnection,
  findOne,
  findAll,
  insertOne,
  updateOne,
  deleteOne,
};