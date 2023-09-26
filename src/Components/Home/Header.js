import React from 'react';
import { Link } from "react-router-dom";
import CacheStorage from '../../utils/CacheStorage';
const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-signup">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand DIVA" to="/"><img className="diva-logo" src={ require('../../common/images/amplofly-logo.png') }
												alt="AmploFly 4.0" /></Link>
                    </div>
                    <div className="navbar-left" id="navbarleft">
                        <a href="#why-diva" className="top-link active"  >WHY AmploFly 4.0</a>
                        <a href="#" className="top-link">REQUEST DEMO</a>
                        <a target="_blank" href="https://amploglobal.com/contact.html" className="top-link">CONTACT US</a>
                    </div>
                    {
                        !CacheStorage.getItem("userToken") ? (
                            <ul className="list-inline ml-auto navright">
                                <li className="list-inline-item"><Link to="/login" className="login-link">LOG IN</Link></li>
                                <li className="list-inline-item"><Link to="/registration" className="login-btn">REGISTER</Link></li>
                            </ul>
                        ) : <></>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header;