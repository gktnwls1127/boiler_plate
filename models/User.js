const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

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

userSchema.pre('save', function(next){
    var user = this;

    // 비밀번호 바꿀때만이란 조건
    if(user.isModified('password')){
        
        //비밀번호를 암호화 시킨다. 
        bcrypt.genSalt(saltRounds, function(err, salt) { //salt 생성하기 
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, function(err, hash){ // schema의 password가져오기
                if(err) return next(err)
                user.password = hash // user password들 hash로 교체
                next();
            })
        })
    } else { // 비밀번호 외의 것을 변경할때,
         next()
    }

})

//comparePassword  메소드 생성하기
userSchema.methods.comparePassword = function(plainPassword, cb){

    //비밀번호 비교하기 plainPassword vs 암호화된 비밀번호 
    //plainPassword 를 암호화하고 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch) // 에러는 null 비밀번호는 같음
    })

}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    // jsonwebtoken을 사용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token  
    // 'secretToken' -> user._id  누구인지 알게된다

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null, user) // 토큰 전달 성공시 error는 null, user정보 전달
    })

}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //user._id + '' = token
    //토큰을 decode한다
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token" : token}, function(err, user) {
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema); // userSchema를 User모델로 담아줌
module.exports = {User} // User모델을 다른곳에서도 사용할수 있게 함