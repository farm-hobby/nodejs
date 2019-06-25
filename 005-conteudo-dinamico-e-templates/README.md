[Home](../README.md) / Trabalhando com conteúdo dinâmico e motores de template

### Sumario

- [O que é um motor de template](#O-que-%C3%A9-um-motor-de-template)
- [Instalando e Implementando Pug](#Instalando-e-Implementando-Pug)
  - [Instalando o Pug](#Instalando-o-Pug)
  - [Implementando o Pug](#Implementando-o-Pug)
- [Enviando Conteúdo Dinâmico](#Enviando-Conte%C3%BAdo-Din%C3%A2mico)
- [Convertendo HTML para Pug](#Convertendo-HTML-para-Pug)
- [Adicionando um layout base](#Adicionando-um-layout-base)
- [Completando o Pug Template](#Completando-o-Pug-Template)

# O que é um motor de template

Os motores de template ou chamados de **template engines** servem para nos auxiliar
a entregar contéudo de forma dinâmica para o cliente, além de modularizar as views
e melhorar a organização e manutenção da mesma.

Nos template engines temos `placeholder` e `snippets` que nos auxiliam a construir 
uma página html com  variáveis diferentes conforme as requisições do cliente, 
montamos um HTML final e enviamos como resposta.

Vamos ver de forma básica como configurar um template engine no expressjs e como
utilizar em nossas views, veremos os pacotes: `pug`, `ejs` e `handlebars` (express-handlebars).

# Instalando e Implementando Pug

## Instalando o Pug

Para instalar o pug basta digitarmos na raíz do projeto o seguinte comando: `npm install --save pug`.

## Implementando o Pug

Agora precisamos configurar nosso template engine no express, você verá que é muito simples implementar
o Pug no express pois é um **pacote** feito para trabalhar com ele, também adicionaremos o diretório
das nossas views para simplificar a utilização das mesmas, veja:

```javascript
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

// routes...
```

# Enviando Conteúdo Dinâmico

Agora vamos enviar uma página HTML dinâmica quando o client acessar alguma de nossa rotas,
por exemplo nossa home `/`:

```javascript
router.get('/', (req, res) => {
    res.render('shop')
});
```

# Convertendo HTML para Pug

Agora temos que converter a página de nossa loja para a syntax do Pug:

```pug
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title Shop
        link(rel="stylesheet", href="/css/main.css")
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        main
            h1.product__title A Great Book
```

# Adicionando um layout base

Uma das funcionalidades úteis das template engines é a de tambem modularizar nossas views
e reutilizar techos de HTML em locais que se repetem e ainda conseguimos deixa-las 
dinâmicas, vamos criar um layout base para `extender` (extends) para as outras páginas e 
tambem podemos sobreescrever `blocos` (block name) de código para páginas diferentes:

```pug
// views/layouts/main-layout.pug

<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title #{pageTitle}
        link(rel="stylesheet", href="/css/main.css")
        block styles
    body
        block content
```

# Completando o Pug Template
