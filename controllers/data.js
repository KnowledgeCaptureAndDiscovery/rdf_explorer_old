const config  = require('config');
const request = require('request')
const queryEndpoint = config.get('sparql.endpointDescribe');
const serverURL     = config.get('server.url');

function replaceURI(uri, serverURL){
    return uri.replace(serverURL,"https://w3id.org");
}

exports.data_show = function(req, res) {
    path = req.originalUrl.replace("data/", "")
    namespace = req.params[0]
    if (!config.has('endpoints.' + namespace)){
        res.statusCode = 404;
        res.send('Not found');
    }
    else {
        url = serverURL + path;
        url = replaceURI(url, serverURL)
        resFormat = req.accepts(['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/n-triples'])
        var q = 'DESCRIBE <' + url + '>';
        request.post(
            queryEndpoint, 
            { 
                form: {format: resFormat, query: q}
            },
            function (err, rcode, body) {
                res.type(resFormat);
                res.send(body);
            }
        );
    }
};