const cloudinary = require("../config/cloudinary");
const {
  savedImage,
  getAllImages,
  findImageById,
  deleteImageById,
} = require("../services/upload/post_image_query");
const {
  savedPorfilePic,
  findPorfilePicById,
  deletePorfilePicById,
} = require("../services/upload/profile_pic_query");
const fs = require("fs");
const createHttpError = require("http-errors");
const {
  findUserById,
  changeProfilePicById,
  changeNameById,
} = require("../services/auth/db_query");

exports.getAllImage = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = (parseInt(req.query.page) - 1) * limit;

    const { count, rows } = await getAllImages(limit, page);

    res.status(200).json({
      message: "image upload succesfull",
      info: {
        total_images: count,
        images: rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadProfielImage = async (req, res, next) => {
  try {
    const user_id = req.user_id;

    const { name } = req.body;

    const findUser = await findUserById(user_id);
    if (!findUser) throw createHttpError.NotFound();

    if (req.files && req.files.length > 0) {
      const { path } = req.files[0];
      if (!findUser) {
        fs.unlink(path, (err) => {
          if (err) next(createHttpError.InternalServerError());
        });
        return;
      }
      const findProfilePic = await findPorfilePicById(findUser.dataValues.id);
      if (findProfilePic) {
        await cloudinary.uploader.destroy(
          findProfilePic.dataValues.cloudinary_id
        );
        await deletePorfilePicById(findUser.dataValues.id);
      }

      const result = await cloudinary.uploader.upload(path, {
        folder: "profile",
      });

      if (!result) {
        fs.unlink(path, (err) => {
          if (err) throw createHttpError.InternalServerError();
        });
      }

      const saveProfile = await savedPorfilePic({
        user_id: findUser.dataValues.id,
        image_url: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await changeProfilePicById(user_id, saveProfile.image_url);
      const changed = await changeNameById(user_id, name);

      if (saveProfile) {
        fs.unlink(path, (err) => {
          if (err) throw createHttpError.InternalServerError();
        });
      }

      res.status(200).json({
        message: "image upload and profile edit succesfull",
        info: changed,
      });
      return;
    }

    const changed = await changeNameById(user_id, name);

    res.status(200).json({
      message: "profile edit succesfull",
      info: changed,
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      const { path } = req.files[0];
      fs.unlink(path, (err) => {
        if (err) throw createHttpError.InternalServerError();
      });
    }
    next(error);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    const { path } = req.files[0];
    const result = await cloudinary.uploader.upload(path, {
      folder: "post",
    });

    if (!result) {
      fs.unlink(path, (err) => {
        if (err) throw createHttpError.InternalServerError();
      });
    }
    const saveImg = await savedImage({
      image_url: result.secure_url,
      cloudinary_id: result.public_id,
    });

    if (saveImg) {
      fs.unlink(path, (err) => {
        if (err) throw createHttpError.InternalServerError();
      });
    }

    res.status(200).json({
      message: "image upload succesfull",
      info: saveImg,
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      const { path } = req.files[0];
      fs.unlink(path, (err) => {
        if (err) throw createHttpError.InternalServerError();
      });
    }
    next(error);
  }
};
exports.deleteImage = async (req, res, next) => {
  try {
    const { image_id } = req.params;

    const findImage = await findImageById(image_id);
    if (!findImage) throw createHttpError.NotFound();

    await cloudinary.uploader.destroy(findImage.dataValues.cloudinary_id);
    await deleteImageById(findImage.dataValues.id);

    res.status(200).json({
      message: "image delete succesfull",
    });
  } catch (error) {
    next(error);
  }
};
