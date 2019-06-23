const ImageRepository = require('../Repository/ImageRepository');

module.exports = class Book {

    /**
     * Creates an instance of Book.
     * @param {string} id The path of the folder this book represents 
     */
    constructor(id) {
        this.id = id;

        this.images = [];
    }

    /**
     * Loads the images associated with this book
     *
     * @returns {Book} this
     */
    async withImages() {
        if (this.images.count <= 0) {
            var imageRepo = new ImageRepository();

            this.images = await imageRepo.getByBook(this);
        }

        return this;
    }
}