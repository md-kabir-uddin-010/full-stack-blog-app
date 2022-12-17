const router = require("express").Router();
const {
  getCommentBySlugController,
  getAllCommentController,
  getCommentBySeenController,
  postCommentController,
  deleteCommentByIdController,
  approveCommentByIdController,
} = require("../controllers/comment_controller");
const create_comment_validator = require("../middlewares/comment_validator/create_comment_validator");

const slug_validator = require("../middlewares/post_validator/slug_validator");
const accesTokenVerify = require("../middlewares/verify_token/accesTokenVerify");

//every one allow
router.get("/get/comment/:slug", slug_validator, getCommentBySlugController);
router.post(
  "/create/new/comment",
  create_comment_validator,
  postCommentController
);

// //only admin allow
router.get(
  "/get/comment/by/seen",
  accesTokenVerify,
  getCommentBySeenController
);
router.get("/get/all/comments", accesTokenVerify, getAllCommentController);
router.put(
  "/comment/approve/:comment_id",
  accesTokenVerify,
  approveCommentByIdController
);
router.delete(
  "/comment/delete/:comment_id",
  accesTokenVerify,
  deleteCommentByIdController
);

module.exports = router;
