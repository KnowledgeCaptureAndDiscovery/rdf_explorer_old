const config  = require('config');
const views     = __dirname + './../public/views/';
var utils = require('./utils.js');

exports.page_show = function(req, res) {
    /*detect the namespace and endpoint*/
    namespace = utils.matcher(req.url);
    if (!config.has('endpoints.' + namespace)){
        res.statusCode = 404;
        res.send('Not found');
    }
    else {
        endPointKey = 'endpoints.' + namespace + '.endpointQuery'
        graphKey = 'endpoints.' + namespace + '.graph'
        baseKey = 'endpoints.' + namespace + '.base'
        queryEndpoint = config.get(endPointKey)
        baseURI = config.get(baseKey)
        var graph;
        if (config.has(graphKey)){ 
            graph = true;
        }
        else {
            graph = false;
        }
    
        serverKey  = 'server.url'
        serverURL = config.get(serverKey)
        console.log(queryEndpoint)
        res.render(views+'describe.pug', {
            'queryEndpoint': queryEndpoint,
            'serverURL': serverURL,
            'graph': graph,
            'base': baseURI
        });        
    }
};