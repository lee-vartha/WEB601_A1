const express = require("express");
const http = require("http");
const app = express();
const todoRouter = require("./routes.js");

// using json middleware to 'parse' data
app.use(express.json());

// this is to parse the data coming from the form
app.use(express.urlencoded({ extended: true }));

// mount the router
app.use("/todo", todoRouter);

// start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}`);
});

http.createServer(app).listen(3000);