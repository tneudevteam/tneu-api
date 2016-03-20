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
        return this
            .$('.items')
            .map((index, semester) => {
                return [this
                    .$(semester)
                    .find('tbody tr')
                    .map((index, row) => {
                        const subject = this.$(row).find('td').map((index, cell) => this.$(cell).text()).get();
                        return {
                            name: subject.shift(),
                            controlType: subject.shift(),
                            totalScore: parseInt(subject.pop()),
                            modules: _
                                .chain(subject)
                                .chunk(3)
                                .map((module) => {
                                    return {
                                        weight: parseInt(module.shift()),
                                        date: module.shift(),
                                        score: parseInt(module.shift()) || 0
                                    }
                                })
                                .filter((module) => _.isFinite(module.weight))
                                .value()
                        }
                    }).get()];
            }).get();
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
