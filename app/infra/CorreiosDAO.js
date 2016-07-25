function CorreiosDAO(restClient){
	this._restClient = restClient;
}

CorreiosDAO.prototype.buscaEndereco = function(cep, callback){
	var client = new this._restClient();
	var endpoint = 'http://correiosapi.apphb.com/cep/' + cep;
	client.get(endpoint, callback);
}

module.exports = function(){
	return CorreiosDAO;
}