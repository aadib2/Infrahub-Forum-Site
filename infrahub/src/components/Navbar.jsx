import React from 'react'
import { supabase } from '../client'
import {Link, Outlet, useNavigate} from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {

    const navigate = useNavigate();
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error) throw error;
        navigate("/login");
      };

    return (
        <>
            <div>
                <nav className="nav-bar">
                    <h2 className="site-title"> InfraHub</h2>
                    <div className="links">
                    <Link to={'/dashboard'}> Home </Link>
                    <Link to={'/dashboard/about'}> About </Link>
                    <Link to={'/dashboard/create-post'}> Create New Post</Link>
                    <button className="sign-out-button" onClick={signOut}> Sign Out</button>
                    </div>
                </nav>

            </div>
            <div className="content">
                <Outlet/>
            </div>

        </>

    )
}

export default Navbar;
