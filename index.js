var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var express = require('express')
var app = express()
var server = require('http').createServer(app)

app.use(express.static(__dirname + '/public'))

var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

var insertDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the collection");
		callback(result);
	});
}

var findDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs)
		callback(docs);
	});
}

var removeDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Delete document where a is 3
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});		   
}

app.get('/', function (req, res) {
	// Connection URL
	var url = 'mongodb://localhost:27017/myproject';
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		db.close();
	});

	res.sendFile(__dirname + '/view/index.html')
})

app.get('/json', function (req, res) {
	res.send(JSON.stringify({json:true}))
})

app.get('/insert', function (req, res) {
	res.send(JSON.stringify({json:true}))
})

app.get('/json', function (req, res) {
	res.send(JSON.stringify({json:true}))
})

app.get('/json', function (req, res) {
	res.send(JSON.stringify({json:true}))
})

server.listen(server_port,server_ip_address,function () {
	console.log("Listening on " + server_ip_address + ", port " + server_port)
})
