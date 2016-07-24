var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var passport = require('passport');
require('./passport/init.js');

var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

app.set('views','./views');
app.set('view engine','jade')

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyparser.urlencoded({extended : true}));
app.use(require('./logging.js'));

app.use(require('express-session')({
    secret: 'secret', resave: false, saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./passport/init');
initPassport(passport);
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
};


var flash = require('connect-flash');
app.use(flash());


var auth_routes = require('./auth.js')(passport);
app.use('/', auth_routes);

var adminrouter = require('./admin.js');
app.use('/adminportal',isAuthenticated ,adminrouter);

var apirouter = require('./api.js');
app.use('/api',apirouter);


app.get('/',isAuthenticated,function(req,res){
        res.render('home',{title: "Chit Chat"});
});
app.listen(3000, function(){
    console.log('app has started listening');
});