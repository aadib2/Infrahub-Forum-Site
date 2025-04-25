import React from 'react'
import {Link, Outlet} from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <div>
                <nav className="nav-bar">
                    <h2 className="site-title"> InfraHub</h2>
                    <div className="links">
                    <Link to={'/'}> Home </Link>
                    <Link to={'/about'}> About </Link>
                    <Link to={'/create-post'}> Create New Post</Link>
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
