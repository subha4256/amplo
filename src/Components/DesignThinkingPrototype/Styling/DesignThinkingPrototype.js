import styled from 'styled-components';

export const DesignThinkingPrototypeWrapper = styled.div`
.single-resizer{
    border : transparent !important;
}
.squarbox {
    display: inline-block;
    height: 33px;
    width: 33px;
    box-shadow: 1px 3px 5px #00000059;
}
.boxyellow {
    background-color: #fdebb1;
}
.boxorange {
    background-color: #f8dcaf;
}
.boxgreen {
    background-color: #cde4b2;
}
.boxblue {
    background-color: #c6e2f5;
}
.shape-svg{
    fill:#d8d8d8;
    stroke: #ccc;
    stroke-width: 1;
    height:100% !important;
    width : 100% !important;
}
.shape-svg-arrow{
    -ms-transform: rotate(-40deg); 
    transform: rotate(-40deg);
    fill:#d8d8d8;
    height:100% !important;
    width : 100% !important;
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
    color: #000000;
    text-decoration: none;
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
    margin-top: -5px;
    margin-right: 8px;
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
    height: 36px;
    display: flex;
    align-items: center;
}

.active-left-panel .benchmarking-list .card .domain-list li::before {
    position: absolute;
    left: -45px;
    top: -20px;
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
.active-left-panel .benchmarking-list .card .domain-list li:first-child::before{
    height: 83%;
    top: -13px;
}
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
#wrapper #content-wrapper {
    overflow: hidden;
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

button:focus,
textarea:focus,
input:focus {
    outline: none !important;
    box-shadow: none !important;
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
.epic-version .custom-select{
    width: 143px;
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
    font-size: 13px;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}
.epic-version h2 a{
    width: 195px;
  height: 35px;
  border-radius: 17.5px;
  border: solid 1px #c8ced3;
  background-color: #fff;
  display: inline-block;
  font-family: Montserrat;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  color: #083ac8;
  text-decoration: none;
  line-height: 30px;
}
.epic-version .pager-list a {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #083ac8;
    text-decoration: none;
}

.epic-version .pager-list .nextbtn {
    width: 109px;
    height: 40px;
    display: inline-block;
    border-radius: 5px;
    border: solid 1px #083ac8;
    text-transform: uppercase;
    background-color: #fff;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    color: #083ac8;
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
    padding-left: 25px;
    padding-right: 25px;
}

.benchmarking-col-wraper .dropdown-toggle i {
    color: #000;
}

.benchmarking-col-wraper .dropleft .dropdown-toggle::before {
    display: none;
}

.benchmarking-col-wraper h3 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.01px;
    color: #131313;
}

.benchmarking-col-wraper .dropdown-item {
    font-size: 12px;
    color: #083ac8;
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
/* .dt-project-sec1 .warehousing-slider li.active::before {
    background-color: #20a8d8;
} */

.dt-project-sec1 .warehousing-slider li:last-child:before {
    display: none;
}

.generate-ideas-row .card.ideascard {
    border-radius: 0;
    height: 100%;
}

.generate-ideas-row .card .card-header {
    background-color: #fff;
    padding: 6px 1.25rem;
    height: 50px;
}

.generate-ideas-row .card .card-body {
    background-color: #ebeef0;
}

.generate-ideas-row .card .card-header h3 {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: normal;
    color: #2e384d;
    margin: 0;
}

.generate-ideas-row .card .card-header .custom-select {
    width: 141px;
    height: 35px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    font-size: 13px;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.generate-ideas-row .card .card-header .submit-idea i {
    width: 24px;
    height: 24px;
    border: solid 1px #d2d3d4;
    background-color: #fff;
    color: #000;
    border-radius: 100%;
    text-align: center;
    line-height: 22px;
}

.generate-ideas-row .card .card-header .submit-idea .btn-outline-primary {
    width: 109px;
    height: 35px;
    border: solid 1px #083ac8;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: #083ac8;
}
.generate-ideas-row .card .card-header .submit-idea .btn-outline-primary:hover{
    color: #fff;
}
.idealeft .card-body .card {
    border-left: 2px #00c1d4 solid !important;
    border-radius: 6px;
    max-width: 60%;
}

.idealeft .card-body .card.active {
    border: 2px #083ac8 solid !important;
}

.idealeft .card-body .card .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 6px;
    padding: 22px 15px;
}

.idealeft .card-body .card .card-title {
    padding-left: 0;
    font-size: 15px;
    font-weight: 700;
    color: #2e384d;
}

.idealeft .card-body .card .dropdown-toggle i {
    color: #000;
}

.idealeft .card-body .card .card-body .added-box p {
    margin: 0;
    font-size: 11px;
    font-weight: 400;
    color: #8798ad;
}

.idealeft .card-body .card .card-body .added-box p span {
    color: #083ac8;
}

.idealeft .card-body .card .card-title .dropleft .dropdown-toggle::before {
    display: none;
}

.idealeft .card-body .card .dropdown-item {
    font-size: 12px;
    letter-spacing: 0.17px;
    color: #333333;
}

.idealeft .card-body .card .dropleft .dropdown-menu .dropdown-item {
    color: #083ac8 !important
}

.card-body.ideas-card {
    display: flex;
    flex-wrap: wrap;
}

.ideas-card .ideas-box {
    width: 100%;
    height: 222px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #fdebb1;
    padding: 15px;
    margin: 0 0 15px 0;
    position: relative;
}
.ideas-card .ideas-box .moreicon{
    position: absolute;
    right: 13px;
    top: 6px;
    color: #000;
}
.ideas-card .ideas-box.active{
    border:2px #083ac8 solid;
}
.ideas-card .ideas-box h3 {
    font-size: 14px;
    font-weight: bold;
    color: #2e384d;
}

.ideas-card .ideas-box p {
    font-size: 12px;
    letter-spacing: 0.26px;
    color: #2f353a;
}
.ideas-card .ideas-box .votebtn{
 position: absolute;
 left: 0;
 bottom: 20px;
 width: 100%;
 text-align: center;
}
.ideas-card .ideas-box .votebtn a{
  width: 139px;
  height: 36px;
  border-radius: 18px;
  background-color: #f57e59;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  display:inline-block;
  text-decoration: none;
  line-height: 36px;
}
.ideas-card .ideas-box .votebtn a:hover{
    background-color: #e96d47;
}
.prototype-height{
    height: 600px;
    position: relative;
}


@media (max-width: 767px) {
    .dt-btn-sec {
        margin-top: 20px;
    }
    .vote-client{
        margin: 10px 0 !important;
    }
    .ideas-card .ideas-box{
        width: 100%;
    }
    .generate-ideas-row .card .card-header {
        height: auto;
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
`;