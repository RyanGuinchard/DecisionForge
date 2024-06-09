const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const DB_NAME = 'DecisionForge';
let client;

const connect = async () => {
  try {
    client = await MongoClient.connect(uri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Failed to connect to MongoDB', e);
    throw e;
  }
};

const db = (dbName = DB_NAME) => {
  if (!client) {
    throw new Error('You have to connect to the database first');
  }
  return client.db(dbName);
};

const close = async () => {
  if (!client) {
    throw new Error('You have to connect to the database first');
  }
  await client.close();
};


module.exports = {
  connect,
  db,
  close,
};