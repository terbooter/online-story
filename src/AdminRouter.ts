import * as express from "express";
import { DB } from "./db/DB";
import { PostDB } from "./db/PostDB";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import { SessionOptions } from "express-session";

export class AdminRouter {
    private router: express.Router;

    constructor(private db: DB) {
        this.router = express.Router();

        this.router.use(cookieParser("secret"));
        this.router.use(bodyParser.urlencoded({ extended: false }));
        let sessionStore = new session.MemoryStore;

        let options: SessionOptions = {
            secret: "secret",
            cookie: { maxAge: 60000 },
            store: sessionStore,
            saveUninitialized: true,
            resave: true,
        };

        this.router.use(session(options));

        this.router.use((req: any, res, next) => {
            // if there's a flash message in the session request, make it available in the response, then delete it
            res.locals.sessionFlash = req.session.sessionFlash;
            delete req.session.sessionFlash;
            next();
        });

        this.router.get("/", (req, res) => {
            this.db.getAllPosts()
                .then((posts) => {
                    console.log("POSTS");
                    console.log(posts);
                    res.render("admin/home", { posts });
                });
        });

        this.router.get("/add", (req, res) => res.render("admin/add"));
        this.router.post("/add", this.addPost.bind(this));
    }

    public addPost(req, res) {
        console.log(req.body);
        let b = req.body;
        let postDB: PostDB = {
            url: b.url,
            title: b.title,
            isPublic: b.isPublic,
            body: b.body,
            date: Date.now(),
            img: "",
            author: "",
            category_url: "",
            author_link: "",
            category: "",
            annotation: "annotation"
        };

        this.db.putPost(postDB)
            .then(() => {
                req.session.sessionFlash = {
                    type: "alert-success",
                    message: "Запись успешно добавлена"
                };
                res.redirect("add");
            })
            .catch((err) => {
                req.session.sessionFlash = {
                    type: "alert-danger",
                    message: err.toString()
                };
                res.redirect("add");
            });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}