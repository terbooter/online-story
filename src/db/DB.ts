import { PostDB } from "./PostDB";

import * as path from "path";
import { Database } from "sqlite3";
import { EventEmitter } from "events";
import { Mock } from "./Mock";
import { Post } from "../Post";
let sqlite3 = require("sqlite3").verbose();

export class DB {

    private db: Database;

    constructor() {
        let file = path.resolve(__dirname + "../../../files/blog.sqlite");
        console.log(file);
        this.db = new sqlite3.Database(file);
        console.log(this.db);

        this.createTables();
    }

    public getPost(): Post {
        return new Post(Mock.postDB);
    }

    public getFeaturedPosts(): Post[] {
        return [
            new Post(Mock.featuredPost1),
            new Post(Mock.featuredPost2),
            new Post(Mock.featuredPost3),
            new Post(Mock.featuredPost4),
        ]
    }

    public getPopularPosts(): Post[] {
        return [
            new Post(Mock.featuredPost1),
            new Post(Mock.featuredPost2),
            new Post(Mock.featuredPost3),
            new Post(Mock.featuredPost4),
        ]
    }

    private createTables() {
        this.createPosts();
    }

    private createPosts() {
        let sql =
            `CREATE TABLE "posts" (
            "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
            "url"	TEXT UNIQUE,
            "title"	TEXT,
            "annotation"	TEXT,
            "date"	INTEGER,
            "author"	TEXT,
            "category"	TEXT,
            "body"	TEXT,
            "public"	INTEGER
            );`;
        this.db.exec(sql, (err) => {
            console.log(err);
        });

    }
}