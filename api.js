var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');
var bodyparser = require('body-parser');
var users = require('./data/users.json');

var rooms = require('./data/rooms.json');
var messages = require('./data/messages.json');

var router = express.Router();
module.exports = router;

router.use(bodyparser.json({extended : true}));
router.get('/rooms',function(req,res){
    res.json(rooms);
});

router.route('/rooms/:roomId/messages')
    .all(function(req,res,next){
        var room_msg = messages
            .filter(r => r.roomId == req.params.roomId)
            .map(r => {
                var user = _.find(users, u => u.id === r.userId);
                return {text: `${user.name}: ${r.text}`};
            });
        var room_temp = rooms.filter(s => s.id === req.params.roomId);
        res.locals.room_temp = room_temp;
        res.locals.room_msg = room_msg;
        next();
    })
    .get(function(req,res){
        res.json({
            room : res.locals.room_temp,
            messages : res.locals.room_msg
        });
    })
    .post(function(req,res){
        var message =  {
            text : req.body.text,
            roomId : req.params.roomId,
            userId: req.user.id,
            id : uuid.v4()
        }
        messages.push(message);
        res.sendStatus(200);
    })
    .delete(function(req,res){
        res.locals.room_temp = rooms.filter(r => r.id !== req.params.roomId);
        res.sendStatus(200);
    });