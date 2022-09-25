let express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
let db = require('../models');
let router = express.Router();

// // GET route
// router.get('/', isLoggedIn, (req,res) => {
//     db.book.findAll()
//     .then((books) => {
//         res.render('books/index', {books: books})
//     })
//     .catch((error) => {
//         res.status(404).render('404')
//     })
// })


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
        console.log(error);
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
        res.status(400).render('main/404')
    })
})


// GET route book details
router.get('/:id', isLoggedIn, (req,res) => {
    db.book.findOne({
        where: {
            id: parseInt(req.params.id)
        },
        include: [{
            model: db.bookComment,
            where: {userId: req.user.id},
            include: [db.user]
        },
        db.author]
    })
    .then(book => {
        res.render('books/details', {book})
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router;