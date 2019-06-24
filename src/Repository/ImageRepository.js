const fs = require('fs');
const util = require('util');
const Image = require('../Model/Image');
const Book = require('../Model/Book');
const Repository = require('./Repository');

const readFile = util.promisify(fs.readFile);

module.exports = class ImageRepository extends Repository {
    
    /**
     * Returns a promise that will receive a image by its name
     *
     * @param {string} name The image filename
     * @returns {Promise<Image>}
     */
    async getByName(name) {
        var data = await readFile(name);

        return new Image(data);
    }

    /**
     * Gets the images associated with a given book
     *
     * @param {Book} book The book
     * @return {Promise<Image[]>}
     */
    getByBook(book) {
        var contents = book.getContents();

        const exts = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'webp',
        ];

        /**
         * @param {string} str
         * @return {bool} True when the string is a valid image
         */
        const strIsImage = str => {
            for (var ext of exts) {
                if (str.endsWith(ext)) {
                    return true;
                }
            }
            return false;
        }

        var images = [];

        for (var file of contents) {
            if (strIsImage(file)) {
                images.push(this.getByName(file));
            }
        }

        return Promise.all(images);
    }
}