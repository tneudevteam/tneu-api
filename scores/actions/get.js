const rest = require('request-promise');

function getScores(message, done) {
    const token = message.token;
    done(null, {});
}

module.exports = getScores;
