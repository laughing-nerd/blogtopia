const http = require("http");
const fs = require("fs");
const getType = require("mime-types").lookup;
require('dotenv').config();

//Port and hostname of the sefver
const port = 3000;
const hostname = "127.0.0.1";

const server = http.createServer((req, res) => {

    //This part is used to determine the file to serve on request
    let path = req.url.replace(/^\/+|\/+$/g, "");
    if (path == "")
        path = "home.html";
    if(path.split(".").length==1)
        path+=".html";

    //Serves the file
    let file = `${__dirname}/public/${path}`;
    fs.readFile(file, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end();
        }
        else {
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.writeHead(200, { "Content-Type":getType(path) });
        }
        res.end(content);
    });
});


server.listen(port, hostname, () => {
    console.log(`Visit http://${hostname}:${port}`);
});