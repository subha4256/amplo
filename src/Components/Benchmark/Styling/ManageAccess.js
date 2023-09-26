import styled from 'styled-components';

export const BenchmarkManageAccess = styled.div`

.modeling-modal .modal-content {
  border: 0px solid rgba(0, 0, 0, .2);
  border-radius: 0;
}

.modeling-modal h5 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.modeling-modal .modal-header{
  border: none;
}

.modeling-modal .modal-footer a {
  font-size: 14px;
  font-weight: normal;
  letter-spacing: normal;
  color: #083ac8;
}
.modeling-modal .modal-footer{
  border:none;
}
.modeling-modal .modal-body p {
  font-size: 12px;
  font-weight: normal;
  color: #333333;
  margin: 0;
}

.modeling-modal .modal-body .nav-tabs .nav-link {
  border: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #a7a7a7;
}

.modeling-modal .modal-body .nav-tabs .nav-item {
  margin-bottom: 0
}

.modeling-modal .modal-body .nav-tabs .nav-item.show .nav-link,
.modeling-modal .modal-body .nav-tabs .nav-link.active {
  color: #000;
  border-bottom: 2px #083ac8 solid;
}

.modeling-modal .btn-primary{
  width: 106px;
  height: 40px;
  line-height: 27px;
  border-radius: 4px;
  border: solid 1px #083ac8;
  background-color: #083ac8;
  font-size: 13px;
  font-weight: bold !important;
  letter-spacing: 0.5px;
  text-align: center;
  color: #fff !important;
}
.custom-control-label{
  font-size: 14px;
}
.modeling-modal .modal-body .custom-checkbox .custom-control-label{
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 28px;
  letter-spacing: 0.5px;
  color: #000000;
}
.modeling-modal .modal-body .form-group label{
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 0.13px;
  color: #2f353a;
}
.modeling-modal .modal-body .form-group  input{
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}
.project-tag span{
  display: inline-block;
  position: relative;
  height: 30px;
  line-height: 29px;
    text-align: center;
  border-radius: 4px;
  background-color: #f0f3f5;
  font-size: 13px;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
  padding: 0px 12px;
  margin-right: 5px;
}

.dropfield{
  height: 40px;
  border: solid 1px rgba(0, 0, 0, 0.32);
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
  display: inline-block;
  border-radius: 4px;
  padding: 4px 11px 4px 4px;
  text-decoration: none !important;
  width: 425px;
  position: relative;
}

.dropfield.dropleft .dropdown-toggle::before{
  display: none;
}
.dropfield.dropleft .dropdown-toggle i{
  color: #b9b9b9;
  font-size: 20px;
  margin-top: 5px;
}
.dropfield span{
  display: inline-block;
  position: relative;
  height: 30px;
  line-height: 29px;
    text-align: center;
  border-radius: 4px;
  background-color: #f0f3f5;
  font-size: 13px;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
  padding: 0px 12px 0 26px;
  text-decoration: none;
}
.dropfield span i{
  position: absolute;
  left: 10px;
  top: 9px;
  color: #969696;
  cursor: pointer;
}
.dropdown.copydropdown .dropdown-menu {
  width: 425px;
  top: 36px !important;
  left: 33px !important;
}
.dropdown.copydropdown .dropdown-menu input{
  border:none !important;
}


.disabled-date{
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 8px;
  margin-bottom: 13px;
  border-bottom: 1px #eae4e4 solid;
  display: flex;
  justify-content: space-between;
}
.disabled-date span{
  font-size: 14px;
  font-weight: 500;
  color: #000;
  background-color: transparent !important;
  padding: 0;
}
.custom-control.custom-radio{
  position: relative;
}
.d-date{
  position: absolute;
  right: 13px;
  top: 2px;
  font-size: 12px;
  color: #929191;
}
.drop-height{
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
}

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