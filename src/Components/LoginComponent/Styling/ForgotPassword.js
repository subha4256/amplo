/* dashboard header css */
import styled from 'styled-components';

export const ForgotPasswordWrapper = styled.div`
.container-signup {
  padding: 0 0 40px 0;
  height: calc(100vh - 100px);
  background-color: #f9fafb;
}

.password-row {
  display: flex;
  justify-content: space-between;
  margin-top:50px;
}

.password-content {
  width: 40%;
}


.password-content h2 {
  font-size: 37px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.09px;
  color: #212529;
}

.password-content p {
  font-size: 13px;
  font-weight: normal;
  line-height: 1.54;
  letter-spacing: -0.03px;
  color: rgba(0, 0, 0, 0.6);
}

.password-content .divition {
  width: 69px;
  height: 8px;
  background-color: #083ac8;
}

.password-content form label {
  font-size: 13px;
  font-weight: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}

.password-content form .form-control {
  height: 40px;
  border: solid 1px rgba(0, 0, 0, 0.32);
  background-color: #fff;

  font-size: 13px;
  font-weight: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}

.password-content form .btn-primary {
  height: 40px;
  border-radius: 4px;
  border: solid 1px #083ac8;
  background-color: #083ac8;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.return-link {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.54;
  color: #0061e0;
  text-decoration: underline;
  display: inline-block;
}

@media (max-width: 767px) {
  .password-row {
    display: block;
  }

  .password-content {
    width: 100%;
  }

  .password-content {
    padding-left: 30px;
    padding-right: 30px;
  }

  .container-signup {
    height: auto;
  }
}

@media (max-width: 480px) {
  .password-content {
    padding-left: 0px;
    padding-right: 0px;
  }

  .password-content h2 {
    font-size: 23px;
  }
}
`;