import * as express from "express";

export class WebServer {
    constructor() {
        let app: express.Application = express();

        app.set("view engine", "ejs");
        app.set("views", "views");
        app.use(express.static("public"));

        app.listen(99);

        app.get("/", (req, res) => {
            res.render("home");
        });
    }
}