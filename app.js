
//modules
var express	=	require('express');
var app	=	express();
var bodyParser	=	require('body-parser');
var mailer = require('nodemailer');



app.use('/css',express.static(__dirname + '/css'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.sendFile('mailform.html',{'root' : __dirname +''});
});
app.post('/mail',function(req,res){
	var sender = mailer.createTransport({
		service : 'gmail',
		auth: {
			user: 'example@gmail.com',
			pass: 'password'
		}
	});

	var mail = {
		from : req.body.email,
		to : 'example@gmail.com',
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
