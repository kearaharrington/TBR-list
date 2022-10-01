require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');
const methodOverride = require('method-override');

// const HAPIbooks = 'hapi-books.p.rapidapi.com';
// const HAPIKey = process.env.HAPIBooksKey;

const kindleScraper = 'amazon-kindle-scraper.p.rapidapi.com';
const kindleKey = process.env.ksAPIKey;

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize()); 
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
})

// access to all of our auth routes GET /auth/login, GET /auth/signup, POST routes
app.use('/auth', require('./controllers/auth'));
app.use('/tbrLists', require('./controllers/tbrLists'));
app.use('/books', require('./controllers/books'));
app.use('/authors', require('./controllers/authors'));

// display user details and tbrLists
app.get('/profile', isLoggedIn, (req,res) => {
  // const { id, name, email } = req.user.get(); 
  db.user.findOne({
    where: {
      id: req.user.id
    },
    include: [db.tbrList]
  })
  .then(user => {
    res.render('profile', {
      user: {
        user,
        tbrList: user.tbrLists
      }
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(404).render('404')
  })
})

app.get('/edit', isLoggedIn, (req,res) => {
  db.user.findOne({
    where: {
      id: req.user.id
    }
  })
  .then((user) => {
    if(!user) throw Error();
    res.render('auth/edit', {user})
  })
  .catch((error) => {
    console.log(error)
    res.status(404).render('404')
  })
})

app.put('/edit', isLoggedIn, (req,res) => {
  db.user.update({
      name: req.body.name,
      email: req.body.email
    },
    {where: {
      id: req.user.id
    }
  })
  .then((user) => {
    res.redirect('/profile')
  })
  .catch((error) => {
    console.log(error)
    res.status(404).render('404')
  })
})

app.get('/*', (req,res) => {
  res.status(404).render('404')
})


const PORT = process.env.PORT || 3000;
// const server = app.listen(PORT, () => {
//   console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
// })
const server = app.listen(PORT)

module.exports = server;
