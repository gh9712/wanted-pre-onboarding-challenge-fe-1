import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const params = {
        email:email,
        password: password
    }
    let navigate = useNavigate();
  

    useEffect(()=>{
        if(localStorage.getItem('wanted_auth')){
            navigate("/");
        }
    },[])
    const login = () =>{
        axios.post('/users/login',params).then(res=>{
            const {data} = res;
            if(data){
                if(data.message) alert(data.message);
                if(data.token) localStorage.setItem('wanted_auth',data.token);
                navigate("/");
            }
        }).catch(err=>{
            if(err.response.data){
                alert(err.response.data.details);
            }
        })
    }
    const signUp = () => {
        axios.post('/users/create',params).then(res=>{
            const {data} = res;
            if(data){
                if(data.message) alert(data.message);
            }
        }).catch(err=>{
            if(err.response.data){
                alert(err.response.data.details);
            }
        })
    }
    return (
      <div>
          <input type="text" placeholder="이메일 입력" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
          <input type="text" placeholder="비밀번호 입력" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          <button type="button" onClick={login} disabled={!(email && email.trim() !=='' && email.indexOf('@') !== -1 && email.indexOf('.')!== -1 && password && password.trim() !== '' && password.trim().length >7)}>로그인</button>
          <button type="button" onClick={signUp} disabled={!(email && email.trim() !=='' && email.indexOf('@') !== -1 && email.indexOf('.')!== -1 && password && password.trim() !== '' && password.trim().length >7)}>회원가입</button>
      </div>
    );
  }
  
  export default Login;