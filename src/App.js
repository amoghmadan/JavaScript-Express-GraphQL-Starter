import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { typeDefs, resolvers } from './schema';

export default class App {
    constructor() {
        this.BASE_DIR = path.dirname(__dirname);
        this.ENV = process.env.ENV || 'development';

        this.config = JSON.parse(fs.readFileSync(path.join(this.BASE_DIR, 'resources', `${this.ENV}.json`), 'utf-8'));

        this.app = express();
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(morgan('combined'));

        this.app.use('/graphql/', graphqlHTTP({
            schema: typeDefs,
            rootValue: resolvers,
            graphiql: this.config.graphiql,
        }));

        this.connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        };

        this.serverOptions = {};
        this.server = http.createServer(this.serverOptions, this.app);
    }

    async run() {
        try {
            mongoose.connect(this.config.mongoUri, this.connectionOptions);
            this.server.listen(this.config.port, '::', () => {
                console.log(`Environment: ${this.ENV}`);
                console.log(this.server.address());
            });
        } catch (err) {
            throw err;
        }
    }

    static getInstance() {
        if (!App.INSTANCE) {
            App.INSTANCE = new App();
        }
        return App.INSTANCE;
    }
}
