import React, { use, useEffect, useState } from "react";
import "../Styles/Login.css";
import Cookies from 'js-cookie';
import axios from 'axios';


function Login() {
    const [error, setError] = useState(false);
    const [open, SetOpen] = useState(false);
    const [exis,setexis] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [user,setuser] = useState({email: "",
        password: "",
        username: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/registre/', 
                {
                    "email": user.email,
                    "password": user.password,
                    "username": user.username,
                    "role": "user"
                  },
                { withCredentials: true }
            );
            const data = response.data;
            console.log(response.status)
            if (response.status === 201) {
                console.log(data)
                Cookies.set('userName', data[0].email);
                Cookies.set('userid', data[0].id);
                Cookies.set('token', data[1].access);
                window.location.replace("/dashboard");
            } else {

                setexis(true);
            }
        } catch (error) {
            setexis(true);

            console.error('Login failed:', error);
        }
    };
   
    useEffect(() => {
        let inpu = document.querySelectorAll(".specinput input");
        let spa = document.querySelectorAll(".specinput span");
        inpu.forEach((e, index) => {
            e.addEventListener("focus", () => {
                spa[index].classList.add("active");
            });
        });
    }, []);
    return (
        <div className="holder f-centre ">
            <div className="Form1 login1">
                <p className="t-c">Create an Account to Begin</p>
                <form action="">
                    <div className="bigSlider">
                        <div className="slider">
                            <div className="specinput">
                                <input type="text" onChange={(e) => setuser(prev => ({ ...prev, username: e.target.value }))} required/>
                                <span>Username</span>
                            </div>
                            {/* <div className="specinput">
                                <input type="text" />
                                <span>Your LastName</span>
                            </div> */}
                            {/* <div className="specinput">
                                <input type="Date" />
                                <span className="active">Your BirthDate</span>
                            </div> */}
                            {/* <div className="specinput">
                                <input type="text" />
                                <span>Address</span>
                            </div> */}
                        </div>
                        <div className="slider">
                            {/* <div className="specinput">
                                <input type="text" />
                                <span>Your Place of Birth</span>
                            </div> */}
                            {/* <div className="specinput">
                                <input type="text" />
                                <span>your Sex</span>
                            </div> */}

                            <div className="specinput">
                                <input type="email" onChange={(e) => setuser(prev => ({ ...prev, email: e.target.value }))} required/>
                                <span>Email</span>
                            </div>
                            {exis && <span className="error-label">Email already taken.</span>}
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

          <div className="specinput">
            <i className="fa-solid fa-lock"></i>
            <input type={showPassword ? "text" : "password"} required />
            <span>Confirm Password</span>
            <i 
              className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
          </div>
                            {/* <div className="specinput">
                <input type="text" />
                <span>Phone numbre</span>
              </div> */}
                            {/* <div className="specinput">
                                <input type="text" />
                                <span>Your Job</span>
                            </div> */}
                            {/* <div className="specinput">
                                <input type="text" />
                                <span>Your card numbre</span>
                            </div> */}
                            {/* <div className="specinput">
                                <input
                                    type="file"
                                    style={{
                                        opacity: "0",
                                    }}
                                />
                                <span className="imagedonw">Chose Your photo</span>
                            </div> */}
                        </div>
                    </div>
                    <p  style={{
                            color: "white",
                        }}>Forgot your password?</p>
                    <button
                        className="specbtn"
                        style={{
                            marginBottom: "40px",
                        }}
                        onClick={handleSubmit}
                    >
                        SIGN UP
                    </button>
                    {error && <div className="Error">password incorrcet</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;
