import styled from 'styled-components';

export const QuestionsBankWrapper = styled.div`
.question-dropsec h2 {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.23px;
    color: #000000;
}

.quedropdown {
    text-align: right;
    position: absolute;
    right: 23px;
    top: 13px;
}
.prioritydrop select{
    font-size: 13px;
}
.prioritydrop{
   margin-left: auto;
    text-align: right;
    margin-bottom: 20px;
}

.questionfrm .quelabel{
    padding-right: 40px;
}

.question-dropsec .custom-select {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    font-size: 13px;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    width: 300px;
}

.question-dropsec .dropdown-toggle {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    font-size: 13px;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    width: 148px;
    display: inline-block;
    background-color: #fff;
    text-align: left;
}

.question-dropsec .dropdown-menu {
    padding: 0;
    left: -55px !important;
}

.question-dropsec .dropdown-menu a {
    display: block;
    font-size: 12px;
    letter-spacing: 0.17px;
    color: #333333;
    text-decoration: none;
    padding: 10px 18px;
    border-bottom: solid 1px #c8ced3;
}

.question-dropsec .dropdown-menu a:hover {
    color: #000;
}

.question-dropsec .dropdown-toggle::after {
    margin-top: 10px;
    float: right;
}

.question-dropsec .btn-primary {
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    width: 106px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
}

.question-sec .bg-light {
    background-color: rgb(255, 255, 255) !important;
    border-radius: 4px;
    padding: 17px;
    position: relative;
    box-shadow: 0 1px 10px 0 rgba(153, 153, 153, 0.4);
    margin-bottom: 20px;
}

.questionfrm .quelabel {
    font-size: 13px;
    font-weight: bold;
    line-height: 1.85;
    letter-spacing: normal;
    color: rgba(51, 51, 51, 0.7);
    width: 100%;
}

.questionfrm .quecontent-lg {
    width: 100%;
    border: solid 1px #c8ced3;
    padding: 10px 10px 0 10px;
}

.questionfrm .quecontent-lg textarea {
    border: none;
    width: 100%;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: #333333;
    resize: none;
}

.questionfrm .quecontent-sm textarea {
    border: none;
    width: 100%;
    text-align: left;
    font-size: 13px;
    line-height: 1.23;
    letter-spacing: normal;
    color: #333333;
    resize: none;
}

button:focus,
textarea:focus,
input:focus {
    outline: none !important;
    box-shadow: none !important;
}

.questionfrm .quecontent-sm {
    width: 100%;
    border: solid 1px #c8ced3;
    padding: 10px;
    font-size: 13px;
    line-height: 1.23;
    letter-spacing: normal;
    color: #333333;
}

.questionfrm .custom-select {
    height: 35px;
    border-radius: 4px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.quedropdown {
    text-align: right;
}

.quedropdown .dropleft .dropdown-toggle::before {
    display: none;
}

.quedropdown .dropleft .dropdown-toggle {
    color: #73818f;
    text-decoration: none;
}

.quedropdown .dropdown-menu.show {
    top: 20px !important;
    left: 16px !important;
}

.quedropdown .dropdown-menu {
    width: 194px;
    border-radius: 3px;
    border: solid 1px #c8ced3;
    padding: 0;
}

.quedropdown .dropdown-menu a {
    display: block;
    font-size: 12px;
    letter-spacing: 0.17px;
    color: #333333;
    text-decoration: none;
    padding: 10px 18px;
    border-bottom: solid 1px #c8ced3;
}

.quedropdown .dropdown-menu a:hover {
    color: #000;
}

.quedropdown .dropdown-menu a:last-child {
    border: none;
}

.delrow a {
    color: #8c8c90;
    text-decoration: none;
}

.delrow span {
    font-size: 11px;
    letter-spacing: normal;
    color: #5f6c72;
}


/* Right Panel */

.question-right-panel {
    position: fixed;
    right: 0px;
    height: 90%;
    width: 267px;
    background-color: rgb(255, 255, 255);
    overflow-y: scroll;
    z-index: 5;
    bottom: 28px;
}

.question-right-panel .card a.banktxt span{
    white-space: nowrap;
    width: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block; 
}

.question-right-panel .card .card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: transparent;
    border-top: 1px solid rgba(0, 0, 0, .125);
    border-bottom: 1px solid rgba(0, 0, 0, .125);
}

.question-right-panel .card .card-title {
    font-size: 14px;
    font-weight: 700;
    color: #000000;
}

.question-right-panel .accordion .card-header:after {
    width: 17px;
    text-align: center;
    float: right;
    vertical-align: 0;
    padding-right: 14px;
    padding-top: 4px;
    border: 0;
    font-weight: 900;
    color: #9e9b9b;
    font-size: 12px;
    content: '\f068';
    font-family: 'Font Awesome 5 Free';
}

.question-right-panel .accordion .card-header.collapsed:after {
    content: '\f067';
}

.question-right-panel .card {
    border: none;
}

.question-right-panel .card a[aria-expanded="false"]::after {
    -webkit-box-align: center;
    align-items: center;
    width: 26px;
    height: 26px;
    background-color: rgb(199, 201, 203);
    text-align: center;
    float: left;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    color: rgb(255, 255, 255);
    font-size: 12px;
    content: "";
    font-family: "Font Awesome 5 Free";
    margin-top: -5px;
    margin-right: 8px;
    border-radius: 100%;
}

.question-right-panel .card a[aria-expanded="true"]::after {
    content: "";
    -webkit-box-align: center;
    align-items: center;
    width: 26px;
    height: 26px;
    background-color: rgb(199, 201, 203);
    text-align: center;
    float: left;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    font-weight: 900;
    color: rgb(255, 255, 255);
    font-size: 12px;
    font-family: "Font Awesome 5 Free";
    margin-top: -5px;
    margin-right: 8px;
    border-radius: 100%;
}

.question-right-panel h2 {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
    padding-left: 10px;
    border-bottom: solid 1px #e4e8f0;
    padding-bottom: 12px;
}

/* .benchmarking-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
.benchmarking-list .listscroll{
    overflow-y: scroll;
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
} */
.question-right-panel .card a.banktxt {
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000000;
    text-decoration: none;
}

.question-right-panel .domain-list {
    list-style: none;
    padding-left: 35px;
    position: relative;
}

.question-right-panel .domain-list li {
    position: relative;
}

.question-right-panel .domain-list li::after {
    content: '';
    position: absolute;
    background-color: #e4e8f0;
    width: 22px;
    top: 15px;
    left: -21px;
    height: 1px;
}

.question-right-panel .domain-list li::before {
    content: '';
    position: absolute;
    background-color: #e4e8f0;
    width: 1px;
    top: 0px;
    left: -21px;
    height: 100%;
}

.question-right-panel .domain-list li:last-child::before {
    height: 16px;
}

.question-right-panel .domain-list .card .domain-list li {
    padding: 5px 0;
}

.question-right-panel .domain-list .card .domain-list li:last-child::before {
    height: 50%;
}

.question-right-panel .domain-list .card .domain-list li::after {
    content: '';
    position: absolute;
    background-color: #e4e8f0;
    width: 22px;
    top: 17px;
    left: -26px;
    height: 1px;
}

.question-right-panel .domain-list .card .domain-list li::before {
    content: '';
    position: absolute;
    background-color: #e4e8f0;
    width: 1px;
    top: 0px;
    left: -26px;
    height: 100%;
}

.question-right-panel .domain-list .card a.banktxt {
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #000000;
    text-decoration: none;
}

.question-right-panel .domain-list .card .domain-list li span {
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #083ac8;
}

.question-right-panel .domain-list li {
    padding: 10px 0;
}

.question-right-panel .domain-list .card a[aria-expanded="false"]::after {
    width: 16px;
    height: 16px;
    font-size: 10px;
    margin-top: -2px;
}

.question-right-panel .domain-list .card a[aria-expanded="true"]::after {
    width: 16px;
    height: 16px;
    font-size: 8px;
    margin-top: -2px;
}

.modal .dropfield span {
    display: inline-block;
    position: relative;
    height: 30px;
    line-height: 29px;
    text-align: center;
    background-color: rgb(240, 243, 245);
    font-size: 13px;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    padding: 0px 12px 0px 26px;
    text-decoration: none;
}

.modal .dropfield span i {
    position: absolute;
    left: 10px;
    top: 9px;
    color: rgb(150, 150, 150);
    cursor: pointer;
}

.modal .dropfield {
    height: 40px;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    display: inline-block;
    width: 100%;
    position: relative;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.32);
    border-image: initial;
    border-radius: 4px;
    padding: 4px 11px 4px 4px;
    text-decoration: none !important;
}

.modal .dropfield.dropleft .dropdown-toggle {
    font-size: 15px;
    text-decoration: none;
    color: #a0a0a0;
    margin-top: 4px;
}

.modal .dropfield.dropleft .dropdown-toggle::before {
    display: none;
}

.modal h5 {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #131313;
}

.modal-header,
.modal-footer {
    border: none;
}

.modal .form-group label {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: 0.13px;
    color: #2f353a;
}

.modal .form-group .disabled-date {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 8px;
    margin-bottom: 13px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    border-bottom: 1px solid rgb(234, 228, 228);
}

.modal .form-group .disabled-date span {
    font-size: 14px;
    font-weight: 500;
    color: rgb(0, 0, 0);
    background-color: transparent !important;
    padding: 0px;
}

.modal .form-group .d-date {
    position: absolute;
    right: 13px;
    top: 2px;
    font-size: 12px;
    color: rgb(146, 145, 145);
}

.modal .form-group .dropdown-menu {
    top: 30px !important;
    left: 25px !important;
    transform: none;
    width: 100%;
}

.modal .form-group .dropdown-menu .searchbox {
    border: none;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.85;
    letter-spacing: normal;
    color: rgba(51, 51, 51, 0.7);
    padding: 10px;
    height: 45px;
}

.modal .form-group .dropdown-menu .dropheight {
    overflow-y: scroll;
    max-height: 100px;
}

.modal .form-group .dropdown-menu .custom-control .custom-control-label {
    font-size: 14px;
    font-weight: normal !important;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6) !important;
}

.modal-footer .btn-primary {
    width: 105px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.5px;
    text-align: center;
}

.modal-footer .btn-secondary {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #083ac8;
    text-decoration: none;
    background-color: transparent;
    border: none !important;
}

.benchmarking-map {
    margin: 30px 20px 0 20px;
    position: relative;
}

.benchmarking-map::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0;
    width: 96%;
    height: 2px;
    background-color: #979797;
}

.benchmarking-map ul {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.benchmarking-map ul li {
    font-size: 11px;
    font-weight: normal;
    letter-spacing: 0.16px;
    text-align: center;
    color: #1665d8;
    position: relative;
    padding-top: 20px;
    width: 50px;
    margin-left: -20px;
    height: 50px;
}

.benchmarking-map ul li:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 40%;
    width: 12px;
    height: 12px;
    background-color: #cccbcd;
    border-radius: 20px;
}

.benchmarking-map ul li.active:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 40%;
    width: 12px;
    height: 12px;
    background-color: #20a8d8;
    border-radius: 20px;
}

.benchmarking-map ul li.active-tick:before {
    content: "\f00c";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    top: -11px;
    left: 40%;
    width: 24px;
    height: 24px;
    background-color: #20a8d8;
    border-radius: 20px;
    color: #fff;
    font-size: 15px;
    padding-top: 2px;
}

.question-sec h2 {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.23px;
    color: #000000;
}

.form-group.has-search {
    position: relative;
    background-color: #f6f7f8;
    padding: 10px;
}

.has-search .form-control {
    padding-right: 2.375rem;
    border-radius: 30px;
}

.has-search .form-control-feedback {
    position: absolute;
    right: 7px;
    top: 8px;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}

.domain-slider-sec .heading-list {
    display: flex;
    justify-content: space-between;
}

.domain-slider-sec .heading-list h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.34px;
    color: #000000;
}

.domain-slider-sec .heading-list small {
    font-size: 14px !important;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #083ac8;
}

.domain-slider-sec .heading-list small i.fa-plus {
    width: 24px;
    height: 24px;
    border: solid 1px #d2d3d4;
    background-color: #fff;
    color: #000;
    border-radius: 100%;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    display: inline-block;
}

.domain-slider-sec .heading-list span {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: normal;
    color: rgba(51, 51, 51, 0.6);
    font-family: 'Montserrat', sans-serif;
}

.domain-slider-sec .heading-list li.sm-txt {
    display: flex;
    align-items: center;
}

.domain-slider-sec .bg-light {
    border-radius: 4px;
    padding: 17px;
    background-color: #ffffff !important;
}

.domain-slider-sec .bg-light p.que {
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #333333;
}

.domain-slider-sec .bg-light p small {
    font-size: 13px;
    font-weight: bold;
    line-height: 1.85;
    letter-spacing: normal;
    color: rgba(51, 51, 51, 0.7);
}

@media (max-width: 480px) {
    .benchmarking-map ul li {
        font-size: 9px;
    }

    .benchmarking-map {
        margin: 30px 0px 0 0px;
    }
}



/* Pick a template */

#picktemplate .list-inline img{
    border:2px #ccc solid;
   }
@media (min-width: 992px) {

    .modal-lg,
    .modal-xl {
        max-width: 840px;
    }
}
`;