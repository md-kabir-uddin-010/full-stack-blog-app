const createHttpError = require("http-errors");
const { findAlalytics } = require("../services/analytics/analytics_query");
const { findCommentBySlug } = require("../services/comment/comment_query");
const {
  getPostById,
  getAllPost,
  getAllPublishPost,
  createNewPost,
  editPostById,
  getPostBySlug,
  deletePostById,
  editPopularPostById,
  getAllPopularPost,
  findRecentPost,
  findPostByCategory,
  UpdateViewsById,
  getAllPublishWithoutLimitPost,
} = require("../services/post/post_query");

//get all popular
exports.getAllPopularPostController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = (parseInt(req.query.page) - 1) * limit;

    const { count, rows } = await getAllPopularPost(limit, page);
    const { total_posts, total_admins, total_comments, total_notifications } =
      await findAlalytics();
    res.status(200).json({
      message: "get all popular posts succesfull",
      info: {
        total_post: count,
        total_posts,
        total_admins,
        total_comments,
        total_notifications,
        posts: rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

//get all publish post
exports.getAllPublishPostWithoutLimitController = async (req, res, next) => {
  try {
    const { count, rows } = await getAllPublishWithoutLimitPost();
    res.status(200).json({
      message: "get all publish posts succesfull",
      info: { total_post: count, posts: rows },
    });
  } catch (error) {
    next(error);
  }
};
//get all publish post
exports.getAllPublishPostController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = (parseInt(req.query.page) - 1) * limit;

    const { count, rows } = await getAllPublishPost(limit, page);
    res.status(200).json({
      message: "get all publish posts succesfull",
      info: { total_post: count, posts: rows },
    });
  } catch (error) {
    next(error);
  }
};

//get all post
exports.getAllPostWithPopularPostController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = (parseInt(req.query.page) - 1) * limit;

    const { count, rows } = await getAllPost(limit, page);
    const { count: total_popular_post, rows: popular_posts } =
      await getAllPopularPost(5, 0);
    res.status(200).json({
      message: "get all posts succesfull",
      info: {
        total_popular_post,
        popular_posts,
        total_post: count,
        posts: rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

//get all post
exports.getAllPostController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = (parseInt(req.query.page) - 1) * limit;

    const { count, rows } = await getAllPost(limit, page);
    res.status(200).json({
      message: "get all posts succesfull",
      info: { total_post: count, posts: rows },
    });
  } catch (error) {
    next(error);
  }
};

//get  post by id
exports.getPostByIdController = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const findPost = await getPostById(post_id);
    if (!findPost) throw createHttpError.NotFound();

    res.status(200).json({
      message: "post get succesfull",
      info: { post: findPost },
    });
  } catch (error) {
    next(error);
  }
};

//get  post by slug
exports.getPostBySlugController = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const findPost = await getPostBySlug(slug);
    if (!findPost) throw createHttpError.NotFound();

    await UpdateViewsById(findPost.dataValues.id, findPost.dataValues.views);

    const { count, rows } = await findRecentPost(5, 0, findPost.category);
    const { count: comments_count, rows: comments } = await findCommentBySlug(
      slug
    );

    res.status(200).json({
      message: "get post by slug succesfull",
      info: {
        post: findPost,
        total_recent_post: count,
        recent_post: rows,
        comments_count,
        comments,
      },
    });
  } catch (error) {
    next(error);
  }
};
//get post by category and recent
exports.getALlPostByCategoryController = async (req, res, next) => {
  try {
    const { category } = req.query;

    const limit = parseInt(req.query.limit);
    const page = (parseInt(req.query.page) - 1) * limit;

    const { count: total_post, rows: posts } = await findPostByCategory(
      limit,
      page,
      category
    );

    const { count, rows } = await getAllPopularPost(5, 0);

    res.status(200).json({
      message: "get post by category succesfull",
      info: {
        total_post,
        total_popular_post: count,
        posts,
        popular_posts: rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

//create new post
exports.createPostController = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      keyword,
      description,
      thumbnail,
      category,
      schema,
      post,
      post_description,
      open_graph,
      twitter_card,
      publish,
    } = req.body;

    const obj = {
      title,
      slug,
      keyword,
      description,
      thumbnail,
      category,
      schema: schema ? JSON.stringify(schema) : "",
      post: JSON.stringify(post),
      post_description,
      open_graph: open_graph ? JSON.stringify(open_graph) : "",
      twitter_card: twitter_card ? JSON.stringify(twitter_card) : "",
      publish,
    };

    const findPostBySlug = await getPostBySlug(slug);
    if (findPostBySlug) throw createHttpError.Conflict("slug must be unique");

    const createPost = await createNewPost(obj);
    res
      .status(200)
      .json({ message: "post created succesfull", info: createPost });
  } catch (error) {
    next(error);
  }
};

//edit post
exports.editPostController = async (req, res, next) => {
  try {
    const { post_id } = req.params;

    const {
      title,
      slug,
      keyword,
      description,
      thumbnail,
      category,
      schema,
      post,
      post_description,
      open_graph,
      twitter_card,
      publish,
    } = req.body;

    const obj = {
      title,
      slug,
      keyword,
      description,
      thumbnail,
      category,
      schema: schema ? JSON.stringify(schema) : "",
      post: JSON.stringify(post),
      post_description,
      open_graph: open_graph ? JSON.stringify(open_graph) : "",
      twitter_card: twitter_card ? JSON.stringify(twitter_card) : "",
      publish,
    };

    const findPost = await getPostById(post_id);
    if (!findPost) throw createHttpError.NotFound();

    const editedPost = await editPostById(post_id, obj);
    res
      .status(200)
      .json({ message: "post edited succesfull", info: editedPost });
  } catch (error) {
    next(error);
  }
};

//delete post
exports.deletePostController = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const findPost = await getPostById(post_id);
    if (!findPost) throw createHttpError.NotFound();

    await deletePostById(post_id);
    res.status(200).json({ message: "post deleted succesfull" });
  } catch (error) {
    next(error);
  }
};

//edit popular post by id
exports.editPopularPostController = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const { popular } = req.body;

    const findPost = await getPostById(post_id);
    if (!findPost) throw createHttpError.NotFound();

    const alredyPopular = findPost.popular === true && popular === true;
    if (alredyPopular)
      throw createHttpError.Conflict("this post alredy added popular post");

    const updated = await editPopularPostById(post_id, popular);
    res
      .status(200)
      .json({ message: " popular post updated succesfull", info: updated });
  } catch (error) {
    next(error);
  }
};
