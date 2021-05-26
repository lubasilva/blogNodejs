const Sequelize = require('sequelize')

const connection = new Sequelize('blogNode', 'root', 'password', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection

