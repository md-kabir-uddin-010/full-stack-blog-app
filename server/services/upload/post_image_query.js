const Image = require("../../models/Image");
const createError = require("http-errors");

const savedImage = async ({ image_url, cloudinary_id }) => {
  try {
    const save = await Image.create({ image_url, cloudinary_id });
    return save;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
const getAllImages = async (limit, offset) => {
  try {
    const images = await Image.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return images;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const findImageById = async (id) => {
  try {
    const image = await Image.findOne({ where: { id } });
    return image;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
const deleteImageById = async (id) => {
  try {
    const deleted = await Image.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  savedImage,
  getAllImages,
  findImageById,
  deleteImageById,
};
