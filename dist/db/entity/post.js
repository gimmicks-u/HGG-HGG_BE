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
exports.Post = void 0;
var typeorm_1 = require("typeorm");
var Enums_1 = require("./common/Enums");
var post_image_1 = require("./post_image");
var user_1 = require("./user");
var Post = (function () {
    function Post() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Post.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', enum: Enums_1.PostStatus }),
        __metadata("design:type", String)
    ], Post.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Post.prototype, "views", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Date)
    ], Post.prototype, "meeting_date", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Post.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Post.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
        __metadata("design:type", Date)
    ], Post.prototype, "deleted_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.post; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)([{ referencedColumnName: 'id', name: 'user_id' }]),
        __metadata("design:type", user_1.User)
    ], Post.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return post_image_1.PostImage; }, function (post_image) { return post_image.image_url; }),
        __metadata("design:type", Array)
    ], Post.prototype, "image_url", void 0);
    Post = __decorate([
        (0, typeorm_1.Entity)()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=post.js.map