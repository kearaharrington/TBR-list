Removed Code: 

From views/books/books.ejs

```html
<% if(Array.isArray(book.bookComments) && book.bookComments.length > 0) { %>
  <% book.bookComments.forEach(function(bookComment) { %>
      <p>
          <%= bookComment.user.name %>
          <%= bookComment.content %>
      </p>
<% })} %>

<div class="comments">
  <form action="/books/<%= book.id %>/comment" method="POST" >
    <label for="content">Comment</label>
    <input name="content" type="text">
    <!-- <button type="submit">Submit</button> -->
    <input type="submit">
  </form>
</div>

```

From controllers/books.js

```javascript
// POST route for book comments NOT WORKING
router.post('/id:/comment', isLoggedIn, (req,res) => {
    // db.bookComment.create({
    //     content: req.body.content,
    //     userId: req.user.id,
    //     bookId: req.params.id,
    //     include: [db.book, db.user]
    // })
    db.book.findOne({
        where: {
            id: req.params.id
        },
        include: [db.book, db.author]
    })
    .then((book) => {
        db.bookComment.create({
            content: req.body.content,
            userId: req.user.id,
            bookId: req.params.id
        })
        .then((book) => {
            res.redirect(`/books/${req.params.id}`, {book})
        })
        .catch((error) => {
            console.log(error);
            res.status(400).render('main/404')
        })
    })
    .then((book) => {
        res.redirect(`/books/${req.params.id}`, {book})
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('404')
    })
})
```

From server.js
```javascript
// const HAPIbooks = 'hapi-books.p.rapidapi.com';
// const HAPIKey = process.env.HAPIBooksKey;

const kindleScraper = 'amazon-kindle-scraper.p.rapidapi.com';
const kindleKey = process.env.ksAPIKey;
```

user static association
```javascript
models.user.hasMany(models.bookComment)
```

book static association
```javascript
models.book.hasMany(models.bookComment)
```