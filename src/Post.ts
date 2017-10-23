import { PostDB } from "./PostDB";
export class Post implements PostDB {

    body: string;
    url: string;
    img: string;
    title: string;
    annotation: string;
    date: Date;
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

    public getDateString(): string {
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let day = this.date.getDate();
        let monthIndex = this.date.getMonth();
        let year = this.date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
}