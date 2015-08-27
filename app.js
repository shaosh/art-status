var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use('/pages', express.static(__dirname + '/src/client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/client/index.html');
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)


})
