import styled from 'styled-components';
import dropdownarrow from '../../../common/images/dropdownarrow.png';

export const BenchmarkManageAccess = styled.div`
h1.heading {
  font-size: 23px;
  font-weight: 700;
  letter-spacing: 0.33px;
  color: #000000;
  margin-bottom: 20px;
}

.manage-user-section .card-header {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #f0f3f5;
  border-bottom: 1px solid #c8ced3;
}

.manage-user-section .card-body {
  padding: 1.25rem 32px;
}

.manage-user-section .alert-info {
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

.manage-user-section .card-body .card-text {
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  color: #000000;
  margin-top: 0px;
}

.manage-user-section.card-body .user-form-section {
  margin-top: 30px;
}

.manage-user-section .card-body .user-form-section .form-group {
  margin-bottom: 30px;
}

.manage-user-section .card-body .user-form-section .form-group label {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.71;
  letter-spacing: 0.13px;
  color: #2f353a;
}

.manage-user-section .card-body .user-form-section .form-group .form-control {
  height: 40px;
  border: solid 1px rgba(0, 0, 0, 0.32);
  font-size: 13px;
  font-weight: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
  -webkit-appearance: none;
  padding-right: 40px;
  background-image: url(${dropdownarrow});
  background-repeat: no-repeat;
  background-position: 96%;
}

.manage-user-section .card-body .user-form-section .row-btn .btn {
  height: 40px;
  border-radius: 5px;
  background-color: #083ac8;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.04px;
  color: #fff;
  width: 112px;
  border: none;
}
.manage-user-section .card-body .user-form-section .input-group-prepend i{
  color: #73818f;
}
.manage-user-section .card-body .user-form-section .input-group .form-control{
  border: solid 1px rgba(0, 0, 0, 0.19);
}
.managebox{
  /* width: 291px; */
  height: 202px;
  border-width: 1px;
  border-style: solid;
  border-color: #979797;
  border-image: initial;
  overflow: auto;
  padding: 5px 10px;
}
.managebox .custom-checkbox .custom-control-label::before {
  border-radius: 3px;
}
.managebox .custom-control-label::before{
  width:12px;
  height:12px;   
}
.managebox .custom-control-label::after{
  width:12px;
  height:12px;
}
.managebox .custom-control{
  min-height: 16px;
}
.managebox .custom-control-label{
  line-height: 16px !important;
  font-weight: normal !important;
}
.line-height20px{
  line-height: 20px !important;
}
.custom-control-input:checked ~ .custom-control-label::before{
  border:#c8ced3 solid 1px;
  background: none;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after{
  left: -20px;
  top: 6px;
  width: 4px;
  height: 7px;
  border: solid #0070d2;
  border-top-width: medium;
  border-right-width: medium;
  border-bottom-width: medium;
  border-left-width: medium;
border-width: 0 2px 2px 0;
-webkit-transform: rotate(45deg);
-ms-transform: rotate(45deg);
transform: rotate(45deg);
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label-big::after {
  left: -19px;
  top: 6px;
  width: 6px;
  height: 10px;
}
@media only screen and (min-width: 768px) and (max-width: 1024px)  {
  .tab-manageboxwidth50percent{
      flex:0 0 50%;
      min-width: 50%;
  }
  .tab-fullwidth100{
      max-width: 100%;
      flex:0 0 100%;
  }
  .disnone-tab{
      display: none;
  }
}
@media (min-width: 1025px) {
  .manage-user-section .card-body .user-form-section .form-group .form-control{
      width:380px;
  }   
}
@media only screen and (min-width: 576px) and (max-width: 767px)  {
  .mob-50percent{
      max-width: 50%;
      flex:0 0 50%;
  }
}
@media (max-width: 575px) {
  h1.heading {
      font-size: 20px;
  }

  .manage-user-section .alert-info {
      font-size: 15px;
      line-height: 22px;
      padding: 15px;
  }

  .manage-user-section .card-body .card-text {
      line-height: 22px;
  }

  .manage-user-section .card-body .user-form-section .form-group.row .col-sm-6:first-child {
      margin-bottom: 20px;
  }
  .manage-user-section .card-body .user-form-section .row-btn .btn{
      width: 135px;
  }
  .disnone-tab{
      display: none;
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

.manage-table-dragtable .table-striped {
  border: solid 1px #c8ced3;
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

.manage-table-dragtable .table th {
  padding: 0;
  height:59px;
  border-bottom: none;
  font-weight: normal !important;
}
.manage-table-dragtable .table td{
  padding: 0;
 height:59px;
}
.manage-table .table th {
  font-weight: 700;
  color: #2f353a;
}

.manage-table .table .badge {
  font-size: 10px;
}

.manage-table .table .btn.btn-info i {
  font-size: 14px;
  color: #040404;
}

@media (min-width: 1170px) {
  .manage-table-dragtable{
    width:821px;
  }
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