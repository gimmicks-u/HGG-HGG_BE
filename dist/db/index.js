"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var typeorm_1 = require("typeorm");
var ormconfig_1 = require("../config/ormconfig");
var Database = (function () {
    function Database() {
    }
    Database.prototype.connectToDB = function () {
        var _this = this;
        (0, typeorm_1.createConnection)(ormconfig_1.default)
            .then(function (_con) {
            _this.connection = _con;
            console.log('✅ Connected to db!!');
        })
            .catch(console.error);
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=index.js.map