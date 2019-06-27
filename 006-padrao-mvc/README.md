[Home](../README.md) / Padrão MVC

### Sumario

- [Padrão MVC](#Padr%C3%A3o-MVC)
  - [Model](#Model)
  - [View](#View)
  - [Controller](#Controller)
  - [Rotas](#Rotas)


# Padrão MVC

O padrão MVC foi criado para separarmos as responsabilidades de uma aplicação, dividindo em: M de Model, V de Views e C de Controller.

## Model

Nos models separamos apenas a fonte de dados que vamos utilizar em nossa aplicação, ela representa e busca as informações
contidas em um banco de dados, arquivos e outros.

```javascript
module.exports = class UserModel {
    static fetchAll() {}
    save() {}
}
```

## View

Na View deixamos apenas a estrutura que será renderizada para o usuário interagir, como um arquivo HTML que recebe dados
dinâmicamente e renderiza para o browser exibir e o cliente interagir.

```nunjucks
{# views/user.njk #}
{% extends "templates/base.nunjucks" %}

<ul class="user-list">
    {% for user in users %}
        <li>{{ user.name }}</li>
    {% endfor %}
</ul>
```

## Controller

Nos Controllers vinculados views com models, sempre que um usuário faz uma requisição nossa aplicação a rediciona com base
em alguma rota para um controller associado, assim o controller realiza a devida programação baseada na requisição, utilizando
models e views para entregar o conteúdo esperado pelo cliente.

```javascript
// controllers/users.js
const UserModel = require('../models/user');

class UsersController {
    getUsers(req, res) {
        const data = {
            users: UserModel.fetchAll()
        };

        res.render('users', data);
    }
}

module.exports = new UserController;
```

## Rotas

Nas rotas vinculamos endereços e métodos com controllers apropriados:

```javascript
// routes/index.js
const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

router.get('/users', userController.getUsers);
```