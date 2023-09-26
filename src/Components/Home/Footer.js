import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = (props) => {
    return (
        <footer className="signup-footer">
            <div className="container-fluid">
                <Row>
                    <Col md="6" className="footer-left">
                        <ul className="list-inline social-list">
                            <li className="list-inline-item">
                                <a href="#"><i className="fab fa-twitter"></i></a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#"><i className="fab fa-facebook-square"></i></a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                            </li>
                        </ul>
                        <p className="footer-text"><a href="#"> TERMS OF SERVICE</a> | <a href="#"> PRIVACY POLICY</a></p>

                    </Col>
                    <Col md="6" className="footer-right">
                        <h4><img className="diva-logo" src={ require('../../../common/images/amplofly-white.png') }
                      alt="AmploFly 4.0" /></h4>
                        <p className="copyright"> &copy; { (new Date()).getFullYear() } Amplo (AmploFly 4.0). All rights reserved.</p>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default Footer;