import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState(""); // client에서 서버로 보내는 값을 state가지고있음
    const [Password, setPassword] = useState("");

    const onEmailHandler = event => {
        setEmail(event.currentTarget.value)
    }
    
    const onPasswordHandler = event => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = event => {
        event.preventDefault() // 페이지 refresh 방지

        let body = { // client 보내는 값 body에 넣어줌
            email : Email,
            password : Password
        }

        //redux 사용
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/') //페이지 이동시 사용
                } else {
                    alert('Error')
                }
            })
           
    }

    return (
        <div style ={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br/>
                <button type="submit">
                    login
                </button>

            </form>
        </div>
    )
}

export default LoginPage
