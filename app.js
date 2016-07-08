var express = require('express');
var app = express();
var rooms = require('./data/rooms.json');
var bodyparser = require('body-parser');
var uuid = require('node-uuid');

app.set('views','./views');
app.set('view engine','jade')

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyparser.urlencoded({extended : true}));

app.get('/admin/rooms',function(req,res){
        res.render('rooms',{title: "Rooms", rooms: rooms});
});
app.get('/admin/rooms/add',function(req,res){
        res.render('add');
});
app.post('/admin/rooms/add',function(req,res){
        var room = {
                name: req.body.room_name,
                id: uuid.v4()
        }

        rooms.push(room);
        res.redirect('/admin/rooms');
});
app.get('/admin/rooms/delete/:id',function(req,res){
        var room_id = req.params.id;
        rooms = rooms.filter( a => a.id != room_id);
        res.redirect('/admin/rooms');
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