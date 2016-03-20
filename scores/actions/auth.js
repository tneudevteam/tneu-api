const rest = require('request-promise');
const cookie = require('cookie');
const _ = require('lodash');

function auth(message, done) {
    const username = message.username;
    const password = message.password;

    console.log('[auth] user:', username);

    _requestAuthToken(username, password)
        .then((response) => {
            if (!response) {
                console.log('[auth] no token: trying again');
                return auth(message, done);
            }
            done(null, { success: true, token: response });
        })
        .catch((error) => {
            done(null, { success: false, error: error });
        });
}

function _requestAuthToken(username, password) {
    const options = {
        uri: 'http://mod.tanet.edu.te.ua/site/login',
        method: 'POST',
        resolveWithFullResponse: true,
        simple: false,
        form: {
            'LoginForm[login]': username,
            'LoginForm[password]': password,
            'LoginForm[rememberMe]': '1',
            yt0: 'Увійти'
        },
        jar: true,
        transform: function (body, response, resolveWithFullResponse) {
            if (resolveWithFullResponse) {
                const cookies = _.map(response.headers['set-cookie'], (one) => cookie.parse(one));
                return _.get(_.findLast(cookies, (el) => _.has(el, 'PHPSESSID')), 'PHPSESSID');
            } else {
                return body;
            }
        }
    };

    return rest(options);
}

module.exports = auth;
