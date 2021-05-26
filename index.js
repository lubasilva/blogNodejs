const express = require('express')
const app = express()
const connection  = require('./database/database')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')

// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'))


// url
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feito com sucesso!')
    }).catch((error) => {
        console.error(error)
    })

app.use('/', categoriesController)

app.use('/', articlesController)

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(8080, () => {
    console.log('servidor rodando')
})