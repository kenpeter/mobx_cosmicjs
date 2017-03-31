// need express
var express = require('express');
// instane express
var app = express();
// hogan another html template
var hogan = require('hogan-express');
// express use hogan for html
app.engine('html', hogan);
// we have a views folder
app.set('views', __dirname + '/');

// port 3000
app.set('port', process.env.PORT || 3000);
// public dir
app.use(express.static(__dirname + '/public'));

// when access /, render index.html
app.get('/', function(req, res){
  res.render('index.html');
});

// listen msg
console.log('Listening at localhost:' + app.get('port'));

// actual listen
app.listen(app.get('port'));
