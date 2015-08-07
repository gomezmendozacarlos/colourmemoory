var express = require('express'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	;


var db = mongoose.connect('mongodb://localhost/accedoAPI');

var User = require('./models/memoryModels');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({entended:true}));
app.use(bodyParser.json());

var memoryRouter = express.Router();

memoryRouter.route('/users')
	.post(function(req, res){
		var user = new User(req.body);


		user.save();		
		console.log(user);
		res.status(201).send(user);

	})
	.get(function(req, res){

		var query = req.query;	
 		User.find(query, function(err, users){
 			if(err)
 				res.status(500).send(err);
 			else
 				res.json(users);			
 		});
	});

app.use('/api', memoryRouter);
app.use(cors());

app.get('/', function(req, res) {
	res.send('welcome');
});




app.listen(port, function(){
	console.log("running port: ", port);
});