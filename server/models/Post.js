const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keyword: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  schema: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  post_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  open_graph: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  twitter_card: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  publish: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = Post;
