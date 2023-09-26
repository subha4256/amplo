import styled from 'styled-components';

export const CapabilityWrapper = styled.div` 
/* ------Modal Style ---------------*/
.modal .modal-content{
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #cccccc;
}
.modelWidth {
  width: 90% !important;
  max-width: 90% !important;
}
.p-name-div {
  border: 1px solid #dadada;
}
.sub-head {
  background: #8f9090;
  margin-bottom: 0;
  padding: 10px 8px;
  font-size: 17px;
  color: #fff;
text-align: center;
}
h5.sub-sub-head {
  font-size: 15px;
  padding: 8px 8px;
  margin-bottom: 0;
  margin-top: 8px;
}
.capability-list {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.17px;
  color: rgb(51, 51, 51);
  box-shadow: rgb(0 0 0 / 50%) 0px 2px 4px 0px;
  padding: 7px 3px;
  margin: 7px 15px 7px 15px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
}
span.capability-list{
margin: 0;
  display: inline-block;
  width: 90%;
}
h3.main-project-name {
font-size: 19px;
  margin-bottom: 0px;
  line-height: 39px;
}
h5.sub-sub-head {
font-size: 15px;
  padding: 10px 16px;
  margin-bottom: 9px;
  margin-top: 15px;
  text-align: center;
  background: #f5f5f5;
  margin: 1px 0px 0 0px;
}
.main-project-nameselect{
font-size: 13px;
  height: 40px;
  font-stretch: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
border: 1px solid #ced4da;
  width: 100%;
margin-left: 0px;
margin-bottom:15px;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.box-dependency{
border: 1px solid #dadada;
margin-bottom: 20px;
margin-top: 10px;
}
.de-indecapa{
padding: 0;
}
.ind-capadd {
padding:7px 8px;
}
.de-indecapa p{
font-size: 14px;
color: #858585;
margin-bottom: 6px;
margin-left: 0;
margin-right: 0;
font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.17px;
  color: rgb(51, 51, 51)
}
.de-indecapa h5 {
  margin-bottom: 18px;
  font-size: 16px;
  color: #767676;
}
.trash-main{
  float: right;
  color: white;
  padding: 0;
  border-radius: 3px;
  font-size: 22px !important;
  cursor: pointer;
}
.trash-main-inner {
  font-size: 16px !important;
  float: right;
  color: #e76c37;
  margin-top: 5px;
  cursor: pointer;
}
h4.main-project-name {
  font-size: 16px;
  font-weight: normal;
}
.modal .modal-title{
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.02px;
  color: #000000;
  margin-top: 30px;
}
.modal h2{
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.02px;
  text-align: center;
  color: #000000;
}
.modal .fa-check-circle{
  font-size: 70px;
  color: #a7df6d;
}
.custom-control .custom-control-label{
  font-size: 14px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.01px;
  color: #000000;
}
.custom-control-label::after, .custom-control-label::before{
  top: 0;
}
.modal .form-group label{
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #2f353a;
}

.modal .custom-select{
  width: 295px;
  height: 34px;
  border-radius: 4px;
  border: solid 1px #c8ced3;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.3px;
  color: #73818f;
}
.modal p{
 font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.01px;
  color: #000000;
}
.modal .btn-primary{
  width: 164px;
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
  color: #ffffff;
  font-family: Montserrat;
}
.modal .btncancel{
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: #083ac8;
}
.modal .close img{
  width: 15px;
}
.borderBlue{
  border: 3px #083ac8 solid !important;
}
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
  #wrapper {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-top: 55px;  
  }
  .CustomRadio input {
    margin-left: -1.50rem;
  }
  .bussiness-top-sec .form-control{
    font-size: 13px;
    height: 40px;
    width: 324px;
    font-stretch: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
  }

  .bussiness-top-sec form label{
    font-size: 16px;
    color: #000;
    font-weight: 700;
  }
  .bussiness-top-sec label{
    font-size: 16px;
    color: #000;
    font-weight: 700;
  }
  .model-list h2 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.34px;
      color: #000000;
  }
  .model-list{
    display: flex;
    justify-content: space-between;
  
  }
  .model-list .model-label{
    font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.23px;
  color: #000000;
  }
  // .toggle-btn {
  //     width: 300px;
  // }
  .btn-progress {
      height: 34px;
      border-radius: 15px;
      background-color: #083ac8;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      position: relative;
      z-index: 2;
  }
  .btn-heatmap {
      background-color: #fff;
      border-radius: 30px;
      height: 25px;
      font-size: 13px;
      padding: 0 10px 0 0;
      width: 96px;
      text-align: right;
      margin-left: -20px;
  }
  .has-search {
    position: relative;
  }
  .has-search .form-control {
    padding-left: 1rem;
    padding-right: 2.375rem;
    height: 40px;
    font-size: 13px;
  }
  .form-control-search {
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
 .business-decomposition-box-sec, .business-decomposition-sec{
  width: 1052px;
  overflow: auto;
  display: block;
  }
  .business-decomposition-box-sec{
    margin-right: 0 !important;
    padding-right: 0;
    padding-left: 0;
    margin-left: -14px;
    // margin-left:0 !important;
  }
  .business-decomposition-box-sec .box-width{
    width: 350px;
    padding-right: 0;
    display: inline-block;
  }
  .business-decomposition-box-sec .box-sec-1 .card-body, .business-decomposition-box-sec .box-sec-2 .card-body, .business-decomposition-box-sec .box-sec-3 .card-body{
    padding: .5em 1.25rem;
  }
  .business-decomposition-box-sec .box-sec-1 .bg-white {
    border-left: 4px #16b665 solid;
  }
  
  .business-decomposition-box-sec .box-sec-1 .bg-white .card-body .col span {
    color: #16b665;
    width: 50px;
    height: 50px;
    background-color: #efeeee;
    font-size: 26px;
    display: inline-block;
    border-radius: 100%;
    padding-top: 6px;
    font-weight: 100;
  }
  
  .business-decomposition-box-sec .box-sec-1 .col-8 h5 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.23px;
    text-align: center;
    color: #2e384d;
  }
  
  .business-decomposition-box-sec .box-sec-1 .col-8 p {
    font-size: 15px;
    font-weight: normal;
    line-height: 1.47;
    letter-spacing: normal;
    text-align: center;
    color: #5f6c72;
  }
  
  /* box-sec-2  */
  .business-decomposition-box-sec .box-sec-2 .bg-white {
    border-left: 4px #ffce56 solid;
  }
  
  .business-decomposition-box-sec .box-sec-2 .bg-white .card-body .col span {
    color: #ffce56;
    width: 50px;
    height: 50px;
    background-color: #efeeee;
    font-size: 26px;
    display: inline-block;
    border-radius: 100%;
    padding-top: 6px;
    font-weight: 100;
  }
  
  .business-decomposition-box-sec .box-sec-2 .col-8 h5 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.23px;
    text-align: center;
    color: #2e384d;
  }
  
  .business-decomposition-box-sec .box-sec-2 .col-8 p {
    font-size: 15px;
    font-weight: normal;
    line-height: 1.47;
    letter-spacing: normal;
    text-align: center;
    color: #5f6c72;
  }
  
  /* box-sec-3  */
  .business-decomposition-box-sec .box-sec-3 .bg-white {
    border-left: 4px #979797 solid;
  }
  
  .business-decomposition-box-sec .box-sec-3 .bg-white .card-body .col span {
    color: #979797;
    width: 50px;
    height: 50px;
    background-color: #efeeee;
    font-size: 26px;
    display: inline-block;
    border-radius: 100%;
    padding-top: 6px;
    font-weight: 100;
  }
  
  .business-decomposition-box-sec .box-sec-3 .col-8 h5 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.23px;
    text-align: center;
    color: #2e384d;
  }
  
  .business-decomposition-box-sec .box-sec-3 .col-8 p {
    font-size: 15px;
    font-weight: normal;
    line-height: 1.47;
    letter-spacing: normal;
    text-align: center;
    color: #5f6c72;
  }

  .business-decomposition-functionbox-sec .function-box-holder {
    padding: 60px 0px 0 60px;
    position: relative;
    display: flex;
    overflow: hidden !important;
    width: 100%;
  }
  

  
  
  .business-decomposition-functionbox-sec .function-box {
    display: flex;
    justify-content: flex-start;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container {
    border: solid 1px #c8ced3;
    // width: 260px;
    width: 245px;
    padding: 0px;
    background-color: #fff;
    position: relative;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .heading-box {
    position: absolute;
    top: -50px;
    text-align: center;
    height: 50px;
    left: 0;
    padding: 10px;
    width: 100%;
    border: solid 0px #979797;
    background-color: #8f9090;
    border-radius: 65px 0px 0px;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
  }
  
  .vertical-left-box {
    position: absolute;
    left: 10px;
    top: 62px;
  }
  
  .business-decomposition-functionbox-sec .function-box-holder .heading-box-vertical {
    border: solid 0px #2e343a;
    background-color: #2e343a;
    height: 277px;
    width: 50px;
    text-align: center;
    padding: 10px;
    border-radius: 60px 0px 0px 0px;
    position: relative;
  }
  
  // .function-box-holder{
  //   width:1052px;
  //  overflow: auto;
  //  max-height: 800px;
  // }
  // .function-box-holder::-webkit-scrollbar {
  //   width: 20px;
  //   height: 20px;
  // }

  // .function-box-holder::-webkit-scrollbar-track {
  //   border-radius: 0px;
  //   background-color: #d8d8d8;
    
  // }
  // .function-box-holder::-webkit-scrollbar-thumb { 
  //   border-radius: 10px;
  //   border: solid 1px #c4c0c0;
  //   background-color: #ffffff;
  // }

  /* .business-decomposition-functionbox-sec .function-box-holder .vertical-left-box .heading-box-vertical:nth-child(2),
  .business-decomposition-functionbox-sec .function-box-holder .vertical-left-box .heading-box-vertical:nth-child(3)
  {
    height: 246px;
  } */
  
  
  .business-decomposition-functionbox-sec .function-box-holder .heading-box-vertical span {
    -webkit-transform: rotate(-270deg);
    -moz-transform: rotate(-270deg);
    -ms-transform: rotate(-270deg);
    -o-transform: rotate(-270deg);
    transform: rotate(-270deg);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: -77px;
    width: 202px;
    height: 38px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .sm-txt {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.17px;
    color: #333333;
    display: inline-block;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    padding:3px;
    margin: 5px;
    line-height: 16px;
  }
  
  .function1-phase1,
  .function1-phase2,
  .function1-phase3,
  .function2-phase1,
  .function2-phase2,
  .function2-phase3,
  .function3-phase1,
  .function3-phase2,
  .function3-phase3,
  .function4-phase1,
  .function4-phase2,
  .function4-phase3 {
    padding: 10px 10px 0 10px;
    border-bottom: 1px #ccc solid;
    height: 277px;
    // width: 256px;
    width: 235px;
    position:relative;

  }
 
  .business-decomposition-functionbox-sec .function-box .box-container .box.w-100 {
    height: 32px;
    overflow:hidden;
  }
  
  .function1-phase3 .box.h-76 {
    height: 76px !important;
  }
  
  .function1-phase3 .box.h-61 {
    height: 61px !important;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box-sucess {
    border: 1px #16b665 solid !important;
    border-left: 3px #16b665 solid;
    position:relative;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box-sucess {
    overflow: hidden;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box {
    width: 100%;
    height: 42px;
    margin-bottom:8px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box.bg-excellent{
    margin-bottom:8px;
  }
  // .business-decomposition-functionbox-sec .function-box .box-container .box a {
  //   color: #333333;
  //   position: relative;
  //   float: left;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -50%);
  //   margin-top:5px !important;
  // }
  .business-decomposition-functionbox-sec .function-box .box-container .box a {
    color: #333333;
    position: absolute;
    float: left;
    left: 0%;
    top: 3px !important;
    width:100% !important;
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
    font-size:12px;
    padding:0 5px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .box a span{
    font-size: 10px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .box-warning {
    border: 1px #ffce56 solid !important;
    border-left: 3px #ffce56 solid;
    position:relative;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box-warning {
    width: 100%;
    height: 42px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box-white {
    border: solid 1px #d2d3d4;
    position: relative;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box-white {
    border: solid 1px #d2d3d4;
    position: relative;
    width: 48px;
    height: 123px;
    overflow:hidden;
  }
    
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box-sucess {
    position: relative;
    width: 47px;
    height: 123px;
    overflow:hidden;
  }
    
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box-warning {
    position: relative;
    width: 47px;
    height: 123px;
    overflow:hidden;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box:last-child {
    margin-right:0 !important
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box {
    margin: 0 0 2px 0;
    text-align:center;
  }

  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box {
    margin-right: 9px;
    overflow:hidden;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box:last-child {
    margin-right: 0px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box .vtext {
    position: absolute;
    top: 8px;
    height: 38px;
    width: 105px;
    margin: 0;
    left: 42px;
    overflow:hidden;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  // .business-decomposition-sec .toggle-btn {
  //   width: 300px;
  // }
  
  .function1-phase2 .d-md-flex .box {
    width: 50%;
    height: 68px;
  }
  
  .function2-phase1 .vrt-box .box {
    position: relative;
    height: 224px;
    width: 48px;
    overflow:hidden;
  }
  
  .function2-phase1 .vrt-box .box .vtext {
    position: absolute;
    top: 8px;
    height: 38px;
    width: 206px;
    margin: 0;
    left: 43px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function2-phase1 .box.h-90 {
    height: 90px !important;
  }
  
  .function2-phase1 .h-56 {
    height: 59px !important;
  }
  
  .function2-phase2 .vrt-box .box{
    position: relative;
    height: 187px;
    width: 30px;
    margin-bottom: 0 !important;
    overflow:hidden;
  }
  
  .function2-phase2 .vrt-box .box .vtext {
    position: absolute;
    top: 8px;
    height: 24px;
    width: 170px;
    margin: 0;
    left: 25px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function2-phase2 .box.w-100 {
    height: 31px !important;
  }
  
  .function2-phase3 .box.h-25 {
    height: 23px !important;
    width: 100%;
    padding-top: 3px !important;
  }
  
  .function2-phase3 .box.w-100 {
    height: 25px !important;
    padding-top: 3px !important;
  }
  .function3-phase1 .d-flex .mr-2 .d-flex .box.box-white a{
    height: 46px;
    overflow:hidden;
  }
  .function3-phase1 .d-flex .mr-2 .d-flex .box.box-white:first-child{
    margin-right: 3px !important;
  }

.function3-phase1 .d-flex .mr-2 .d-flex .box.box-white:last-child{
  margin-right: 0 !important;
}
  .function3-phase1 .vrt-box .box{
    position: relative;
    height: 224px;
    width: 29px;
    margin-bottom: 0 !important;
  }
  .function3-phase1 .vrt-box .box:first-child{
    margin-right:6px;
  }
  .function3-phase1 .vrt-box .box:last-child{
    margin-right:0px;
  }
  
  .function3-phase1 .vrt-box .box .vtext {
    position: absolute;
    top: 8px;
    height: 26px;
    width: 196px;
    margin: 0;
    left: 25px;
    overflow:hidden;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function3-phase1 .box.h-49 {
    height: 49px !important;
    margin-bottom: 9px !important;
  }

  .function3-phase1 .box.h-35 {
    height: 41px !important;
  }
  
  .function3-phase1 .box.h-68 {
    height: 68px !important;
  }
  
  
  .function3-phase2 .vrt-box .box {
    position: relative;
    height: 113px;
    width: 30px;
    margin-bottom: 0 !important;
  }
  

  
  .function3-phase2 .vrt-box .box .vtext {
    position: absolute;
    top: 4px;
    height: 24px;
    width: 107px;
    margin: 0;
    left: 25px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  .function3-phase2 .vrt-box .box .vtext a{
    overflow: hidden;
    height: 33px;
  }
  .function3-phase2 .box.h-42 {
    height: 37px !important;
  }
  
  .function3-phase2 .box.h-30 {
    height: 30px !important;
  }
  .function3-phase2 .box.h-30 a{
    height: 30px !important;
    overflow: hidden
  }
  
  
  .function3-phase3 .vrt-box .box{
    position: relative;
    height: 224px;
    width: 30px;
    margin-bottom: 0 !important;
    overflow:hidden;
  }
  
  .function3-phase3 .vrt-box .box .vtext {
    position: absolute;
    top: 8px;
    height: 23px;
    width: 206px;
    margin: 0;
    left: 25px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function3-phase3 .box.h-60 {
    height: 40px !important;
  }
  .function3-phase3 .box.w-100h-60 {
    height: 40px !important;
    width: 148px !important;
    margin-bottom: 3px !important;
    overflow: hidden;
  }
  .function3-phase3 .box.w-100h-30{
    height: 30px !important;
    width: 148px !important;
    margin-bottom: 6px !important;
  }
  .function3-phase3 .box.h-30 {
    height: 29px !important;
  }
  
  .function4-phase1 .box.h-0 {
    height: 30px !important;
  }
  
  .function4-phase2 .box.h-68 {
    height: 68px !important;
  }
  
  .function4-phase3 .box.h-40 {
    height: 40px !important;
  }
  
  .function4-phase3 .box.h-60 {
    height: 60px !important;
  }
  
  .function1-phase2 .box.h-64 {
    height: 64px !important;
    margin-bottom:8px !important;
  }
  .function1-phase2 .box.h-64:first-child { 
    margin-right:6x !important;
  }
  .function1-phase2 .box.h-64:last-child { 
    margin-right:0px !important;
  }
.business-heatmap-box-sec{
  width: 1088px;
  overflow:auto;
}
  .business-heatmap-box-sec .heatmap-box-list {
    display: flex;
    justify-content: space-between;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .bg-white {
    border-radius: 4px;
    width: 176px;
    height: 72px !important;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .bg-white h5 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.23px;
    text-align: center;
    color: #2e384d;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .bg-white p {
    font-size: 15px;
    font-weight: normal;
    line-height: 1.47;
    text-align: center;
    color: #5f6c72;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .border-excellent {
    border-left: 4px #60b17e solid;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .border-good {
    border-left: 4px #b2cc83 solid;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .border-average {
    border-left: 4px #ffe687 solid;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .border-satisfactory {
    border-left: 4px #ffae7a solid;
  }
  
  .business-heatmap-box-sec .heatmap-box-list .border-poor {
    border-left: 4px #ff786e solid;
  }
  .bg-excellent {
    border-left: 4px #60b17e solid;
    background-color: #60b17e;
    border-color: #60b17e !important;
  }
  
  .bg-good {
    border-left: 4px #b2cc83 solid;
    background-color: #b2cc83;
    border-color: #b2cc83 !important;
  }
  
  .bg-average {
    border-left: 4px #ffe687 solid;
    background-color: #ffe687;
    border-color: #ffe687 !important;
  }
  
  .bg-satisfactory {
    border-left: 4px #ffae7a solid;
    background-color: #ffae7a;
    border-color: #ffae7a !important;
  }
  .bg-poor {
    border-left: 4px #ff786e solid;
    background-color: #ff786e;
    border-color: #ff786e !important;
  }
  .border-blue{
    border:3px #083ac8 solid !important;
  }
  @media screen and (max-width: 1200px) {
    // .business-decomposition-functionbox-sec .function-box {
    //   display: block;
    // }
  
    .business-decomposition-functionbox-sec .function-box .box-container {
      // float: left;
      margin-bottom: 70px;
    }
  
    .business-heatmap-box-sec .heatmap-box-list {
      display: block;
    }
  
    .business-heatmap-box-sec .heatmap-box-list .bg-white {
      display: inline-block;
    }
  }
  .modal-footer{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: .75rem;
    border-top: 1px solid #dee2e6;
    border-bottom-right-radius: calc(.3rem - 1px);
    border-bottom-left-radius: calc(.3rem - 1px);

  }
  @media (max-width: 1149px) {
    .business-decomposition-box-sec, .business-decomposition-sec {
      width: 100%;
      overflow: auto;
      display: block;
   }
   .business-heatmap-box-sec {
    width: 100%;
}
  }

  @media (max-width: 992px) {
  
    .business-decomposition-sec .model-list h2 {
      font-size: 18px;
    }
  
  }
  
  @media (max-width: 767px) {
    .business-decomposition-sec .model-list {
      display: block;
    }
  
    .business-decomposition-sec .model-list .has-search {
      margin-top: 20px;
    }
  
    .vertical-left-box {
      display: none;
    }
  
  }
  .buttonResult{
    margin-right: 17px;
    margin-bottom: 19px;
  }
  .buttonResult button{
    
    height: 45px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    -webkit-letter-spacing: 0.5px;
    -moz-letter-spacing: 0.5px;
    -ms-letter-spacing: 0.5px;
    letter-spacing: 0.5px
    text-align: center;
    color: #ffffff;
    font-family: Montserrat;
  }
  @media (max-width: 575px) {
    .business-decomposition-functionbox-sec .function-box-holder {
      padding: 50px 0px 0 0px;
    }
  //   business-decomposition-box-sec .box-width {
  //     width: 100%;
     
  // }
  
  }
`;

