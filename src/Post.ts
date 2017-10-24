import { PostDB } from "./db/PostDB";

export class Post implements PostDB {
    date: number;
    isPublic: string;

    body: string;
    url: string;
    img: string;
    title: string;
    annotation: string;
    author: string;
    author_link: string;
    category: string;
    category_url: string;

    constructor(postDB: PostDB) {
        let keys = Object.keys(postDB);
        for (let key of keys) {
            this[key] = postDB[key]; // tslint:disable-line
        }

        this.body = this.parseBody(this.body);
    }

    private parseBody(string: string): string {
        let img = `<img src="${this.img}" alt="${this.title}">`;
        return string.replace("[img]", img);
    }

    public getIsPublic(): boolean {
        if (this.isPublic === "on") {
            return true;
        } else {
            return false;
        }
    }

    public getDateString(): string {
        let date = new Date(Number(this.date));
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
}