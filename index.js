const seneca = require('seneca');

seneca()
    .use('./scores')
    .listen({ host: '0.0.0.0', port: process.env.PORT || 9101 });
