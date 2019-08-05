 // SET UP ====================================================================
const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');

const config        = require('config');

const port      = config.get('server.port');
const views     = __dirname + '/public/views/';

var app = express();
var data = require('./controllers/data.js');
var page = require('./controllers/page.js');
var prefixes = require('./controllers/prefixes.js');

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

app.get('/',           function(req, res) {res.render(views+'index.pug'   );});
app.get('/prefixes',   prefixes.get_prefixes);
app.get(/^\/data\/(?:([^\/]+?))\/(?:([^\/]+?)((?:[\/].+?)?))\/?$/i, data.data_show);
app.get(/^\/page\/(?:([^\/]+?))\/(?:([^\/]+?)((?:[\/].+?)?))\/?$/i, page.page_show);

app.get(/^\/((?:[^\/]+?))\/((?:[^\/]+?)(?:\/(?:[^\/]+?))*)(?:\/(?=$))?$/i, function(req, res) {
  if (req.accepts('text/html')){
    if (req.originalUrl.match(/\/wings\/export\/.*\/(Data|Component|resource\/CanonicalInstance)/)){
      console.log("re-writing")
      req.originalUrl = req.originalUrl.replace("export/", "export/Domain/").replace(/\/Data.*|\/Component.*\/|\/resource\/CanonicalInstance\/.*/gi, "")
      console.log(req.originalUrl)
      req.headers["Accept"] = "text/n-triples"
      res.redirect(303, '/data' + req.originalUrl);
    }
    else {
      res.redirect(303, '/page' + req.originalUrl);    }
  }
  else if (req.accepts(['text/turtle', 'application/ld+json', 'application/rdf+xml', 'application/n-triples'])){
    res.redirect(303, '/data' + req.originalUrl);
  }
  else {
    res.status(406).send('Not Acceptable');
  }
});

app.get('/*', function(req, res) {
  res.status(404).send('Not Acceptable');
});
app.listen(port);
console.log("App listening on port", port);
