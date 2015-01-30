/**
 * Created by marshs on 1/30/15.
 */
var routes = [
    /* Upload File */
    {
        method: 'POST',
        path: '/upload',
        config: {
            payload: {
                output: 'stream',
                parse: true
            }
        },
        handler: require('./handlers/upload.js')
    },
    /* Get Uploaded FIle */
    {
        method: 'GET',
        path: '/get/{name}',
        handler: require('./handlers/read.js')
    }
];







/*
    Iterate through routes and return server object
 */
function route(server) {
    for(var i=0; i<routes.length; i++) {
        server.route(routes[i]);
    }
    return server;
}
module.exports = route;