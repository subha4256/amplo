import styled from 'styled-components';
export const CompanyProfileWrapper = styled.div`
.company-profile-sec .bg-white {
    border-radius: 6px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 30, 0.1), 0 4px 8px 0 rgba(0, 0, 30, 0.1), 0 0 2px 0 rgba(0, 0, 30, 0.1);
    padding: 36px;
  }
  
  .company-profile-sec .bg-white h1 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.34px;
    color: #000000;
    margin-bottom: 30px;
    margin-top: 0;
  }
  
  .company-profile-sec .bg-white label {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: #2f353a;
  }
  
  .company-profile-sec .bg-white select,
  .company-profile-sec .bg-white input {
    height: 34px;
    border-radius: 4px;
    border: solid 1px #c8ced3;
    background-color: #fff;
    font-size: 14px;
  }
  
  .company-profile-sec .bg-white .form-group {
    margin-bottom: 1.5rem;
  }
  
  .company-profile-sec .bg-white textarea {
    height: 105px;
    border-radius: 4px;
    border: solid 1px #c8ced3;
    background-color: #fff;
    font-size: 14px;
  }
  
  .company-profile-sec .bg-white form .btn-primary {
    width: 140px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-align: center;
    color: #fff;
    font-family: Montserrat;
  }
  
  .company-profile-sec .bg-white form a {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #4a90e2;
  }

.company-profile-sec .company-photo .upload-btn-wrapper .btn {
    width: 86px;
    height: 40px;
    border-radius: 5px;
    background-color: #bcbec2;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.04px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 10px;
}

.company-profile-sec .company-photo .upload-btn-wrapper span {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #083ac8;
    display: inline-block;
}

.company-profile-sec .company-photo .upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 15px;
    opacity: 0;
    width: 86px;
    height: 40px;
}

.company-profile-sec .company-photo .profile-img {
  height: 100px;
}
  
  @media (max-width: 575px) {
    .company-profile-sec .bg-white form .form-group .col-sm-6:first-child {
      margin-bottom: 1.5rem;
    }
  
    .company-profile-sec .bg-white h1 {
      font-size: 19px;
    }
  
    .company-profile-sec .bg-white {
      padding: 36px 20px;
    }
  }
  .company-profile-sec .helpwrap .helpicon {
    margin-top: 3px;
    display: inline-block;
    color: #616161 !important;
    font-size: 20px;
    line-height: 10px;
}

.company-profile-sec .helpwrap .dropdown-toggle::after {
  display: none;
}

.company-profile-sec .helpwrap .dropdown-menu p {
  padding: 0 7px 0 7px;
  margin: 0;
  font-size: 13px;
}
`;