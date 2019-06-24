const Sharp = require('sharp');

module.exports = class Image {

    /**
     * Creates an instance of Image.
     * @param {string} id This image's id
     */
    constructor(id) {
        this.id = id;
        
        // Filters will be added and used later
        // when rendering the image
        this.filters = [];

        // The image data
        this.data = null;

        // This function must be overwritten to something that sets this.data
        // with a buffer containing the image's bytes 
        this.loadData = () => {
            throw `Image ${this.id} doesn't know how to load itself!`;
        }
    }

    getUrl() {
        var id = encodeURIComponent(this.id);
        
        return `/image/?id=${id}`;
    }
    
    /**
     * Resizes the image
     *
     * @param {number} width
     * @param {number} height
     * @return {Image}
     */
    resizeFilter(width, height) {

        return this;
    }

    /**
     * Resizes the image to fit in a box (respects aspect)
     *
     * @param {number} maxWidth
     * @param {number} maxHeight
     * @return {Image}
     */
    resizeBoxFilter(maxWidth, maxHeight) {

        return this;
    }

    /**
     * Sets the image to be rendered as a jpeg
     *
     * @return {Image}
     */
    jpegFilter() {

        /**
         * @param {Sharp.Sharp} sharp
         */
        this.filters['format'] = (sharp) => sharp.jpeg();

        return this;
    }

    /**
     * Renders the image using all filters
     *
     * @return {Promise<Buffer>}
     */
    async render() {

        if (this.data == null) {
            await this.loadData();
        }

        var sharp = Sharp(this.data);

        for (var filter of this.filters) {
            sharp = filter.apply(sharp);
        }

        this.clearFilters();

        return sharp.toBuffer();
    }

    /**
     * Clears the filters
     */
    clearFilters() {
        this.filters = [];
    }
}