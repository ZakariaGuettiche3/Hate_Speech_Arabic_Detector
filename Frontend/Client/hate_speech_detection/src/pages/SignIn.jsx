import React, { useEffect, useState } from "react";
import "../Styles/SignIn.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

function SignIn() {
  const [error, setError] = useState(false);
   const [datas,setexis] = useState("");
   
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()
  const [user,setuser] = useState({email: "",
          password: ""
      });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/login/', 
            {
                "email": user.email,
                "password": user.password
              },
            { withCredentials: true }
        );
        const data = response.data;
        
        if (response.status === 200) {
            console.log()
            Cookies.set('useremail', data.user_email);
            Cookies.set('token', data.access);
            Cookies.set('userName', data.username);
            Cookies.set('id',data.id)
            window.location.replace("/dashboard");

        } 
    } catch (error) {
        setexis(error.response.data.detail);
        
        console.error(error.response.data.detail);
    }
};
  useEffect(() => {
    const inputs = document.querySelectorAll(".specinput input");
    const labels = document.querySelectorAll(".specinput span");
    
    const handleFocus = (index) => {
      labels[index].classList.add("active");
    };
    
    const handleBlur = (index, input) => {
      if (!input.value) {
        labels[index].classList.remove("active");
      }
    };
    
    inputs.forEach((input, index) => {
      input.addEventListener("focus", () => handleFocus(index));
      input.addEventListener("blur", () => handleBlur(index, input));
      
      // Initialize labels if input has value (e.g., saved login)
      if (input.value) {
        labels[index].classList.add("active");
      }
    });
    
    return () => {
      inputs.forEach((input, index) => {
        input.removeEventListener("focus", () => handleFocus(index));
        input.removeEventListener("blur", () => handleBlur(index, input));
      });
    };
  }, []);
  
  return (
    <div className="holder f-centre">
      <div className="Form1">
        <p className="t-c">Sign in to Your Account</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="specinput">
            <i className="fa-regular fa-envelope"></i>
            <input type="email" required onChange={(e) => setuser(prev => ({ ...prev, email: e.target.value }))}/>
            <span>Email</span>
          </div>
          <div className="specinput">
            <i className="fa-solid fa-lock"></i>
            <input type={showPassword ? "text" : "password"} required onChange={(e) => setuser(prev => ({ ...prev, password: e.target.value }))}/>
            <span>Password</span>
            <i 
              className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
          </div>
          {<span className="error-label">{datas}</span>}
          <p>Forgot your password?</p>
          <button type="submit" className="specbtn" onClick={handleSubmit}>SIGN IN</button>
          {error && <div className="Error">Password incorrect</div>}
        </form>
      </div>
    </div>
  );
}

export default SignIn;