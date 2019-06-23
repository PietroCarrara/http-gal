const Image = require('../Model/Image');

module.exports = class ImageRepository {
    
    /**
     * Returns a promise that will receive a image by its name
     *
     * @param {string} name The image filename
     * @returns {Promise<Image>}
     */
    getByName(name) {

    }

    /**
     * Gets the images associated with a given book
     *
     * @param {*} book The book
     * @return {Promise<Image[]>}
     */
    getByBook(book) {

    }
}