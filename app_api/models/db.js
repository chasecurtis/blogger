var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://bloggerAdmin:boneDestroyer95!@localhost/blogger';

mongoose.set('debug', true);
mongoose.connect(dbURI);


// Monitor and report when database is connected
mongoose.connection.on('connected', function () 
{
	console.log('Mongoose connected to ' + dbURI);
});

//var blogModel = mongoose.model('blog');

/*blogModel.find({}).sort({date: 'desc'}).exec(function(err)
{
    console.log("Can't find blog");
});*/ 

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

// Bring in blog schema
require('./blogs');

