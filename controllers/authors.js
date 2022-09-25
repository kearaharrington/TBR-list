let express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
let db = require('../models');
let router = express.Router();


// POST route new author
router.post('/', isLoggedIn, (req,res) => {
    db.author.create({
        name: req.body.name
    })
    .then((author) => {
        res.redirect('books/new')
    })
    .catch((error) => {
        console.log(error)
    });
})

// GET route
router.get('/new', (req,res) => {
    res.render('authors/new')
})

module.exports = router;