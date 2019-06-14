[Home](../README.md) / Entendendo o básico

### Sumario

- [O que é o ExpressJS](#o-que-é-o-expressjs)


# Entendendo NPM Scripts

É um framework criado com NodeJS para facilitar a construção de Web apps.

## Instalando o ExpressJS

Para instalar o ExpressJS é simples, basta inserir o seguinte comando: `npm install --save express`.

## Configurando o ExpressJS

Agora vamos configurar nossa aplicação:

```javascript
// Node Modules
const http      = require('http');

// 3º Part Modules
const express   = require('express');

// Application
const app = express();
const server = http.createServer(app);

server.listen(4000);
```

## Adicionando Middlewares

Com os middlewares conseguimos interceptar requisições,
assim conseguimos tratar os dados de maneira isolada, veja o conceito:

- Request 
- Middleware [ (req, res, next) => { ... } ] -> next()
- Middleware [ (req, res, next) => { ... } ] -> res.send()
- Response

Um `Middleware` é nada mais que uma função que recebe a `request`, uma `response` e uma função para ir para o proximo `Middleware` chamada `next`, Veja um exemplo:

```javascript
app.use((req, res, next) => {
    // ...
    next();
});
```
## Como os Middlewares funcionam

O Express faz algumas configurações para nós baseados nas respostas que queremos enviar
para o cliente, como por exemplo o Express adiciona na `response` um método chamado `send`,
onde passamos um valor e ele automaticamente configura certos `Headers` como por exemplo: `Content-Type` e `Status`.

```javascript
app.use((req, res, next) => {
    res.json('<h1>Hello from Express!</h1>')
})
```

No exemplo acima inserimos um HTML e ele automaticamente configura informações como:
`Content-Type: text/html; charset=utf-8`

Se você observar bem, não chamamos a função `next()` no final e não devemos, estamos fornecendo outra
alternativa, estamos enviando uma *resposta*.

## ExpressJS - Por trás das cenas

Observando o código fonte do Express conseguimos entender o porque o método `send`,
configura automaticamente o `Content-Type`, se ele encontra uma string ele realizada
essa configuração para nós e assim faz com outros tipos também.

Outra coisa importante é que não precisamos iniciar um servidor manualmente, oe Express
possui um método chamado `listen` que executamos diretamente de sua instancia `app` e passamos
apenas a porta a ser ouvida, assim salvamos algum código.

## Manipulando diferentes rotas

O método `app.use()` possui 4 formas diferentes de ser utilizado, uma delas ja vimos anteriormente,
onde podemos passar um middleware para qualquer requisição e agora veremos um outra forma onde podemos
informar uma *rota* e atribuir um Middlewares em específico:

```javascript
app.use('/', (req, res) => {
    // .. carregar home do site
});
```

Uma coisa importante é entender que a ordem em que definimos nossas rotas afetam o modo em que 
são acessadas, por exemplo, se eu quiser acessar a rota `/contato`, porém ela foi definida
após a rota ráiz, o cliente sempre cairá na rota ráiz, vamos ver como definir nossas rotas na 
sequencia certa:

```javascript
app.use('/contato', (req, res) => {
    // .. carregar a página de contato
});

app.use('/', (req, res) => {
    // .. carregar home do site
});
```
Caso nosso cliente inserir a rota `/` ela não combinará com a rota `/contato`, então 
a rota `/contato` é ignorada e o express vai de rota em rota até encontrar uma rota
que combine. Se a nossa rota `/` fosse definida antes, todas as rotas caíriam nela, pois todas
começão com o caracter barra.

Mas porque quando ele terminar de executar a rota `/contato` ele não executa as rota `/`?

Ele não faz isso pelo seguinte motivo, essas são rotas finais e nelas utilizamos o método
`res.send()` e não o método `next()` do nosso Middleware.

## Parseando Requisições

Podemos capturar e parsear dados encaminhados através de um formulário, o Espress
cria um atributo chamado `body` diretamente no requisição `req`, e dessa forma não precisamos tratar
os chunks, porém vamos precisar de um Middleware para tratar os dados para nós, se chama
`bodyParser`.

Utilizando o bodyParser podemos tratar diversos dados, mas por hora vamos tratar dados que
são encodados na URL, como os submitados por formulários, o bodyParser tem um método chamado
`urlencoded` que faz esse trabalho para nós, só precisamos passar um opção para ele não
extender essa funcionalidade para um outra biblioteca chamada `qs`.

```javascript
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/add-product', (req, res) => {
    console.log(req.body);
    res.redirect('/')
});
```

Aqui você pode ver que utilizamos um método extendido pelo Express chamado `res.redirect()`,
onde podemos redirecionar o cliente para outra rota e caso não configurarmos o status ele
configura para o status `302 (Found)` automaticamente.

