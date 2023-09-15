## Environment
- Java version: 17
- Maven version: 3.*
- Spring Boot version: 3.0.6

## Data
Example of a Account data JSON object:
```json
{
    "accountId": 1,
    
    "emailAddress": "test@gmail.com",
    
    "balance": 574.0,
}
```

## Requirements
In this project, we provide APIs to create,delete,update,retrieve the bank accounts.

Here the base API endpoint is `/api/core-banking` for the following 4 operations.


`GET` request to `/account/{accountId}`:
* returns the account entry with given id and status code 200
* if the requested account entry doesn't exist, then status code 404 should be returned

`POST` request `/account`:
* adds new account and status code 200.

`DELETE` request to `/account/{accountId}`:
* deletes the account with given accountId and returns status code 200
* if the requested account entry doesn't exist, then status code 404 should be returned

`PUT` request to `/account/{accountId}`:
* updates the given account with given accountID and returns status code 200
* if the requested account entry doesn't exist, then status code 404 should be returned

## Commands
- run: 
```bash
mvn clean spring-boot:run
```

- install:

```bash
mvn clean install
```

- test:

```bash
mvn clean test
```

1. change account Id to start from some bigger number
2. chnage card number to be string with 16 charcater long
3. populate default data 