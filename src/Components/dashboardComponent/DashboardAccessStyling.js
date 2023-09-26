import styled from 'styled-components';

export const DashboardAccessWrapper = styled.div`
h1.heading {
    font-size: 23px;
    font-weight: 700;
    letter-spacing: 0.33px;
    color: #000000;
    margin-bottom: 20px;
}

.manage-access-section .card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: #f0f3f5;
    border-bottom: 1px solid #c8ced3;
}

.manage-access-section .card-body {
    padding: 1.25rem 32px;
}

.manage-access-section .card-body .card-text {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 0.2px;
    color: #000000;
    margin-top: 25px;
}

.manage-access-section .card-body .user-form-section {
    margin-top: 30px;
}

.manage-access-section .card-body .user-form-section .form-group {
    margin-bottom: 30px;
}

.manage-access-section .card-body .user-form-section .form-group label {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #2f353a;
}

.manage-access-section .card-body .user-form-section .form-group .form-control {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.manage-access-section .card-body .user-form-section .row-btn .btn {
    width: 112px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04px;
    color: #fff;
    border: none;
}

.manage-access-section .card-body .user-form-section .row-btn a {
    font-size: 14px;
    font-weight: 400;
    color: #083ac8;
}

.manage-access-section .card-body .user-form-section .input-group-prepend i {
    color: #73818f;
}

.manage-access-section .card-body .user-form-section .input-group .form-control {
    border: solid 1px rgba(0, 0, 0, 0.19);
}

.manage-access-section .card-body .manage-table .table-striped {
    border: 1px solid #dee2e6;
}

.manage-access-section .card-body .manage-table .table td,
.manage-access-section .card-body .manage-table .table th {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #2f353a;
    vertical-align: middle;
}

.manage-access-section .card-body .manage-table .table th {
    font-weight: 700;
    color: #2f353a;
}
.manage-access-section .card-body .manage-table .table th.pl-23{
    padding-left: 23px;
}
.manage-access-section .card-body .manage-table .table th.td-wth,
.manage-access-section .card-body .manage-table .table td.td-wth {
    width: 160px;
}

@media (max-width: 575px) {
    h1.heading {
        font-size: 20px;
    }

    .manage-access-section .card-body .card-text {
        line-height: 22px;
    }

    .manage-access-section .card-body .user-form-section .form-group.row .col-sm-6:first-child {
        margin-bottom: 20px;
    }

    .manage-access-section .card-body .user-form-section .row-btn .btn {
        width: 135px;
    }
    
}
@media (max-width: 767px) {
    .manage-access-section .card-body .manage-table .table{
        width: 800px;
      }
} 
`;
export default DashboardAccessWrapper;
  