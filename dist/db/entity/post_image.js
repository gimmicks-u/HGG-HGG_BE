"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostImage = void 0;
var typeorm_1 = require("typeorm");
var post_1 = require("./post");
var PostImage = (function () {
    function PostImage() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PostImage.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 300 }),
        __metadata("design:type", String)
    ], PostImage.prototype, "image_url", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return post_1.Post; }, function (post) { return post.image_url; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)([{ referencedColumnName: 'id', name: 'post_id' }]),
        __metadata("design:type", post_1.Post)
    ], PostImage.prototype, "post", void 0);
    PostImage = __decorate([
        (0, typeorm_1.Entity)()
    ], PostImage);
    return PostImage;
}());
exports.PostImage = PostImage;
//# sourceMappingURL=post_image.js.map