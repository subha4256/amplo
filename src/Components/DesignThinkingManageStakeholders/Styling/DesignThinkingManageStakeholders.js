import styled from 'styled-components';

export const DesignThinkingManageStakeholdersWrapper = styled.div`

    #wrapper {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-top: 55px;
    }
    
    .card-body .react-datepicker-wrapper {
        width:89%;
    }
    #wrapper #content-wrapper #content {
        -webkit-box-flex: 1;
        -ms-flex: 1 0 auto;
        flex: 1 0 auto;
        font-size: 14px
    }
    #wrapper #content-wrapper {
        background-color: #e4e5e6;
        width: 100%;
        overflow-x: hidden;
    }
    .breadcrumb.dashbread{
        background-color: #fff;
        padding: 10px 1em 10px 1rem;
    }
    .breadcrumb.dashbread .powered{
        color: #708393;
        font-size:12px;
    }

    .breadcrumb.dashbread .breadcrumb-item {
        padding-top: 7px;
    }

    .logo-img {
        width: 37px;
    }
    h1.heading {
        font-size: 23px;
        font-weight: 700;
        letter-spacing: 0.33px;
        color: #000000;
        margin-bottom: 20px;
    }

    .text-primary{
        color: #083ac8;
    }
    .thingking-section .card-header {
        padding: .75rem 1.25rem;
        margin-bottom: 0;
        background-color: #f0f3f5;
        border-bottom: 1px solid #c8ced3;
    }

    .thingking-section .card-body {
        padding: 1.25rem 32px;
    }

    .thingking-section .alert-info {
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

    .thingking-section .card-body .card-text {
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0.2px;
        color: #000000;
        margin-top: 25px;
    }

    .thingking-section .card-body .user-form-section {
        margin-top: 30px;
    }

    .thingking-section .card-body .user-form-section .form-group {
        margin-bottom: 30px;
    }

    .thingking-section .card-body .user-form-section .form-group label {
        font-size: 14px;
        font-weight: 600;
        line-height: 1.71;
        letter-spacing: 0.13px;
        color: #2f353a;
    }

    .thingking-section .card-body .user-form-section .form-group .form-control {
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.32);
        font-size: 13px;
        font-weight: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }

    .thingking-section .card-body .user-form-section .row-btn .btn{
        height: 40px;
        border-radius: 5px;
        background-color: #083ac8;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 0.04px;
        color: #fff;
        width: 118px;
        border: none;
    }
    .heading-para .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
        margin: 0 20px;
    }
    .heading-para{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .heading-para .btn-upload{
        height: 40px;
        border-radius: 5px;
        background-color: #083ac8;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 0.04px;
        color: #fff;
        border: none;
        text-transform: uppercase;
        width: 124px;
    }


    .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
    .thingking-section .card-body .user-form-section .input-group-prepend i{
        color: #73818f;
    }
    .thingking-section .card-body .user-form-section .input-group .form-control{
        border: solid 1px rgba(0, 0, 0, 0.19);
    }

    @media (max-width: 575px) {
        h1.heading {
            font-size: 20px;
        }

        .thingking-section .alert-info {
            font-size: 15px;
            line-height: 22px;
            padding: 15px;
        }

        .thingking-section .card-body .card-text {
            line-height: 22px;
        }

        .thingking-section .card-body .user-form-section .form-group.row .col-sm-6:first-child {
            margin-bottom: 20px;
        }
        .thingking-section .card-body .user-form-section .row-btn .btn{
            width: 135px;
        }
        
    }
    .search-container {
        position: relative;
    }

    .search-container input {
        padding: 6px;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.32);
        background-color: #fff;
        width: 264px;
        border-radius: 4px;
    }

    .search-container button {
        background: transparent;
        font-size: 17px;
        border: none;
        position: absolute;
        right: 4px;
        top: 7px;
        color: #54698d;
        outline: none;
    }

    .table-section .card-body {
        padding: 1.25rem 32px;
    }

    .manage-table .table-striped {
        border: 1px solid #dee2e6;
    }

    .table-section .card-header {
        padding: .75rem 1.25rem;
        margin-bottom: 0;
        background-color: #f0f3f5;
        border-bottom: 1px solid #c8ced3;
    }

    .manage-table .table td,
    .manage-table .table th {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.3px;
        color: #2f353a;
        vertical-align: middle;
    }

    .manage-table .table th {
        font-weight: 700;
        color: #2f353a;
    }

    .manage-table .table .badge {
        font-size: 10px;
    }
    .manage-table .table .btn.btn-info{
        background-color: #63c2de !important;
        border-radius: 3px;
        border-color: #63c2de;
    }
    .manage-table .table .btn.btn-info i {
        font-size: 14px;
        color: #040404;
    }
    .page-item.active .page-link {
        z-index: 1;
        color: #fff;
        background-color: #63c2de;
        border-color: #63c2de;
    }
    .page-link{
        color: #63c2de;
    }
    @media (max-width: 575px) {
    .search-container {
        margin-bottom: 20px;
    }

    .search-container input {
        width: 100% !important;
    }
    }
`;