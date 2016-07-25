var pg = require('pg');
var connectionString = 'postgres://nodejs:nodejsapp@10.0.0.10:5432/desafio_fdex';
var connectionStringTest = 'postgres://nodejs:nodejsapp@10.0.0.10:5432/desafio_fdex_test';

function createPgClient(){
	if(!process.env.NODE_ENV || process.env.NODE_ENV == 'dev'){
		return new pg.Client(connectionString);
	}

	if(process.env.NODE_ENV == 'test'){
		return new pg.Client(connectionStringTest);
	}
}

module.exports = function(){
	return createPgClient;
}