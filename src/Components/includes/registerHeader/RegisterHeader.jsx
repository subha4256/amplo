import React from 'react';
import {Link} from 'react-router-dom';
import './registerHeader.css';
export default class Header extends React.Component{
    constructor(props){
           super(props);
    }
    render(){
        return(
          
            <nav className="navbar">
            <div className="navbar-header">
             <a className="navbar-brand diva" href="#"><img className="diva-logo" src={ require('../../common/images/amplofly-logo.png') }
												alt="AmploFly 4.0" /></a>
           </div>
       
          
           <ul className="navbar-right">
             <li className="have-account">Have an Account ?</li>
             <li  className="user-registration"><Link to="/login">LOG IN</Link></li>
           </ul>
        </nav>
          
    );
    }

}
