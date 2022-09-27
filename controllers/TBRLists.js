let express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const { sequelize } = require('../models');
let db = require('../models');
let router = express.Router();



// POST route
router.post('/', isLoggedIn, (req,res) => {
    db.tbrList.create({
        name: req.body.name,
        userId: req.user.id,
    })
    .then((tbrList) => {
        res.redirect('profile')
    })
    .catch((error) => {
        res.status(400).render('main/404')
    });
})

// GET route for creating new list
router.get('/new', isLoggedIn, (req,res) => {
    res.render('tbrLists/new')
    // .catch((error) => {
    //     console.log(error)
    // })
})

// GET route for list
router.get('/:id', isLoggedIn, (req,res) => {
    db.tbrList.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        },
        include: [{
            model: db.book,
            through: db.bookTbrList,
            include: [db.author] // need to access author names
        }]
    })
    .then((tbrList) => {
        res.render('tbrLists/show', {
            tbrList: {
                tbrList,
                books: tbrList.books,
                authors: tbrList.books.authors // acess authors
            }
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('404')
    })
})

// GET route for adding to list
router.get('/:id/add', isLoggedIn, (req,res) => {
    db.book.findAll()
    .then(db.tbrList.findOne({
        where: {
            id: req.params.id
        }
    }))
    .then((books, tbrList) => {
        // res.render('tbrLists/addEntry', {
        //     books: {
        //         books,
        //         tbrLists: tbrList
        //     }
        // })
        res.render('tbrLists/addEntry', {books, tbrList: {id: req.params.id}})
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('404')
    })
})

// POST route for adding to list 
router.post('/:id/add', isLoggedIn, (req,res) => {
    db.bookTbrList.create({ 
        tbrListId: req.params.id,
        bookId: parseInt(req.body.bookId)
        // include: [db.book, db.tbrList]
    })
    .then(bookTbrList => {
        res.redirect(`/tbrLists/${req.params.id}`)
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('404')
    })
})

module.exports = router;