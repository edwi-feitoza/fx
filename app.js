var app = require('./config/express')();

app.listen(8080, function(){
	console.log('servidor rodando...');
});