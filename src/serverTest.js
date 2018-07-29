

var homePath = './../'
var server = require(homePath+"server/server")
var router = require(homePath+"server/router")

var requestHandlers = require(homePath+"server/requestHandlers");


var handler = {};
handler['/'] = requestHandlers.start;
handler['/start'] = requestHandlers.start;
handler['/upload'] = requestHandlers.upload;


server.serverStart(router.route, handler, requestHandlers)