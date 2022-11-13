import React, { useState } from 'react'
import { NavLink, useNavigate} from "react-router-dom"
import  "../index.css"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import gamil from '../images/gmail.png';
import logo from '../images/blake-wisz-Xn5FbEM9564-unsplash 1.png';
import vector from '../images/Vector.svg';
import insta from '../images/insta.svg';
import apple from '../images/apple.svg';
import { ReportUserName } from '../AthunkSore/Report';
const Login = () => {
  const history = useNavigate()
  const initstate = {email:"",password:"",repassword:"" , mobile:"" }
  const [data , setdata] = useState(initstate)
  const [Error , setError] = useState("")
  const dispatch = useDispatch()
  const auth = getAuth()
  const handelchange = ({target})=>{
    setdata({
        ...data ,
        [target.name]:target.value
    })
}

const submit = (e)=>{
 
  e.preventDefault()

  signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
  
    history("/home")
    dispatch(ReportUserName({UserName:user.email.split("@")[0]
    }) )
    setTimeout(() => {
      dispatch(ReportUserName({}));
    }, 5000);
    // ...
  })
  .catch((error) => {
    setError("User Name Or Password Correct")

  });





}
  return (
    <main>
      <section className="section-img">
        <img src={logo} alt='img'/>
      </section>
      <section className="section-login">
        <div className="parent">
          <div className="btn-parent">
            <NavLink to="/login" className="login active">Login</NavLink>
            <NavLink to="/signin" className="login ">Sign up</NavLink>
          </div>
          <span className="started">Let's Get Started</span>

          <form className="col-11 justify-content-center container-fluid" 
          onSubmit={submit}
          >
            <input
              className="form"
              type="text"
              name='email'
              placeholder="E-mail / Mobile number"
              aria-label="default input example"
              onChange={handelchange}
            />
            <input
              className="form"
              type="text"
              name='password'
              onChange={handelchange}
              placeholder="Password"
              aria-label="default input example"
              
            />
            <i className="fas fa-eye" ></i>
            <div className="login-btn d-flex justify-content-center ">
            <button >
                Login
            </button>
           
        </div>
          </form>
          <span className='d-block text-center text-danger'>{Error}</span>
          <div className="Continue">
          <a href="/" classNameName="forget-password">Forget Password ?</a>
              <span>Or Continue with</span>
          </div>
          <footer>
          <div className="container footer-div d-flex justify-content-between col-xxl-12">
              <div className="d-flex justify-content-center align-items-center"><img src={vector} alt=""/></div>
              <div className="d-flex justify-content-center align-items-center"><img src={apple} alt=""/></div>
              <div className="d-flex justify-content-center align-items-center"><img src={insta} alt=""/></div>
              <div className="d-flex justify-content-center align-items-center"><img src={gamil} alt=""/></div>
          </div>
      </footer>
        </div>
       
    </section>
    
  
    </main>
  )
}

export default Login
