var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');
var Rooms = require('./schemas/rooms.js');
var Rooms_obj
Rooms.find({},function(err,room){
        if (err) throw err;
        Rooms_obj = room;
});
var router = express.Router();
module.exports = router;



router.get('/rooms',function(req,res){
        res.render('rooms',{title: 'Rooms', rooms: Rooms_obj, baseUrl : req.baseUrl});
});

router.route('/rooms/add')
        .get(function(req,res){
                res.render('add',{ baseUrl : req.baseUrl});
        })
        .post(function(req,res){
                var room = Rooms({
                        name: req.body.room_name,
                        id: uuid.v4()
                });

                room.save(function(err) {
                        if (err) throw err;
                });
                res.redirect(req.baseUrl + '/rooms');
        });
router.get('/rooms/delete/:id',function(req,res){
        var room_id = req.params.id;
        rooms = rooms.filter( a => a.id != room_id);
        res.redirect(req.baseUrl + '/rooms');
});

router.route('/rooms/edit/:id')
        .all(function(req,res,next){
                var room_id = req.params.id;
                room = _.find(rooms , a => a.id === room_id);
                res.locals.room = room ;
                next();
        })
        .get(function(req,res){
                res.render('edit',{baseUrl : req.baseUrl});
        })
        .post(function(req,res){
                res.locals.room.name = req.body.room_name;
                res.redirect(req.baseUrl + '/rooms');
        });

router.get('/users',function(req,res){
        res.render('users',{title: 'Users', baseUrl : req.baseUrl});
});