const BookRepository = require('./Repository/BookRepository');
const ImageRepository = require('./Repository/ImageRepository');
const View = require('./View/View');

const express = require('express');

var baseDir = process.argv[2] || process.cwd();
if (!baseDir.endsWith('/')) {
    baseDir += '/';
}

var app = express();

var bookRepo = new BookRepository();
var imageRepo = new ImageRepository();

var view = new View();

app.get('/', async (req, res) => {
    var v = view.render('book.html', await bookRepo.withSubBooks().getByName(baseDir));

    res.send(v);
})

app.get('/book', async (req, res) => {

    var name = req.query.book;

    var book = await bookRepo.withSubBooks().withImages().getByName(name)

    var v = view.render('book.html', book);
    res.send(v);
});

app.get('/image', async (req, res) => {
    var id = req.query.id;

    var img = await imageRepo.getByName(id);

    res.header('Content-type', 'image/jpeg');
    res.send(await img.jpegFilter().render());
});

app.listen(8000);