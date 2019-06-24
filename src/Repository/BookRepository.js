const fs = require('fs');
const util = require('util');

const Repository = require('./Repository');
const ImageRepository = require('./ImageRepository');
const Book = require('../Model/Book');

const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);

module.exports = class BookRepository extends Repository {

    /**
     * Get a book by its name
     *
     * @param {string} dir The book name
     * @return {Book}
     */
    async getByName(dir) {
        if (!dir.endsWith('/')) {
            dir += '/';
        }

        var contents = (await readdir(dir))
            .map((name) => dir + name);

        var book = new Book(dir, contents);

        await super.postGet([book]);

        return book;
    }

    /**
     * Get all books in the directory
     *
     * @param {string} dir The
     * @return {Book[]}
     */
    async getAll(dir) {

        var root = await this.withSubBooks().getByName(dir);

        return root.getSubBooks();
    }


    /**
     * Loads the images associated with the selected books
     *
     * @return {BookRepository} this
     */
    withImages() {
        this.postGetFuncs.push(async book => {
            var imageRepo = new ImageRepository();
    
            book.setImages(await imageRepo.getByBook(book));
            return book;
        });

        return this;
    }

    /**
     * Loads the subbooks associated with the selected books
     *
     * @return {BookRepository} this
     */
    withSubBooks() {
        this.postGetFuncs.push(async book => {
            var subBooks = [];
            var bookRepo = new BookRepository();

            for (var c of book.getContents()) {
                var file = await lstat(c);
    
                if (file.isDirectory()) {
                    subBooks.push(bookRepo.getByName(c));
                }
            }

            book.setSubBooks(await Promise.all(subBooks));
            
            return book;
        });

        return this;
    }
}