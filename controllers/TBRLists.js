let express = require('express');
let db = require('../models');
let router = express.Router();



// POST route
router.post('/', (req, res) => {
    db.TBRList.create({
        // include: [db.user],
        title: req.body.listTitle,
        // userId: req.
    })
    .then((TBRList) => {
        res.redirect('tbrLists/:id')
    })
    .catch((error) => {
        res.status(400).render('main/404')
    });
})

// GET route for new list
router.get('/new', (req, res) => {
    res.render('tbrLists/new')
    .catch((error) => {
        res.status(400).render('main/404')
    });
})

module.exports = router;