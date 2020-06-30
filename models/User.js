const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name : {
        type: String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 5
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }

})

const User = mongoose.model('User', userSchema); // userSchema를 User모델로 담아줌
module.exports = {User} // User모델을 다른곳에서도 사용할수 있게 함