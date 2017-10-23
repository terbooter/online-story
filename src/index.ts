import { WebServer } from "./WebServer";
import { DB } from "./db/DB";

console.log("Start");
let db = new DB();

let webServer = new WebServer(db);
console.log(process.env.ADMIN_USER);
console.log(process.env.ADMIN_PASSWORD);