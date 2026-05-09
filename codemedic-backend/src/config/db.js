import { Sequelize } from "sequelize";

const sequelize = new Sequelize(

  "codemedic",     // database name
  "root",          // mysql username
  "Chinku1408", // mysql password

  {
    host: "localhost",
    dialect: "mysql",
  }

);

export default sequelize;