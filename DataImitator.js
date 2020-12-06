const dataTemplate = require("./testData");

class DataImitator {
    constructor() {
        this.data = [];
    }

    getData() {
        return this.data;
    }

    setData(newData) {
        this.data = newData;
    }

    generateNewData() {
        if (this.data.length) {
            return this.data.map(item => ({
                id: item.id,
                content: item.content + item.id,
                count: item.count + 1,
            }));
        }
        return dataTemplate;
    }

    updateData() {
        this.setData(this.generateNewData());
    }
}

module.exports = DataImitator;