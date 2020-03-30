const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const authMechanism = 'SCRAM-SHA-1';

// Connection URL
const url = 'mongodb://atrist:1024@39.97.171.144:27017/learnDemo';


// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  client.close();
});