# JavaScript-Express-GraphQL-Starter
Kick-starter to your GraphQL application.

## Setup
    npm i

## How to run?
    Development: npm run serve
    Build: npm run build
    Production: npm start

## Project Structure
    - src
        - index.ts
        - App.ts
        -models
            - person.ts
        - schema
            - index.ts
            - typeDefs.ts
            - resolvers
                - index.ts
                - queries.ts
                - mutations.ts
    - resources
        - development.json
        - prodcution.json

## Deploy
    npm i -g pm2
    pm2 --name <app_name_here> start npm -- start --watch-delay <seconds_here>

## Check Application Status
    pm2 ps
