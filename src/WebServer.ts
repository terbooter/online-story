import * as express from "express";
import { DB } from "./DB";
import { AdminRouter } from "./AdminRouter";
import { Post } from "./Post";
import { basicAuth } from "./basicAuth";

export class WebServer {
    constructor(private db: DB) {
        let app: express.Application = express();

        app.set("view engine", "ejs");
        app.set("views", "views");
        app.use(express.static("public"));
        app.use(express.static("css"));

        app.listen(99);

        app.use((req, res, next) => {
            res.locals.popularPosts = this.db.getPopularPosts();
            next();
        });

        app.get("/", (req, res) => {
            let posts: Post[] = [];
            posts.push(this.db.getPost());
            posts.push(this.db.getPost());
            posts.push(this.db.getPost());
            posts.push(this.db.getPost());
            res.render("home", { posts, featuredPosts: this.db.getFeaturedPosts() });
        });

        app.get("/post", (req, res) => {
            res.render("post", { post: this.db.getPost() });
        });

        app.use(basicAuth);
        app.use("/admin", new AdminRouter(this.db).getRouter());
    }
}