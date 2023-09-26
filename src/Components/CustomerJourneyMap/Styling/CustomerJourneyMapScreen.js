import styled from 'styled-components';

export const CustomerJourneyMapScreenWrapper = styled.div`
#wrapper #content-wrapper {
    overflow: hidden;
}
dropdown-item {
    white-space: inherit !important;
}
.activitiesLists .textAndColor{
    position: relative;
    padding-right: 10px;
    margin-bottom: 10px;
}
.emotionModal .dropdown-toggle span{
    display: block;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.emotionModal .dropdown-toggle::after{
    position: absolute;
    right: 11px;
    top: 0;
}
.process-table td:first-child .btn-primary.ml-3{
    font-size: 13px!important;
    margin-left: 0px !important;
    margin-top: 10px!important;
}

.emotionModal .dropdown-menu .dropdown-item{
    white-space: inherit !important;
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

.dt-project-sec1 {
    background-color: #fff;
}

.dt-project-sec1 label {
    font-size: 16px;
    letter-spacing: 0.23px;
    color: #000000;
    font-weight: 700;
}

.epic-version .custom-select.custom-select1 {
    width: 112px;
}

.epic-version .custom-select {
    width: 211px;
    height: 40px;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.epic-version .nxtbtn {
    width: 109px;
    height: 40px;
    display: inline-block;
    border-radius: 5px;
    border: solid 1px #083ac8;
    background-color: #fff;
    font-size: 13px;
    font-weight: bold;
    line-height: 36px;
    text-align: center;
    color: #083ac8;
}

.epic-version .btn-download {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.3px;
    color: #083ac8;
    text-decoration: none;
}

.epic-version .btn-download i {
    color: #000;
}

.epic-version h2 {
    font-size: 18px;
    font-weight: normal;
    letter-spacing: 0.01px;
    color: #708393;
}

.epic-version .pager-list a {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #083ac8;
    text-decoration: none;
}

.epic-details-row {
    border-radius: 6px;
    padding: 20px 30px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

.epic-details-row h1 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.01px;
    color: #131313;
}

.epic-details-row .epic-col-wraper .row {
    margin: 0;
}

.epic-details-row .epic-col-wraper h2 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.34px;
    color: #2f353a;
    margin: 0;
}

.epic-details-row .epic-col-wraper p {
    font-size: 12px;
    letter-spacing: 0.26px;
    color: #2f353a;
    margin: 0;
}

.epic-details-row .epic-col-wraper .media img {
    width: 67px;
    height: 67px;
    border-radius: 100%;
    object-fit: cover;
    object-position: 50% top;
}

.epic-details-row .epic-col-wraper .media h5 {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #131313;
}

.epic-details-row .epic-col-wraper .media p {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #131313;
}

.epic-details-row .epic-col-wraper .bg-yellow {
    background-color: #ffe687;
}

.epic-details-row .epic-col-wraper .bg-green {
    background-color: #b2cc83;
}

.epic-details-row .epic-col-wraper .bg-orange {
    background-color: #ffae7a;
}

.epic-details-row .epic-col-wraper .bg-lightblue {
    background-color: #a8e4f6
}

.epic-details-row .epic-col-wraper .bg-gray {
    background-color: #f4f4f4;
}

.dt-btn-sec .btn-primary {
    width: 106px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-align: center;
}

.dt-btn-sec a {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: normal;
    color: #083ac8;
}

.dt-screen-main {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 0px;
    width: 100%;
}

.dt-screen-main .dt-content-wrapper {
    background-color: #f6f7f8;
    width: 100%;
    padding-left: 58px;
    padding-right: 25px;
}
.dt-screen-main .dt-content-wrapper.right-toggle {
    padding-left: 345px !important;
}
.table-section .tbltitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 30px 10px 40px;

}
.scrollmedia {
    height: 60vh;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: 20px;
}
.scrollmedia .media img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 100%;
    overflow: hidden;
}
.scrollmedia .media p {
    padding: 0px;
}
.table-section .tbltitle ul {
    margin: 0;
}

.table-section .tbltitle ul li a,
.table-section .tbltitle ul li {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    text-align: right;
    color: #083ac8 !important;

}

.table-section .tbltitle h2 {
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #000000;
    margin: 0;
}

.table-section .tbltitle h2 a {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #083ac8;
}

.table-section .tbltitle h2 a i.fa-plus {
    width: 24px;
    height: 24px;
    border: solid 1px #d2d3d4;
    background-color: #fff;
    color: #000;
    border-radius: 100%;
    text-align: center;
    line-height: 22px;
}

.table-section .tbltitle h2 .btn-drop {
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #000000;
    margin: 0;
}

.process-table i.fa-plus,
.process-table i.fa-minus {
    width: 24px;
    height: 24px;
    border: solid 1px #d2d3d4;
    background-color: #fff;
    color: #000;
    border-radius: 100%;
    text-align: center;
    line-height: 22px;
}

.process-table thead td,
.process-table thead th {
    line-height: 16px;
    font-size: 12px;
}

.process-table .tableTopTr td {
    border: 0px transparent solid !important;
    position: relative;
}

.process-table .tableTopTr td a {
    position: absolute;
    right: 0;
    bottom: 20px;
    margin-right: -13px;
    display: inline-block;
    z-index: 2;
}

.process-table .tableTopTr td a::before {
    content: '';
    bottom: -20px;
    right: 12px;
    position: absolute;
    width: 1px;
    height: 21px;
    background-color: #ccc;
}

.process-table td:first-child,
.process-table th:first-child {
    width: 150px;
}

.process-table .substages {
    background-color: #4c9ce0 !important;
    color: #fff;
}

.process-table .bg-gray {
    background-color: #f4f4f4;
}

.process-table .tbltxt1 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.34px;
}

.process-table .tbltxt2 {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.34px;
}

.process-table .tbltxt3 {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.26px;
}

.process-table .tbltxt4 {
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #000000;
}

.process-table .tbltxt5 {
    font-size: 11px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #000000;
}

.process-table .tbltxt6 {
    font-size: 10px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.21px;
    color: #000;
}

.process-table .tbltxt6 i {
    color: rgb(170, 24, 24);
}

.process-table .process-sm-img {
    width: 30px;
    height: 30px;
}

.process-table td .circle {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    border: solid 1px #c8ced3;
    display: inline-block;

}

.process-table td .circle-green {
    background-color: #78b76b;
}

.process-table td .circle-yellow {
    background-color: #fbf075;
}

.process-table td .circle-red {
    background-color: #e06862;
}

.process-table .process-sm-img img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 100%;
    overflow: hidden;
}

.process-table td p {
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 14px;
    letter-spacing: 0.24px;
    color: #2f353a;
    /* height: 28px;
    overflow: hidden; */
    margin-bottom: 10px;
}

.process-table td p input {
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 14px;
    letter-spacing: 0.24px;
    color: #2f353a;
    border: none;
    outline: none !important;
}

.process-table td ol .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 3px;
}

.process-table td ol .greendot {
    background-color: #94ce65;
}

.process-table td ol .yellowdot {
    background-color: #f6c851;
}

.process-table td ol .reddot {
    background-color: #e75c53;
}

.process-table td p input::placeholder {
    color: #2f353a;
    opacity: 1;
}

.process-table td p input:-ms-input-placeholder {
    color: #2f353a;
}

.process-table td p input::-ms-input-placeholder {
    color: #2f353a;
}

.process-table .circle-container {
    position: relative;
}
.process-table .circle-container1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}
.process-table .circle-container1 i.fa-plus {
    width: 50px;
    height: 50px;
    border: solid 1px #d2d3d4;
    background-color: #fff;
    color: #afadad;
    border-radius: 100%;
    font-size: 20px;
    text-align: center;
    line-height: 47px;
}
.process-table .circle-container .circle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: normal;
    letter-spacing: 0.21px;
    color: #2f353a;
}

.process-table .red-circle {
    width: 30px;
    height: 30px;
    background-color: #ff5353;
    border-radius: 100%;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f3b7b7;

}


.dt-project-sec1 .warehousing-slider {
    margin: 18px 0 0 0;
}

.dt-project-sec1 .warehousing-slider li {
    font-size: 11px;
    letter-spacing: 0.16px;
    text-align: left;
    color: #1665d8;
    position: relative;
    margin: -3px;
    width: 100px;
}

.dt-project-sec1 .warehousing-slider li span {
    display: inline-block;
    margin-left: -17px;
}

.dt-project-sec1 .warehousing-slider li:first-child span {
    margin-left: -5px;
}

.dt-project-sec1 .warehousing-slider li:nth-child(3) span {
    margin-left: -8px;
}

.dt-project-sec1 .warehousing-slider li:before {
    content: "";
    position: absolute;
    left: 0;
    top: -14px;
    width: 100%;
    height: 2px;
    background-color: #ccc;
}

.dt-project-sec1 .warehousing-slider li:after {
    content: "";
    position: absolute;
    left: 0;
    top: -19px;
    width: 12px;
    height: 12px;
    border-radius: 30px;
    background-color: #cccbcd
}

.dt-project-sec1 .warehousing-slider li.active:after {
    background-color: #20a8d8;
}

.dt-project-sec1 .warehousing-slider li:last-child:before {
    display: none;
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

.version-drop .dropdown-menu .version-style p span.fontbold {
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

.interviews-tabs .custom-select {
    width: 112px;
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
    font-size: 13px;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.interview-heading .version-drop .dropdown-toggle {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.01px;
    color: #131313;
    margin-top: 6px;
    display: inline-block;
}

.version-drop .dropdown-menu {
    padding: 10px 0;
    width: 354px;
}

.version-drop .btn-drop {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.26px;
    color: #000000;
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

.version-drop .dropdown-menu .version-style p.date-txt {
    font-size: 12px;
    font-weight: bold;
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

.stakmodal .modal-dialog .modal-content {
    border-radius: 0;
    border: solid 0px rgba(46, 91, 255, 0.08);
}

.stakmodal .modal-dialog .modal-content .modal-header {
    padding: 5px 1rem;
    border-bottom: 0px solid #dee2e6;
}

/*     
.stakmodal .modal-dialog .modal-body {
    padding: 0 1rem;
}
 */

.stakmodal .modal-dialog .modal-body .media {
    align-items: center;
}

.stakmodal .modal-dialog .modal-body .media img {
    width: 84px;
    height: 84px;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 100%;
}

.stakmodal .modal-dialog .modal-body .media h5 {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: .5px;
    color: #2e384d;
    margin: 0;
}

.stakmodal .modal-dialog .modal-body .media p {
    font-size: 15px;
    font-weight: 400;
    letter-spacing: normal;
    color: #8798ad;
    margin: 0;
}

.stakmodal .modal-dialog .modal-body .media p span {
    font-size: 13px;
    font-weight: 500;
    color: #2e384d;
    margin: 0;
}

.stakmodal .connections h3 {
    font-size: 15px;
    font-weight: 700;
    color: #2e384d;
    text-align: left;
    margin-top: 20px;
}

.stakmodal .connections .impact-block {
    display: flex;
    justify-content: space-between;
}

.stakmodal .connections .impact-block p {
    font-size: 13px;
    font-weight: 700;
    color: #2e384d;
    text-align: left;
}

.stakmodal .connections .impact-block p span {
    font-size: 13px;
    font-weight: 400;
    color: #8798ad;
}

.stakmodal .connections select {
    width: 95px;
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    margin-left: 10px;
}

.stakmodal .connections .impct span {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.13px;
    color: #2f353a;
}

.stakmodal .connections .influence-block {
    display: flex;
    align-items: center;
}

.stakmodal .connections .influence-block .dropdown-toggle {
    width: 75px;
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
    border-radius: 5px;
    display: inline-block;
    line-height: 36px;
}

.stakmodal .connections .influence-block .dropdown-toggle::after {
    display: none;
}

.stakmodal .connections .influence-block .dropdown-toggle::before {
    width: 17px;
    text-align: center;
    float: right;
    vertical-align: 0;
    padding-right: 14px;
    padding-top: 4px;
    border: 0;
    font-weight: 900;
    color: #708088;
    font-size: 12px;
    content: '\f078';
    font-family: 'Font Awesome 5 Free';
}

.stakmodal .connections .influence-block .dropdown-menu {
    min-width: 76px;
    text-align: center;
}

.influence-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 100%;
}

.stakmodal .connections .influence-block .arrow-lg {
    position: relative;
    text-align: center;
}

.stakmodal .connections .influence-block .arrow-lg p {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -13px;
    text-align: center;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #8798ad;
}

.stakmodal .add-comment h3 {
    font-size: 15px;
    font-weight: 700;
    color: #2e384d;
    text-align: left;
    margin-top: 20px;
}

.stakmodal .add-comment textarea {
    width: 100%;
    height: 151px;
    border-radius: 4px;
    border: solid 1px #d3d8e1;
    background-color: #fff;
}

.stakmodal .nav-tabs li {
    margin-right: 10px;
}

.stakmodal .nav-tabs li a {
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.47;
    letter-spacing: normal;
    color: #2e384d;
    padding: 10px 0;
    border: 3px transparent solid;
    border-radius: 0;
}

.stakmodal .nav-tabs li a.active,
.stakmodal .nav-tabs li a:hover {
    border: 3px transparent solid;
    border-bottom: 3px #083ac8 solid !important;
}
.table-responsive {
    max-width: 1200px;
    min-width: 100%;
}
.emotionModal h5{
    font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: normal;
  color: #2e384d;
}
.emotionModal label{
    font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: #333333;
}
.emotionModal .form-control, .emotionModal .dropdown-toggle{
    height: 40px;
  border: solid 1px #d3d8e1;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: rgba(46, 56, 77, 0.79);
}
.emotionModal textarea{
    height: 100px !important;
}
.emotionModal .dropdown-toggle{
    height: 40px;
    border: solid 1px #d3d8e1;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: rgba(46, 56, 77, 0.79);
    display: block;
    border-radius: .25rem;
    line-height: 35px;
    padding: 0 10px;
    text-decoration: none;
}
.emotionModal .dropdown-toggle::after {
    float: right;
    margin-top: 17px;
}
.emotionModal .dropdown-menu .dropdown-item{
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: rgba(46, 56, 77, 0.79);
}
.emotionModal .addlink a{
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #083ac8;
    text-decoration: none;
}
@media (min-width: 992px) {
    .noiModal .modal-lg {
        max-width: 1045px;
    }
}

@media (max-width: 767px) {
    .dt-btn-sec {
        margin-top: 20px;
    }
}

@media (max-width: 575px) {
    .dt-project-sec1 .warehousing-slider li {
        width: 57px;
    }

    .dt-screen-main .dt-content-wrapper {
        padding-left: 0px;
    }
}
.dt-left-nav-bar {
    height: 100%;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    background-color: #fff;
    position: fixed;
    top: 164px;
    z-index: 99;
}

.dt-left-list {
    list-style: none;
    padding: 0;
    width: 55px;
    border: 1px #ccc solid;
    height: 100%;
}

.dt-left-nav-bar .dt-left-list li {
    display: block;
    padding: 10px;
    text-align: center;
}

.dt-left-nav-bar .dt-left-list li a i {
    color: #708393;
}

.dt-left-nav-bar .dt-left-list li a:hover i {
    color: #708393ce;
}

.dt-left-nav-bar .active-left-panel {
    width: 267px;
    height: 100%;
    border: 1px #ccc solid;
}

.active-left-panel .search-area {
    background-color: #efeff0;
}

.active-left-panel h2 {
    font-size: 14px;
    font-weight: 700;
    color: #000000;
    padding: 12px;
    border-bottom: 1px #ccc solid;
}

.active-left-panel .form-group.has-search {
    margin-bottom: 0;
}

.active-left-panel p {
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    padding: 0 12px;
}

.active-left-panel .benchmarking-list {
    height: 54vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 20px;
}

.active-left-panel .benchmarking-list .card {
    border: 0px transparent solid;
    padding: 0px 0 12px 20px;
}

.active-left-panel .benchmarking-list .card a {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: normal;
    color: rgb(0, 0, 0);
    padding-left: 30px;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    position: relative;
    height: 27px;
    padding-top: 5px;
    margin-top: -7px;
    text-decoration: none;
    overflow: hidden;
}

.active-left-panel .benchmarking-list .card a:after {
    align-items: center;
    width: 26px;
    height: 26px;
    background-color: #c7c9cb;
    border-radius: 100%;
    text-align: center;
    float: left;
    justify-content: center;
    display: flex;
    border: 0;
    font-weight: 900;
    color: #fff;
    font-size: 12px;
    content: '\f068';
    font-family: 'Font Awesome 5 Free';
    margin-top: 0px;
    margin-right: 8px;
    position: absolute;
    margin-left: -30px;
    top: 0px;
}

.active-left-panel .benchmarking-list .card a.collapsed:after {
    content: '\f067';
}

.active-left-panel .benchmarking-list .card .domain-list {
    list-style: none;
    padding: 8px 0 0 28px;
    margin-bottom: 0;
}

.active-left-panel .benchmarking-list .card .domain-list li {
    position: relative;
    // height: 36px;
    display: flex;
    align-items: center;
}

.active-left-panel .benchmarking-list .card .domain-list li::before {
    position: absolute;
    left: -45px;
    top: -11px;
    border-left-color: #c8ced2;
    border-left-style: solid;
    border-left-width: 1px;
    border-bottom-color: #c8ced2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 30px;
    height: 100%;
}
// .active-left-panel .benchmarking-list .card .domain-list li:first-child::before{
//     height: 83%;
//     top: -13px;
// }
.active-left-panel .benchmarking-list .card .custom-checkbox{
    margin-top: -4px;
}
.active-left-panel .benchmarking-list .card .domain-list li label{
    font-size: 12px;
    font-weight: 500;
    letter-spacing: normal;
    color: #000000;

}
.active-left-panel .benchmarking-list .card .domain-list li .custom-control-label::before {
    position: absolute;
    top: 1px;
    border-radius: 3px !important;
}
.active-left-panel .benchmarking-list .card .domain-list li .custom-control-input:checked~.custom-control-label::before {
    color: #007bff;
    border-color: #c7c9cb;
    background-color: #fff;
    content: '\f00c';
    font-weight: 900;
    text-align: center;
    font-size: 9px;
    font-family: 'Font Awesome 5 Free';
    
}
.active-left-panel .benchmarking-list .card .domain-list li .custom-control-input:checked~.custom-control-label::after{
    background-image: none !important;
}
.active-left-panel .w-267{
    width: 267px;
}
.active-left-panel .draw-list .draw-link {
    font-size: 14px;
    font-weight: 600;
    color: #6c7883;
    text-decoration: none;
    display: block;
}
.active-left-panel .draw-list ul{
    padding-left: 20px;
    margin-top: 15px;
}
.active-left-panel .draw-list ul li{
    padding-right: 0;
    width: 40px;
    text-align: center;
    margin-bottom: 10px;
}

.active-left-panel .draw-list .draw-link:after {
    width: 14px;
    height: 25px;
    float: left;
    font-weight: 900;
    color: #ccc;
    font-size: 20px;
    content: '\f0d7';
    font-family: 'Font Awesome 5 Free';
    margin-top: -5px;
    margin-right: 8px;
}

.active-left-panel .draw-list .draw-link.collapsed:after {
    content: '\f0da';
}
// .activitiesLists div {
//     display: list-item
// }
// .touchpointsLists div {
//     display: list-item
// }
// .painpointsLists div {
//     display: list-item
// }
// .opportunityLists div {
//     display: list-item
// }
.olsmtext {
    font-size: 11px;
    font-weight: normal;
    font-style: normal;
    line-height: 14px;
    letter-spacing: 0.24px;
    color: #2F353A;
    padding-left: 11px;
}
.table-absolute {
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
}
    
`;