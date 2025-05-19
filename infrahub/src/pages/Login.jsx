import React, {useState} from 'react'
import {supabase} from '../client'
import {Link, useNavigate} from 'react-router-dom'

import './Login.css'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if(data) {
            navigate("/dashboard");
        }

        // change fields to empty after submit
        setEmail("");
        setPassword("");
    };

    return (
        <div>
            <h1>  🏙️ Welcome Back to Infrahub! 🏗️ </h1>
            <h2 className="auth-title"> Account Login: </h2>

            <div className="auth-message">
                {message && <span>{message}</span>}
            </div>
            <div className="auth-container">
                <form className="credentials-form" onSubmit={handleSubmit}>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        type="email" 
                        placeholder="Email"
                        required
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button className="auth-button" type="submit"> Log in</button>
                </form>

                <h3> Don't have an account? </h3>
                <Link to="/register"> Register here! </Link>
            </div>

        </div>
    )
}

export default Login;