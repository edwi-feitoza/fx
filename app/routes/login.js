module.exports = function(app){
	var bcrypt = app.get('bcrypt');
	var jwt = app.get('jwt');
	var moment = app.get('moment');
	var secret = app.get('secret');	

	/**
	* @api {post} /login Login
	* @apiGroup Autenticacao
	* 
	* @apiParam {String} email Email do usuario para autenticacao
	*
	* @apiParam {senha} senha  Senha para autenticacao no banco de dados
	*
	* @apiSuccess {String} token Token gerado no momento da autenticacao do usuario
	*
	* @apiSuccess {String} expires Tempo de vida do token fornecido ao usuario autenticado
	*
	* @apiSuccess {String} usuario E-mail do usuario autenticado.
	*
	* @apiSuccessExample {json} sucesso
	* 	HTTP/1.1 200 OK
	*	{
  	*		"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsImV4cCI6MTQ2OTQ1ODk3MjI0N30.BzI77DNbLoDg8JX5xLxPO0F54wtVtmlVfy3l-tINDZo",
  	*		"expires": 1469458972247,
  	*		"usuario": "edi_rock@hotmail.com"
	*	}
	*
	*/
	app.post('/login', function(request, response, next){
		
		var usuario = request.body;

		var pgClient = app.infra.connectionFactory();
		var loginDAO = new app.infra.LoginDAO(pgClient, bcrypt);
		loginDAO.busca(usuario.email, function(err, results){
			if(err){
				return next(err);
			}

			if(results.rowCount == 0){
				response.status(400).json({error: true, msg: 'Não foi localizado nenhum usuário na base com o e-mail ' + usuario.email + '. Por favor, utilize a rota /login/new para criar um novo usuário.'});
				return next();				
			}

			var senhaBanco = results.rows[0].senha;
			bcrypt.compare(usuario.senha, senhaBanco, function(err, isMatch){
				if(err || !isMatch){
					response.status(400).json({error: true, msg: 'Senha incorreta!'});
				} else {
					var expires = moment().add(20, 'minutes').valueOf();
					var token = jwt.encode({
						iss: results.rows[0].id,
						exp: expires,
					}, secret);

					response.status(200).json({token: token, expires: expires, usuario: usuario.email});		
				}
			});
			loginDAO.desconecta();
		});
	});

	
	/**
	* @api {post} /login/new New Login
	* @apiGroup Autenticacao
	*
	* @apiParam {String} nome O nome proprio do novo usuario a ser criado
	* 
	* @apiParam {String} email Um email valido a ser utilizado na autenticacao
	*
	* @apiParam {senha} senha A senha a ser cadastrada para o novo usuario
	* @apiSuccess {Boolean} error Booleano que informa se houve erro na criacao do novo usuario
	*
	* @apiSuccess {String} msg Mensagem indicando sucesso na operacao
	*
	* @apiSuccessExample {json} sucesso
	* 	HTTP/1.1 200 OK
	*	{
  	*		"error": false,
  	*		"msg": "Usuário criado com sucesso no banco de dados"
	*	}
	*
	*/
	app.post('/login/new', function(request, response, next){
		var usuario = request.body;
		var endereco = null;

		request.assert('nome', 'Nome não pode ficar vazio').notEmpty();
		request.assert('email', 'Email não pode ficar vazio').notEmpty();
		request.assert('senha', 'Senha não pode ficar vazia').notEmpty();
		request.assert('email', 'Deve ser informado um e-mail com formato válido').isEmail();
		var erros = request.validationErrors();

		if(erros){
			response.status(400).json(erros);
			return next(erros);
		}

		var pgClient = app.infra.connectionFactory();
		var loginDAO = new app.infra.LoginDAO(pgClient, bcrypt);
		loginDAO.salva(usuario, function(err, results){
			if(err){
				if(err.code == 23505){
					response.status(500).json({error: true, msg: 'Já existe um usuário na base com o email ' + usuario.email});	
					return next();
				}
				response.status(500).json(err);
				return next(err);
			}
			response.status(200).json({error: false, msg: 'Usuário criado com sucesso no banco de dados'});
			loginDAO.desconecta();
		});
	});

	app.post('/login/update-profile', function(request, response, next){
		var usuario = request.body;
		request.assert('nome', 'Nome não pode ficar vazio').notEmpty();
		var erros = request.validationErrors();
		if(erros){
			response.status(400).json(erros);
			return next(erros);
		}

		var pgClient = app.infra.connectionFactory();
		var loginDAO = new app.infra.LoginDAO(pgClient, bcrypt);
		var token = request.body.token || request.query.token || request.headers['x-access-token'];
		var decoded = jwt.decode(token, app.get('secret'));
		loginDAO.atualizaPerfil(usuario, decoded.iss, function(err, results){
			if(err){
				response.status(500).json(err);	
				return next(err);
			}
			
			response.status(200).json({error: false, msg: 'Usuário atualizado com sucesso no banco de dados'});
			loginDAO.desconecta();
		});
	});


	app.post('/login/update-address', function(request, response, next){
		var usuario = request.body;

		var erros = request.validationErrors();
		if(usuario.cep != null){
			var restClient = app.get('restClient');
			var correiosDAO = new app.infra.CorreiosDAO(restClient);
			correiosDAO.buscaEndereco(usuario.cep, function(data, resp){
				if(resp.statusCode != 200){
					response.status(400).json({error: true, msg: 'CEP não localizado no serviço dos correios. Por favor, verifique se o mesmo está correto.'});	
					return next();
				} else {
					var pgClient = app.infra.connectionFactory();
					var loginDAO = new app.infra.LoginDAO(pgClient, bcrypt);
					var token = request.body.token || request.query.token || request.headers['x-access-token'];
					var decoded = jwt.decode(token, app.get('secret'));
					loginDAO.atualizaEndereco(decoded.iss, data, function(err, results){
						if(err){
							response.status(500).json(err);	
							return next(err);
						}
			
						response.status(200).json({error: false, msg: 'Usuário atualizado com sucesso no banco de dados'});
						loginDAO.desconecta();
					});
				}
			});
		} else {
			response.status(400).json({error: true, msg: 'CEP não pode ficar vazio.'});	
			return next();
		}
	});
}