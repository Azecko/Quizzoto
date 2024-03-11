const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const url = `mongodb://${process.env.MONGO_INITDB_USER_USERNAME}:${process.env.MONGO_INITDB_USER_PASSWORD}@quizzoto_db:27017/${process.env.MONGO_INITDB_DATABASE}?directConnection=true`;
const client = new MongoClient(url);

// Database Name
const dbName = `${process.env.MONGO_INITDB_DATABASE}`;

client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);

module.exports = db;
