const createHttpError = require("http-errors");
const {
  createComment,
  findCommentBySlug,
  findAllComment,
  findCommentBySeen,
  approveCommentById,
  deleteCommentById,
  getCommentById,
} = require("../services/comment/comment_query");
const {
  UpdateCommentsById,
  getPostById,
  removeCommentsById,
} = require("../services/post/post_query");

//get post comment by slug
exports.getCommentBySlugController = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const { count, rows } = await findCommentBySlug(slug);

    res.status(200).json({
      message: "get comments succesfull",
      info: { total_comment: count, comments: rows },
    });
  } catch (error) {
    next(error);
  }
};

// post new comment
exports.postCommentController = async (req, res, next) => {
  try {
    const { post_id, post_title, post_slug, name, email, comment } = req.body;

    const findPost = await getPostById(post_id);
    if (!findPost) throw createHttpError.NotFound();

    const created = await createComment({
      post_id,
      post_title,
      post_slug,
      name,
      email,
      comment,
    });

    await UpdateCommentsById(post_id, findPost.dataValues.comments);

    res.status(200).json({
      message:
        "Your comment has been seved.Will be published if admin approved",
      info: { post: created },
    });
  } catch (error) {
    next(error);
  }
};

//delete comment by admin
exports.deleteCommentByIdController = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const findComment = await getCommentById(comment_id);
    if (!findComment) throw createHttpError.NotFound();

    const findPost = await getPostById(findComment.dataValues.post_id);
    if (!findPost) throw createHttpError.NotFound();

    await deleteCommentById(comment_id);
    if (findPost.dataValues.comments > 0) {
      await removeCommentsById(
        findPost.dataValues.id,
        findPost.dataValues.comments
      );
    }

    res.status(200).json({
      message: "comment delete succesfull",
    });
  } catch (error) {
    next(error);
  }
};

//get all comment
exports.getAllCommentController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = (parseInt(req.query.page) - 1) * limit;

    const { count, rows } = await findAllComment(limit, page);
    res.status(200).json({
      message: "get all comments succesfull",
      info: { total_comment: count, comments: rows },
    });
  } catch (error) {
    next(error);
  }
};

//get post comment by seen
exports.getCommentBySeenController = async (req, res, next) => {
  try {
    const { count, rows } = await findCommentBySeen();
    res.status(200).json({
      message: "get all comments succesfull",
      info: { total_post: count, posts: rows },
    });
  } catch (error) {
    next(error);
  }
};

//approve comment by admin
exports.approveCommentByIdController = async (req, res, next) => {
  try {
    const { comment_id } = req.params;

    const approved = await approveCommentById(comment_id);

    res.status(200).json({
      message: "comment approve succesfull",
      info: approved,
    });
  } catch (error) {
    next(error);
  }
};
