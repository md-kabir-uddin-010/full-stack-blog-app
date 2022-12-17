const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Image = sequelize.define("image", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cloudinary_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = Image;
