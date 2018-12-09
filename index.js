var express = require('express');
var app = express();

// Set up handlebars view engine
var handlebars = require('express3-handlebars')
	.create({ defaultLayout:'main' });

// Set handlebars engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port
app.set('port', process.env.PORT || 3000);

// Set public directory
app.use(express.static(__dirname + '/public'));

// Web Pages
app.get('/', function(req, res) {
    res.render('home');
})
// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});