const express = require('express'); //express 모듈 가져오기
const app = express(); //express 앱생성하기
const port = 5000;

const mongoose = require('mongoose'); //mongoose 모듈 가져오기
mongoose.connect('mongodb+srv://gktnwls1127:hasujin1104^^@cluster0-6fuda.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false //에러방지
}).then(() => console.log('MongoDB Connected...')) // DB연결 확인
  .catch(err => console.log(err))  

app.get('/', (req, res) => res.send('Hello World!')); //페이지에 hello world 출력

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 