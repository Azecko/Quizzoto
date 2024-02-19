const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://user:Aexie3OoQu2taiqu8angoo0aighaighohquaib0io6Ahz5quooyiech4ahngoosh@localhost:27017/quizzoto?directConnection=true';
const client = new MongoClient(url);

// Database Name
const dbName = 'quizzoto';

client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);

module.exports = db;