const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProfilePic = sequelize.define("profile_pic", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
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

module.exports = ProfilePic;
