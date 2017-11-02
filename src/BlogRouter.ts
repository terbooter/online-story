import * as express from "express";
import { DB } from "./db/DB";
import { Post } from "./Post";

export class BlogRouter {
    private router: express.Router;

    constructor(private db: DB) {
        this.router = express.Router();

        this.router.use((req, res, next) => {
            res.locals.popularPosts = this.db.getPopularPosts();
            next();
        });

        this.router.get("/", this.getIndex.bind(this));

        this.router.get("/:url", this.getPost.bind(this));
    }

    private async getIndex(req, res) {
        res.render("home", { posts: await this.db.getAllPosts(), featuredPosts: await this.db.getFeaturedPosts() });
    }

    private getPost(req, res, next) {
        let url = req.params.url;

        this.db.getPost(url)
            .then((post: Post | null) => {
                if (post == null) {
                    next();
                } else {
                    res.render("post", { post });
                }
            })
            .catch((err) => {
                next(err);
            });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}