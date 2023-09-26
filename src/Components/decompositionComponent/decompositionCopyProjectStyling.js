import styled from 'styled-components';

export const DecompositionCopyProjectWrapper = styled.div`

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
  width: 315px;
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
  width: 316px;
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

`;