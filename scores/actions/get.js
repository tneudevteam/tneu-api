const rest = require('request-promise');
const cookie = require('cookie');

const Parser = require('../helpers/parser');

function getScores(message, done) {
    const token = message.token;

    _getRawHtml(token)
        .then((response) => {
            const parser = new Parser(response);
            done(null, { success: true, response: parser.getJSON() });
        })
        .catch((error) => {
            done(null, { success: false, error: error });
        });
}

function _getRawHtml(token) {
    const options = {
        uri: 'http://mod.tanet.edu.te.ua/ratings/index',
        method: 'GET',
        encoding: 'utf8',
        simple: false,
        jar: true,
        headers: {
            Cookie: cookie.serialize('PHPSESSID', token)
        }
    };

    return rest(options);
}

module.exports = getScores;
