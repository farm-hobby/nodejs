[Home](../README.md) / Fluxo de trabalho e depuração

### Sumario

- [Entendendo NPM Scripts](#entendendo-npm-scripts)
- [Instalando Pacotes de Terceiros](#instalando-pacotes-de-terceiros)
  - [Diferença entre:](#diferen%C3%A7a-entre)
    - [--save](#save)
    - [--save-dev](#save-dev)
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
    "serve": "nodemon app.js"
  }
}
```

Existe uma diferença para executar os dois comandos, com `start` podemos executa-lo
digitando `npm start`, pois `start` é um script npm nativo, agora `serve` não existe nativamente
nos scripts do npm, então é necessário utilizar o comando `npm run` antes do nosso script customizado,
assim: `npm run serve`;

# Instalando Pacotes de Terceiros

- npm install nodemon --save-dev

## Diferença entre:

### --save

`--save` adiciona o pacote como uma dependência do projeto, ou seja, são pacotes necessários para rodar a sua aplicação,
então, eles devem ser instalados em produção.

### --save-dev

`--save-dev` adiciona os pacotes como *dependências de desenvolvimento*, ou seja, são ferramentas e aplicações utilizadas apenas
no processo de desenvolvimento da aplicação, então, esses pacotes não sobre para a produção. 

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

Erros lógicos estão mais relacionados a erros cometidos por humanos, onde não existe erros de sintax ou de execução,
um exemplo simples é transformar uma `string` um `array` e pegar o valor da posição errada, inserindo o indice errado.

Para nos ajudar com isso utilizamos ferramentas de `debug`, o editor que estamos utilizando é o VSCODE que possui um módulo
especializado em debugar códigos, vamos seguir o tutorial deste reposiótio: https://github.com/microsoft/vscode-recipes/tree/master/nodemon