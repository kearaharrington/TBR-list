let express = require('express');
let db = require('../models');
let router = express.Router();

// GET route


// POST route
router.post('/', (req, res) => {
    db.book.create({
        title: req.body.bookTitle,
        author: req.body.authorName
    })
})