const fs = require('fs');
const util = require('util');

const Book = require('../Model/Book');

const readdir = util.promisify(fs.readdir);

module.exports = class BookRepository {

    /**
     * Get a book by its name
     *
     * @param {string} name The book name
     * @return {Promise<Book>}
     */
    async getByName(name) {
        var contents = await readdir(name);

        return new Book(name, contents);
    }
}