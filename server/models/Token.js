const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Token = sequelize.define("token", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = Token;
