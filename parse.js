const controllers = require('./controllers/controllers');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3005;
app.listen(port);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
  //res.render('index', { title: 'Express' });
});
/*
* @param: url (str). should be a URI-encoded gutenberg url
* ex. /?url=https%3A%2F%2Fwww.gutenberg.org%2Ffiles%2F56105%2F56105-h%2F56105-h.htm
* (returns JSON word count for https://www.gutenberg.org/files/56105/56105-h/56105-h.htm)
*/
app.get('/get_text', function(req, response){
	controllers.getUrl(req, response);
});

//curl 'https://gutenbergapi.org/search/title eq Moby Dick?include=author'