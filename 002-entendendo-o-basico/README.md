[Home](../README.md) / Entendendo o básico

### Sumario

- [Como a Web Funciona](#como-a-web-funciona)
    - [Protocolos](#protocolos)
- [Criando um servidor local](#criando-um-servidor-local)
    - [Módulos Principais](#m%C3%B3dulos-principais)
- [Ciclo de Vida do Node.js](#ciclo-de-vida-do-nodejs)
- [Controlando processos no Node.js](#controlando-processos-no-nodejs)
  - [Entendendo Requisições](#entendendo-requisi%C3%A7%C3%B5es)
  - [Enviando Respostas](#enviando-respostas)
- [Cabeçalhos de Requisição e Resposta](#cabe%C3%A7alhos-de-requisi%C3%A7%C3%A3o-e-resposta)


# Como a Web Funciona

- O Client/Browser realiza uma requisição
- Um servidor DNS resolve o endereço e direciona para o servidor correto
- o servidor recebe a requisição e devolve uma resposta para o Client/Browser

### Protocolos

- HTTP: Hyper Text Transfer Protocol (Um protocolo para transferência de dados que o Navegador e o Servidor compreendem);
- HTTPS: HTTP + Data Encryption (durante a transmissão);

# Criando um servidor local

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
});

server.listen(3000);
```

### Módulos Principais

- http -> lauch a server, send requests
- https -> Launch a SSL server
- fs
- path
- os

# Ciclo de Vida do Node.js

1. Inicamos nosso Script (node app.js)
2. Parse Code, Register Variables & Functions
3.  Node.js inicia o Event Loop
    -  O Event Loop roda quando existe pelo menos 1 Event Listener registrado
4. Para sair da Aplicação temos o método `process.exit()`

# Controlando processos no Node.js

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit();

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node.js App</title></head>');
    res.write('<body><h1>Hello from Node.js</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
```

## Entendendo Requisições

Recebemos informações de requisição do Client e com isso conseguimos tratar dados
ou realizar mudanças no servidor, por exemplo conseguimos ter acesso a URL, Método (GET, POST), HEADERS entre outros;

## Enviando Respostas

Na resposta podemos configurar o tipo de informação enviada através do método `res.setHeader()`, onde podemos informar o **Content-Type**, tambem conseguimos escrever a informação a ser enviada com o método `res.write()`, e por fim para terminar e enviar os dados utilizamos o método `res.end()`. Se escrever um novo método `res.write()` após `res.end()` ocorrerá um erro.

# Cabeçalhos de Requisição e Resposta

Lista de Headers: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
