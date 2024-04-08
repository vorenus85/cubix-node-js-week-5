import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
const app = express();
const port = 3000;

app.use(
  session({
    secret: 'it61s3t78n9srq37t7t8',
    resave: false,
    saveUninitialized: true,
  })
);

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.post('/sessions/counter', (req, res, next) => {
  req.session.counter++;
  res.redirect('/');
});

app.post('/sessions/new', (req, res, next) => {
  req.session.regenerate(function (err) {
    // will have a new session here
  });
  res.redirect('/');
});

app.get('/', (req, res, next) => {
  if (req.session.counter == null) {
    req.session.counter = 0;
  }
  res.locals.counter = req.session.counter;
  res.render('index', res.locals);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
