const express = require('express'); //express 모듈 가져오기
const app = express(); //express 앱생성하기
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { auth } = require("./middleware/auth")
const { User } = require("./models/User");

//application/x-www-form-urlencoded 데이터를 분석해서 가져오게함
app.use(bodyParser.urlencoded({extended:true})); 
//application/json 데이터를 분석해서 가져옴
app.use(bodyParser.json());

app.use(cookieParser())

const mongoose = require('mongoose'); //mongoose 모듈 가져오기
mongoose.connect('mongodb+srv://gktnwls1127:hasujin1104^^@cluster0-6fuda.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false //에러방지
}).then(() => console.log('MongoDB Connected...')) // DB연결 확인
  .catch(err => console.log(err))  

app.get('/', (req, res) => res.send('Hello World! asdf asdf')); //페이지에 hello world 출력

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요~")
})

app.post('/api/users/register', (req, res) => { //Register Route 생성

  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다

  const user = new User(req.body) //req.body client에서 오는 정보 받아줌
  console.log("req.body", req.body);
  

  user.save((err, userInfo) => {
    if(err) return res.json({success : false, err})
    console.log(123);
    
    return res.status(200).json({ // 저장 성공
      success : true
    })
  }) //몽고 DB 메소드 데이터 베이스 저장
})

app.post('/api/users/login', (req, res) => {

  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email : req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => { //comparePassword메소드 User에 있음
      if(!isMatch) //일치하지 않을 경우
      return res.json({loginSuccess : false, message:"비밀번호가 틀렸습니다."})
      
      // 비밀번호까지 같다면 user를 위한 token을 생성하기
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth", user.token) // 쿠키에 저장
          .status (200)
          .json({loginSuccess : true, userId : user._id})
      })

    })

  })

})

// role 1 : admin , role 2 : 특정부서 admin, 
// role 0 : 일반 유저
app.get('/api/users/auth', auth, (req, res) => {

  //여기까지 미들웨어를 통과해왔다는 얘기는 Authntication이 True라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })

})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id},
    {token: ''}
  , (err, user) => {
    if (err) return res.json({success : false, err})
    return res.status(200).send({
      success : true
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 