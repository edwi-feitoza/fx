module.exports = function(app){
	var jwt = app.get('jwt');
	var secret = app.get('secret');	

	app.post('/salva-lista', function(request, response, next){
		
		var lista = request.body;

		request.assert('nome', 'Nome não pode ficar vazio').notEmpty();
		request.assert('descricao', 'Descrição não pode ficar vazio').notEmpty();
		request.assert('valor_medio', 'Valor médio não pode ficar vazio').notEmpty();
		var erros = request.validationErrors();
		
		if(erros){
			response.status(400).json(erros);
			return next(erros);
		}

		var token = request.body.token || request.query.token || request.headers['x-access-token'];
		var decoded = jwt.decode(token, app.get('secret'));
		var pgClient = app.infra.connectionFactory();
		var listaDesejosDAO = new app.infra.ListaDesejosDAO(pgClient);
		listaDesejosDAO.salvaLista(lista, decoded.iss, function(err, results){
			if(err){
				console.log(err);
				response.status(400).json({error: true, msg: 'Falha ao salvar a nova lista de desejos'});
				return next();				
			}

			response.status(200).json({error: false, msg: 'Lista de desejos salva com sucesso.'});		
			listaDesejosDAO.desconecta();
		});
	});

	app.get('/lista', function(request, response, next){
		var lista = request.body;
		var token = request.body.token || request.query.token || request.headers['x-access-token'];
		var decoded = jwt.decode(token, app.get('secret'));
		var pgClient = app.infra.connectionFactory();
		var listaDesejosDAO = new app.infra.ListaDesejosDAO(pgClient);
		listaDesejosDAO.busca(decoded.iss, function(err, results){
			if(err || results.rowCount == 0){
				console.log(results);
				response.status(400).json({error: true, msg: 'Falha ao coletar lista de desejos'});
				return next();				
			} else {
				response.status(200).json(results.rows);		
			}
			listaDesejosDAO.desconecta();
		});
	});

	app.post('/atualiza-lista', function(request, response, next){
		var lista = request.body;
		request.assert('id', 'ID não pode ficar vazio').notEmpty();
		request.assert('id', 'ID deve ser um número inteiro').isInt();
		request.assert('nome', 'Nome não pode ficar vazio').notEmpty();
		request.assert('descricao', 'Descrição não pode ficar vazio').notEmpty();
		request.assert('valor_medio', 'Valor médio não pode ficar vazio').notEmpty();
		var erros = request.validationErrors();
		
		if(erros){
			response.status(400).json(erros);
			return next(erros);
		}
		
		var pgClient = app.infra.connectionFactory();
		var listaDesejosDAO = new app.infra.ListaDesejosDAO(pgClient);
		var token = request.body.token || request.query.token || request.headers['x-access-token'];
		var decoded = jwt.decode(token, app.get('secret'));
		listaDesejosDAO.atualizaLista(lista, decoded.iss, function(err, results){
			if(err){
				response.status(500).json(err);	
				return next(err);
			}
			
			response.status(200).json({error: false, msg: 'Lista de desejos atualizada com sucesso no banco de dados'});
			listaDesejosDAO.desconecta();
		});
	});

	app.get('/lista-por-nome', function(request, response, next){
		var lista = request.query;
		
		request.assert('nome', 'Nome não pode ficar vazio').notEmpty();
		var erros = request.validationErrors();
		
		if(erros){
			response.status(400).json(erros);
			return next(erros);
		}

		var token = request.body.token || request.query.token || request.headers['x-access-token'];
		var decoded = jwt.decode(token, app.get('secret'));
		var pgClient = app.infra.connectionFactory();
		var listaDesejosDAO = new app.infra.ListaDesejosDAO(pgClient);
		listaDesejosDAO.buscaPorNome(decoded.iss, lista.nome, function(err, results){
			if(err || results.rowCount == 0){
				console.log(err);
				response.status(400).json({error: true, msg: 'Falha ao coletar lista de desejos'});
				return next();				
			} else {
				response.status(200).json(results.rows);		
			}
			listaDesejosDAO.desconecta();
		});

	});
}