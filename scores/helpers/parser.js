'use strict';

const cheerio = require('cheerio');

class Parser {
    constructor(rawHtml) {
        this.$ = cheerio.load(rawHtml);
    }

    _getName() {
        return this.$('h2.pageTitle').text()
    }

    _getGroup() {
        return this.$('h2.pageTitle').text()
    }

    _getSemesters() {
        return [
            {
                one: 1
            },
            {
                two: 2
            }
        ]
    }

    getJSON() {
        return {
            name: this._getName(),
            group: this._getGroup(),
            semesters: this._getSemesters()
        }
    }
}

module.exports = Parser;
