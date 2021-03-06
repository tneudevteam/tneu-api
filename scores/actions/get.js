const rest = require('request-promise');
const cookie = require('cookie');

const Parser = require('../helpers/parser');
const errors = require('../helpers/errors');

function getScores(message, done) {
    const token = message.token;

    _getRawHtml(token)
        .then((response) => {
            const scoresJson = new Parser(response).getJSON();
            done(null, scoresJson);
        })
        .catch((error) => {
            if (error.message === errors.wrongToken) {
                done(null, { success: false, reason: errors.wrongToken });
            } else {
                done(error);
            }
        });
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
            const wrongToken = response.connection._httpMessage.path === '/site/login';
            const wrongRedirect = response.connection._httpMessage.path === '/';

            if (wrongToken) throw new Error(errors.wrongToken);

            if (wrongRedirect) { // Sometimes it redirects to tneu.edu.ua
                console.log('[get-scores] redirect: retry');
                return _getRawHtml(token); // So repeat request
            }

            return body;
        }
    };

    return rest(options);
}

module.exports = getScores;
