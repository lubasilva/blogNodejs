const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require('slugify')

router.get('/admin/articles', (req, res) => {
    res.send('Articles route')
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
    res.render('admin/articles/new', {categories: categories})
    })
})

router.post('/articles/save', (req, res) => {
    let title = req.body.title
    let bodyInfo = req.body.bodyInfo
    let category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        bodyInfo: bodyInfo,
        categoryId: category

    }).then(() => {
        res.redirect('admin/articles')
    })
})

module.exports = router
