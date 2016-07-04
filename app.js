var express = require('express');
var app = express();
var rooms = require("./data/rooms.json");

app.set('views','./views');
app.set('view engine','jade')

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.get('/admin/rooms',function(req,res){
        res.render('rooms',{title: "Rooms", rooms: rooms});
});
app.get('/admin/users',function(req,res){
        res.render('users',{title: "Users"});
});
app.get('/',function(req,res){
        res.render('index',{title: "Aloo Chat"});
});
app.listen(3000, function(){
    console.log('app has started listening');
});