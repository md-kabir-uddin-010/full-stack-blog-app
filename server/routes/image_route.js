const router = require("express").Router();
const {
  getAllImage,
  uploadImage,
  uploadProfielImage,
  deleteImage,
} = require("../controllers/image_controller");
const editProfileValidation = require("../middlewares/auth_validator/editProfileValidation");
const postImage = require("../middlewares/uploader/postImage");
const profilePic = require("../middlewares/uploader/profilePic");
const accesTokenVerify = require("../middlewares/verify_token/accesTokenVerify");

router.get("/get/all/images", accesTokenVerify, getAllImage);
router.post("/upload/post/image", accesTokenVerify, postImage, uploadImage);
router.put(
  "/upload/profile/image",
  accesTokenVerify,
  profilePic,
  editProfileValidation,
  uploadProfielImage
);
router.delete("/delete/upload/image/:image_id", accesTokenVerify, deleteImage);

module.exports = router;
