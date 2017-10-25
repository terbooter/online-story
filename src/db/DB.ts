import { PostDB } from "./PostDB";

import * as path from "path";
import { Database, Statement } from "sqlite3";
import { EventEmitter } from "events";
import { Mock } from "./Mock";
import { Post } from "../Post";
let sqlite3 = require("sqlite3").verbose();

export class DB {

    private db: Database;

    constructor() {
        let file = path.resolve(__dirname + "../../../files/blog.sqlite");
        this.db = new sqlite3.Database(file);

        this.createTables();
        this.insertMockPosts();
        this.getAllPosts();
    }

    public getPostOld(): Post {
        return new Post(Mock.postDB);
    }

    public async getAllPosts(): Promise<Post[]> {
        return new Promise<Post[]>(((resolve, reject) => {
            this.db.all("select * from posts", (err, posts) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(posts.map((postDB: PostDB) => {
                        return new Post(postDB);
                    }));
                }
            });
        }));
    }

    public async getPost(url: string): Promise<Post> {
        return new Promise<Post>(((resolve, reject) => {
            this.db.get("select * from posts where url = $url", { $url: url }, (err, postDB) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Post(postDB));
                }
            });
        }));
    }

    public async putPost(post: PostDB) {
        return new Promise<void>(((resolve, reject) => {
            let sql = `
                        insert into posts 
                        (url, img, title, annotation, date, author, category, body, isPublic) 
                        VALUES
                        ($url, $img, $title, $annotation, $date, $author, $category, $body, $isPublic);
                        `;

            let o = {
                $url: post.url,
                $img: post.img,
                $title: post.title,
                $annotation: post.annotation,
                $date: post.date,
                $author: post.author,
                $category: post.category,
                $body: post.body,
                $isPublic: post.isPublic
            };
            this.db.run(sql, o, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }));
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
            "img"	TEXT,
            "title"	TEXT,
            "annotation"	TEXT,
            "date"	INTEGER,
            "author"	TEXT,
            "category"	TEXT,
            "body"	TEXT,
            "isPublic"	TEXT
            );`;
        this.db.exec(sql, (err) => {
            // console.log(err);
        });
    }

    private async insertMockPosts() {
        try {
            await this.putPost(Mock.postDB);
            await this.putPost(Mock.featuredPost1);
            await this.putPost(Mock.featuredPost2);
            await this.putPost(Mock.featuredPost3);
            await this.putPost(Mock.featuredPost4);
        } catch (err) {

        }
    }
}