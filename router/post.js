const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/post");
const md_auth = require("../middlewares/aunthenticated");
const post = require("../models/post");

const md_upload = multiparty({ uploadDir: "./uploads/blogs"});
const api = express.Router();

api.post("/post",[md_auth.asureAuth,md_upload],PostController.createPost);
api.get("/post",PostController.getPosts);
api.patch("/post/:id",[md_auth.asureAuth,md_upload],PostController.updatePost);
api.delete("/post/:id",[md_auth.asureAuth],PostController.detelePost);
api.get("/post/:path",PostController.gettingPost);

module.exports = api;
