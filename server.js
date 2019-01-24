 // SET UP ====================================================================
const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const request     = require('request');
const fs          = require('fs');

const config        = require('config');
const serverURL     = config.get('server.url');
const queryEndpoint = config.get('sparql.endpointQuery');

const port      = config.get('server.port');
const views     = __dirname + '/public/views/';

var app = express();
var data = require('./controllers/data.js');

// EXPRESS CONFIGURATION ======================================================
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));
app.locals.pretty = true; //TODO check in all brow
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// ROUTES =====================================================================
app.get('/query',      function(req, res) {res.render(views+'query.pug'   );});
app.get('/vocab*',     function(req, res) {res.render(views+'describe.pug');});

app.get('/mint/*', function(req, res) {
  if (req.accepts('text/html')){
    res.redirect(303, '/page' + req.originalUrl);
  }
  else if (req.accepts(['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/n-triples'])){
    res.redirect(303, '/data' + req.originalUrl);
  }
  else {
    res.status(406).send('Not Acceptable');
  }
});
app.get('/data/mint/*', data.data_show);
app.get('/page/mint/*', function(req, res) {
  res.render(views+'describe.pug', {
    'serverURL': serverURL,
    'queryEndpoint': queryEndpoint
  });
});

app.get('/*',          function(req, res) {res.render(views+'index.pug'   );});
app.listen(port);
console.log("App listening on port", port);