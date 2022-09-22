let express = require('express');
let db = require('../models');
let router = express.Router();

// GET route
router.get('/', (req,res) => {
    db.book.findAll()
    .then((books) => {
        res.render('books/index', {books: books})
    })
    .catch((error) => {
        res.status(404).render('404')
    })
})

// POST route
router.post('/', (req, res) => {
    db.book.create({
        title: req.body.bookTitle,
        author: req.body.authorName
    })
    .then((book) => {
        res.redirect('/books')
    })
    .catch((error) => {
        res.status(404).render('404')
    });
    // db.author.create({
    //     name: req.body.authorName
    // })
    // .then((book) => {
    //     res.redirect('/books')
    // })
    // .catch((error) => {
    //     res.status(404).render('404')
    // });
})

// GET route new books
router.get('/new', (req,res) => {
    res.render('books/new')
})

module.exports = router;