const mustache = require('mustache');
const fs = require('fs');

module.exports = class View {

    constructor() {
        this.views = {};

        var files = fs.readdirSync(__dirname + '/mustache');
        
        for (var file of files) {
            var f = fs.readFileSync(__dirname + '/mustache/' + file).toString();
            this.views[file] = f;
        }
    }
    
    /**
     * Renders the view
     *
     * @param templ The template
     * @param {*} data The data
     */
    render(templ, data = {}) {
        return mustache.render(this.views[templ], data, this.views);
    }
}