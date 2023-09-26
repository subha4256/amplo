import styled from 'styled-components';

export const DTDVFWrapper = styled.div`

.input-range {
    height: 7px !important;
}
.input-range__slider{
z-index: 6 !important;
margin-top: -16px !important;
}
.input-range__track{
top: -1px !important;
    height: 10px !important;
}

.card-body.ideas-card .row.w-100:first-child .fourideas{
    margin-top:0!important;
}
.card-body.ideas-card .row.w-100:first-child .custom-control.custom-checkbox{
    margin-top:70px!important;
}
.card-body.ideas-card .row.w-100 .custom-control.custom-checkbox{
    margin-top:0px!important;
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
    width: 170px;
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
.fourideas{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    position: relative;
    margin-top:76px
}
.fourideas.fourideas1{
    height: 100%;
}
.fourideas .idealist h2{
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #2e384d;
}
.fourideas .idealist .ideatxt{
    width: 109px;
    height: 60px;
    border: solid 1px #c8ced3;
    background-color: #fff;
    display: block;
    padding: 10px;
    text-align: center;
    font-size: 25px;
    color: #000;
}
.btn-proceed{
    font-family: Montserrat;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.5px;
  text-align: center;
  color: #fff !important;
  width: 303px;
  height: 40px;
  border-radius: 4px;
  line-height: 27px;
  border: solid 1px #083ac8;
  background-color: #083ac8;
  margin-top: 0;
  margin-bottom: 20px;
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
.idealeft .card-body .card input{
    border:none;
    outline: none !important;
    width: 83%;
    font-size: 15px;
    font-weight: 700;
    color: #2e384d;
}


.activeinput{
    border: solid 2px #083ac8;
}
.domain-map {
    margin: 0px 0px 0 0px;
    position: absolute;
    left: 0px;
    width: 88%;
    bottom: -70px;
  }
 
  
  .domain-map ul {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .domain-map ul li {
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0.16px;
    text-align: center;
    color: #babcbd;
    position: relative;
    padding-top: 30px;
    width: 32px;
    margin-left: -12px;
    height: 60px;
    margin-right: 0;
  }
  
 .domain-map ul li:before {
    display: none;
  }
  
.domain-map ul li.active:before {
    content: '';
    position: absolute;
    top: -8px;
    margin-left: -7px;
    left: 40%;
    width: 25px;
    height: 25px;
    background-color: #038e8e;
    border-radius: 20px;
    border: 2px #fff solid;
    z-index: 4;
    display: block;
  }
  
.domain-map ul li.active span {
    position: absolute;
    top: -33px;
    margin-left: -9px;
    font-size: 10px;
    left: 40%;
    height: 22px;
    background-color: #e2e6e6;
    border-radius: 4px;
    color: #777575;
    padding: 2px 3px;
    border: 2px #fff solid;
    z-index: 4;
    display: block;
  }
  .input-range__slider {
    appearance: none;
    background: #038e8e;
    border: 2px #fff solid;
    border-radius: 20px;
    cursor: pointer;
    display: block;
    height: 1rem;
    margin-left: -0.5rem;
    margin-top: -0.85rem;
    outline: none;
    position: absolute;
    top: 50%;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    width: 22px;
    height: 22px;
  }
  
    .input-range__slider:active {
      transform: scale(1.3); }
  
    .input-range__slider:focus {
      box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2); }
  
    .input-range--disabled .input-range__slider {
      background: #cccccc;
      border: 1px solid #cccccc;
      box-shadow: none;
      transform: none; }
  
  .input-range__slider-container {
    transition: left 0.3s ease-out; }
  
  .input-range__label {
    color: #aaaaaa;
    font-family: "Helvetica Neue", san-serif;
    font-size: 0.8rem;
    transform: translateZ(0);
    white-space: nowrap; }
  
  .input-range__label--min,
  .input-range__label--max {
    bottom: -1.4rem;
    position: absolute;
  display: none; }
  
  .input-range__label--min {
    left: 0; }
  
  .input-range__label--max {
    right: 0; }
  
  .input-range__label--value {
    position: absolute;
    top: -2.3rem; }
  
  .input-range__label-container {
    left: -50%;
    background-color: #e2e6e6;
    color: #777575;
    padding: 0 3px;
    position: relative; }
  
    .input-range__label--max .input-range__label-container {
      left: 50%; }
  
  .input-range__track {
    background: #e4e7ea;
    border-radius: 6px;
    cursor: pointer;
    display: block;
    height: 6px;
    position: relative;
    transition: left 0.3s ease-out, width 0.3s ease-out; }
    .input-range--disabled .input-range__track {
      background: #eeeeee; }
  
  .input-range__track--background {
    left: 0;
    margin-top: -0.15rem;
    position: absolute;
    right: 0;
    top: 50%; }
  
  .input-range__track--active {
    background: #82d0ec; }
  
  .input-range {
    height: 30px;
    left: 1.1%; 
  }
/*   
  .domain-slider-sec .btn {
    width: 155px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
  
  .domain-slider-sec .btn:hover {
    background-color: #2e343a;
    border: solid 1px #2e343a;
  } */
  
  
@media (max-width: 1170px) {
    .fourideas{
        width: 100%;
    }
}
@media (max-width: 992px) {
    .fourideas .idealist .ideatxt {
        width: 80px;
        height: 52px;
        margin-bottom: 15px;
    }
    .fourideas .idealist h2 {
        font-size: 16px;
    }
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
    .btn-proceed{
        margin-top: 0;
        width: 200px;
        margin-bottom: 20px;
    }
    .fourideas.fourideas1 {
        height: 100%;
        padding-top: 38px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    
}

@media (max-width: 575px) {
    .dt-project-sec1 .warehousing-slider li {
        width: 57px;
    }

    .dt-screen-main .dt-content-wrapper {
        padding-left: 0px;
    }
    .fourideas {
        display: block;
    }
    .fourideas .idealist {
        display: inline-block;
    }
   
}
`;