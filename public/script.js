window.onload = function () {
    let socket = io();
    let str = document.getElementById("templete-element").innerHTML;
    let comment_list_ul = document.getElementById("comment-list-ul");
    let name = document.getElementById("nameField");
    let email = document.getElementById("emailField");
    let message = document.getElementById("messageField");

    function initializeComments(commentListArray) {
        let text = "";
        let temp;
        commentListArray.forEach(function (ele) {
            temp = str.replace("{{name}}", ele.name);
            temp = temp.replace("{{email}}", ele.email);
            temp = temp.replace("{{message}}", ele.message);
            text += "<li>" + temp + "</li>";
        });
        comment_list_ul.innerHTML = text;
    }

    function addOneComment(commentObject) {
        let temp;
        temp = str.replace("{{name}}", commentObject.name);
        temp = temp.replace("{{email}}", commentObject.email);
        temp = temp.replace("{{message}}", commentObject.message);
        let li = document.createElement("li");
        li.innerHTML = temp;
        comment_list_ul.insertBefore(li, comment_list_ul.childNodes[0]);
    };

    //When a new user is connected for the first time. to be called only after declaring str
    socket.on("initialization", function (commentListArray) {
        initializeComments(commentListArray);
    });

    //when a comment is received from the server
    socket.on("comment", function (commentObject) {
        addOneComment(commentObject);
    });

    function sendCommentToServer(name, email, message) {
        let commentObject = {
            "name": name,
            "email": email,
            "message": message
        };
        socket.emit("comment", commentObject);
    };

    document.getElementById("commentForm").addEventListener("submit", function (event) {
        event.preventDefault();
        sendCommentToServer(name.value, email.value, message.value);
    });
};