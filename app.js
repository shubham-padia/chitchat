var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var passport = require('passport');
require('./passport-init.js');



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

var adminrouter = require('./admin.js');
app.use('/adminportal',adminrouter);

var apirouter = require('./api.js');
app.use('/api',apirouter);

var authrouter = require('./auth.js');
app.use(authrouter);

app.get('/',function(req,res){
        res.render('home',{title: "Chit Chat"});
});
app.listen(3000, function(){
    console.log('app has started listening');
});