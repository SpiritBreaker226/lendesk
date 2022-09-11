# Lendesk Interview Challenge

## Table of Contents

[Requirement](#Requirement) | [To Install](#ToInstall) | [To Run](#ToRun)

## <a id="Requirement"></a>Requirement

For Redis to run as a non-cache database, you must install Redis Stack to add in [RedisJSON](https://redis.io/docs/stack/json) so that Node can add objects into Redis to store user data. And [RedisSearch](https://redis.io/docs/stack/search) to have more complex searching in the application.

I will be using the Mac version using Homebrew. However, if you do not have a Mac, here are the [instructions](https://redis.io/docs/stack/get-started/install) for Linux and Docker.
Source:

 1. In the terminal open a new terminal window
 2. Run `brew tap redis-stack/redis-stack`
 3. Run `brew install redis-stack`
 4. Run `redis-stack-server`
 5. Open another terminal window to install the project

## <a id="ToInstall"></a>To Install

### Server

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd server` directory
 3. Run `yarn`
 4. Run `cp .env.example .env`
 5. open `.env` add a randome string to `JWT_SERECT`

### Frontend

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd frontend` directory
 3. Run `yarn`
 4. Run `cp .env.example .env`

## <a id="ToRun"></a>To Run

### Server

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd server` directory
 3. Run `yarn start`

### Frontend

 1. In the terminal make sure you are in the project's root directory
 2. Go to the `cd frontend` directory
 3. Run `yarn start`
