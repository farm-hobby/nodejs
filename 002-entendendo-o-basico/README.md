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
- [Roteando Requisições](#roteando-requisi%C3%A7%C3%B5es)
- [Redirecionando Requisições](#redirecionando-requisi%C3%A7%C3%B5es)
- [Parseando o corpo das requisições](#parseando-o-corpo-das-requisi%C3%A7%C3%B5es)
  - [Streams](#streams)
  - [Buffers](#buffers)
- [Entendendo a execução do código Event Driven](#entendendo-a-execu%C3%A7%C3%A3o-do-c%C3%B3digo-event-driven)
- [Código bloqueante e não bloqueante](#c%C3%B3digo-bloqueante-e-n%C3%A3o-bloqueante)
- [Entendendo o Node.js por debaixo dos panos](#entendendo-o-nodejs-por-debaixo-dos-panos)
  - [Single Thread](#single-thread)
  - [Event Loop](#event-loop)
- [Utilizando o Sistema de Módulos do Node.js](#utilizando-o-sistema-de-m%C3%B3dulos-do-nodejs)
    - [Primeira Forma](#primeira-forma)
    - [Segunda Forma](#segunda-forma)


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

# Roteando Requisições

```javascript
const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/message') {

        res.write('<html>');
        res.write('<head><title>My First Node App</title></head>');
        res.write('<body><h1>Hello from Node.js</h1></body>');
        res.write('</html>');

        return res.end();
    }

    res.write('<html>');
    res.write('<head><title>My First Node App</title></head>');
    res.write('<body><form method="post" action="/message"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
    res.write('</html>');

    res.end();
});

server.listen(3000);
```

# Redirecionando Requisições

Utilizamos `res.setHead(statusCode, headers)` para redirecionar o client, passando o código de status e o header para redirecionar, abaixo utilizamos o header `Location: '/'`:

Também podemos utilizar `res.statusCode = 302` e `res.setHeader('Location', '/')` para realizar o redirecionamento.

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form method="post" action="/message"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
        res.write('</html>');

        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY');
        res.writeHead(302, {
            Location: '/'
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node App</title></head>');
    res.write('<body><h1>Hello from Node.js</h1></body>');
    res.write('</html>');


    res.end();
});

server.listen(3000);
```
# Parseando o corpo das requisições

O node utiliza **Streams** e **Buffers** para coletar o corpo das requisições,
veja a seguir como isso funciona:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form method="post" action="/message"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
        res.write('</html>');

        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            res.writeHead(302, {
                Location: '/'
            });

            res.end();
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node App</title></head>');
    res.write('<body><h1>Hello from Node.js</h1></body>');
    res.write('</html>');

    res.end();
});

server.listen(3000);
```

## Streams

A idéia de utilizar streams é trabalhar com os dados antes de eles estarem completos:

1. Requisição chegando
2. Parte 1
3. Parte 2
4. Parte 3
5. Parte 4
6. Completamente Parseado

## Buffers

São as partes da informação requisitada, são as **partes** de um Stream.

# Entendendo a execução do código Event Driven

Quando utilizamos `req.on('data', () => {})` e `req.on('end', () => {})` estamos lidando com
eventos que podem ocorrer no futuro, então do modo que nosso código esta hoje
ele executara `res.end()` mais de uma vez e ocasionará em um erro.

Para solucionar isso revemos adicionar um `return` antes do do evento `req.on('end', ...)`.

Assimn quando caimos na rota `/message` não executamos o restante do código fora da rota.

# Código bloqueante e não bloqueante

Quando utilizamos `fs.writeFileSync(path, content)` a criação de um arquivo realizada de forma síncrona, ou seja,
todo o restante da execução é bloqueada e aguarda o termino da criação do arquivo para então continuar
a execução do script.

Mas imagine a criação de um arquivo muito grande, nossa aplicação pode ficar bloqueada por muito mais
tempo, gerando uma experiência ruim para nossos usuários, portanto, devemos utilizar uma versão assincrona
do nosso método de criação de arquivos chamado `fs.writeFile(path, content, callback)`, deve modo não
bloqueamos a execução de nosso script e quando a tarefa de criar o arquivo terminar, nosso **callback**
será executado, assim prosseguindo com nosso fluxo.

# Entendendo o Node.js por debaixo dos panos


## Single Thread

Node.js recebe as requisições, e todo evento assincrono entra para o Event Loop
que manipula Event Callbacks, o event loop possui uma fila de prioridades
de callbacks, toda execução I/O é enviada para outra thread chamada Worker Pool
que realiza essas execuções mais custosas.

## Event Loop

O Event Loop como o nome diz é um loop que executa infinitamente até que não exista
mais nenhum evento para ser executado, porém quando iniciamos o servidor HTTP
startamos o Event Loop.

O Event Loop fiscaliza uma Pilha de eventos e executa em ordem de prioridade:

1. Timers
   - Execute setTimeout, setInterval Callbacks
2. Pending Callbacks
   - Execute I/O related
   - Callbacks that were deferred
3. Poll
   - Retrive new I/O events, execute their callbacks
4. Check
   - Execute setImmediate() callbacks
5. Close Callbacks
   - Execute all 'close' event callbacks
6. process.exit (refs == 0)

# Utilizando o Sistema de Módulos do Node.js

Podemos separar as rotas em um arquivo separado e exportar uma função
para conseguir acessar as requisições e respostas e nossa aplicação funcionar
normalmente:

Dentro de `routes.js` temos nossas rotas:

```javascript
const fs = require('fs');

const handlerRequests = (req, res) => {
    //...
}

module.exports = handlerRequests;

```

No nosso arquivo `app.js` importamos as rotas e iniciamos nosso servidor:

```javascript
const http = require('http');
const routes = require('./routes');
const server = http.createServer(routes);

server.listen(3000);
```

Poderiamos exportar os módulos de duas outras formas:

### Primeira Forma

```javascript
module.exports.handler = handlerRequests;
```

### Segunda Forma

```javascript
module.exports = {
    handler: handlerRequests
};
```

