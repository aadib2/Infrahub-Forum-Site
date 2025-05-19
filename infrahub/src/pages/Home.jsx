import React from 'react'
import {Link} from 'react-router-dom'

import './Home.css'

function Home() {
    return (
        <div className = "background">
            <div className="landing-container">
                <div className="landing-content">
                    <h1 className="landing-title">🏗️ Welcome to InfraHub</h1>
                    <p className="landing-subtitle">
                        Connect, discuss, and be inspired by the world of infrastructure and architecture around the world 🌎.
                    </p>
                    <div className="landing-buttons">
                        <Link to="/register" className="landing-btn register-btn">
                            Register
                        </Link>
                        <Link to="/login" className="landing-btn login-btn">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;