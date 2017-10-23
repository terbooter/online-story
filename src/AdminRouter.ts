import * as express from "express";
import { DB } from "./db/DB";
export class AdminRouter {
    private router: express.Router;

    constructor(private db: DB) {
        this.router = express.Router();
        this.router.get("/", (req, res) => {
            res.render("admin/home");
        });

        this.router.get("/add", (req, res) => res.render("admin/add"));
    }

    public getRouter(): express.Router {
        return this.router;
    }
}