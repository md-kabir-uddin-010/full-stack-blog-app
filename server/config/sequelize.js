const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      min: 0,
      max: 10,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

// sequelize
//   .authenticate()
//   .then(() => console.log("db conneted"))
//   .catch(() => console.log("db connection field"));

module.exports = sequelize;
