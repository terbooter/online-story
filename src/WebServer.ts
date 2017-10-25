import * as express from "express";
import { AdminRouter } from "./AdminRouter";
import { DB } from "./db/DB";
import { BlogRouter } from "./BlogRouter";

export class WebServer {
    constructor(private db: DB) {
        let app: express.Application = express();

        app.set("view engine", "ejs");
        app.set("views", "views");
        app.use(express.static("public"));
        app.use(express.static("css"));

        app.use("/admin", new AdminRouter(this.db).getRouter());
        app.use("/", new BlogRouter(this.db).getRouter());

        app.listen(99);
    }
}