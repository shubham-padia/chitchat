$(function () {

    var roomId;

    $.ajax({
        type: "GET",
        url: "/api/rooms"
    }).done(function (rooms) {
        roomId = rooms[0].id;
        getMessages();
        $.each(rooms, function (key, room) {
            var a = '<a href="#" data-room-id="' + room.id + '" class="room list-group-item">' + room.name + '</a>';
            $("#rooms").append(a);
        });

    });

    $("#post").click(function () {
        var message = {text: $("#message").val()};

        $.ajax({
            type: "POST",
            url: "/api/rooms/" + roomId + "/messages",
            data: JSON.stringify(message),
            contentType: "application/json"
        }).done(function () {
            $("#message").val("");
            getMessages();
            console.log("it were fetched");
        });
    });

    $('body').on('click', 'a.room', function (event) {
        roomId = $(event.target).attr("data-room-id");
        getMessages();
    });

    function getMessages() {
        
        $.ajax({
            type: "GET",
            url: "/api/rooms/" + roomId + "/messages",
        }).done(function (data) {
            console.log("messsages were fetched");  
            $("#roomName").text("Messages for " + data.room[0].name);
            var messages = "";
            $.each(data.messages, function (key, message) {
                messages +=  message.text + "\r";
            });
            $("#messages").val(messages);
        });
    }

    $("#delete").click(function(){
        $.ajax({
            type: "DELETE",
            url: "/api/rooms/" + roomId + "/messages",
        }).done(function () {
            $("#messages").val("");
        });
    });


});