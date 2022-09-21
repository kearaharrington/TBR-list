let express = require('express');
let db = require('../models');
let router = express.Router();

// POST route
router.post('/', (req, res) => {
    db.TBRList.create({
        title: req.body.listTitle,
        userId: req.user.id
    })
    .then((TBRList) => {
        res.redirect('/TBRLists')
    })
    .catch((error) => {
        res.status(404).render('404')
    });
})