# Lendesk Interview Challenge

## Requirement

For Redis to run as a non-cache database, you must install Redis Stack to add in [RedisJSON](https://redis.io/docs/stack/json) so that Node can add objects into Redis to store user data. And [RedisSearch](https://redis.io/docs/stack/search) to have more complex searching in the application.

I will be using the Mac version using Homebrew. However, if you do not have a Mac, here are the [instructions](https://redis.io/docs/stack/get-started/install) for Linux and Docker.
Source:

 1. In the terminal open a new terminal window
 2. Run `brew tap redis-stack/redis-stack`
 3. Run `brew install redis-stack`
 4. Run `redis-stack-server`
 5. Open another terminal window to install the project

## To Install

### Server

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd server` directory
 3. Run `yarn`
 4. Run `cp .env.example .env`

### Frontend

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd frontend` directory
 3. Run `yarn`
 4. Run `cp .env.example .env`

## To Run

### Server

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd server` directory
 3. Run `yarn db:run`
 4. Open another terminal window
 5. Run `yarn start`

### Frontend

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd frontend` directory
 3. Run `yarn start`

## Background

Using Node.js as your framework and Redis for data storage, we need an authentication API for internal services to create and authenticate users. This API should be RESTful and use JSON. It should be fast and secure, and be able to pass a basic security audit (e.g. password complexity). If there are areas of security that your solution hasn't had time to address they should be annotated for future development.

The API should be able to create a new login with a username and password, ensuring that usernames are unique. It should also be able to authenticate this login at a separate end point. It should respond with 200 OK messages for correct requests, and 401 for failing authentication requests. It should do proper error checking, with error responses in a JSON response body.
