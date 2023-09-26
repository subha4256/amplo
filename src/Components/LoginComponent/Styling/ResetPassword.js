/* dashboard header css */
import styled from 'styled-components';

export const ResetPasswordWrapper = styled.div`
.container-reset {
  padding: 0 0 40px 0;
  /* height: calc(100vh - 100px); */
  background-color: #f9fafb;
}

.reset-password-row {
  display: flex;
  justify-content: space-between;
}

.reset-password-content {
  width: 100%;
  padding-left: 40%;
  margin-bottom: 100px;
}

.reset-password-content .reset-container {
  display: flex;
}

.reset-password-content .reset-container form {
  width: 50%;
  padding-right: 30px;
}

.reset-password-content .reset-container .reset-right {
  width: 50%;
  border-left: 1px #ccc solid;
  padding-left: 50px;
  padding-right: 30px;
}

.reset-right p {
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.58;
  letter-spacing: -0.03px;
  color: #212529;

}

.reset-password-content h2 {
  font-size: 37px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.09px;
  color: #212529;
}

.reset-password-content p {
  font-size: 13px;
  font-weight: normal;
  line-height: 1.54;
  letter-spacing: -0.03px;
  color: rgba(0, 0, 0, 0.6);
}

.reset-password-content .divition {
  width: 69px;
  height: 8px;
  background-color: #083ac8;
}

.reset-password-content form label {
  font-size: 13px;
  font-weight: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}

.reset-password-content form .form-control {
  height: 40px;
  border: solid 1px rgba(0, 0, 0, 0.32);
  background-color: #fff;

  font-size: 13px;
  font-weight: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}

.reset-password-content form .btn-primary {
  height: 40px;
  border-radius: 4px;
  border: solid 1px #083ac8;
  background-color: #083ac8;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 180px;
}

.return-link {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.54;
  color: #0061e0;
  text-decoration: underline;
  display: inline-block;
}

@media (max-width: 992px) {
  .reset-password-row {
    display: block;
  }

  .reset-password-content {
    width: 100%;
  }

  .reset-password-content {
    padding-left: 30px;
    padding-right: 30px;
  }

  .container-reset {
    height: auto;
  }
}

@media (max-width: 600px) {
  .reset-password-content .reset-container {
    display: block;
  }

  .reset-password-content .reset-container form,
  .reset-password-content .reset-container .reset-right {
    width: 100%;
    padding-right: 0px;
  }

  .reset-password-content .reset-container .reset-right {
    margin-top: 30px;
    padding-left: 20px;
  }

}

@media (max-width: 480px) {
  .reset-password-content {
    padding-left: 0px;
    padding-right: 0px;
  }

  .reset-password-content h2 {
    font-size: 23px;
  }
}
`;