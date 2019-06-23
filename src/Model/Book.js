const ImageRepository = require('../Repository/ImageRepository');

module.exports = class Book {

    /**
     * Creates an instance of Book.
     * @param {string} id The path of the folder this book represents
     * @param {string[]} contents The files within the book
     */
    constructor(id, contents) {
        // The path always ends with '/'
        this.id = id.endsWith('/') ? id : id + '/';
        this.contents = contents;

        this.images = [];
        this.subBooks = [];
    }

    /**
     * @return {Image[]}
     */
    getImages() {
        return this.images;
    }
    
    /**
     * @return {string}
     */
    getId() {
        return this.id;
    }

    /**
     * @return {string[]}
     */
    getContents() {
        return this.contents;
    }

    /**
     * Loads the images associated with this book
     *
     * @returns {Promise<Book>} this
     */
    async withImages() {
        if (this.images.length <= 0) {
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