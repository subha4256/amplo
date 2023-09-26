import React from "react";
import login_image from "../../../common/images/login_image.png";
import {HeaderNav} from "./headerStyling";
import { Link } from "react-router-dom";


export default class Header extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }
  render() {
      return(
    <HeaderNav>
    <nav className="navbar navbar-signup">
      <div className="navbar-header">
        <Link className="navbar-brand DIVA" to="/"><img className="diva-logo" src={ require('../../../common/images/amplofly-logo.png') }
												alt="AmploFly 4.0" /></Link>
      </div>
      {this.props.pathName=='/registration'?
       <ul className="list-inline ml-auto">
       <li className="list-inline-item"><span>Have an account?</span></li>
       <li className="list-inline-item"><Link to="/login" className="login-btn">LOG IN</Link></li>
     </ul>:
       <ul className="list-inline ml-auto">
       <li className="list-inline-item"><span>New User?</span></li>
       <li className="list-inline-item"><Link to="/registration" className="login-btn">REGISTER</Link></li>
     </ul>
      }
     
    </nav>
  </HeaderNav>
      );
  }
}