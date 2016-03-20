'use strict';

const cheerio = require('cheerio');
const _ = require('lodash');

class Parser {
    constructor(rawHtml) {
        this.$ = cheerio.load(rawHtml);
    }

    _getName() {
        const rawName = this.$('h2.pageTitle').text();
        if (!rawName) return 'Ім’я Прізвище';
        return _
            .chain(rawName.match(/.*(?=\()/g))
            .first()
            .startCase()
            .value();
    }

    _getGroup() {
        const rawName = this.$('h2.pageTitle').text();
        if (!rawName) return 'ГРУПА';
        return _
            .chain(rawName.match(/[^\(]+(?=\))/g))
            .first()
            .value();
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
