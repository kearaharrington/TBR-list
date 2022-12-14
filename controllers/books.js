const { randWeekday } = require('@ngneat/falso');
const { default: axios } = require('axios');
let express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
let db = require('../models');
let router = express.Router();

// GET route
router.get('/', isLoggedIn, (req,res) => {
    db.book.findAll({
        include: [db.author]
    })
    .then((books) => {
        res.render('books/index', {
            books: {
                books,
                authors: books.authors
            }
        })
    })
    .catch((error) => {
        res.status(404).render('404')
    })
})


// POST route new book
router.post('/', isLoggedIn, (req,res) => {
    db.book.create({
        title: req.body.title,
        authorId: parseInt(req.body.authorId)
    })
    .then((book) => {
        res.redirect('profile')
    })
    .catch((error) => {
        console.log(error)
        res.status(404).render('404')
    });
})

// GET route new books
router.get('/new', isLoggedIn, (req,res) => {
    db.author.findAll()
    .then((authors) => {
        res.render('books/new', {authors: authors})
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('404')
    })
})


// GET route book details
router.get('/:id', isLoggedIn, (req,res) => {
    db.book.findOne({
        where: {
            id: parseInt(req.params.id)
        },
        include: [db.author, db.bookComment]
    })
    .then((book) => {
        res.render('books/details', {book})
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('404')
    })
})

module.exports = router;