const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// A category hasmany articles
Category.hasMany(Article)
// an article belongs to a category
Article.belongsTo(Category)


module.exports = Article