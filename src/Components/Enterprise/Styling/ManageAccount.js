import styled from 'styled-components';
import dropdownarrow from '../../../common/images/dropdownarrow.png';

export const ManageAccountStyle = styled.div`
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

.manage-access-section .card-body .manage-table .table td,
.manage-access-section .card-body .manage-table .table th {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.3px;
  color: #2f353a;
  vertical-align: middle;
}
.manage-access-section .card-body .manage-table .ReactTable.table-striped .rt-tbody .rt-tr.-even {background-color: #f2f2f2;}

.manage-access-section .card-body .manage-table .ReactTable .rt-thead.-header .rt-th {
  text-align: left;
  font-weight: bold;
}

.manage-access-section .card-body .manage-table .ReactTable .rt-thead.-headerGroups .rt-th {
  border: solid 1px #bebdbd;;
  background-color: #d8d8d8;
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
.search-input {
  float: left;
  width: 85%;
  border-right: none;
}
.search-btn {
    float: left;
    width: 15%;
    height: 100%;
    border-top: 1px solid #ced4da;
    border-right: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
    border-left: none;
    background-color: #fff;
    margin-left: -4px;
    cursor: pointer;
    border-radius: .25rem;
}
.manage-access-section .helpwrap .helpicon {
  margin-top: 3px;
  display: inline-block;
  color: #616161 !important;
  font-size: 20px;
  line-height: 10px;
}

.manage-access-section .helpwrap .dropdown-toggle::after {
  display: none;
}

.manage-access-section .helpwrap .dropdown-menu p {
  padding: 0 7px 0 7px;
  margin: 0;
  font-size: 13px;
}
/*.ReactTable .rt-thead .rt-th.-sort-asc, .ReactTable .rt-thead .rt-td.-sort-asc,
.ReactTable .rt-thead .rt-th.-sort-desc, .ReactTable .rt-thead .rt-td.-sort-desc {
  box-shadow: none;
}
.-sort-asc::after{
	position:absolute;
	right:0px;
	top:0px;
	width:10px;
	height:10px;
  display:inline-block;
  border: 1px solid red;
  content: "\f0d7";
}*/
`;

export const ManageAccountDetailStyle = styled.div`
h1.heading {
  font-size: 23px;
  font-weight: 700;
  letter-spacing: 0.33px;
  color: #000000;
  margin-bottom: 20px;
}

.enter-account-management .card-header {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #f0f3f5;
  border-bottom: 1px solid #c8ced3;
}

.enter-account-management .card-body {
  padding: 1.25rem 32px;
}

.enter-account-management .alert-info {
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

.enter-account-management .card-body .card-text {
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  color: #000000;
  margin-top: 0px;
}

.enter-account-management.card-body .user-form-section {
  margin-top: 30px;
}

.enter-account-management .card-body .user-form-section .form-group {
      margin-bottom: 15px;
  }

.enter-account-management .card-body .user-form-section .form-group label {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.71;
      letter-spacing: 0.13px;
      color: #2f353a;
  }

.enter-account-management .card-body .user-form-section .form-group .form-control {
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

  .enter-account-management .card-body .user-form-section .row-btn .btn {
      height: 40px;
      border-radius: 5px;
      background-color: #083ac8;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.04px;
      color: #fff;
      width: 78px;
      border: none;
  }
  .enter-account-management .card-body .user-form-section .input-group-prepend i {
      color: #73818f;
      font-weight: 100;
  }
  .enter-account-management .card-body .user-form-section .input-group .form-control {
      border: solid 1px rgba(0, 0, 0, 0.19);
  }
.headerlabel-enterprisepage {
  font-size: 18.8px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.49;
  letter-spacing: -0.05px;
  color: #212529;
  margin-top:25px;
}
.dateControl-class {
  width: 146px !important;
  border-radius: 4px !important;
  border: solid 1px #c8ced3 !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.date-label {
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px !important;
}
.company-logo-uploadsection {
  width: 428px;
  height: 128px;
  border: solid 1px #d2d3d4;
  background-color: #f6f7f8;
  padding:16px 35px;
  margin-top:25px;
}
.company-logo-uploadsection .upload-btn-wrapper {
      position: relative;
      overflow: hidden;
      padding-top:8px;
  }
.company-logo-uploadsection .upload-btn-wrapper .btn {
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
.company-logo-uploadsection .upload-btn-wrapper span {
      font-size: 14px;
      font-weight: normal;
      line-height: 1.71;
      letter-spacing: 0.13px;
      color: #083ac8;
      display: inline-block;
  }
.company-logo-uploadsection .upload-btn-wrapper input[type=file] {
      font-size: 100px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width:87px;
  }
.textbox-control {
  background-image: none !important;
}
.pad015px{
  padding: 0 15px;
}
.dropdown-width{
  display: inline-block;
  vertical-align: top;
  margin-right: 45px;
}
.width100{
  width:100%;
}
@media only screen and (min-width: 768px) and (max-width: 1024px)  {
  .enter-account-management .card-body .user-form-section .form-group .form-control {
      width: 380px;
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
  .enter-account-management .card-body .user-form-section .form-group .form-control {
      width: 380px;
  }   
}
@media only screen and (min-width: 576px) and (max-width: 767px)  {
  .dropdown-width {
      margin-right: 0;
      width: 100%;
  }
}
@media (max-width: 575px) {
  h1.heading {
      font-size: 20px;
  }

  .enter-account-management .alert-info {
      font-size: 15px;
      line-height: 22px;
      padding: 15px;
  }

  .enter-account-management .card-body .card-text {
      line-height: 22px;
  }

  .enter-account-management .card-body .user-form-section .form-group.row .col-sm-6:first-child {
      margin-bottom: 20px;
  }
  .enter-account-management .card-body .user-form-section .row-btn .btn {
      width: 135px;
  }
  .disnone-tab{
      display: none;
  }
  .dropdown-width {
      margin-right: 0;
      width: 100%;
  }
}
.enter-account-management .profile-img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  object-fit: cover;
}
`;