
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import gamil from '../images/gmail.png';
import logo from '../images/Sign up.svg';
import vector from '../images/Vector.svg';
import insta from '../images/insta.svg';
import apple from '../images/apple.svg';

const Signin = () => {
const initstate = {email:"",password:"",repassword:"" , mobile:"" }
const [data , setdata] = useState(initstate)
const auth = getAuth()
const handelchange = ({target})=>{
    setdata({
        ...data ,
        [target.name]:target.value
    })
}
const submit = async(e)=>{
    e.preventDefault()
    try {
        await createUserWithEmailAndPassword(auth , data.email, data.password , data.repassword , data.mobile)
    } catch (error) {
        console.log(error);
    }
  

  
}
  return (
    <main >
    <section className="section-img">
      <img src={logo} alt='' className="p-md-5 img-media"/>
    </section>
    <section className="justify-content-center  text-center">
      <div className="parent">

        <form className=" justify-content-center container-fluid" 
        onSubmit={submit}
        >
          <input
            className="form"
            type="email"
            name="email"
            placeholder="E-mail"
            aria-label="default input example"
            value={data.email}
            onChange={handelchange}
          />
          <input
            className="form"
            type="text"
            name="mobile"
            placeholder="Mobile number"
            aria-label="default input example"
            value={data.mobile}
            onChange={handelchange}
          />
          <input
            className="form"
            type="password"
            name="password"
            placeholder="Password"
            aria-label="default input example"
            value={data.password}
            onChange={handelchange}
          />
         <div className="m-auto" style={{position: "relative", width: "326px"}}>
           <input
          className="form"
          type="password"
          name="repassword"
          value={data.repassword}
          placeholder="re-enter Password"
          aria-label="default input example"
          onChange={handelchange}
        />
        <i className="fas fa-eye" style={{position: "absolute", bottom:"25px" , right: "25px"}}></i>
      </div>
      <div className="login-btn justify-content-center">
      <button>
          Create Account
      </button>
      <p className="trem-of-us">By clicking create account, you are indicating that you have read and acknowledge the <a href="/" >terms of use </a> and <a href="/" >privacy policy.</a></p>

      <div className="Continue ">
        <span>have Account Already ? <NavLink to="/login">Login</NavLink></span>
    </div>
    </div>
        </form>
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

export default Signin
