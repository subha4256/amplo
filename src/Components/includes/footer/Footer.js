import React from "react";
import {FooterDiv} from "./footerStyling"

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return(
        <FooterDiv>
        <footer className="signup-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 footer-left">
              <ul className="list-inline social-list">
                <li className="list-inline-item">
                  <a target="_blank" href="https://twitter.com/amploglobal"><i className="fab fa-twitter"></i></a>
                </li>
                <li className="list-inline-item">
                  <a target="_blank" href="https://www.facebook.com/amploglobal/"><i className="fab fa-facebook-square"></i></a>
                </li>
                <li className="list-inline-item">
                  <a target="_blank" href="https://www.linkedin.com/company/amploglobal/"><i className="fab fa-linkedin"></i></a>
                </li>
              </ul>
              <p className="footer-text"><a href="#"> TERMS OF SERVICE</a> | <a href="#"> PRIVACY POLICY</a></p>
    
            </div>
            <div className="col-md-6 footer-right">
              <h4><img className="diva-logo" src={ require('../../../common/images/amplofly-white.png') }
                      alt="AmploFly 4.0" /></h4>
              <p className="copyright"> &copy; { (new Date()).getFullYear() } Amplo (AmploFly 4.0). All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      </FooterDiv>
      );
  }
}