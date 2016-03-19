const seneca = require('seneca');

seneca()
    .use('./scores')
    .listen({ host: 'localhost', port: '9101' });
