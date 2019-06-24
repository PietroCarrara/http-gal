const BookRepository = require('./Repository/BookRepository');
const ImageRepository = require('./Repository/ImageRepository');

const express = require('express');

var baseDir = process.argv[2] || process.cwd();
if (!baseDir.endsWith('/')) {
    baseDir += '/';
}

var app = express();

var bookRepo = new BookRepository();

app.get('/book', async (req, res) => {

    var name = req.query.book;

    var book = await bookRepo.withImages().getByName(baseDir + name)

    var cover = book.getImages()[0];

    res.setHeader('Content-type', 'image/jpeg');
    res.send(await cover.jpegFilter().render());
});

app.listen(8000);