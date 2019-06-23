const ImageRepository = require('../Repository/ImageRepository');

module.exports = class Book {

    /**
     * Creates an instance of Book.
     * @param {string} id The path of the folder this book represents 
     */
    constructor(id) {
        this.id = id;

        this.images = [];
        this.subBooks = [];
    }

    /**
     * Loads the images associated with this book
     *
     * @returns {Promise<Book>} this
     */
    async withImages() {
        if (this.images.count <= 0) {
            var imageRepo = new ImageRepository();

            this.images = await imageRepo.getByBook(this);
        }

        return this;
    }

    /**
     * Loads the subbooks associated with this book
     *
     * @returns {Promise<Book>} this
     */
    async withSubBooks() {

        return this;
    }
}