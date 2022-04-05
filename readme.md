# 📝 BOLETOS-API

Essa API tem como objetivo validar e recuperar valores de linhas digitáveis de boletos, como:

* Código de barras
* Valor
* Data de vencimento

Atualmente, ela é capaz de distinguir linhas digitáveis de *boleto de título bancário* e *pagamento de concessionárias*. A API também conta com testes via Jest nas principais regras de negócio da aplicação.



## ⚙ Setup

Utilize o comando yarn para instalar as dependências do projeto. Verifique a [documentação](https://classic.yarnpkg.com/en/docs/getting-started) para mais detalhes.

```
yarn
```

Para rodar os testes automatizados da aplicação, utilize o comando yarn test.

```
yarn test
```

Para executar a aplicação, utilize o comando yarn dev.

```
yarn dev
```

Para rodar os testes automatizados e então executar a aplicação, utilize yarn build.

```
yarn build
```

A API roda por default na porta 8080. Certifique-se que ela está disponível na sua máquina. Uma vez em execução, você pode recuperar os códigos de barras de linhas digitáveis pelo endpoint abaixo:

```
GET http://localhost:8080/boleto/{linhasDigitaveis}
```



##### ✔ STATUS CODE 200

------

A API recuperará as linhas digitáveis da rota e retornará um objeto como o abaixo:

```
{ 
	“barCode”: string, 
	“amount”: string, 
	“expirationDate”: string 
}
```

* barCode: O código de barras correspondente da linha digitável enviada.
* amount: O valor do boleto correspondente da linha digitável enviada.
* expirationDate: A data de vencimento do boleto (dd-MM-yyyy) correspondente da linha digitável enviada.



##### ❌ STATUS CODE 400

------

O tipo do boleto enviado não é nem *boleto*, nem *convenio*, porém é um formato válido de linha digitável.

```
{ 
	“error”: "Not a valid ticket type - types allowed are either 'boleto' or 'convenio'",
}
```

* error: Uma mensagem indicando a causa do erro.



##### ❌ STATUS CODE 400

------

A linha digitável enviada é inválida

```
{ 
	“error”: "{typableLine} is not a valid typable line",
}
```

* error: Uma mensagem indicando a causa do erro.



##### ❌ STATUS CODE 500

------

Ocorreu algum erro interno na aplicação.

```
{ 
	“error”: string,
}
```

* error: Uma mensagem indicando a causa do erro.

