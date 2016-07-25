var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt-nodejs');
var restClient = require('node-rest-client').Client;
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(){
	var app = express();
	app.set('bcrypt', bcrypt);
	app.set('restClient', restClient);
	app.set('jwt', jwt);
	app.set('moment', moment);
	app.set('secret', 'secrettokenizer');
	
	app.use(express.static("public"));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	var apiRoutes = express.Router();
	apiRoutes.use(function(request, response, next){
		var token = request.body.token || request.query.token || request.headers['x-access-token'];
		if(token){
			var decoded = jwt.decode(token, app.get('secret'));
			if(decoded.exp <= Date.now()){
				return response.status(400).json({error: true, msg: 'Tempo de acesso expirado. Por favor, realize o login novamente.'});
			}

			var pgClient = app.infra.connectionFactory();
			var loginDAO = new app.infra.LoginDAO(pgClient, bcrypt);
			loginDAO.buscaPorId(decoded.iss, function(err, results){
				if(err || results.rowCount == 0){
					return response.status(400).json({error: true, msg: 'Erro ao localizar o usuário associado ao token.'});
				}
				next();
			});
		} else {
			return response.status(403).json({error: true, msg: 'Nenhum token foi fornecido para realizar a autenticação.'});
		}
	});
	app.use('/login/update-profile', apiRoutes);
	app.use('/login/update-address', apiRoutes);
	app.use('/salva-lista', apiRoutes);
	app.use('/lista', apiRoutes);
	app.use('/atualiza-lista', apiRoutes);
	app.use('/lista-por-nome', apiRoutes);

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);

	return app;
}