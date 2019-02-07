const config  = require('config');
const queryEndpoint = config.get('sparql.endpointDescribe');
const serverURL     = config.get('server.url');
const views     = __dirname + './../public/views/';


exports.page_show = function(req, res) {
    res.render(views+'describe.pug', {
        'serverURL': serverURL,
        'queryEndpoint': queryEndpoint
    });
};