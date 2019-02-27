var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/blogger';

mongoose.connect(dbURI);


// Monitor and report when database is connected
mongoose.connection.on('connected', function () 
{
	console.log('Mongoose connected to ' + dbURI);
});

// Monitor and report error connecting to database
mongoose.connection.on('error', function (err) 
{
	console.log('Mongoose connection error: ' + err);
});

// Monitor and report when database is disconnected
mongoose.connection.on('disconnected', function () 
{
	console.log('Mongoose disconnected');
});

// Closes (disconnects) from Mongoose DB upon shutdown
gracefulShutdown = function (msg, callback) 
{
	mongoose.connection.close(function () 
	{
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
}

process.on('SIGINT', function () 
{
	gracefulShutdown('app termination', function () 
	{
		process.exit(0);
	});
});



