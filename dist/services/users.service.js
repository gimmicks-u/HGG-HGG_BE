"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var user_1 = require("../db/entity/user");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt");
exports.UsersService = {
    createUser: function (userDTO) { return __awaiter(void 0, void 0, void 0, function () {
        var hashedPassword, hasEmail, hasNickname, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, bcrypt.hash(userDTO.password, 12)];
                case 1:
                    hashedPassword = _a.sent();
                    userDTO.password = hashedPassword;
                    return [4, (0, typeorm_1.getRepository)(user_1.User).findOneBy({
                            email: userDTO.email,
                        })];
                case 2:
                    hasEmail = _a.sent();
                    if (hasEmail) {
                        return [2, { message: '중복된 이메일입니다.', status: 400 }];
                    }
                    return [4, (0, typeorm_1.getRepository)(user_1.User).findOneBy({
                            nickname: userDTO.nickname,
                        })];
                case 3:
                    hasNickname = _a.sent();
                    if (hasNickname) {
                        return [2, { message: '중복된 닉네임입니다.', status: 400 }];
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    user = (0, typeorm_1.getRepository)(user_1.User).create(userDTO);
                    return [4, (0, typeorm_1.getRepository)(user_1.User).save(user)];
                case 5:
                    _a.sent();
                    return [2, {
                            message: '회원가입이 완료되었습니다.',
                            status: 201,
                        }];
                case 6:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2, { message: '입력하신 정보를 확인해주세요.', status: 400 }];
                case 7: return [2];
            }
        });
    }); },
};
//# sourceMappingURL=users.service.js.map