import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';
export default class Header extends React.Component{
    constructor(props){
           super(props);
    }
    render(){
        return(
          
            <nav className="navbar">
            <div className="navbar-header">
             <a className="navbar-brand diva" href="#"><img className="diva-logo" src={ require('../../common/images/amplofly-logo') }
												alt="AmploFly 4.0" /></a>
           </div>
       
          
           <ul className="navbar-right">
             <li className="new-user">New User?</li>
             <li  className="user-registration"><Link to="/registration">REGISTER</Link></li>
           </ul>
        </nav>
          
    );
    }

}
