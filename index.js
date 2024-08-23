let server = require('./server.js');
let router = require('./router.js');
let requestHandler = require('./requestHandler.js');

const mariadb = require('./database/connect/mariadb.js');
mariadb.connect();

server.start(router.route, requestHandler.handle);