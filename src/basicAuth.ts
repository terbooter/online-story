export function basicAuth(req, res, next) {

    const auth = {
        login: process.env.ADMIN_USER || "test",
        password: process.env.ADMIN_PASSWORD || "test"
    };

    const b64auth = (<string>(req.headers.authorization || "")).split(" ")[1] || "";
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

    // Verify login and password are set and correct
    if (!login || !password || login !== auth.login || password !== auth.password) {
        res.set('WWW-Authenticate', 'Basic realm="nope"'); // change this
        res.status(401).send("You shall not pass."); // custom message
        return
    }

    next();
}