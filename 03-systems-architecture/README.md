## Introduction

This monorepo has example NextJS applications and API servers that demonstrate different ways to access external REST services from a NextJS application.
The examples demonstrate how to architect a NextJS application from end to end in several different configurations. These configurations are grouped into three models:

- Local - The complete application is contained with the NextJS App Router application. The application connects directly to any basic services (e.g. databases, 3rd party APIs, etc.).
- BFF - The application is split into a NextJS App Router application and a set of microservices, which in turn talk to the basic services. The NextJS server acts as a "Backend for Frontend" by standing in-between the client (or clients) and the microservices.
- External - The application is split into a NextJS App Router application and a set of microservices, which in turn talk to the basic services. The microservices are accessible directly by the client.

Within each of these architectural models are multiple implementations that show the various combinations of NextJS API routes, Server Actions, and proxied REST services and direct REST services.

## Application architecture

Each of these applications implements a simple TODO list application. Each demonstrates use of both authorized and un-authorized requests. Next-auth is used to provide the authentication mechanism for the applications as well as for the API services. The test accounts are hard coded in the applications and are not stored in a database.

The credentials for the test accounts are:

| Email                | User Name | Password |
| -------------------- | --------- | -------- |
| test1@donotreply.com | test1     | pass     |
| test2@donotreply.com | test2     | pass     |

Next-auth is intentionally configured to use un-encrypted JWTs to make it easier to use the tokens with the simulated REST services. This is NOT recommended for production use.

## Installation

```bash
pnpm install
```

## Examples

| Example             | Model    | Launch                  | PORT | Description                                                                                                                                                                                                                                             |
| ------------------- | -------- | ----------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| local-sa            | Local    | dev:local-sa            | 3000 | Local model using RSCs and Server Actions                                                                                                                                                                                                               |
| local-api           | Local    | dev:local-api           | 3001 | Local model using RSCs and NextJS API routes                                                                                                                                                                                                            |
| bff-sa              | BFF      | dev:bff-sa              | 3006 | BFF model using RSCs and Server Actions                                                                                                                                                                                                                 |
| bff-api             | BFF      | dev:bff-api             | 3007 | BFF model using RSCs and NextJS API routes                                                                                                                                                                                                              |
| bff-trpc            | BFF      | dev:bff-trpc            | 3008 | BFF model using RSCs and tRPC                                                                                                                                                                                                                           |
| bff-gql             | BFF      | dev:bff-gql             | 3009 | BFF model using RSCs and GraphQL                                                                                                                                                                                                                        |
| bff-twirp           | BFF      | dev:bff-twirp           | 3010 | BFF model using RSCs and TwirpScript (gRPC equivalent)                                                                                                                                                                                                  |
| external-proxied    | External | dev:external-proxied    | 3003 | External model where microservice endpoints are accessible as rewritten /rest endpoints on the NextJS server                                                                                                                                            |
| external-token      | External | dev:external-token      | 3004 | External model where microservice endpoints are accessible directly with an API token associated with the session. This leaks the access token to the client.                                                                                           |
| external-api-domain | External | dev:external-api-domain | 3005 | External model where microservice endpoints are accessible directly with on an API domain. The NextJS server serves as mycompany.com and the API is on api.mycompany.com. A local proxy such as Proxyman or Charles Proxy is required for this example. |

Launch examples with the following commands:

```bash
pnpm [launch command]
```

For example to launch the `local-sa` example:

```bash
pnpm dev:local-sa
```

It is **NOT** recommended to run all the examples simultaneously as it will significantly impact system performance.

## Simulated Microservices

Several sample microservice services are provided:

| Server         | Description                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api-rest       | A simple REST server that provides a TODO list for the user. This server is used by the `local-api` example.                                                                                                                                                                                                                                                                                                      |
| api-rest-token | A simple REST server that uses an API service token to provide a TODO list for the user. Between the NextJS client and server this token is then stored on the users session and used to access the API. The token is sent to the API as a bearer token in the Authorization header. The `rest-token-api` doen't require the user to be authenticated to access the API it only requires the token to be present. |
| api-gql        | A simple GraphQL server that provides a TODO list for the user. This server is used by the `bff-gql` example.                                                                                                                                                                                                                                                                                                     |
| api-twirp      | A simple TwirpScript server that provides a TODO list for the user. This server is used by the `bff-twirp` example. TwirpScript is a rough equivalent to gRPC but with easier tooling. You will need to install `protobuf` locally to use this example.                                                                                                                                                           |

## Additional requirements

For the `external-api-domain` example, you will need to remap `api.mycompany.com` to `localhost:5001` and `mycompany.com` to `localhost:3005` using a local proxy such as Proxyman or Charles Proxy.
