
//modules
var express	=	require('express');
var app	=	express();
var bodyParser	=	require('body-parser');
var mailer = require('nodemailer');


//functionality to express
app.use('/css',express.static(__dirname + '/css'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//get main page(form)
app.get('/',function(req,res){
	res.sendFile('mailform.html',{'root' : __dirname +''});
});

//when form is submitted
app.post('/mail',function(req,res){
	var sender = mailer.createTransport({
		service : 'gmail',
		auth: {
			user: 'yourMail(sender)@gmail.com',
			pass: 'yourPassword'
		}
	});

	var mail = {
		from : req.body.email,
		to : 'yourMail(receiver)@gmail.com',
		subject : req.body.question,
		text : req.body.more
	};

	sender.sendMail(mail,function(error,msg){
		if(error){
			console.log(error);
		}
		else {
			console.log('Success: ' + msg.response);
		}
	});
	res.redirect('/');
});

//server connection
app.listen(3000,function(){
	console.log("server created!");
});
