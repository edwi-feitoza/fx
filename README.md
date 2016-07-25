# fx
Olá! Ben vindo ao sistema de desafio da F(x). 

Aqui estão as instruções para rodar o mesmo.

Ao fazer o clone do projeto, deve executar o seguinte comando para instalar as dependências:

```
npm install
```

Os scripts que criam os bancos de dados usado pela aplicação encontra-se dentro do diretório 'scripts' na raíz do projeto.

As bases criadas esperam que exista um usuário no PostgreSQL chamado 'nodejs' com uma senha 'nodejsapp'

Para executar o projeto basta executar o comando:

```
npm start 
```

O package.json já tem uma entrada de script para executar a partir do arquivo app.js.

O servidor node escutará na porta 8080

A documentação dos endpoints ficará disponível na url http://host:8080/apidoc

Para executar os testes automatizados de integração do Mocha, deverá setar a variável de ambiente para reconhecer o banco de teste, da seguinte forma

```
NODE_ENV=test node_modules/mocha/bin/mocha
```

Abaixo seguem os endpoints criados e quais exigem ou não token de autenticação.

Cabe lembrar que quando o login é executado com sucesso é devolvido um objeto JSON cujo primeiro elemento é o token que deverá ser usado no HEADER das demais requisições. 

Deverá haver uma nova entrada no HEADER chamada "x-access-token", cujo value é o token retornado no login.

Se for realizada uma tentativa de acesso para qualquer endpoint controlado sem o devido envio do token, haverá o retorno com status 400, contendo a mensagem de token não localizado.

Se tentar realizar o login de um usuário que não existe, também retornará um JSON com status 400 contendo o endpoint para o cadastro de um novo usuário

/salva-lista
--token
--POST
{
	nome: 'Nome de algum objeto',
	descricao: 'Alguma descricao',
	valor_medio: 169.22
}


/lista
--token
--get
sem parâmetros

/lista-por-nome
--token
--get
exemplo...
/lista-por-nome?nome=postgresql


/atualiza-lista
--post
--token
{
	id: 5,
	nome: 'Nome qualquer',
	descricao: 'descricao qualquer',
	valor_medio: 158.66

}

/login
--post
--sem token
{
	email: 'edwi.slacker@gmail.com',
	senha: 'teste'
}

/login/new
--post
--sem token
{
	email: 'edwi.slacker@gmail.com',
	senha: 'qualquersenha',
	nome: 'nome do usuário'
}


/login/update-profile
--post
--token
{
	nome: 'nome do usuario'
}


/login/update-address
--post
--token
{
	cep: '03386170'
}
