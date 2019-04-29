[Home](../README.md) / Entendendo o básico

### Sumario

- [Entendendo NPM Scripts](#entendendo-npm-scripts)
- [Instalando Pacotes de Terceiros](#instalando-pacotes-de-terceiros)
- [Entendendo diferentes tipos de erros](#entendendo-diferentes-tipos-de-erros)
    - [Syntax Errors](#syntax-errors)
    - [Runtime Errors](#runtime-errors)
    - [Logical Errors](#logical-errors)
- [Encontrando e Corrigindo erros de syntax](#encontrando-e-corrigindo-erros-de-syntax)
- [Lidando com erros de execução](#lidando-com-erros-de-execu%C3%A7%C3%A3o)
- [Erros lógicos](#erros-l%C3%B3gicos)


# Entendendo NPM Scripts

Para criar um `package.json` podemos entrar na nossa linha de comando e digitar: `npm init -y`,
iremos gerar o arquivo com a seguinte estrutura:

```json
{
  "name": "003-debugando-e-desenvolvimento-simplificado",
  "version": "1.0.0",
  "description": "[Home](../README.md) / Entendendo o básico",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Daniel Simão",
  "license": "ISC"
}
```

Veja que existe uma chave chamada `scripts`, com ela podemos criar nossos próprios
comandos e executar via `npm`, por exemplo rodar nossa aplicação, vamos adicionar dois novos
scripts chamados `start` e `start-server`:

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "start-server": "node app.js"
  }
}
```

Existe uma diferença para executar os dois comandos, com `start` podemos executa-lo
digitando `npm start`, pois `start` é um script npm nativo, agora `start-server` não existe nativamente
nos scripts do npm, então é necessário utilizar o comando `npm run` antes do nosso script customizado,
assim: `npm run start-server`;

# Instalando Pacotes de Terceiros

- npm install nodemon --save-dev
- difference between --save --save-dev -g
-

# Entendendo diferentes tipos de erros

### Syntax Errors

São erros de syntaxe, como esquecer um ponto e virgula, esquecer de fechar alguma
declaração ou parenteses


### Runtime Errors

Erros que quebram a execução da aplicação;


### Logical Errors

A aplicação não funciona da maneira que deveria e não realiza nenhum alerta.


# Encontrando e Corrigindo erros de syntax

Exemplo de error de syntax:

```javascript
cons server = http.createServer(routes.handler);
```

Aqui vemos que a keyword `cons` não existe e ocasionará um erro de syntaxe (`Error Syntax`);

Exemplo corrigido:

```javascript
cons server = http.createServer(routes.handler);
```

# Lidando com erros de execução

Configuramos uma resposta e não terminamos sua execução após o envio,
existe uma resposta padrão que é executada caso entre na rota padrão, isso
acarreta em um erro.

Isso acontece pois estamos configurando um novo header e realizando um novo
envio de resposta, o node dispara um erro, pois sabe que só podemos realizar um
envio de resposta por get realizado:

```javascript
if (url === '/users') {
    //.. some code
    res.end();
}

res.setHeader();
res.write(...);
res.end();
```

Para Corrigir esse error, devemos terminar o envio adicionando um `return`
antes de `res.end` ou envolvendo a resposta padrão dentro de alguma condicional:


```javascript
if (url === '/users') {
    //.. some code
    return res.end();
}

res.setHeader();
res.write(...);
res.end();
```

# Erros lógicos
