import styled from 'styled-components';

export const TopWrapper = styled.div`
h1.heading {
    font-size: 23px;
    font-weight: 700;
    letter-spacing: 0.33px;
    color: #000000;
    margin-bottom: 20px;
}

.edit-user-section .card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: #f0f3f5;
    border-bottom: 1px solid #c8ced3;
}

.edit-user-section .card-body {
    padding: 1.25rem 32px;
}

.edit-user-section .alert-info {
    font-size: 18px;
    font-weight: normal;
    line-height: 1.11;
    letter-spacing: normal;
    color: #152935;
    border-radius: 0;
    background-color: #f1fee3;
    border: none;
    padding: 20px 25px;
}

.edit-user-section .card-body .card-text {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0.2px;
    color: #000000;
    margin-top: 25px;
}

.edit-user-section .card-body .user-form-section {
    margin-top: 30px;
}

.edit-user-section .card-body .user-form-section .form-group {
    margin-bottom: 30px;
}

.edit-user-section .card-body .user-form-section .form-group label {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #2f353a;
}

.edit-user-section .card-body .user-form-section .form-group .form-control {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.edit-user-section .card-body .user-form-section .row-btn .btn {
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04px;
    color: #fff;
    width: 185px;
    border: none;
}
.edit-user-section .card-body .user-form-section .input-group-prepend i{
    color: #73818f;
}
.edit-user-section .card-body .user-form-section .input-group .form-control{
    border: solid 1px rgba(0, 0, 0, 0.19);
}

.edit-user-section .helpwrap .helpicon {
    margin-top: 3px;
    display: inline-block;
    color: #616161 !important;
    font-size: 20px;
    line-height: 10px;
}

.edit-user-section .helpwrap .dropdown-toggle::after {
  display: none;
}

.edit-user-section .helpwrap .dropdown-menu p {
  padding: 0 7px 0 7px;
  margin: 0;
  font-size: 13px;
}

@media (max-width: 575px) {
    h1.heading {
        font-size: 20px;
    }

    .edit-user-section .alert-info {
        font-size: 15px;
        line-height: 22px;
        padding: 15px;
    }

    .edit-user-section .card-body .card-text {
        line-height: 22px;
    }

    .edit-user-section .card-body .user-form-section .form-group.row .col-sm-6:first-child {
        margin-bottom: 20px;
    }
    .edit-user-section .card-body .user-form-section .row-btn .btn{
        width: 135px;
    }
    
}
`;