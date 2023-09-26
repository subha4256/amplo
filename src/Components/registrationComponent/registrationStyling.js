
import styled from 'styled-components';

export const RegistrationDiv = styled.div`
.container-signup {
    background-color: #f9fafb;
    padding-bottom:40px;
    padding-top:40px;
  }
  .legends {
    margin-bottom: 0px !important;
    visibility: hidden;
}
.legends .star {
  color: red;
}
.login-anchor:hover {
  color: #fff;
  text-decoration: none;
}

.login-anchor {
  color: inherit;
}
.disabled-field {
  background: #e4e2e2 !important;
  font-weight: 600 !important;
  color: blue !important;
}
legend {
  padding-left: 12px !important;
  font-size: 13px !important;
  margin-bottom: 0px;
  color: rgba(0, 0, 0, 0.6) !important;
  text-align: left;
  font-family: Montserrat !important;
}
.text-danger {
  font-size: 12px;
  padding-top: 3px;
}
  
  .regitration-row .main-header h1 {
    font-family: Montserrat;
    font-size: 37.5px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.75;
    letter-spacing: -0.09px;
    color: #212529;
    margin-top: 40px;
    padding-top:0;
  }
  
  .regitration-row .main-header .p1 {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.05px;
    color: #9ea0a5;
  }
  
  .regitration-row .main-header p {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.05px;
    color: #333333;
  }
  
  .regitration-row h5.org {
    font-family: 'Montserrat', sans-serif;
    font-size: 18.8px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.49;
    letter-spacing: -0.05px;
    color: #212529;
    margin-top: 30px;
  }
  
  .regitration-row form label {
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .regitration-row form .form-control {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
  
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
  }

 
  .regitration-row form .btn-block.btn-primary {
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
  }
  
  .regitration-row form .border-lft {
    border-left: solid 1px #d2d3d4;
    padding-left: 30px;
    font-size: 12px;
    color: #212529;
    padding-right: 20%;
  }
  
  .regitration-row form .btn-outline-primary {
    border: solid 1px #083ac8;
    color: #083ac8;
    font-size: 13px;
    font-weight: 700;
    height: 40px;
  }
  
  .regitration-row form .btn-outline-primary:hover {
    border: solid 1px #083ac8;
    background-color: #083ac8;
    color: #fff;
  }
  
  @media (max-width: 575px) {
    .regitration-row form .form-group.row div:first-child {
      margin-bottom: 15px;
    }
  
    .regitration-row form .border-lft {
      margin-top: 20px;
    }
  
    .regitration-row .main-header h1 {
      font-size: 25px;
      line-height: 32px;
    }
  }`;