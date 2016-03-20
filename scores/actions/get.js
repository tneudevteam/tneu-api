const rest = require('request-promise');
const cookie = require('cookie');

const Parser = require('../helpers/parser');

function getScores(message, done) {
    const token = message.token;

    _getRawHtml(token)
        .then((response) => {
            const scoresJson = new Parser(response).getJSON();
            done(null, scoresJson);
        })
        .catch(done);
}

function _getRawHtml(token) {
    const options = {
        uri: 'http://mod.tanet.edu.te.ua/ratings/index',
        method: 'GET',
        encoding: 'utf8',
        simple: false,
        jar: true,
        resolveWithFullResponse: true,
        headers: {
            Cookie: cookie.serialize('PHPSESSID', token)
        },
        transform: function (body, response) {
            const serverWrongRedirect = !!response.headers['set-cookie'];
            if (serverWrongRedirect) { // Sometimes it redirects to tneu.edu.ua
                console.log('[get-scores] redirect: retry');
                return _getRawHtml(token); // So repeat request
            } else {
                return body;
            }
        }
    };

    return rest(options);
}

module.exports = getScores;
