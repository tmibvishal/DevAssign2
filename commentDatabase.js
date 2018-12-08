//This for now is a temporary solution for database. I will be using a sql database

let commentListArray = [{"name" : "Piyush", "email" :"Piyush@gmail.com" ,"message" :"Ya Vishal. This live comment box is really lit"}, {"name" : "Vishal", "email" :"tmibvishal@gmail.com" ,"message" :"Hi. This is a live comment box. This uses socket.io for live comments."}];

function add(commentObject){
    //verifying that the object is of the required form
    ["name", "email" , "message"].forEach(function(ele){
        if(commentObject[ele] == null){
            return;
        }
    })
    commentListArray.unshift(commentObject);
}

function get() {
    return commentListArray;
}

module.exports = {
    add, get
}