var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.set('views','./views');
app.set('view engine','jade')

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyparser.urlencoded({extended : true}));

var admin_router = require('./admin.js');
app.use('/adminportal',admin_router);

app.get('/',function(req,res){
        res.render('home',{title: "Chit Chat"});
});
app.listen(3000, function(){
    console.log('app has started listening');
});