import React,{useState} from "react";
import { LoginAPI,GoogleSignInAPI} from "../api/AuthAPI";
import logo from "../assets/frame.png";
import sslogo from "../assets/skillsync-logo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

export default function LoginComponent(){
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({});
    const login = async () =>{
        try {
            let res = await LoginAPI(credentials.email,credentials.password);  
            toast.success("Signed In To Skill-sync");
            localStorage.setItem('userEmail',res.user.email);
            navigate("/home");
        } 
        catch (err) {
            toast.error("Invalid username or password");
        }
    };
    const googleSignIn = () => {
        let response=GoogleSignInAPI();
        console.log(response);
    };
    return (
            <div className="login container-fluid 
            d-sm-flex justify-content-sm-center align-items-sm-center p-0 p-lg-3
            ">
                <div className="data-container  
                                p-0 p-sm-3
                                my-0 my-sm-5 
                                mx-sm-5 
                                w-100 w-md-75
                                h-100
                                flex-md-row flex-column
                                 ">
                        <div className="image 
                                        col-md-6 col-0 
                                        d-flex justify-content-center align-items-center flex-column
                                        bg-dark bg-opacity-50
                                        ">  
                                        {/* <h1 class>WELCOME TO </h1> */}
                                        <img src={sslogo} alt="" className="ssLogo" />
                                        </div>
                        <div className="data 
                                        col-md-6 col-12 
                                        d-flex justify-content-center align-items-center
                                        bg-dark  bg-opacity-50
                                        "> 
                            <div className="login-wrapper">
                            <img src={logo} className="logo"/>
                            <h1 className="heading">Sign in</h1>
                            <p className="subHeading">Stay updated on your professional world</p>
                            <div className="auth-inputs">
                                    <input 
                                        onChange={(event)=>
                                            setCredentials({...credentials,email:event.target.value})
                                        }
                                        type="email"
                                        className="common-input"
                                        placeholder="Email or Phone"
                                    />
                                    <input 
                                        onChange={(event)=>
                                            setCredentials({...credentials,password:event.target.value})
                                        } 
                                        type="password"
                                        className="common-input"
                                        placeholder="Password"
                                    />
                                </div>
                                <button className="login-btn" 
                                    onClick={login}
                                >
                                    Sign in
                                </button>
                               <hr class="hr-text" data-content="or"/>
                                <div className="google-btn-container">
                                <GoogleButton class="google-btn"
                                    onClick={googleSignIn}
                                />
                                <p className="go-to-signup">New to Skill-Sync?<span className="join-now" onClick={() => navigate("/register")} > Join now</span></p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
    );
}