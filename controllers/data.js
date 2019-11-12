const config  = require('config');
const request = require('request')
var utils = require('./utils.js');

function replaceURI(uri, serverURL, base){
    return uri.replace(serverURL,base);
}

exports.data_show = function(req, res) {
    namespace = utils.matcher(req.url);
    console.log("Namespace is: " + namespace)

    //obtain the params according the namespace
    endPointKey = 'endpoints.' + namespace + '.endpointQuery'
    graphKey = 'endpoints.' + namespace + '.graph'
    baseKey = 'endpoints.' + namespace + '.base'
    serverKey  = 'server.url'

    queryEndpoint = config.get(endPointKey)
    graph = config.has(graphKey);
    baseURI = config.get(baseKey)
    serverURL = config.get(serverKey)

    //preparing the uri
    var resource_path = req.originalUrl.replace("data/", "");
    namespace = utils.matcher(req.url);
    if (!config.has('endpoints.' + namespace)){
        res.statusCode = 404;
        res.send('Not found');
    }
    else {
        var resource_uri = baseURI + resource_path;
        const resFormat = req.accepts(['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/n-triples']);
        if (graph) {
            var q = 'CONSTRUCT { ?s ?o ?p } WHERE {\n';
            q+= 'GRAPH <' + resource_uri + '>';
            q+= ' { ?s ?o ?p } }';
        }
        else {
            var q = 'DESCRIBE <' + resource_uri + '>';
        }

var headers = {
    'Accept': resFormat
};

var options = { 
	  url: queryEndpoint,
    method: 'POST',
    headers: headers,
    body: q
};
console.log(options);
        request.post(
            options,
            function (err, rcode, body) {
                res.type(resFormat);
                res.send(body);
            }
        );
    }
};
