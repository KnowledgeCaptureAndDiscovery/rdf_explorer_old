 // SET UP ====================================================================
const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const request     = require('request');
const fs          = require('fs');

const config = require('config');
const serverURL = config.get('server.url');
const queryEndpoint = config.get('sparql.endpointQuery');

const port      = config.get('server.port');
const sparqlUrl = "https://dockerpedia.inf.utfsm.cl/dockerpedia/sparql";
const resFormat = "application/ld+json";
const views     = __dirname + '/public/views/';

var app = express();

// EXPRESS CONFIGURATION ======================================================
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));
app.locals.pretty = true; //TODO check in all brow
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// POST =======================================================================
// app.post('/api/describe', function(req, res) {
//   var q = 'DESCRIBE <' + req.body.iri + '>';
//   console.log(q);
//   request.post(
//     sparqlUrl, 
//     { form: {format: resFormat, query: q} },
//     function (err, rcode, body) {
//       res.json(JSON.parse(body));
//   });
// });

app.post('/api/getJsonData', function(req, res) {
  var dataPath = 'public/files/users/' + req.body.user + '.json';
  console.log('    ' + dataPath);
  if (fs.existsSync(dataPath)) {
    fs.readFile(dataPath, 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.send(JSON.stringify(obj));
      console.log("ok!");
    });
  } else {
    console.log("    file doest not exists!");
    res.json(null);
  }
});

// ROUTES =====================================================================
app.get('/query',      function(req, res) {res.render(views+'query.pug'   );});
//app.get('/examples',   function(req, res) {res.render(views+'examples.pug');});
app.get('/vocab*',     function(req, res) {res.render(views+'describe.pug');});
app.get('/mint/*',     function(req, res) {res.redirect('/explorer' +  req.originalUrl);});
app.get('/explorer/*', function(req, res) {
                          res.render(views+'describe.pug', {
                              'serverURL': serverURL
                          });
                        });

app.get('/*',          function(req, res) {res.render(views+'index.pug'   );});


// LISTEN =====================================================================
app.listen(port);
console.log("App listening on port", port);
