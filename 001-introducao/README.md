[Home](../README.md) / Introdução

### Sumario

- [O que é NodeJS ?](#o-que-%C3%A9-nodejs)
- [Instalando o NodeJS e criando nosso Primeiro App](#instalando-o-nodejs-e-criando-nosso-primeiro-app)
  - [Instalação](#instala%C3%A7%C3%A3o)
  - [Primeiro App](#primeiro-app)
- [Entendendo o papel e o uso do Node.js](#entendendo-o-papel-e-o-uso-do-nodejs)
- [Conteúdo do Curso](#conte%C3%BAdo-do-curso)

# O que é NodeJS ?

O NodeJS é uma plataforma construida em cima de um motor que roda Javascript,
para que podemos utilizar Javascript no servidor. Esse motor que compila Javascript
para código de máquina (Machine Code) é o V8, um motor construido para interpretar Javascript no Google Chrome.

NodeJS proporciona o uso de Sistema de Arquivos, controle de Banco de Dados, dentre outros que o Navegador não permite acesso por
razões de segurança.

# Instalando o NodeJS e criando nosso Primeiro App

## Instalação

Instale a última versão do node [clicando aqui](https://nodejs.org/en/);

Após a instalação rode no seu terminal o comando `node -v` para visualizar a versão
do NodeJS instalado e confirmar que a instalação foi bem sucedida.

Também é possível entrar no modo *REPL* para utilizar o NodeJS diretamente da
linha de comando, digitando apenas `node`, conseguimos acessar.

## Primeiro App

Vamos criar nosso primeiro app Node.js, criando um arquivo chamado `first-app.js`, dentro dele vamos inserir o seguinte código:

```javascript
const fs = require('fs');

fs.writeFileSync('hello.txt', 'Hello from Node.js');
```

Após criarmos nosso app, vamos para a linha de comando e executar nosso script da seguinte forma `node first-app.js`, tenha certeza de estar no mesmo diretório do script.


# Entendendo o papel e o uso do Node.js

- É um interpretator Javascript, onde podemos criar:
  - Built tools;
  - Utility Scripts;
  - e muito mais;
- Podemos Criar servidores e ouvir requisições;
- Manipular regras de negócio;
  - Manipular requisições;
  - Validar entradas;
  - Conexão com banco de dados;
- Enviar respostas:
  - HTML;
  - JSON;
  - e muito mais;

# Conteúdo do Curso

- Iniciando;
- Relembrando Javascript (Opcional);
- Básico de Node.js;
- Desenvolvimento Eficiente;
- Utilizando Express.js;
- Template engines (Motores de Templates);
- MVC;
- Rotas e Modelos avançados;
- Node + SQL (MySQL);
- Utilizando Sequelize;
- Node + NoSQL (MongoDB);
- Utilizando Mongoose;
- Sessions & Cookies;
- Autenticação;
- Enviando E-mails;
- Autenticação Avançada;
- Validação de entrada do usuário;
- Manipulação de Erros;
- Manupulando Envio de arquivos e download;
- Paginação;
- Requisições Asincrona;
- Manipulando Pagamentos;
- Rest API Básico;
- Rest API Avançado;
- Utilizando Async-Await;
- Websoket & Socket.io;
- GraphQL;
- Deployment;
- Além de Servidores Web;
- Revisão e Próximos Passos;
