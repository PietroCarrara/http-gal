module.exports = class Image {
    
    /**
     * Creates an instance of Image.
     * @param {*} data Image data
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
     * @param {*} width
     * @param {*} height
     * @returns Image
     */
    resizeFilter(width, height) {

        return this;
    }

    /**
     * Resizes the image to fit in a box (respects aspect)
     *
     * @param {*} maxWidth
     * @param {*} maxHeight
     * @return Image
     */
    resizeBoxFilter(maxWidth, maxHeight) {

        return this;
    }

    /**
     * Sets the image to be rendered as a jpeg
     *
     * @returns Image
     */
    jpegFilter() {
        
        return this;
    }

    /**
     * Renders the image using all filters
     *
     * @returns Stream
     */
    render() {

    }

    /**
     * Clears the filters
     *
     */
    clearFilters() {
        this.filters = [];
    }
}