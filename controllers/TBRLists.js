let express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
let db = require('../models');
let router = express.Router();



// POST route
router.post('/', isLoggedIn, (req,res) => {
    db.tbrList.create({
        title: req.body.listTitle,
        userId: req.user.id
    })
    .then((tbrList) => {
        res.redirect('tbrLists/:id')
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
            id: parseInt(req.params.id),
            userId: parseInt(req.user.id)
        }
    })
    .then(tbrList => {
        res.render('/tbrLists/:id', {tbrList}
        )})
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;