"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("../controllers/users.controller");
var router = (0, express_1.Router)();
router.post('/', users_controller_1.UsersController.createUser);
exports.default = router;
//# sourceMappingURL=users.route.js.map