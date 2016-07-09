var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');
var rooms = require('./data/rooms.json');
var router = express.Router();
module.exports = router;

router.get('/rooms',function(req,res){
        res.render('rooms',{title: 'Rooms', rooms: rooms , baseUrl : req.baseUrl});
});

router.route('/rooms/add')
        .get(function(req,res){
                res.render('add',{ baseUrl : req.baseUrl});
        })
        .post(function(req,res){
                var room = {
                        name: req.body.room_name,
                        id: uuid.v4()
                }

                rooms.push(room);
                res.redirect(req.baseUrl + '/rooms');
        });
router.get('/rooms/delete/:id',function(req,res){
        var room_id = req.params.id;
        rooms = rooms.filter( a => a.id != room_id);
        res.redirect(req.baseUrl + '/rooms');
});

router.route('/rooms/edit/:id')
        .get(function(req,res){
                var room_id = req.params.id;
                room = _.find(rooms , a => a.id === room_id);
                res.render('edit',{ room : room, baseUrl : req.baseUrl});
        })
        .post(function(req,res){
                var room_id = req.params.id;
                room = _.find(rooms , a => a.id === room_id);
                room.name = req.body.room_name;
                res.redirect(req.baseUrl + '/rooms');
        });

router.get('/users',function(req,res){
        res.render('users',{title: 'Users', baseUrl : req.baseUrl});
});