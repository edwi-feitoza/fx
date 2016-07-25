var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ListaDesejoController', function(){

	beforeEach(function(done){
		request.post('/login')
			.send({email: 'edwi.slacker@gmail.com', senha: 'teste'})
			.end(function(err,res){
				var result = JSON.parse(res.text);
				var token = result.token;
			});
			done();
	});

	it('#Cadastro de um novo item de desejo com dados inválidos', function(done){
		request.post('/login')
			.send({email: 'edwi.slacker@gmail.com', senha: 'teste'})
			.end(function(err,res){
				var result = JSON.parse(res.text);
				var token = result.token;
				request.post('/salva-lista')
					.set('x-access-token', token)
					.send({nome: "", descricao: 'Teste automatizado de inserção com falhas', valor_medio: 'teste'})
					.expect(400, done)
			});
	});

	it('#Cadastro de um novo item de desejo com dados válidos', function(done){
		request.post('/login')
			.send({email: 'edwi.slacker@gmail.com', senha: 'teste'})
			.end(function(err,res){
				var result = JSON.parse(res.text);
				var token = result.token;
				request.post('/salva-lista')
					.set('x-access-token', token)
					.send({nome: "Livro de java", descricao: 'Teste automatizado de inserção com falhas', valor_medio: 129.99})
					.expect(200, done)
			});

	});

	it('#Listagem de itens de desejo json', function(done){
		request.post('/login')
			.send({email: 'edwi.slacker@gmail.com', senha: 'teste'})
			.end(function(err,res){
				var result = JSON.parse(res.text);
				var token = result.token;
				request.get('/lista')
					.set('Accept', 'application/json')
					.set('x-access-token', token)
					.expect('content-type', /json/)
					.expect(200, done)
			});
	});

	it('#Listagem de um item de desejo pelo nome', function(done){
		request.post('/login')
			.send({email: 'edwi.slacker@gmail.com', senha: 'teste'})
			.end(function(err,res){
				var result = JSON.parse(res.text);
				var token = result.token;
				request.get('/lista-por-nome?nome=java')
					.set('Accept', 'application/json')
					.set('x-access-token', token)
					.expect('content-type', /json/)
					.expect(200, done)
			});
	});
});























