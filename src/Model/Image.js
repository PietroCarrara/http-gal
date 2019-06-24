const Sharp = require('sharp');

module.exports = class Image {

    /**
     * Creates an instance of Image.
     * @param {Buffer} data Image data
     */
    constructor(data) {
        // Filters will be added and used later
        // when rendering the image
        this.filters = [];

        // The original data
        this.data = data;
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
        var sharp = Sharp(this.data);

        for (var filter of this.filters) {
            sharp = filter.apply(sharp);
        }

        return sharp.toBuffer();
    }

    /**
     * Clears the filters
     *
     */
    clearFilters() {
        this.filters = [];
    }
}