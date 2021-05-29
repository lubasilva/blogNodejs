const express = require('express')
const router = express.Router();
const User = require('./User')
const bcrypt = require('bcryptjs')
const adminAuth = require('../middlewares/adminAuoth')


router.get('/admin/users', (req, res) => {
    User.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(users => {
        res.render('admin/users/index', {users: users})
    })
})

router.get('/admin/users/new', adminAuth, (req, res) => {
    res.render('admin/users/new')
})

router.post('/users/new', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined) {
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/')
            }).catch(error => {
                res.redirect('/')
            })
        }else {
            res.redirect('/admin/users/new')
        }
    })
})

router.get('/login', (req, res) => {
    res.render('admin/users/login')
})

router.post('/authenticate',(req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({where:{email: email}}).then(user => {
        if( user != undefined){
            let correct = bcrypt.compareSync(password, user.password)

            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/')
})

module.exports = router