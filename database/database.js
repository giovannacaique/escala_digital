const Sequelize = require("sequelize");

const connection = new Sequelize('escala_digital', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;