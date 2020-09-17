# MessageService

The main purpose of this repository is to show working Node.js API server via Tsed.io project for writing Node code in Typescript.

It is not a goal to be a comprehensive and definitive guide to making a TypeScript and Node project, but as a working reference maintained by the community. If you are interested in starting a new TypeScript project - check out the bootstrapping tools reference in [the TypeScript Website](https://www.typescriptlang.org/docs/home.html) also you can visit to tsed , i think its very useful framework for fast development.
Simple message service . Via layered architecture .

# Pre-reqs

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [Yarn](https://yarnpkg.com/)
- Install [NPM](https://www.npmjs.com/)
- Also you can use [MongodbAtlas](https://www.mongodb.com/cloud/atlas)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started

- Clone the repository

```
git clone https://github.com/alifarukm/MessageService.git
```

- Install dependencies

```
cd <project_name>
npm install
```

- Configure your mongoDB server

```bash
# After you install mongodb or create atlas just enter connection string in config mongoose default.config.ts
process.env.DEFAULT_URL || "mongodb+srv://dbUserAFK:12421242@cluster0-i6jbp.mongodb.net/messaging-service?w=majority&retryWrites=true",
# change upper
```

- Run the project development

```
npm start
```

- Build and run the project

```
npm run build
npm start
```

- Swagger API Documentation available

```
http://localhost:3000/docs/
```

## Endpoints

| Name                 | Description                                         |
| -------------------- | --------------------------------------------------- |
| /auth/login          | This endpoint developed for login.                  |
| /auth/register       | This endpoint developed for create new user.        |
| /message/send        | Send message to another user.                       |
| /message/list        | Get rooms list and last message from rooms.         |
| /message/detail/{id} | Get all messages from room.                         |
| /user/block          | Block another user for not get any message any more |
| /user                | Get all users                                       |

## Project Structure

| Name                | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **.vscode**         | Contains VS Code specific settings                                                               |
| **.github**         | Contains GitHub settings and configurations, incuding the GitHub Actions workflows               |
| **node_modules**    | Contains all your npm dependencies                                                               |
| **src**             | Contains your source code                                                                        |
| **src/config**      | All configs should here                                                                          |
| **src/controllers** | Controllers define functions that respond to various http requests                               |
| **src/Repository**  | Repository define Mongoose schemas that will be used in storing and retrieving data from MongoDB |
| **src/types**       |                                                                                                  |
| **src**/server.ts   | Entry point to your express app also tsed.io settings.                                           |
| **src/types**       | Simple service layer. Contains all service functions for bussiness.                              |
| package.json        |                                                                                                  |
| tsconfig.json       | Config settings for compiling server code written in TypeScript                                  |
| tsconfig.tests.json | Config settings for compiling tests written in TypeScript                                        |
| .eslintrc           | Config settings for ESLint code style checking                                                   |
| .eslintignore       | Config settings for paths to exclude from linting                                                |