export const CapabilityAsideWrapper = styled.aside`
  z-index: 1019;
  width: 250px;
  color: #2f353a;
  background: #fff;
  border-left: 1px solid #c8ced3;
  display: none;
  .toggleRightBar {
    padding: 14px 18px;
    background-color: #d8d8d8;
    color: #708393;
  }
  .tab-pane h3 {
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.05px;
    color: #5f6c72;
    padding: 15px 0 18px 17px;
    margin-bottom: 0;
    background-color: #f8f8f8;
    width: 100%;
  }
  .message h4 {
    font-size: 12px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: -0.04px;
    color: #333333;
    margin-bottom: 20px;
  }

.message p {
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: -0.04px;
  color: #5f6c72;
}

.message a.add-activity {
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.17px;
  text-align: center;
  display: block;
  width: 100%;
  color: #083ac8;
  border: dashed 1px #979797;
  background-color: #f6f7f8;
  text-decoration: none;
}

.message .select-activity {
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.17px;
  height: 42px;
  text-align: left;
  color: #333;
  border: dashed 1px #979797;
  background-color: #f6f7f8;
  text-decoration: none;
  font-weight: 400;
}

.message .select-activity.isDecomposed {
  border: 1px dashed #ffce56;
}

.message .text-lg-sm {
  font-size: 13px;
  color: #5f6c72;
}

.message .text-lg-sm small {
  font-size: 11px;
  color: #5f6c72;
}

.message .rectangle-box {
  width: 40px;
  height: 40px;
  background-color: #20a8d8;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  padding: 8px 0;
  text-align: center;
}

.message ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.processLabel{
  cursor: pointer;
}
.processText {
  display:none;
}
.d-inline-block{
  display: inline-block !important;
}
.pa-0{
  padding-left: 0px !important;
}
.capabilityheader-button{
  width: 166px;
    height: 40px;
    font-family: Montserrat;
    font-size: 13px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.5px;
    border-radius: 4px;
}

.active-Btn{
  pointer-events: auto;
  cursor: pointer !important;
}

.inactive-Btn{
  pointer-events: none;
  cursor: auto !important;
}

@-webkit-keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
`;