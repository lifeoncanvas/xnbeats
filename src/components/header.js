import React from 'react';
import {Link} from 'react-router-dom';

const Header = props => {
    const {isAuth} = props.auth;
    return (
      <>
        <header>
            <nav className="site-header sticky-top py-1">
                <div className="container d-flex flex-column flex-md-row justify-content-between">
                    <Link className="logo" to="/" aria-label="Product">
                        XN<span>B</span>
                    </Link>
                    <Link className="mt-4"  to="/">Home</Link>
                    <Link className="mt-4"  to="/contact">Contact</Link>
                    { isAuth ?
                        <>  
                            <Link className="mt-4 header_btn"  to="/dashboard">Dashboard</Link> 
                            <div
                                className="mt-4 header_btn"
                                onClick={props.logout}
                            >
                                Logout
                            </div>      
                        </>
                        :
                        <Link className="mt-4"  to="/login">Login</Link>                
                    }
                           
                </div>
            </nav>
        </header>
      </>
    )
}

export default Header;
