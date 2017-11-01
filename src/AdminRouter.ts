import * as express from "express";
import { DB } from "./db/DB";
import { PostDB } from "./db/PostDB";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import { basicAuth } from "./basicAuth";
import { SessionOptions } from "express-session";
import { Post } from "./Post";
import { SettingsDB } from "./db/SettingsDB";

export class AdminRouter {
    private router: express.Router;

    constructor(private db: DB) {
        this.router = express.Router();

        this.router.use(basicAuth);
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

        this.router.get("/add", this.get_add.bind(this));
        this.router.post("/add", this.post_add.bind(this));
        this.router.get("/edit/:url", this.get_edit.bind(this));
        this.router.post("/edit/:url", this.post_edit.bind(this));
        this.router.get("/settings", this.get_settings.bind(this));
        this.router.post("/settings", this.post_settings.bind(this));
    }

    private post_settings(req, res, next) {
        let b = req.body;
        console.log("b=");
        console.log(b);
        console.log("b.featured_1=" + b.featured_1);
        let settingsDB: SettingsDB = {
            featured_1: parseInt(b.featured_1),
            featured_2: parseInt(b.featured_2),
            featured_3: parseInt(b.featured_3),
            featured_4: parseInt(b.featured_4)
        };
        console.log(settingsDB);
        this.db.updateSettings(settingsDB)
            .then(() => {
                req.session.sessionFlash = {
                    type: "alert-success",
                    message: "Сохранено"
                };
                res.redirect("/admin/settings/");
            })
    }

    private async get_settings(req, res, next) {

        try {
            let posts: Post[] = await this.db.getAllPosts();
            let settings: SettingsDB = await this.db.getSettings();
            console.log(settings);
            res.render("admin/settings", { posts, settings });
        } catch (err) {
            next(err);
        }
    }

    private post_edit(req, res, next) {
        let url = req.params.url;

        let post: PostDB = this.parseFormData(req.body);

        this.db.updatePost(post.id as number, post)
            .then(() => {
                req.session.sessionFlash = {
                    type: "alert-success",
                    message: "Сохранено"
                };
                res.redirect("/admin/edit/" + url);
            })
            .catch((err) => {
                next(err);
            });

    }

    private get_add(req, res) {
        let postDB: PostDB = {
            url: "",
            title: "",
            isPublic: "",
            annotation: "",
            category: "",
            author_link: "",
            category_url: "",
            author: "",
            img: "",
            body: "",
            date: 0
        };

        let post = new Post(postDB);
        res.render("admin/add", { post });
    }

    private get_edit(req, res, next) {
        let url = req.params.url;
        this.db.getPost(url)
            .then((post: Post | null) => {
                console.log(post);
                if (post == null) {
                    next();
                } else {
                    res.render("admin/edit", { post });
                }
            });
    }

    public post_add(req, res) {

        let postDB: PostDB = this.parseFormData(req.body);

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

    private parseFormData(b): PostDB {

        let post: PostDB = {
            id: parseInt(b.id),
            url: b.url,
            title: b.title,
            isPublic: b.isPublic,
            annotation: "",
            category: "",
            author_link: "",
            category_url: "",
            author: "",
            img: "",
            body: b.body.trim(),
            date: 0
        };

        return post;
    }

    public getRouter(): express.Router {
        return this.router;
    }
}