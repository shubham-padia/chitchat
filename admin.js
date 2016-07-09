var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');
var rooms = require('./data/rooms.json');
var router = express.Router();
module.exports = router;

router.get('/admin/rooms',function(req,res){
        res.render('rooms',{title: "Rooms", rooms: rooms});
});
router.get('/admin/rooms/add',function(req,res){
        res.render('add');
});
router.post('/admin/rooms/add',function(req,res){
        var room = {
                name: req.body.room_name,
                id: uuid.v4()
        }

        rooms.push(room);
        res.redirect('/admin/rooms');
});
router.get('/admin/rooms/delete/:id',function(req,res){
        var room_id = req.params.id;
        rooms = rooms.filter( a => a.id != room_id);
        res.redirect('/admin/rooms');
});
router.get('/admin/rooms/edit/:id',function(req,res){
        var room_id = req.params.id;
        room = _.find(rooms , a => a.id === room_id);
        res.render('edit',{ room : room});
});
router.post('/admin/rooms/edit/:id',function(req,res){
        var room_id = req.params.id;
        room = _.find(rooms , a => a.id === room_id);
        room.name = req.body.room_name;
        res.redirect("/admin/rooms");
});
router.get('/admin/users',function(req,res){
        res.render('users',{title: "Users"});
});