# banco-api-tests

Projeto de automação de testes de API REST desenvolvido em **JavaScript (Node.js)** para validar as funcionalidades da API [`banco-api`](https://github.com/juliodelimas/banco-api).

## 🎯 Objetivo

O objetivo deste projeto é automatizar testes funcionais da API REST do projeto **banco-api**, validando suas funcionalidades e regras de negócio por meio de requisições HTTP e asserções automatizadas.

A API testada disponibiliza operações relacionadas a contas, autenticação e transferências bancárias.

## 🧰 Stack utilizada

| Tecnologia | Utilização |
|---|---|
| **JavaScript / Node.js** | Linguagem e ambiente de execução |
| **Mocha** | Framework para estruturação e execução dos testes |
| **Supertest** | Realização de requisições HTTP durante os testes |
| **Chai** | Biblioteca de asserções |
| **Mochawesome** | Geração de relatório HTML dos testes |
| **dotenv** | Carregamento de variáveis de ambiente |

As versões das dependências são definidas no `package.json` do projeto.

## 📁 Estrutura de diretórios

```text
banco-api-tests/
├── fixtures/
│   └── ...                  # Dados utilizados pelos testes
├── helpers/
│   └── ...                  # Funções auxiliares dos testes
├── test/
│   ├── login.test.js        # Testes relacionados à autenticação
│   └── transferencias.test.js
├── .env                     # Variáveis de ambiente (criado localmente)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> A pasta `mochawesome-report/` é criada durante a execução dos testes quando o Mochawesome gera o relatório. Ela não precisa ser criada manualmente.

## ⚙️ Pré-requisitos

Antes de executar os testes, tenha instalado:

- [Node.js](https://nodejs.org/)
- npm, que é instalado junto com o Node.js
- A API [`banco-api`](https://github.com/juliodelimas/banco-api) em execução

A API REST do projeto `banco-api` utiliza, por padrão, a porta `3000`.

## 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/juliodelimas/banco-api-tests.git
```

Acesse a pasta do projeto:

```bash
cd banco-api-tests
```

Instale as dependências:

```bash
npm install
```

## 🔐 Configuração do `.env`

O projeto utiliza a biblioteca `dotenv` para carregar variáveis de ambiente.

Crie manualmente um arquivo chamado `.env` na **raiz do projeto**:

```text
BASE_URL=http://localhost:3000
```

A variável `BASE_URL` deve apontar para a URL em que a API REST `banco-api` está disponível.

### Exemplo

Se a API estiver sendo executada localmente na porta `3000`:

```text
BASE_URL=http://localhost:3000
```

Se estiver utilizando outra URL ou porta, altere o valor:

```text
BASE_URL=http://localhost:PORTA
```

> O arquivo `.env` é uma configuração local e deve permanecer fora do controle de versão quando contiver informações específicas do ambiente.

## ▶️ Execução dos testes

### Executar todos os testes

Com a API `banco-api` em execução, execute:

```bash
npm test
```

O comando configurado no `package.json` é:

```bash
mocha ./test/**/*.test.js --timeout=200000 --reporter mochawesome
```

Isso significa que o Mocha procura os arquivos de teste dentro da pasta `test/`, aplica timeout de 200 segundos e utiliza o **Mochawesome** como reporter.

## 📊 Relatório de testes

Ao executar:

```bash
npm test
```

o Mochawesome gera um relatório HTML no diretório:

```text
mochawesome-report/
```

O arquivo principal do relatório é:

```text
mochawesome-report/mochawesome.html
```

### Abrindo o relatório no Windows

Após a execução dos testes, abra o arquivo:

```text
mochawesome-report/mochawesome.html
```

ou, pelo terminal:

```bash
start mochawesome-report/mochawesome.html
```

### Abrindo o relatório no macOS

```bash
open mochawesome-report/mochawesome.html
```

### Abrindo o relatório no Linux

```bash
xdg-open mochawesome-report/mochawesome.html
```

## 🔄 Fluxo de execução

O fluxo básico para executar a automação é:

```text
1. Iniciar a banco-api
        ↓
2. Criar/configurar o arquivo .env
        ↓
3. Instalar as dependências
        ↓
4. Executar npm test
        ↓
5. Mocha executa os testes
        ↓
6. Supertest realiza as requisições HTTP
        ↓
7. Chai valida os resultados
        ↓
8. Mochawesome gera o relatório HTML
```

## 🔗 Projeto da API testada

Este projeto de automação testa a API REST do repositório:

**banco-api**

https://github.com/juliodelimas/banco-api

A API REST é executada, por padrão, na porta `3000` e possui documentação interativa por meio do Swagger em:

```text
http://localhost:3000/api-docs
```

Entre os endpoints documentados estão operações de contas, login e transferências.

## 📚 Documentação das dependências

### Mocha

Framework utilizado para estruturar e executar os testes automatizados.

https://mochajs.org/

### Supertest

Biblioteca utilizada para realizar requisições HTTP e testar APIs.

https://github.com/ladjs/supertest

### Chai

Biblioteca utilizada para criar as asserções dos testes.

https://www.chaijs.com/

### Mochawesome

Reporter utilizado para gerar relatórios HTML das execuções dos testes.

https://github.com/adamgruber/mochawesome

### dotenv

Biblioteca utilizada para carregar variáveis definidas em arquivos `.env`.

https://github.com/motdotla/dotenv

### Node.js

Ambiente de execução utilizado pelo projeto.

https://nodejs.org/

## 📝 Observações

- A API `banco-api` precisa estar disponível antes da execução dos testes.
- O valor de `BASE_URL` no `.env` deve corresponder à URL da API que será testada.
- As dependências do projeto são instaladas com `npm install`.
- Os testes são executados por meio do script `npm test`.
- O relatório HTML é gerado pelo Mochawesome após a execução dos testes.
- Este README foi gerado com auxílio de IA generativa.
