let socket = io();
//when a comment is received from the server
socket.on("comment", function(commentObject){
    console.log(commentObject);
});
function sendCommentToServer(name, email, message){
    let commentObject = {
        "name" : name,
        "email" : email ,
        "message" : message
    };
    socket.emit("comment", commentObject);
}
window.onload = function () {
    sendCommentToServer("vishal", "vish@gmail.com", "hello there");
};