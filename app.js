const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

const friendNames = [
    {First: 'Su', Last: 'Wu'},
    {First: 'Wodi', Last: 'Chen'},
    {First: 'Zhu', Last: 'Yang'},
    {First: 'Qiaozi', Last: 'Fu'},
    {First: 'Can', Last: 'Zhang'},
    {First: 'Shiyang', Last: 'Yao'}
];

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name: name });
    } else {
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?"});
    // Another way to do it
    // res.locals.prompt = "Who is buried in Grant's tomb?";
    // res.render('card');
});

// Add hello route to prompt username input or redirect
app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('./');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

// Add Goodbye route to clear out cookie
app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.get('/challenge', (req, res) => {
    res.render('sandbox', {friendNames});
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});
