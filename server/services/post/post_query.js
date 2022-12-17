const Post = require("../../models/Post");
const createError = require("http-errors");
const { Op } = require("sequelize");

//get post by slug
const getPostBySlug = async (slug) => {
  try {
    const post = await Post.findOne({ where: { slug } });
    return post;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//get post by id
const getPostById = async (id) => {
  try {
    const post = await Post.findOne({ where: { id } });
    return post;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

// Post.findAll({ limit: 10, order: [['updatedAt', 'DESC']]});
//get all post
const getAllPost = async (limit, offset) => {
  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
    });
    return posts;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//get all publish post
const getAllPublishWithoutLimitPost = async () => {
  try {
    const posts = await Post.findAndCountAll({
      order: [["updatedAt", "DESC"]],
      where: { publish: true },
    });
    return posts;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//get all publish post
const getAllPublishPost = async (limit, offset) => {
  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
      where: { publish: true },
    });
    return posts;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//get all popular post
const getAllPopularPost = async (limit, offset) => {
  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
      where: { popular: true },
    });
    return posts;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//find recent post
const findRecentPost = async (limit, offset, category = "news") => {
  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
      where: { category },
    });
    return posts;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//find  post by category
const findPostByCategory = async (limit, offset, category = "news") => {
  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
      where: { category },
    });
    return posts;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//create new post
const createNewPost = async ({
  title,
  slug,
  keyword,
  description,
  thumbnail,
  schema,
  category,
  post,
  post_description,
  open_graph,
  twitter_card,
  publish,
}) => {
  try {
    const created = await Post.create({
      title,
      slug,
      keyword,
      description,
      thumbnail,
      schema,
      category,
      post,
      post_description,
      open_graph,
      twitter_card,
      publish,
    });
    return created;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//edit post by id
const editPostById = async (
  id,
  {
    title,
    slug,
    keyword,
    description,
    thumbnail,
    schema,
    category,
    post,
    post_description,
    open_graph,
    twitter_card,
    publish,
  }
) => {
  try {
    await Post.update(
      {
        title,
        slug,
        keyword,
        description,
        thumbnail,
        schema,
        category,
        post,
        post_description,
        open_graph,
        twitter_card,
        publish,
      },
      { where: { id } }
    );
    const newEditedPost = await Post.findOne({ where: { id } });
    return newEditedPost;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//edit popular post by id
const editPopularPostById = async (id, popular) => {
  try {
    await Post.update(
      {
        popular,
      },
      { where: { id } }
    );
    const newEditedPost = await Post.findOne({ where: { id } });
    return newEditedPost;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//delete post by id
const deletePostById = async (id) => {
  try {
    const deteted = await Post.destroy({ where: { id } });
    return deteted;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//update comment  by id
const UpdateCommentsById = async (id, comment) => {
  try {
    const comments = Number(comment) + 1;
    const updated = await Post.update({ comments }, { where: { id } });
    return updated;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//update comment  by id
const removeCommentsById = async (id, comment) => {
  try {
    const comments = Number(comment) - 1;
    const updated = await Post.update({ comments }, { where: { id } });
    return updated;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//update views  by id
const UpdateViewsById = async (id, view) => {
  try {
    const views = Number(view) + 1;
    const updated = await Post.update({ views }, { where: { id } });
    return updated;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//search post
const searchPostByString = async (limit, offset, str) => {
  try {
    const findPost = await Post.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.and]: {
          [Op.or]: {
            title: { [Op.like]: `%${str}%` },
            slug: { [Op.like]: `%${str}%` },
            keyword: { [Op.like]: `%${str}%` },
            description: { [Op.like]: `%${str}%` },
            category: { [Op.like]: `%${str}%` },
            post: { [Op.like]: `%${str}%` },
          },
          publish: true,
        },
      },
    });
    return findPost;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  getPostById,
  getAllPost,
  getAllPublishPost,
  createNewPost,
  editPostById,
  deletePostById,
  getPostBySlug,
  getAllPopularPost,
  editPopularPostById,
  findRecentPost,
  findPostByCategory,
  UpdateCommentsById,
  UpdateViewsById,
  removeCommentsById,
  searchPostByString,
  getAllPublishWithoutLimitPost,
};
