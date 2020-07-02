import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState(""); // client에서 서버로 보내는 값을 state가지고있음
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = event => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = event => {
        setName(event.currentTarget.value)
    }
    
    const onPasswordHandler = event => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = event => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = event => {
        event.preventDefault() // 페이지 refresh 방지

        if(Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }

        let body = { // client 보내는 값 body에 넣어줌
            email : Email,
            password : Password,
            name : Name
            
        }

        //redux 사용
        dispatch(registerUser(body))
            .then(response => {
                console.log(response.payload);
                
                if(response.payload.success){
                    props.history.push('/login') //페이지 이동시 사용
                } else {
                    alert('Failed to sign up')
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Comfirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br/>
                <button type="submit">
                    회원가입
                </button>

            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
