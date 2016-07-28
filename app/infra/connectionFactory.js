var pg = require('pg');
var host = process.env.RDS_HOSTNAME;
var database = 'desafio_fdex';
var user = process.env.RDS_USERNAME;
var password = process.env.RDS_PASSWORD;
var dbPort = process.env.RDS_PORT;
var connectionStringRDS = 'postgres://' + user + ':' + password + '@' + host + ':' + dbPort + '/' + database;
//var connectionString = 'postgres://nodejs:nodejsapp@10.0.0.10:5432/desafio_fdex';
var connectionStringTest = 'postgres://nodejs:nodejsapp@10.0.0.10:5432/desafio_fdex_test';

function createPgClient(){
	console.log(connectionStringRDS);
	if(!process.env.NODE_ENV || process.env.NODE_ENV == 'dev'){
		return new pg.Client(connectionStringRDS);
	}

	if(process.env.NODE_ENV == 'test'){
		return new pg.Client(connectionStringTest);
	}
}

module.exports = function(){
	return createPgClient;
}