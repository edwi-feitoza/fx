function ListaDesejosDAO(pgClient){
	this._pgClient = pgClient;
}

ListaDesejosDAO.prototype.busca = function(id,callback){
	this._pgClient.connect();
	var query = this._pgClient.query('SELECT * FROM LISTA_DESEJOS WHERE USUARIO_ID = $1', [id], callback);
}

ListaDesejosDAO.prototype.buscaPorNome = function(id,nome,callback){
	this._pgClient.connect();
	var query = this._pgClient.query('SELECT * FROM LISTA_DESEJOS WHERE USUARIO_ID = $1 AND NOME LIKE $2', [id, '%' + nome + '%'], callback);
}

ListaDesejosDAO.prototype.atualizaLista = function(lista, id, callback){
	this._pgClient.connect();
	var query = this._pgClient.query('UPDATE LISTA_DESEJOS SET nome = $1, descricao = $2, valor_medio = $3, data_atualizacao = current_timestamp WHERE USUARIO_ID = $4', [lista.nome, lista.descricao, lista.valor_medio, id], callback );
}

ListaDesejosDAO.prototype.salvaLista = function(lista, id, callback){
	this._pgClient.connect();
	var query = this._pgClient.query('INSERT INTO LISTA_DESEJOS (USUARIO_ID, nome, descricao, valor_medio, data_criacao, data_atualizacao) values ($1, $2, $3, $4, current_timestamp, current_timestamp)', [id, lista.nome, lista.descricao, lista.valor_medio], callback );

}

ListaDesejosDAO.prototype.desconecta = function(){
	this._pgClient.end();
}

module.exports = function(){
	return ListaDesejosDAO;
}