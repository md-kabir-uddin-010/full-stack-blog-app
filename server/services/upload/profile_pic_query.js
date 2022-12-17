const ProfilePic = require("../../models/ProfilePic");
const createError = require("http-errors");

const savedPorfilePic = async ({ user_id, image_url, cloudinary_id }) => {
  try {
    const saveImage = await ProfilePic.create({
      user_id,
      image_url,
      cloudinary_id,
    });
    return saveImage;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const findPorfilePicById = async (user_id) => {
  try {
    const findProfilePic = await ProfilePic.findOne({ where: { user_id } });
    return findProfilePic;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
const deletePorfilePicById = async (user_id) => {
  try {
    const deleted = await ProfilePic.destroy({ where: { user_id } });
    return deleted;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  savedPorfilePic,
  findPorfilePicById,
  deletePorfilePicById,
};
