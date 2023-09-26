import styled from 'styled-components';

export const CapabilityModelingWrapper = styled.div`

.businessrow{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.businessrow .custom-select{
width: 148px;
height: 40px;
border: solid 1px rgba(0, 0, 0, 0.32);
background-color: #fff;
font-size: 13px;
line-height: 1.85;
letter-spacing: 0.12px;
color: rgba(0, 0, 0, 0.6);
}
.savelink, .savelink a{
font-size: 14px;
letter-spacing: normal;
color: #083ac8;
text-decoration: none;
}
.version-drop .dropdown-menu {
padding: 10px 0;
width: 354px;
}

.version-drop .btn-drop {
border: solid 0px rgba(0, 0, 0, 0.17);
background-color: transparent;
font-size: 18px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.26px;
color: #000000;
outline: 0;
text-decoration: none;
}

.version-drop .dropdown-menu .version-style {
padding: 0 10px 10px 10px;
border-bottom: 1px #ccc solid;
margin-bottom: 10px;
}

.version-drop .dropdown-menu .version-style:last-child {
padding: 0 10px 0px 10px;
border-bottom: 0px #ccc solid;
margin-bottom: 0px;
}

.version-drop .dropdown-menu .version-style.text-center a {
font-size: 12px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
color: #083ac8;
}
.version-drop .dropdown-menu .version-style p span.fontbold{
font-weight: 600;
}
.version-drop .dropdown-menu .version-style p.date-txt {
font-size: 12px;
font-weight: 400;
letter-spacing: 0.17px;
color: #333333;
margin: 0 0 5px 0;
}

.version-drop .dropdown-menu .version-style p.date {
font-weight: 400;
}

.version-drop .dropdown-menu .version-style p.revised-txt {
font-size: 12px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.17px;
color: #333333;
margin: 0;
}

.version-drop .dropdown-menu .version-style p.revised-txt .selected {
color: #083ac8;
}

.top-dropdown-sec .custom-select{
width: 148px;
height: 40px;
border: solid 1px rgba(0, 0, 0, 0.32);
background-color: #fff;
font-size: 13px;
line-height: 1.85;
letter-spacing: 0.12px;
color: rgba(0, 0, 0, 0.6);
}
  .popup-icon {
    color: #000;
    position: absolute;
    right: 6px;
    top: 0px;
    font-size: 12px;
  }

  .demo-editor {
    height: 200px;
    border: 1px solid #efefef;
  }

  .modeling-modal .modal-content {
    border: 0px solid rgba(0, 0, 0, .2);
    border-radius: 0;
  }

  .modeling-modal h5 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .modeling-modal .modal-header,
  .modeling-modal .modal-footer {
    border: none;
  }

  .modeling-modal .modal-footer a {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: normal;
    color: #083ac8;
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

  .modeling-modal .tab-pane textarea {
    height: 200px;
    width: 100%;
    box-sizing: none;
    border: 1px #ccc solid;
    border-radius: 4px;
    padding: 10px;
    font-size: 13px;
    color: #000;
  }

  .modeling-modal .delsec {
    position: relative;
    text-align: center;
  }

  .modeling-modal .delsec .delicon {
    color: #545454 !important;
    position: absolute;
    left: 0;
    top: 0;
  }

  .modeling-modal .delsec a {
    font-size: 13px;
    font-weight: normal;
    letter-spacing: normal;
    color: #083ac8;
  }

  .modeling-modal .tab-pane input {
    height: 40px;
    width: 100%;
    border: 1px #ccc solid;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 13px;
    color: #000;
  }
  #painpointaccord .card{
    background-color: #fff;
    border-radius: 0;
    border: none;
  }
  #painpointaccord .card .card-header{
   background-color: #fff;
  }
  #painpointaccord .card .card-header a{
    color: #000;
    text-decoration: none;
    font-size: 14px;
  }

  .top-dropdown-sec .conected-drop.btn-group .btn-outline-white {
    background-color: #fff;
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    outline: none !important;
  }
  
  .top-dropdown-sec .conected-drop.btn-group .btn-outline-white.dropdown-toggle::after {
    width: 1.5rem;
    text-align: center;
    float: right;
    margin-right: -10px;
    margin-top: -2px;
    vertical-align: 0;
    font-size: 16px;
    border: 0;
    font-weight: 700;
    content: '\f107';
    font-family: 'Font Awesome 5 Free';
  }
  
  .top-dropdown-sec .conected-drop.btn-group .dropdown-menu {
    min-width: 372px;
    border-radius: 0;
    border: solid 1px #d2d3d4;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    padding: 15px 15px 0 15px;
  }
  
  .top-dropdown-sec .conected-drop.btn-group .dropdown-menu .dropdown-item {
    height: auto;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #d2d3d4;
    background-color: #fff;
    margin-bottom: 10px;
    padding-left: 10px;
  }
  
  .top-dropdown-sec .conected-drop.btn-group .dropdown-menu .dropdown-item.bg-success {
    background-color: #60b17e !important;
  }
  
  .top-dropdown-sec .conected-drop.btn-group .dropdown-menu .dropdown-item.bg-warning {
    background-color: #ffe687 !important;
  }
  
  .top-dropdown-sec .conected-drop.btn-group .dropdown-menu .dropdown-item a {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.2px;
    color: #333333;
    text-decoration: none;
  }
  
  
  .top-dropdown-sec .scoring-drop.btn-group .btn-outline-white {
    background-color: #fff;
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    outline: none !important;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .btn-outline-white::after {
    display: none;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .btn-outline-white i {
    border: 1px #ccc solid;
    border-radius: 20px;
    padding: 3px;
    height: 20px;
    width: 20px;
    text-align: center;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu {
    width: 630px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #979797;
    background-color: #fff;
    border-radius: 0;
    padding: 20px;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu h2 {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.26px;
    color: #000000;
    margin-top: 5px;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu h3 {
    font-size: 14px;
    font-weight: normal;
    line-height: 1;
    letter-spacing: 0.2px;
    color: #000000;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu .custom-checkbox {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.3px;
    color: #2f353a;
    margin-bottom: .5rem !important;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu .form-group label {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #2f353a;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu .form-group .form-control {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu .form-group .btn-primary {
    width: 166px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-family: Montserrat;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-align: center;
  }
  
  .top-dropdown-sec .scoring-drop.btn-group .dropdown-menu .form-group a {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: normal;
    color: #083ac8;
  }
  
  
  .top-dropdown-sec .levels-drop.btn-group .btn-outline-white {
    background-color: #fff;
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    outline: none !important;
  }
  
  .top-dropdown-sec .levels-drop.btn-group .btn-outline-white.dropdown-toggle::after {
    width: 1.5rem;
    text-align: center;
    float: right;
    margin-right: -10px;
    margin-top: -2px;
    vertical-align: 0;
    font-size: 16px;
    border: 0;
    font-weight: 700;
    content: '\f107';
    font-family: 'Font Awesome 5 Free';
  }
  
  .top-dropdown-sec .levels-drop.btn-group .dropdown-menu {
    border-radius: 0;
  }
  
  .top-dropdown-sec .levels-drop.btn-group .dropdown-menu a {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  
  .top-dropdown-sec .complete-sec .btn-primary
   {
    width: 166px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-family: Montserrat;
    font-size: 13px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.5px;
  }

  .top-dropdown-sec .complete-sec .btn-info {
    width: 166px;
    height: 40px;
    border-radius: 4px;
    font-family: Montserrat;
    font-size: 13px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.5px;
  }  
  
  .header-sec {
    display: flex;
    justify-content: space-between;
  
  }
  
  .header-row,
  .top-dropdown-sec {
    width: 1170px !important;
  }
  
  .header-sec .has-search {
    position: relative;
  }
  
  .header-sec .has-search .form-control {
    padding-left: 1rem;
    padding-right: 2.375rem;
    height: 40px;
    font-size: 13px;
  }
  
  .header-sec .has-search .form-control-search {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
  }
  
  .header-sec .toggle-btn .btn-progress {
    height: 34px;
    border-radius: 30px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    background-color: #083ac8;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }
  
  .header-sec .toggle-btn .btn-progress i {
    font-size: 11px;
  }
  
  .header-sec .toggle-btn .btn-heatmap {
    background-color: #fff;
    border-radius: 30px;
    height: 25px;
    font-size: 13px;
    padding: 0 10px 0 0;
    width: 96px;
    text-align: right;
    margin-left: -20px;
  }
  
  .header-sec h1 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.34px;
    color: #000000;
  }
  
  .header-sec .back-btn {
    padding-top: 7px;
  }
  
  .header-sec .back-btn a {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #083ac8;
  }
  
  .capability-responsive-section {
    display: block;
    width: 100%;
    overflow-x: auto;
    /* overflow-y: auto;
    height: 500px; */
    -webkit-overflow-scrolling: touch;
  }
  
  .processes-section {
    border: solid 1px #d2d3d4;
    //width: 1170px;
    display: flex;
    justify-content: space-between;
  }
  
  .processes-section .processes-tree-sec1 {
    width: 762px;
    background-color: #fff;
    padding-bottom: 0;
  }
  
  .processes-section .processes-tree-sec1 h2 {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2px;
    color: #333333;
    padding-left: 20px;
    margin: 9px 0;
  }
  .processes-box.top-level-box{
    width: 760px;
  }
  .processes-section .processes-tree-sec1 .processes-box {
    display: flex;
    flex-wrap: wrap;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box {
    display: inline-block;
    width: 151px;
  
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box .top-head {
    border-bottom: 1px #d2d3d4 solid;
    border-right: 1px #d2d3d4 solid;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box .top-head h3 {
    width: 100%;
    height: 31px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.03px;
    text-align: center;
    color: #fff;
    padding-top: 7px;
    margin: 0;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box .top-head p {
    font-size: 11px;
    font-weight: 400;
    line-height: 1.36;
    letter-spacing: 0.1px;
    color: rgba(0, 0, 0, 0.6);
    background-color: #f1f2f4;
    padding: 10px;
    margin: 0;
    height: 63px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box .top-head p i {
    border: solid 1px #d2d3d4;
    border-radius: 20px;
    padding: 7px;
    height: 31px;
    width: 31px;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
    margin: 7px 5px 0 5px;
    cursor: pointer;
  }

  .processes-section .processes-tree-sec1 .processes-box .box .top-head p i.disableIcon {
    pointer-events: none;
    background-color: #c9c9c9;
    color: rgba(0,0,0,0.2);
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-1 .top-head h3 {
    background-color: #b620e0;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-2 .top-head h3 {
    background-color: #6236ff;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-3 .top-head h3 {
    background-color: #0091ff;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-4 .top-head h3 {
    background-color: #32c5ff;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-5 .top-head h3 {
    background-color: #44d7b6;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box .bottom-content .order-block {
    width: 150px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    padding: 5px 10px;
    height: 60px;
    position: relative;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-1 .bottom-content .order-block::after {
    content: '';
    position: absolute;
    width: 2px;
    background-color: #dad5d5;
    bottom: -32px;
    left: 50%;
    height: 31px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box .bottom-content .order-block p {
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.16px;
    color: #333333;
    margin: 0;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-1 .bottom-content .order-block {
    border: solid 1px #b620e0;
    margin-left: 2px;
    margin-right: 0px;
    width: 148px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-2 .bottom-content {
    padding-top: 60px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-2 .bottom-content .order-block {
    border: solid 1px #6236ff;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-2 .bottom-content .order-block::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 2px;
    background-color: #dad5d5;
    top: 50%;
    left: -76px;
  }
  
  /* .processes-section .processes-tree-sec1 .processes-box .box.box-col-2 .bottom-content .order-block::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 2px;
    background-color: #dad5d5;
    top: 50%;
    left: -76px;
  } */
  
  
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-3 .bottom-content .order-block {
    border: solid 1px #0091ff;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-3 .bottom-content {
    padding-top: 120px;
    position: relative;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-3 .bottom-content .order-block::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 2px;
    background-color: #dad5d5;
    top: 50%;
    left: -76px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-3 .bottom-content::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: #dad5d5;
    top: 120px;
    left: -77px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-4 .bottom-content {
    padding-top: 185px;
    position: relative;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-4 .bottom-content .order-block::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 2px;
    background-color: #dad5d5;
    top: 50%;
    left: -76px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-4 .bottom-content::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: #dad5d5;
    top: 181px;
    left: -77px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-4 .bottom-content .order-block {
    border: solid 1px #32c5ff;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-5 .bottom-content .order-block {
    border: solid 1px #44d7b6;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-5 .bottom-content {
    padding-top: 245px;
    position: relative;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-5 .bottom-content .order-block::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 2px;
    background-color: #dad5d5;
    top: 50%;
    left: -76px;
  }
  
  .processes-section .processes-tree-sec1 .processes-box .box.box-col-5 .bottom-content .order-block::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 60px;
    background-color: #dad5d5;
    top: 0;
    left: -77px;
  }
  
  
  
  .processes-tree-list {
    padding-left: 0;
  }
  
  .processes-tree-list li {
    position: relative;
    list-style: none;
  }
  .processes-tree-list li .order-block input {
    width:100%;
    padding: 2px 5px;
  }
  .processes-tree-list li .order-block {
    width: 150px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    padding: 5px 10px;
    height: 60px;
    position: relative;
    cursor: pointer;
  }
  
  .processes-tree-list li.child {
    margin-left: 110px;
  }
  
  .processes-tree-list .processes-step1 li.child {
    margin-left: 111px;
    position: relative;
  }
  
  .processes-tree-list .processes-step2 li.child {
    margin-left: 111px;
  }
  
  .processes-tree-list .processes-step2 .processes-step3 li.child {
    margin-left: 110px;
  }
  
  .processes-tree-list li .order-block p {
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.16px;
    color: #333333;
    margin: 0;
  }
  
  .processes-tree-list li.child::before {
    position: absolute;
    left: -79px;
    top: -0.50px;
    border-left-color: #c8ced2;
    border-left-style: solid;
    border-left-width: 1px;
    border-bottom-color: #c8ced2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 100px;
    height: 33px;
  }
  .processes-tree-list li.child.first-child:first-child::after {
    position: absolute;
    left: -79px;
    top: -0.50px;
    border-left-style: solid;
    border-left-color: #c8ced2;
    border-left-width: 1px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 1px;
    height: 100%;
  }
  .processes-tree-list li.child.first-child::after {
    position: absolute;
    left: -79px;
    top: -0.50px;
    border-left-style: solid;
    border-left-color: #c8ced2;
    border-left-width: 1px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 1px;
    height: 100%;
  }
  .processes-tree-list li.child.first-child:last-child::after {
    position: absolute;
    left: -79px;
    top: -0.50px;
    border-left-style: solid;
    border-left-color: #c8ced2;
    border-left-width: 1px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 1px;
    height: 0;
  }
  .processes-tree-list .processes-step1 li::after {
    position: absolute;
    left: -79px;
    top: -0.50px;
    border-left-style: solid;
    border-left-color: #c8ced2;
    border-left-width: 1px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 1px;
    height: 100%;
  }
  
  .processes-tree-list .processes-step1 li.child:last-child::after {
    position: absolute;
    left: -79px;
    top: -0.50px;
    border-left-style: solid;
    border-left-color: #c8ced2;
    border-left-width: 1px;
    border-bottom-color: #c8ced2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 1px;
    height: 0;
  }
  
  .processes-tree-list li.child2::before {
    position: absolute;
    left: -1em;
    top: -2em;
    border-left-color: #c8ced2;
    border-left-style: solid;
    border-left-width: 1px;
    border-bottom-color: #c8ced2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 1em;
    height: 2.5em;
  }
  
  .processes-tree-list li.child3::before {
    position: absolute;
    left: -1em;
    top: -3em;
    border-left-color: #c8ced2;
    border-left-style: solid;
    border-left-width: 1px;
    border-bottom-color: #c8ced2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 1em;
    height: 3.5em;
  }
  
  .processes-tree-list li .borderL1 {
    border: solid 1px #b620e0;
  }
  
  .processes-tree-list li .borderL2 {
    border: solid 1px #6236ff;
  }
  
  .processes-tree-list li .borderL3 {
    border: solid 1px #0091ff;
  }
  
  .processes-tree-list li .borderL4 {
    border: solid 1px #32c5ff;
  }
  
  .processes-tree-list li .borderL5 {
    border: solid 1px #44d7b6;
  }

  
 .processes-tree-sec2 {
    margin: 0 8px;
  } 
  
  .processes-tree-sec2 .table.table-bordered caption {
    caption-side: top !important;
    background-color: #c5c3c3;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.04px;
    text-align: center;
    color: #333333;
    padding: 6px 0 6px 5px;
  }
  
  .processes-tree-sec2 .table.table-bordered th p {
    margin: 0;
    -webkit-transform: rotate(-180deg);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-align: left;
    color: #fff;
    width: 40px;
    white-space: nowrap;
    writing-mode: vertical-rl;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 80px;
    padding: 0 10px;
  }
  
  .processes-tree-sec2 .table.table-bordered th {
    background-color: #2e343a;
    position: relative;
    height: 97px;
    padding: 0 !important;
    text-align: left;
    margin: 0;
    vertical-align: inherit;
    width: 40px;
    overflow:hidden;
  }
  
  .processes-tree-sec2 .table.table-bordered td {
    padding: .5rem;
    text-align: left;
    width: 40px;
    height: 60px;
  }
  
  .processes-tree-sec2 .table.table-bordered td p,
  .processes-tree-sec2 .table.table-bordered td span {
    font-size: 12px;
    font-weight: bold;
    color: #333333;
    position: relative;
    text-align: center;
  }
  
  /*.processes-tree-sec2 .table.table-bordered td p::after {
    position: absolute;
    top: 20px;
    font-size: 16px;
    left: 7px;
    color: #777676;
    font-weight: 600;
    content: '\f107';
    font-family: 'Font Awesome 5 Free';
  }*/
  
  .processes-tree-sec2 .table.table-bordered td small {
    font-size: 11px;
    letter-spacing: 0.1px;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .processes-tree-sec2 .table.table-bordered td.td-lheight {
    line-height: 12px;
  }
  
  .processes-tree-sec2 .table.table-bordered tr.bg-gray td {
    background-color: #f1f2f4;
  }
  
  .processes-tree-sec2 .processes-tree-sec2-scrl-1, .processes-tree-sec2 .processes-tree-sec2-scrl-2{
    //overflow-x: scroll;
    //overflow-y: hidden;
    min-width: 160px;
    background-color: #fff;
    margin: 0 0px;
    padding-bottom:1px;

  }
  .processes-tree-sec2 .processes-tree-sec2-scrl-1 .score-scroll{
    width:100%;
    height:30px;
  }
  // .processes-tree-sec2  .score-scroll{
  //   transform: rotateX(180deg);
  //   overflow-x: scroll;
  //   overflow-y: hidden;
  //   width: 160px;
  // }
  // .processes-tree-sec2  .score-scroll .table{
  //   transform: rotateX(180deg);
  // }
  .processes-tree-sec3 {
    background-color: #fff;
  }
  
  .processes-tree-sec3 .table.table-bordered caption {
    caption-side: top !important;
    background-color: #fff;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #333333;
    padding: 6px 0 6px 10px;
  }
  
  .processes-tree-sec3 .table.table-bordered th {
    background-color: #f7f7f9;
    text-align: center;
    vertical-align: top;
    width: 72px;
    padding: 16px .75rem;
    height:97px;
  }
  .processes-tree-sec3 .table.table-bordered th small{
    font-size: 11px;
    font-weight: normal;
    line-height: 1.36;
    letter-spacing: 0.1px;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }
  .processes-tree-sec3 .table.table-bordered td {
    width: 72px;
    padding: 10px .75rem;
    height: 60px;
  }
  
  .processes-tree-sec3 .table.table-bordered td p,
  .processes-tree-sec3 .table.table-bordered td span {
    font-size: 12px;
    font-weight: normal;
    color: #333333;
    position: relative;
    text-align: center;
    margin: 0;
  }
  
  .processes-tree-sec3 .table.table-bordered td p.drop-icon::after {
    position: absolute;
    top: 20px;
    font-size: 16px;
    left: 17px;
    color: #777676;
    font-weight: 600;
    content: '\f107';
    font-family: 'Font Awesome 5 Free';
  }
  
  
  
  /* CSS SCROLLBAR */
  
  /* 
  .capability-responsive-section::-webkit-scrollbar {
    width: 8px;
  }
  
  .capability-responsive-section::-webkit-scrollbar-track {
    border-radius: 0px;
    background-color: rgb(196, 193, 193);
  }
  
  .capability-responsive-section::-webkit-scrollbar-thumb {
    background: rgb(238, 236, 236);
    border-radius: 10px;
    border: 1px rgb(204, 202, 202) solid;
  } */
  
  /* .l1-l5-scroll{
    overflow-y: scroll;
    overflow-x: auto;
    height: 500px;
  } */

  .ScoreText {
    padding: 0;
    width:24px !important;
  }

  .displayText,
  .ScoreText,
  .detailsText {
    display: none;
  }

  .detailsLabel {
    display: flex;
    width: 50px;
    height: 33px;
    justify-content: center;
    flex-direction: column;
    word-break:break-all;
  }

  div.CustomRadio{
    display: inline-block;
    min-height: 45px;
    margin: 0 25px;
  }
  div.CustomRadio input {
    margin-left: -1.60rem;
  }

  .processes-tree-list li .order-block span.float-right {
    font-size: 12px;
  }
  
  .processes-tree-list li .order-block.bg-green {
    background-color: #60b17e;
  }
  
  .processes-tree-list li .order-block.bg-light-green {
    background-color: #b2cc83;
  }
  
  .processes-tree-list li .order-block.bg-yellow {
    background-color: #ffe687;
  }
  
  .processes-tree-list li .order-block.bg-orange {
    background-color: #ffae7a;
  }
  
  .processes-tree-list li .order-block.bg-red {
    background-color: #ff786e;
  }
  
  .processes-tree-sec2 .table.table-bordered td p::after {
    display: none;
  }
  .processes-tree-sec2 .bg-green {
    background-color: #60b17e;
  }
  
  .processes-tree-sec2 .bg-light-green {
    background-color: #b2cc83;
  }
  
  .processes-tree-sec2 .bg-yellow {
    background-color: #ffe687;
  }
  
  .processes-tree-sec2 .bg-orange {
    background-color: #ffae7a;
  }
  
  .processes-tree-sec2 .bg-red {
    background-color: #ff786e;
  }
  .grid-title{
    // word-break:break-all;
    // line-height: 1.5em;
    // height: 3em;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // width: 100%;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    // word-break: break-all;
    font-size: 11px;
    top: 3px !important;
    width: 100% !important;
    overflow: hidden;
    padding: 0px 5px;
  }
  .l1-itemtext{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    //word-break: break-all;
    font-size: 11px;
    line-height: 1.5em;
    height: 3em;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .h-36px-details{
    margin-bottom:1px;
    padding-top:6px !important;
  }
  .l1tol2processlabel{
    margin-bottom:9px !important;
  }
  .spanscore{
    position: absolute;
    top: 5px;
    right: 5px;
    font-weight:800;
  }
  .header-sec-h1{
    width:690px;
    word-break:break-all;
  }
  .posrel-class{
    position:relative;
  }
  .scoring-text{
    background-color: rgb(197, 195, 195);
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.04px;
    text-align: center;
    color: rgb(51, 51, 51);
    caption-side: top !important;
    padding: 8px 0px 8px 5px;
    width: 100%;
    margin-bottom: 0;
    position: absolute;
    
  }
  .blank-p-style{
    // margin-bottom: -7px;
  }
  .ScoreLabels{
    height:40px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:24px !important;
  }
  .center-importbutton{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .sticky{
    position: fixed;
    width:100%;
    top:55px;
    z-index: 99;
  }
  .sticky1{
    position: fixed;
    width:100%;
    top:55px;
    z-index: 99;
  }
  .fixScroll {
    // width: auto;
    // height: 600px;
    // overflow: auto;
  }
  .detailsLabel.ScoreLabels{
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    font-size: 11px;
    top: 3px !important;
    width: 100% !important;
    overflow: hidden;
    padding: 0px 5px;
  }
.detailsLabel{
  word-break:break-all;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height:36px;
}
.ScoreText{
  width:40px;
}
`;