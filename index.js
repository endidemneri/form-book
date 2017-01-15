var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = new express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://endi:endi@ds163758.mlab.com:63758/bookform', function(err){
	if(err) console.log('Unable to connect to db server.', err);
	else console.log('Db server connected');
});

mongoose.connection.on('error', function(err) {
	if(err) {
		console.error(err);
	}
});

mongoose.connection.once('open', function(err) {
	if(err) console.log(err);
	 else {
	 var FormSchema = mongoose.Schema({
		 title: String,
		 author: String
	 });
	 
var Form = mongoose.model('Form', FormSchema);
	 }
	app.post('/submit', function(req, res) {
		var form = {
			title: req.body.title,
			author: req.body.author
		};
		Form.create(form, function(err, result) {
			if(err){
				console.log(err);
			} else {
				console.log(result);
				res.json({message: 'Book form submitted'});
			}
		});
	});
	
	app.post('/search', function(req,res) {
		Form.findOne({title: req.body.title}, function(err, result) {
			if(err) {
				console.log(err);
			} else {
				res.json(result);
			}
		});
	});
	
	app.post('/author', function(req,res) {
		Form.findOne({author: req.body.author}, function(err, result) {
			if(err) {
				console.log(err);
			} else {
				res.json(result);
			}
		});
	});
	
		app.listen(process.env.PORT || 7000);
});