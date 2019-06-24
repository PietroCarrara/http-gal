module.exports = class Repository {
    constructor() {
        this.postGetFuncs = [];
    }

    /**
     * @param {Array} data 
     */
    async postGet(data) {
        for (const d in data) {
            for (const func of this.postGetFuncs) {
                data[d] = await func(data[d]);
            }
        }

        this.postGet = [];
    }
}