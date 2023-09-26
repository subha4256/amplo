import styled from 'styled-components';

export const  FooterDiv = styled.div`
.signup-footer {
    background-color: #000;
    color: #fff;
    padding: 32px 40px;
}

.signup-footer .footer-right {
    border-left: 1px #979797 solid;
    padding-left: 40px;
}

.signup-footer .footer-right .copyright {
    font-size: 12px;
    margin-top: 15px;
}

.signup-footer .footer-right h4 {
    font-size: 24px;
    font-weight: 700;
    margin-top: 10px;
}

.signup-footer .footer-left .social-list li {
    margin-right: 30px;
}

.signup-footer .footer-left .social-list li a {
    color: #fff;
    font-size: 30px;
    transition: all 1s;
}

.signup-footer .footer-left .social-list li a:hover,
.signup-footer .footer-left .footer-text a:hover {
    color: #007bff;
}

.signup-footer .footer-left .footer-text a {
    font-size: 12px;
    color: #fff;
    transition: all 1s;
    text-transform: uppercase;
}
.footer-right .diva-logo {
    width: 135px;
}

@media (max-width: 767px) {
    .signup-footer {
        padding: 32px 0px;
        text-align: center;
    }
    .signup-footer .footer-right {
        border-left: 0px #979797 solid;
        padding-left: 0;
    }
}`;