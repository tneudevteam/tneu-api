function auth(message, done) {
    const username = message.username;
    const password = message.password;

    console.log('[auth]', username, password);

    done(null, { success: true });
}

module.exports = auth;
