
# UNI-FACEF - Conclusão de Módulo

API Node JS para plataforma de vendas

**Alunos**
- Danilo R. S. Alves
- Everson J. de F. Pereira
- Loner R. Patti
- Lucas R. Barbosa
- Miguel A. M. Molina

**Índice**
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Documentação](#documentação)
- [Desenvolvimento](#desenvolvimento)
- [Teste](#teste)
- [Produção](#produção)


## Requisitos

nodejs (https://nodejs.org/) v12.x LTS sqlite3

Ferramentas utilizadas neste projeto:
- Visual Studio Code 1.41.1
- Chrome: 76.0.3809.146
- Node.js: 12.4.0
- V8: 7.6.303.31-electron.0
- OS: Windows_NT x64 10.0.18363
- Ambiente Git configurado
- SQLite 3
- Postman


## Instalação

Use o pip do gerenciador de pacotes para instalar o foobar.

OS X e Linux:
>npm install


## Documentação

- Baseado no swagger

>http://localhost:3000/documentation

- Como fazer requests para a api
Para utilizar importe a coleção em uma instalação do Postman, disponível em: https://github.com/lukasrafael1407/TrabalhoNode/tree/master/Documentation/Exercicio Node js.postman_collection.json

## Desenvolvimento

Definindo .env a configuração do ambiente.
> DB_NAME = "sqlite:vendas.sqlite",
  DB_PASSWORD,
  JWT_EXPIRES_IN = "24h",
  JWT_SECRET = "stubJWT",
  PORT = 3000

Esta é a mesma configuração do banco de dados de produção

Executar projeto

>npm run dev


## Teste

Ambiente de configuração test/.env com as mesmas variáveis de .env, mas use valores para testar o ambiente.

>teste npm


## Produção

Mudar .env para variáveis de ambiente de produção.

>npm start

Thats all folks
