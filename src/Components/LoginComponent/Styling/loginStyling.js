/* dashboard header css */
import styled from 'styled-components';

export const LoginDiv = styled.div`

.container-signup {
    padding: 0;
  }
  
  .signup-row {
    display: flex;
    justify-content: space-between;
  }
  
  .signup-row .signup-content-left .img-head {
    background-color: #083ac8;
    padding: 30px;
    color: #fff;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
  
  .signup-row .signup-content-left .img-head h1 {
    font-size: 40px;
    font-weight: 700;
  }
  
  .signup-row .signup-content-left .img-head p {
    font-size: 13px;
  }
  
  .signup-content-left,
  .signup-content-right {
    width: 50%;
  }
  
  .signup-content-right {
    padding-left: 50px;
  }
  
  .img-login {
    width: 100%;
  }
  
  .signup-content-right h2 {
    font-size: 30px;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -0.09px;
    color: #212529;
  }
  .text-danger {
    font-size: 12px;
    padding-top: 3px;
  }
  .signup-content-right .divition {
    width: 69px;
    height: 8px;
    background-color: #083ac8;
  }
  
  .signup-content-right form label {
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .signup-content-right form .form-control {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
  
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .signup-content-right form .btn-block.btn-primary {
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
  }
  
  .signup-content-right .login-bootom-text {
    font-size: 12px;
  }
  
  .signup-content-right .login-bootom-text b a {
    text-decoration: underline;
  }
  
  
  @media (max-width: 767px) {
    .signup-row {
      display: block;
    }
  
    .signup-content-left,
    .signup-content-right {
      width: 100%;
    }
  
    .signup-content-right {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  
  @media (max-width: 480px) {
    .signup-row .signup-content-left .img-head h1 {
      font-size: 25px;
    }
  
    .signup-content-right {
      padding-left: 0px;
      padding-right: 0px;
    }
  
    .signup-content-right h2 {
      font-size: 23px;
    }
  }`;