const rest = require('request-promise');
const cookie = require('cookie');
const _ = require('lodash');

const errors = require('../helpers/errors');

function auth(message, done) {
    const username = message.username;
    const password = message.password;

    console.log('[auth] user:', username);

    _requestAuthToken(username, password)
        .then((response) => {
            done(null, { token: response });
        })
        .catch((error) => {
            if (error.message === errors.wrongCredentials) {
                done(null, { success: false, reason: errors.wrongCredentials });
            } else {
                done(error);
            }
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
        transform: function (body, response) {
            const cookies = _.map(response.headers['set-cookie'], (one) => cookie.parse(one));
            const token = _.get(_.findLast(cookies, (el) => _.has(el, 'PHPSESSID')), 'PHPSESSID');

            if (_.isEmpty(cookies)) throw new Error(errors.wrongCredentials);

            if (!token) { // Sometimes it redirects to tneu.edu.ua
                console.log('[auth] no token: trying again');
                return _requestAuthToken(username, password);
            } else {
                return token;
            }
        }
    };

    return rest(options);
}

module.exports = auth;
