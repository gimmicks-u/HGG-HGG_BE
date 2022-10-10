"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var users_route_1 = require("./routes/users.route");
var auth_route_1 = require("./routes/auth.route");
require("reflect-metadata");
var index_1 = require("./db/index");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use('/users', users_route_1.default);
        this.app.use('/auth', auth_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        dotenv.config({ path: "".concat(__dirname, "/../.env") });
        var db = new index_1.Database();
        db.connectToDB();
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: process.env.URL,
            credentials: true,
        }));
        this.app.use(function (req, res, next) {
            console.log("\u2705 req has been arrived from : ".concat(req.rawHeaders[1]));
            next();
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.setRoute();
    };
    Server.prototype.listen = function () {
        this.setMiddleware();
        this.app.listen(process.env.PORT, function () {
            console.log("\u2705 Server is on : ".concat(process.env.URL, ":").concat(process.env.PORT));
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map