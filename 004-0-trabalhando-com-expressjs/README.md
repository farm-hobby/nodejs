[Home](../README.md) / Trabalhando com ExpressJS

### Sumario

- [O que é o ExpressJS](#O-que-%C3%A9-o-ExpressJS)
  - [Instalando o ExpressJS](#Instalando-o-ExpressJS)
  - [Configurando o ExpressJS](#Configurando-o-ExpressJS)
  - [Adicionando middlewares](#Adicionando-middlewares)
  - [Como os middlewares funcionam](#Como-os-middlewares-funcionam)
  - [Por trás das cenas](#Por-tr%C3%A1s-das-cenas)
  - [Manipulando diferentes rotas](#Manipulando-diferentes-rotas)
  - [Parseando requisições](#Parseando-requisi%C3%A7%C3%B5es)
  - [Limitando a execução de middlewares apenas a POST requests](#Limitando-a-execu%C3%A7%C3%A3o-de-middlewares-apenas-a-POST-requests)
  - [Utilizar Express Router](#Utilizar-Express-Router)
  - [Adicionando a página de erro 404](#Adicionando-a-p%C3%A1gina-de-erro-404)
  - [Filtrando Caminhos](#Filtrando-Caminhos)
  - [Criando Páginas HTML](#Criando-P%C3%A1ginas-HTML)
  - [Servindo Páginas HTML](#Servindo-P%C3%A1ginas-HTML)
  - [Retornando uma página de 404](#Retornando-uma-p%C3%A1gina-de-404)
  - [Utilizando funções auxiliares para navegar](#Utilizando-fun%C3%A7%C3%B5es-auxiliares-para-navegar)
  - [Servindo arquivos estáticos](#Servindo-arquivos-est%C3%A1ticos)


# O que é o ExpressJS

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

## Adicionando middlewares

Com os middlewares conseguimos interceptar requisições,
assim conseguimos tratar os dados de maneira isolada, veja o conceito:

- request 
- middleware `(req, res, next) => next()`
- middleware `(req, res, next) => res.send()`
- response

Um `middleware` é nada mais que uma função que recebe a um parametro para requisições (`req`), uma para as repostas (`res`) e uma função para ir para o próximo `middleware` chamada `next()`, Veja um exemplo:

```javascript
app.use((req, res, next) => {
    // ...
    next();
});
```
## Como os middlewares funcionam

O Express faz algumas configurações para nós baseados nas respostas que queremos enviar
para o cliente, como por exemplo o Express adiciona na `response` um método chamado `send`,
onde passamos um valor e ele automaticamente configura certos `Headers` como por exemplo: `Content-Type` e `Status`.

```javascript
app.use((req, res, next) => {
    res.send('<h1>Hello from Express!</h1>')
})
```

No exemplo acima inserimos um HTML e ele automaticamente configura informações como:
`Content-Type: text/html; charset=utf-8`

Se você observar bem, não chamamos a função `next()` no final e não devemos, estamos fornecendo outra
alternativa, estamos enviando uma *resposta*.

## Por trás das cenas

Observando o código fonte do Express conseguimos entender o porque o método `send`,
configura automaticamente o `Content-Type`, se ele encontra uma string ele realizada
essa configuração para nós e assim faz com outros tipos também.

Outra coisa importante é que não precisamos iniciar um servidor manualmente, oe Express
possui um método chamado `listen` que executamos diretamente de sua instancia `app` e passamos
apenas a porta a ser ouvida, assim salvamos algum código.

Exemplo:

```javascript
const express = require('express');

const app = express();

app.listen(4000);
```

## Manipulando diferentes rotas

O método `app.use()` possui 4 formas diferentes de ser utilizado, uma delas vimos anteriormente,
onde podemos passar um middleware para qualquer requisição e agora veremos uma outra forma onde podemos
informar uma *rota* e em seguida atribuir middlewares em específico para esta rota:

```javascript
app.use('/', (req, res) => {
    // .. carregar home do site
});
```

Uma coisa importante é entender que a ordem em que definimos nossas rotas afetam o modo em que 
são acessadas, por exemplo, se eu quiser acessar a rota `/contato`, porém ela foi definida
após a rota ráiz `/`, o cliente sempre cairá na rota ráiz, vamos ver como definir nossas rotas na 
sequencia certa:

```javascript
app.use('/contato', (req, res) => {
    // .. carregar a página de contato
    res.send('<h1>Contact Page</h1>');
});

app.use('/', (req, res) => {
    // .. carregar home do site
    res.send('<h1>Welcome!</h1>');
});
```
Caso nosso cliente inserir a rota `/` ela não combinará com a rota `/contato`, então 
a rota `/contato` é ignorada e o Express vai de rota em rota até encontrar uma rota
que combine. Se a nossa rota `/` fosse definida antes, todas as rotas caíriam nela, pois todas
começão com o caracter barra.

> Mas porque quando ele terminar de executar a rota `/contato` ele não executa as rota `/`?

Ele não faz isso pelo seguinte motivo, essas são rotas finais e nelas utilizamos o método
`res.send()` e não o método `next()` do nosso middleware.

## Parseando requisições

Podemos capturar e parsear dados encaminhados através de um formulário, o Espress
cria um atributo chamado `body` diretamente no requisição `req`, e dessa forma não precisamos tratar
os chunks, porém vamos precisar de um middleware para tratar os dados para nós, se chama
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

## Limitando a execução de middlewares apenas a POST requests

```javascript
app.post('/add-product', (req, res) => {
    console.log(req.body);
    res.redirect('/')
});
```

## Utilizar Express Router

Podemos modular nossas rotas caso nossa aplicação crescer, o `express` nos fornece um construtor de rotas
que podemos utilizar através de `express.Router()`, com isso podemos construir rotas normalmente e 
adicionar a nossa aplicação através do método `app.use()`, veja um exemplo a seguir:

Nosso modulo que mantém as rotas do `admin.js`

```javascript
// estamos dentro de ./routes/admin

const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(`
        <form action="/product" method="POST">
            <input value="" placeholder="Inform here you message." name="message"/>
            <button type="submit">Send</button>
        </form>
    `);
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
});

module.exports = router;
```
Nosso arquivo principal `app.js`:

```javascript
const express       = require('express');
const bodyParser    = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
```

## Adicionando a página de erro 404

Agora vamos adicionar uma página de erro 404 para quando não encontrarmos uma rota em específico,
devemos adicionar após a rota raíz `/` um middleware sem específicar uma rota, desse modo conseguimos
direcionar o cliente para essa página, veja aseguir:

```javascript
app.use((req, res) => res.status(404).send('<h1>Page not found!</h1>'))
```

## Filtrando Caminhos

Podemos prefixar as rotas que estão dentro agrupadas em sessões, como por exemplos as rotas 
dentro de `admin.js`, veja um exemplo:

```javascript
app.use('/admin', adminRoutes);
```

Dentro de `admin.js` temos que ajustar para direcionar nosso formulário dentro da rota `/admin/add-product` para realizar o **submit** para `/admin/product` e não `/product`, veja:

```javascript
router.get('/add-product', (req, res, next) => {
    res.send(`
        <form action="/admin/product" method="post">
            <input value="" name="title" />
            <button type="submit">add product</button>
        </form>
    `);
});
```

## Criando Páginas HTML

Podemos criar `views` onde importaremos essas páginas para exibirmos o layout que corresponde
a alguma rota em específico, então pode ter na nossa aplicação: `views/shop.html` e `views/add-product.html`.

## Servindo Páginas HTML

Para servimos nossas páginas temos que adicionar o caminho corretamente, como precisamos utilizar
o caminho absoluto teremos que utilizar alguns recursos do node como a variável global 
`__dirname` e o módulo `path`:

```javascript
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});
```

## Retornando uma página de 404

```javascript
const path = require('path');

router.use((req, res) => {
    res
        .status(404)
        .sendFile(path.join(__dirname, 'views', '404.html'));
});
```

## Utilizando funções auxiliares para navegar

Para sempre referênciamos nosso arquivo raíz `app.js` podemos criar
funções para nos ajudar a resolver esse problema de produtividade, então
criaremos na raíz do projeto uma pasta chamada `./helpers/` e dentro dela
criaremos um arquivo chamado `path.js`:

```javascript
// helpers/path.js
const path = require('path');

module.exports = path.dirname(process.mainModule.filename);
```

Agora onde precisamos informar o caminho das nossas `views` podemos fazer
a seguinte alteração:

```javascript
// routes/admin.js
const path = require('path');

const rootDir = require('../helpers/path');

router.get('/admin/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});
```

## Servindo arquivos estáticos

Precisamos servir nosso arquivos estáticos de forma pública para que nossa aplicação
possa carregar stilos, scripts, imagens, dentre outros, mas fazer isso com nodeJS puro
é um trabalho muito árduo, por isso uma solução simples é utilizar um built-in middleware
do expressjs chamado `static`, basta passar o caminho dos arquivos públicos que o express
faz todo o resto.

Uma boa prática é criar um diretório na raíz do projeto chamado `public/`, depois de configurado e 
quando o servidor receber uma requisição, automaticamente servirá nossos arquivos: 

```javascript
// app.js
const path = require('path');

const express = require('express');

const app = express();

const { rootDir } = require('./helpers/path');

// configuração do middleware para servir assets
app.use(express.static(path.join(rootDir, 'public')));

// ...aplication
```
