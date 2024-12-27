import React from "react";
import '../App.css';

const Login = () => {
    return (
        <div className="login-box">
            <h2>Welcome!</h2>
            <input type="text" placeholder="Username"/><br/>
            <input type="password" placeholder="Password"/><br/>
            <button>Login</button>
        </div>
    )
}
export default Login;