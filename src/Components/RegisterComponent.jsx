import React,{useState} from "react";
import { RegisterAPI,GoogleSignInAPI} from "../api/AuthAPI";
import logo from "../assets/frame.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
// import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { postUserData } from "../api/FirestoreAPI";
import { getUniqueID } from "../helper/getUniqueId";
 
export default function RegisterComponent(){
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({});
    const register = async () =>{
        try {
            let res = await RegisterAPI(credentials.email,credentials.password);  
            toast.success("Account Created");
            postUserData({
                name : credentials.name , 
                email : credentials.email, 
                userID : getUniqueID(),
                });
            localStorage.setItem('userEmail',res.user.email);
            navigate("/home");
        } 
        catch (err) {
            toast.error("Can not create your Account.");
        }
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
                                 ">
                        <div className="image 
                                        col-md-6 col-0 
                                        ">  
                                        
                                        </div>
                        <div className="data 
                                        col-md-6 col-12 
                                        d-flex justify-content-center align-items-center
                                        "> 
                            <div className="login-wrapper">
        <img src={logo} className="logo"/>
        <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>
        <div className="auth-inputs">
            <input 
                onChange={(event)=>
                    setCredentials({...credentials,name:event.target.value})
                }
                type="text"
                className="common-input"
                placeholder="Your Name"
            />
            <input 
                onChange={(event)=>
                    setCredentials({...credentials,email:event.target.value})
                }
                type="email"
                className="common-input"
                placeholder="Email or Phone number"
            />
            <input 
                onChange={(event)=>
                    setCredentials({...credentials,password:event.target.value})
                }
                type="password"
                className="common-input"
                placeholder="Password(6 or more characters)"
            />
         </div>
        <button className="login-btn" 
            onClick={register}
        > 
            Agree & Join
        </button>
        </div>
        <hr class="hr-text" data-content="or"/>
        <div className="google-btn-container">
        <p className="go-to-signup">Already on Skill-Sync?<span className="join-now" onClick={() => navigate("/")} > Sign in</span></p>
        </div>
    </div>
                        </div>
                </div>
            </div>
    
    );
}