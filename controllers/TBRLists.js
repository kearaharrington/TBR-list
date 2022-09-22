let express = require('express');
let db = require('../models');
let router = express.Router();

// GET route


// POST route
router.post('/', (req, res) => {
    db.TBRList.create({
        title: req.body.listTitle,
        userId: req.user.id
    })
    .then((TBRList) => {
        res.redirect('/TBRLists/:id')
    })
    .catch((error) => {
        res.status(404).render('404')
    });
})