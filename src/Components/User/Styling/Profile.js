
import styled from 'styled-components';

export const UserProfileWrapper = styled.div`
.user-profile-sec.bg-white {
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1);
    background-color: #fff;
    padding: 40px 59px;
    margin: 48px 0 58px 0;
}

.user-profile-sec .profile-top-sec {
    display: flex;
}

.user-profile-sec .profile-top-sec .user-col {
    margin-right: 20px;
}

.user-profile-sec .profile-top-sec .user-col .btn-primary {
    font-size: 13px;
    line-height: normal;
    letter-spacing: normal;
    font-family: Montserrat;
    width: 155px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    border: none;
    margin-top: 15px;
}

.user-profile-sec .profile-top-sec .user-col.profile-col {
    width: 100px;
}

.user-profile-sec .profile-top-sec .user-col2 {
    display: flex;
    margin-top: 15px;
}

.user-profile-sec .profile-top-sec .user-col2 p {
    margin-right: 5em;
}

.user-profile-sec .profile-top-sec .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
}

.user-profile-sec .profile-top-sec p {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #2f353a;
    margin-bottom: 10px;
}

.user-profile-sec .profile-top-sec p span {
    font-weight: 700 !important;
    display: inline-block;
}

.user-profile-sec .profile-top-sec h1 {
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0.23px;
    color: #083ac8;
}

.user-profile-sec .user-form {
    margin-top: 57px;
}

.user-profile-sec .user-form .nav-link {
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2;
    letter-spacing: 0.19px;
    color: #2f353a;
    border-radius: 0;
    padding: 1rem;
    border-width: 0px 0px 3px;
    margin-right: 30px;
}

.user-profile-sec .user-form .nav-link.active {
    color: #083ac8;
    border-color: #dee2e600 #dee2e600 #083ac8;
    border-width: 0px 0px 3px;
}

.user-profile-sec .user-form form label {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #2f353a;
}

.user-profile-sec .user-form form .form-control {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.user-profile-sec .user-form form .btn-primary {
    font-size: 13px;
    line-height: normal;
    letter-spacing: normal;
    font-family: Montserrat;
    width: 78px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    border: none;
}

.user-profile-sec .user-form form a {
    color: #083ac8;
}

.user-profile-sec .user-form form .form-group {
    margin-bottom: 1.5rem;
}


.user-profile-sec .user-form form .profile-photo {
    width: 428px;
    height: 128px;
    border: solid 1px #d2d3d4;
    background-color: #f6f7f8;
    padding: 16px 35px;
    text-align: left;
    float: right;
}

.user-profile-sec .user-form form .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
}

.user-profile-sec .user-form form .upload-btn-wrapper .btn {
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

.user-profile-sec .user-form form .upload-btn-wrapper span {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #083ac8;
    display: inline-block;
}

.user-profile-sec .user-form form .upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 86px;
    height: 40px;
}

.user-profile-sec .helpwrap .helpicon {
    margin-top: 3px;
    display: inline-block;
    color: #616161 !important;
    font-size: 20px;
    line-height: 10px;
}

.user-profile-sec .helpwrap .dropdown-toggle::after {
  display: none;
}

.user-profile-sec .helpwrap .dropdown-menu p {
  padding: 0 7px 0 7px;
  margin: 0;
  font-size: 13px;
}

@media (max-width: 992px) {
    .user-profile-sec .profile-top-sec .user-col2 p {
        margin-right: 1em;
    }

    .user-profile-sec .user-form form .profile-photo {
        width: 100%;
    }
}

@media (max-width: 767px) {
    .user-profile-sec .profile-top-sec .user-col2 {
        display: block;
    }
}

@media (max-width: 575px) {
    .bg-white.user-profile-sec {
        padding: 30px !important;
    }

    .user-profile-sec .user-form .nav-link {
        margin-right: 0;

        font-size: 15px;
        padding: 10px;
    }

    .user-profile-sec .profile-top-sec {
        display: block;
    }

    .user-profile-sec .profile-top-sec .user-col.profile-col {
        margin-bottom: 20px;
    }

    .user-profile-sec .user-form form .profile-photo {
        width: 100%;
        height: auto;
        padding: 16px 15px;
    }

    .user-profile-sec .user-form {
        margin-top: 30px;
    }
}
`;