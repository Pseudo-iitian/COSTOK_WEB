"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Log Sequelize connection status
sequelize
  .authenticate()
  .then(() => console.log("Sequelize connection established successfully"))
  .catch((err) => console.error("Sequelize connection error:", err));

try {
  // Load all models dynamically
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  // Log loaded models
  console.log("Loaded models:", Object.keys(db));

  // Associate models if applicable
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
} catch (error) {
  console.error("Error loading models:", error);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
