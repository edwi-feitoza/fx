function LoginDAO(pgClient, bcrypt){
	this._pgClient = pgClient;
	this._bcrypt = bcrypt;
}

LoginDAO.prototype.busca = function(email,callback){
	this._pgClient.connect();
	var query = this._pgClient.query('SELECT id, senha FROM USUARIO WHERE EMAIL = $1', [email], callback);
}

LoginDAO.prototype.buscaPorId = function(id,callback){
	this._pgClient.connect();
	var query = this._pgClient.query('SELECT email FROM USUARIO WHERE id = $1', [id], callback);
}

LoginDAO.prototype.salva = function(usuario, callback){
	var pgClient = this._pgClient;
	pgClient.connect();
	var bcrypt = this._bcrypt;
	var senha = null;
	
	bcrypt.genSalt(10, function(err, salt){ 
		if(err) return err;
		bcrypt.hash(usuario.senha, salt, null, function(err, hash){
			if(err) return err;
			var query = pgClient.query('INSERT INTO USUARIO (nome, email, senha, data_criacao, data_atualizacao) values ($1, $2, $3, current_timestamp, current_timestamp)', [usuario.nome, usuario.email, hash], callback);
		})
	});
}

LoginDAO.prototype.atualizaPerfil = function(usuario, id, callback){
	this._pgClient.connect();
	var query = this._pgClient.query('UPDATE USUARIO SET nome = $1, data_atualizacao = current_timestamp WHERE id = $2', [usuario.nome, id], callback );
}

LoginDAO.prototype.atualizaEndereco = function(id, endereco, callback){
	this._pgClient.connect();
	var query = this._pgClient.query('UPDATE USUARIO SET endereco = $1, data_atualizacao = current_timestamp WHERE id = $2', [endereco, id], callback );
}

LoginDAO.prototype.desconecta = function(){
	this._pgClient.end();
}

module.exports = function(){
	return LoginDAO;
}