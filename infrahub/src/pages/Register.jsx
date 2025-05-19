import React, {useState} from 'react'
import {supabase} from '../client'
import {Link} from 'react-router-dom'


function Register() {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {display_name: displayName }
            }
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if(data) {
            setMessage("User Account Created!");
        }

        // change fields to empty after submit
        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    return (
        <div>
            <h1>  🏙️ Welcome to Infrahub! 🏗️ </h1>
            <h2 className="auth-title"> Register Below! </h2>
            <div className="auth-message">
                {message && <span>{message}</span>}
            </div>

            <div className = "auth-container">
            <form className="credentials-form" onSubmit={handleSubmit}>

                <input 
                    onChange = {(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    type="text"
                    placeholder="Display Name"
                    required
                />
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
                <button className="auth-button" type="submit"> Create Account</button>
            </form>

            <h3> Already have an account? </h3>
            <Link to="/login"> Log In. </Link>

            </div>

        </div>
    )
}

export default Register;