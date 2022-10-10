"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
router.post('/', auth_controller_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=auth.route.js.map