const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



// Connection URL
const url = 'mongodb://39.97.171.144:27017';


// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  client.close();
});