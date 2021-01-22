import fs from "fs";
import path from "path";
import http from "http";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { typeDefs, resolvers } from "./schema";

export default class App {
    constructor() {
        App.BASE_DIR = path.dirname(__dirname);
        App.ENV = process.env.ENV || "development";
        App.CONFIG = JSON.parse(
            fs.readFileSync(path.join(App.BASE_DIR, "resources", `${App.ENV}.json`), "utf-8")
        );

        const logDir = path.join(App.BASE_DIR, "logs");
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        this.app = express();
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(morgan("combined", {
            stream: fs.createWriteStream(path.join(logDir, "access.log"), {
                flags: "a"
            })
        }));

        this.app.use("/graphql/", graphqlHTTP({
            schema: typeDefs,
            rootValue: resolvers,
            graphiql: App.CONFIG.graphiql,
        }));

        this.serverOptions = {};
        this.server = http.createServer(this.serverOptions, this.app);
    }

    async run() {
        await mongoose.connect(App.CONFIG.mongo.uri, App.CONFIG.mongo.options);
        this.server.listen(App.CONFIG.port, "::", () => {
            console.log(this.server.address());
        });
    }

    static getInstance() {
        if (!App.INSTANCE) {
            App.INSTANCE = new App();
        }
        return App.INSTANCE;
    }
}
