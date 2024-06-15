# Projeto GoodFood

- [Iniciando a aplicação](#iniciando-a-aplicação)
- [Backend](#backend)
  - [Programas requeridos](#programas-requeridos)
  - [Docker](#docker)
  - [Swagger](#swagger)
- [Frontend](#frontend)

## Iniciando a aplicação

## Backend

### Programas requeridos

- [JDK 17](https://adoptium.net/temurin/releases/?arch=x64&package=jdk&version=17&os=any)
- [MariaDB](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.11.8&os=windows&cpu=x86_64&pkg=msi&mirror=fder)

Executar o comando `./mvnw spring-boot:run` no diretório goodfood-backend ou executar através da sua IDE

Para iniciar o banco de dados, executar o comando `mariadb`
Em seguida, executar o script SQL em `src/main/resources/database/initDB.sql`

#### Docker

- [Docker](https://docs.docker.com/get-docker/)

Alterar em application.yaml:
`spring.datasource.url=jdbc:mariadb://goodfood-db:3306/goodfood`

Executar o comando `docker compose up --build --watch` no diretório goodfood-backend

A aplicação estará disponível em: http://localhost:8080

### Swagger

- Página do Swagger UI disponível em: localhost:8080/swagger-ui/index.html
- Página de descrição OpenAPI em: http://localhost:8080/v3/api-docs

## Frontend

TODO
