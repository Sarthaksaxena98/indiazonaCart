const { Sequelize } = require('sequelize');
let dbName = 'indiaZona';
let dbUser = 'root';
let dbPassword = 'Root@1234';
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    logging:  false
     
});

module.exports = sequelize;
