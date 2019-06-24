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

    getSubBooks() {
        return this.subBooks;
    }

    setSubBooks(subBooks) {
        this.subBooks = subBooks;
    }

    /**
     * @return {Image[]}
     */
    getImages() {
        return this.images;
    }

    setImages(images) {
        this.images = images;
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
}