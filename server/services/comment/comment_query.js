const Comment = require("../../models/Comment");
const createError = require("http-errors");

//find all approve comment by slug
const findCommentBySlug = async (post_slug) => {
  try {
    const comments = await Comment.findAndCountAll({
      where: { post_slug, approve: true },
    });
    return comments;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//find all comment by slug
const findAllComment = async (limit, offset) => {
  try {
    const comments = await Comment.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return comments;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//approve comment by id
const approveCommentById = async (id) => {
  try {
    await Comment.update({ approve: true, seen: true }, { where: { id } });
    const approverd = await Comment.findOne({ where: { id } });
    return approverd;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//delete comment by id
const deleteCommentById = async (id) => {
  try {
    const deteled = await Comment.destroy({ where: { id } });
    return deteled;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//get comment by id
const getCommentById = async (id) => {
  try {
    const comment = await Comment.findOne({ where: { id } });
    return comment;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//create comment
const createComment = async ({
  post_id,
  post_title,
  post_slug,
  name,
  email,
  comment,
}) => {
  try {
    const created = await Comment.create({
      post_id,
      post_title,
      post_slug,
      name,
      email,
      comment,
    });
    return created;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  createComment,
  findCommentBySlug,
  findAllComment,
  approveCommentById,
  deleteCommentById,
  getCommentById,
};
