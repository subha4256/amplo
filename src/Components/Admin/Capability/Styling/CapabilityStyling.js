import styled from 'styled-components';
import dropdownarrow from '../../../../common/images/dropdownarrow.png';

export const CapabilityWrapper = styled.div`
.borderBlue{
  border: 3px #083ac8 solid !important;
}
.business-decomposition-sec ul.client-list {
  max-height: 185px;
  overflow-y: auto;
}
.business-decomposition-sec ul.client-list li {
  cursor: pointer;
}
.business-decomposition-sec .slick-slide img{
  width:100%;
  height: 90px;
    object-fit: cover;
    object-position: 50% top;
}
.business-decomposition-sec .slick-prev:before, .slick-next:before{
  color:#848484;
}
.business-decomposition-sec .slick-next{
  right:-15px;
}
.business-decomposition-sec .slick-prev{
  left:-14px;
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
  .toggle-btn {
      width: 300px;
  }
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
    padding: 50px 0px 0 10px;
    position: relative;
  }

  .function-box-holder{
    // width:1110px;
    width:1052px;
   overflow: auto;
   height: 855px;
  }
  .function-box-holder::-webkit-scrollbar {
    width: 20px;
    height: 20px;
  }
  /* Track */
  .function-box-holder::-webkit-scrollbar-track {
    border-radius: 0px;
    background-color: #d8d8d8;
    
  }
  /* Handle */
  .function-box-holder::-webkit-scrollbar-thumb { 
    border-radius: 10px;
    border: solid 1px #c4c0c0;
    background-color: #ffffff;
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
  .business-decomposition-functionbox-sec .function-box .processesWrappper {
    // height: 246px;
    height: 260px;
    padding: 20px 10px 0 10px;
    border-bottom: 1px #ccc solid;
    width: 242px;
    position: relative;
  }
  
  .vertical-left-box {
    position: absolute;
    // left: 10px;
    top: 62px;
    left:0;
  }
  
  .business-decomposition-functionbox-sec .function-box-holder .heading-box-vertical {
    border: solid 0px #2e343a;
    background-color: #2e343a;
    //height: 246px;
   height:260px;
    width: 50px;
    text-align: center;
    padding: 10px;
    border-radius: 60px 0px 0px 0px;
    position: relative;
  }
  
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

  .function-phase .box-warning {
    position: relative;
    height: 224px;
    width: 48px;
  }
  
  .function-phase .box-warning .vtext {
    position: absolute;
    top: 8px;
    height: 50px;
    width: 100px;
    margin: 0;
    left: 40px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function-phase .box.h-90 {
    height: 90px !important;
  }
  
  .function-phase .h-56 {
    height: 59px !important;
  }

  .function-phase .vrt-box .box {
    position: relative;
    height: 224px;
    width: 48px;
    overflow:hidden;
  }
  
  .function-phase .vrt-box .box .vtext {
    position: absolute;
    top: 16px;
    height: 38px;
    width: 187px;
    margin: 0;
    left: 43px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function-phase .box.h-90 {
    height: 90px !important;
  }
  
  .function-phase .h-56 {
    height: 59px !important;
  }
  
  /*.function1-phase1,
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
    

  }*/
 
  .business-decomposition-functionbox-sec .function-box .box-container .box.w-100 {
    // height: 32px;
    //overflow:hidden;
  }
  
  .function1-phase3 .box.h-76 {
    height: 76px !important;
  }
  
  .function1-phase3 .box.h-61 {
    height: 61px !important;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box-sucess {
    border: 1px #16b665 solid;
    border-left: 3px #16b665 solid;
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
  .business-decomposition-functionbox-sec .function-box .box-container .box a {
    color: #333333;
    position: absolute;
    padding-top: 0px !important;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
    width: 100%;
    top: 2px;
    left: 0;
    padding: 0 5px;
    line-height: 12px;
  }
 span.fa.fa-edit.float-right {
    position: absolute;
    bottom: 1px;
    right: 2px;
}

  .business-decomposition-functionbox-sec .function-box .box-container .box a span{
    font-size: 10px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .box-warning {
    border: 1px #ffce56 solid;
    border-left: 3px #ffce56 solid;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box-warning {
    width: 100%;
    height: 42px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box-white {
    border: solid 1px #d2d3d4;
    position: relative;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .box span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .box span.fa-times {
    cursor: pointer;
    margin-top: -19px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .box-average {
    position: relative;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .style8 .d-flex .box span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .style8 .d-flex .box span.fa-times {
    cursor: pointer;
    margin-top: 20px;
  }
 
  .business-decomposition-functionbox-sec .function-box .box-container .style5 .pstyle5.d-flex .box  span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .style5 .pstyle5.d-flex .box  span.fa-times{
    cursor: pointer;
    margin-top: 3px; 
  }
  .business-decomposition-functionbox-sec .function-box .box-container .style7 .d-flex .pstyle7.box span.fa-times{
    cursor: pointer;
    margin-top: -17px;
    margin-right: -5px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .style7 .d-flex .pstyle7.box span.fa-edit{
    cursor: pointer;
    margin-top: -17px;
    margin-left: -7px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .pstyle3 .d-flex .box  span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .pstyle3 .d-flex .box  span.fa-times{
    cursor: pointer;
    margin-top: 4px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .style16 .d-flex.pstyle16 .d-flex .box  span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .style16 .d-flex.pstyle16 .d-flex .box  span.fa-times{
    cursor: pointer;
    margin-top: -3px; 
  }
  .business-decomposition-functionbox-sec .function-box .box-container .style15 .d-flex.pstyle15 .d-flex .box  span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .style15 .d-flex.pstyle15 .d-flex .box  span.fa-times{
    cursor: pointer;
    margin-top: 2px; 
  }
  .business-decomposition-functionbox-sec .function-box .box-container .style17 .d-flex .d-flex .box  span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .style17 .d-flex .d-flex .box  span.fa-times{
    margin-top: -2px; 
  }
  .business-decomposition-functionbox-sec .function-box .box-container .style14 .d-flex .d-flex .box  span.fa-edit,
  .business-decomposition-functionbox-sec .function-box .box-container .style14 .d-flex .d-flex .box  span.fa-times{
    margin-top: 3px; 
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
  
  .business-decomposition-sec .toggle-btn {
    width: 300px;
  }
  
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
  
  @media (max-width: 575px) {
    .business-decomposition-functionbox-sec .function-box-holder {
      padding: 50px 0px 0 0px;
    }  
  }

  .bussiness-top-sec form label {
    font-size: 16px;
    color: #000;
    font-weight: 700;
  }
  
  .bussiness-top-sec form .form-control {
    font-size: 13px;
    height: 40px;
    font-stretch: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .business-decomposition-sec .model-list {
    display: flex;
    justify-content: space-between;
  }
  
  .business-decomposition-sec .model-list h2 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.34px;
    color: #000000;
  }
  
  .business-decomposition-sec .model-list .has-search {
    position: relative;
  }
  
  .business-decomposition-sec .model-list .has-search .form-control {
    padding-left: 1rem;
    padding-right: 2.375rem;
    height: 40px;
    font-size: 13px;
  }
  
  .business-decomposition-sec .model-list .has-search .form-control-search {
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
  
  .business-decomposition-sec .model-list .toggle-btn .btn-progress {
    height: 34px;
    border-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    background-color: #083ac8;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }
  
  .business-decomposition-sec .model-list .toggle-btn .btn-progress i {
    font-size: 11px;
  }
  
  .business-decomposition-sec .model-list .toggle-btn .btn-heatmap {
    background-color: #fff;
    border-radius: 30px;
    height: 25px;
    font-size: 13px;
    padding: 0 10px 0 0;
    width: 96px;
    text-align: right;
    margin-left: -20px;
  }
  
  /* box-sec-1  */
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
  .width100percent {
    width: 100%;
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
  
  /* Start Function box Section */
  .business-decomposition-functionbox-sec .function-box-holder {
    padding: 60px 0px 0 50px;
    position: relative;
  }
  
  .business-decomposition-functionbox-sec .function-box {
    display: flex;
    justify-content: flex-start;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container {
    border: solid 1px #c8ced3;
    /* width: 100%; */
    width: 260px;
    padding: 0px;
    background-color: #fff;
    position: relative;
    /* min-height: 452px; */
  }
  .business-decomposition-functionbox-sec .function-box .box-container .heading-box .sort-arrows{
    width: 92%;
    position: absolute;
    bottom: 3px;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .heading-box .sort-arrows .fa-arrow-right{
    position: absolute;
    bottom: 0;
    right:0;
    cursor: pointer;
  }
  .business-decomposition-functionbox-sec .function-box .box-container .heading-box .sort-arrows .fa-arrow-left{
    position: absolute;
    bottom: 0;
    left:0;
    cursor: pointer;
  }
  .business-decomposition-functionbox-sec .function-box-holder .heading-box-vertical .sort-arrows{
    width: 92%;
    height: 82%;
    position: absolute;
    bottom: 9px;
    left: -12px;
  }
  .business-decomposition-functionbox-sec .function-box-holder .heading-box-vertical .sort-arrows .fa-arrow-down{
    position: absolute;
    bottom: 0;
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

  .function-box .edit-function-icon,
  .vertical-left-box .edit-phase-icon,
  .vertical-left-box .sort-arrows i {
    color: #fff;
  }
  
  .vertical-left-box {
    position: absolute;
    // left: 10px;
    left:0;
    top: 62px;
  }
  
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
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .sm-txt {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.17px;
    color: #333333;
    display: inline-block;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    margin: 5px;
    line-height: 16px;
  }
  
  /*.function1-phase1,
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
    height: 248px;
    width: 256px;
  }*/
  
  .business-decomposition-functionbox-sec .function-box .box-container .box.w-100 {
    // height: 32px;
  }
  
  .function1-phase3 .box.h-76 {
    height: 76px !important;
  }
  
  .function1-phase3 .box.h-61 {
    height: 61px !important;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box-sucess {
    border: 1px #16b665 solid;
    border-left: 3px #16b665 solid;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box-sucess {
    width: 100%;
    height: 42px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box-warning {
    border: 1px #ffce56 solid;
    border-left: 3px #ffce56 solid;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box-warning {
    width: 100%;
    height: 42px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .box-white {
    border: solid 1px #d2d3d4;
    position: relative;
  }

  .business-decomposition-functionbox-sec .function-box .box-container .bg-average {
    position: relative;
  }
  
  /*.business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box-white {
    border: solid 1px #d2d3d4;
    position: relative;
    width: 50px;
    height: 123px;
  }*/
  
  .business-decomposition-functionbox-sec .function-box .box-container .box {
    margin: 0 0 8px 0;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box {
    margin-right: 7px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .vrt-box .box:last-child {
    margin-right: 0px;
  }
  
  .business-decomposition-functionbox-sec .function-box .box-container .function1-phase1 .box-white .vtext {
    position: absolute;
    top: 8px;
    height: 50px;
    width: 100px;
    margin: 0;
    left: 46px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .business-decomposition-sec .toggle-btn {
    width: 300px;
  }
  
  .function1-phase2 .d-md-flex .box {
    width: 50%;
    height: 68px;
  }
  
  .function2-phase1 .box-warning {
    position: relative;
    height: 224px;
    width: 48px;
  }
  
  .function2-phase1 .box-warning .vtext {
    position: absolute;
    top: 8px;
    height: 50px;
    width: 100px;
    margin: 0;
    left: 40px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function2-phase1 .box.h-90 {
    height: 90px !important;
  }
  
  .function2-phase1 .h-56 {
    height: 59px !important;
  }
  
  .function2-phase2 .box-sucess {
    position: relative;
    height: 187px;
    width: 30px;
    margin-bottom: 0 !important;
  }
  
  .function2-phase2 .box-sucess .vtext {
    position: absolute;
    top: 8px;
    height: 50px;
    width: 100px;
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
    height: 26px !important;
    padding-top: 3px !important;
  }
  
  .function3-phase1 .vrt-box .box-white {
    position: relative;
    height: 222px;
    width: 30px;
    margin-bottom: 0 !important;
  }
  
  .function3-phase1 .vrt-box .box-white .vtext {
    position: absolute;
    top: 8px;
    height: 50px;
    width: 100px;
    margin: 0;
    left: 25px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function3-phase1 .box.h-49 {
    height: 49px !important;
  }
  
  .function3-phase1 .box.h-35 {
    height: 41px !important;
  }
  
  .function3-phase1 .box.h-68 {
    height: 68px !important;
  }
  
  
  .function3-phase2 .vrt-box .box-white {
    position: relative;
    height: 113px;
    width: 30px;
    margin-bottom: 0 !important;
  }
  
  .function3-phase2 .vrt-box .box-sucess {
    position: relative;
    height: 113px;
    width: 30px;
    margin-bottom: 0 !important;
  }
  
  .function3-phase2 .vrt-box .vtext {
    position: absolute;
    top: 8px;
    height: 50px;
    width: 100px;
    margin: 0;
    left: 25px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function3-phase2 .box.h-42 {
    height: 37px !important;
  }
  
  .function3-phase2 .box.h-30 {
    height: 30px !important;
  }
  
  
  .function3-phase3 .vrt-box .box-white {
    position: relative;
    height: 224px;
    width: 30px;
    margin-bottom: 0 !important;
  }
  
  .function3-phase3 .vrt-box .vtext {
    position: absolute;
    top: 8px;
    height: 50px;
    width: 100px;
    margin: 0;
    left: 25px;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }
  
  .function3-phase3 .box.h-60 {
    height: 40px !important;
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
  }
  
  /* -----------Start Business Decomposition Model Heatmap box Section ------------*/
  
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
  
  
  /* -----------Backgroung for Heatmap Section ------------*/
  
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
  .function-box-holder-header{
    width:1110px;
  }
  .dropdown-width{
    display: inline-block;
      vertical-align: top;
      margin-right: 30px;
  }
  .box-holder-headerlabel{
      font-size: 16px;
      color: #000;
      font-weight: 700;
  }
  .select-headeroption{
      font-size: 13px;
      height: 40px;
      font-stretch: normal;
      line-height: 1.85;
      letter-spacing: 0.12px;
      color: rgba(0, 0, 0, 0.6);
      border-color: rgba(0, 0, 0, 0.32);
  }
  .dropdown-widthcapabilty-model{
      display: inline-block;
      vertical-align: top;
      margin-right: 15px;
  }
  .dropdown-widthcapabilty-model.creatableDropDown .css-yk16xz-control {
    border: solid 1px rgba(0, 0, 0, 0.32);
  }
  .dropdown-widthcapabilty-model .btn-primary {
    width: 140px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-align: center;
    color: #fff;
    font-family: Montserrat;
  }
  .customwidth-icon{
    width:380px;
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
  .fl-rightcustomdropdown{
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    -webkit-appearance: none;
    padding-right: 40px;
    background-image: url(../imgs/dropdownarrow.png);
    background-repeat: no-repeat;
    background-position: 90%;
  }
  .dropdown-menu-custom{
    right:0;
    left:initial;
  }
  .btn-outline-whitecapability{
    background-color: rgb(255, 255, 255);
    height: 40px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6) !important;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.32);
    border-image: initial;
    border-radius: 4px;
    outline: none !important;
  }
  .btn-outline-whitecapability i{
      height: 20px;
      width: 20px;
      text-align: center;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(204, 204, 204);
      border-image: initial;
      border-radius: 20px;
      padding: 3px;
  }
  .functioneditwidth{
    width:196px;
    position: relative;
  }
    .editdivwidth {
      width: 630px;
      height: 380px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      border: solid 1px #979797;
      background-color: #ffffff;
      position: absolute;
      z-index: 9;
      top: 42px;
      right: -37px;
      display: none;
      padding: 15px 31px 19px 20px;
  }
  .edit-phase-function{
    height: 21px;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.26px;
    color: #000000;
  }
  .phaseeditwidth{
    width:180px;
    position: relative;
  }
  .line-height20px{
    line-height: 20px !important;
  }
  .name-fub-phase-heading{
    margin-bottom: 5px;
  }
  .managebox-bot-mandatory-field{
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0.17px;
    color:#000000;
  }
  .capability-save{
    height: 40px;
      border-radius: 5px;
      background-color: #083ac8;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.04px;
      color: #fff;
      width: 106px;
      border: none;
  }
  .pad-right0{
    padding-right: 0;
  }
  .pad-right15{
    padding-right: 15px;
  }
  .slick-slider .templateItem {
    cursor: pointer;
    outline: none;
    width: 95% !important;
  }
  .slick-slider .templateItem.active {
    border: 2px solid #c9c9c9;
  }
  .view-a{
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.17px;
    text-align: center;
    color: #083ac8;
  }
  .model-slider .bx-wrapper{
    margin-bottom: 0;
    -webkit-box-shadow: 0 0 5px #ccc;
    box-shadow: 0 0 5px #ccc;
    border: 5px solid #fff;
    background: #fff;
  }
  .model-slider .bx-viewport{
    padding: 10px 20px 0 20px;
  }
  .right0class{
    right:0;
  }
  .removeStyle {
    position: absolute;
    left: 30px;
    top: 0;
  }
  .editStyle {
    position: absolute;
    top: 0;
  }
  span.fa-edit, span.fa-times {
    cursor: pointer;
  }
  .slider-text-botom{
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.09px;
    color: rgba(0, 0, 0, 0.6);
    margin: 3px 0;
  }
  /* -----------End Business Decomposition Model Heatmap box Section ------------*/
  
  
  @media screen and (max-width: 1200px) {
    .business-decomposition-functionbox-sec .function-box {
      display: block;
    }
  
    .business-decomposition-functionbox-sec .function-box .box-container {
      float: left;
      margin-bottom: 70px;
    }
  
    .business-heatmap-box-sec .heatmap-box-list {
      display: block;
    }
  
    .business-heatmap-box-sec .heatmap-box-list .bg-white {
      display: inline-block;
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
  
  @media (max-width: 575px) {
    .business-decomposition-functionbox-sec .function-box-holder {
      padding: 50px 0px 0 0px;
    }
  
  }
  .actionBtnWrapper .form-control {
    width: 105px;
  }

  .business-decomposition-sec {
    width: 1052px;
    overflow: unset !important;
    display: block;
}
.spanforlink{
  word-break:break-all;
    line-height: 1.5em;
    height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
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
  width: 415px;
  position: relative;
  background-color: #fff;
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
  width: 415px;
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
.drop-height .custom-control-label{
  font-size: 14px;
}
`;