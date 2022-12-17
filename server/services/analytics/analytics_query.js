const User = require("../../models/User");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const createError = require("http-errors");

const findAlalytics = async () => {
  try {
    const { count: total_admins } = await User.findAndCountAll({});
    const { count: total_comments } = await Comment.findAndCountAll({});
    const { count: total_posts } = await Post.findAndCountAll({});
    const { count: total_notifications } = await Comment.findAndCountAll({
      where: { seen: false },
    });

    return { total_admins, total_posts, total_comments, total_notifications };
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  findAlalytics,
};
