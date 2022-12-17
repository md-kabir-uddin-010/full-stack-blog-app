const router = require("express").Router();
const {
  getAllPostController,
  getPostByIdController,
  createPostController,
  editPostController,
  deletePostController,
  getAllPublishPostController,
  getPostBySlugController,
  getAllPopularPostController,
  editPopularPostController,
  getAllPostWithPopularPostController,
  getALlPostByCategoryController,
  getAllPublishPostWithoutLimitController,
} = require("../controllers/post_controller");
const popular_post_validator = require("../middlewares/post_validator/popular_post_validator");
const post_id_validator = require("../middlewares/post_validator/post_id_validator");
const post_validtator = require("../middlewares/post_validator/post_validtator");
const slug_validator = require("../middlewares/post_validator/slug_validator");
const accesTokenVerify = require("../middlewares/verify_token/accesTokenVerify");

//every one allow
router.get("/get/post/by/slug/:slug", slug_validator, getPostBySlugController);
router.get("/get/all/publish/posts", getAllPublishPostController);
router.get("/get/all/popular/posts", getAllPopularPostController);
router.get(
  "/get/all/popular/posts/without/limit",
  getAllPublishPostWithoutLimitController
);
router.get(
  "/get/all/post/with/popular/post",
  getAllPostWithPopularPostController
);
router.get("/get/all/post/with/recent/post", getALlPostByCategoryController);

//only admin allow
router.get("/get/all/posts", accesTokenVerify, getAllPostController);
router.get(
  "/get/post/:post_id",
  accesTokenVerify,
  post_id_validator,
  getPostByIdController
);

router.post(
  "/create/post",
  accesTokenVerify,
  post_validtator,
  createPostController
);
router.put(
  "/edit/post/:post_id",
  accesTokenVerify,
  post_id_validator,
  post_validtator,
  editPostController
);
router.put(
  "/edit/popular/post/:post_id",
  accesTokenVerify,
  post_id_validator,
  popular_post_validator,
  editPopularPostController
);
router.delete(
  "/delete/post/:post_id",
  accesTokenVerify,
  post_id_validator,
  deletePostController
);

module.exports = router;
