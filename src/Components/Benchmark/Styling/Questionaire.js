import styled from 'styled-components';

export const TopComponentWrapper = styled.div`
.bench-marking-sec .bg-light {
  border-radius: 4px;
  padding: 17px;
  background-color: #ffffff !important;
}
.bench-top-sec form .form-control {
  font-size: 13px;
  height: 40px;
  font-stretch: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}
.bench-top-sec .fa-lock {
  padding: 12px 10px;
}
.bench-marking-sec h2 {
  font-size: 16px;
  letter-spacing: 0.23px;
  font-weight: 700;
  color: #000000;
}
// .aside-menu.aside-menu-question .tab-content{
//   height:100vh !important;
// }
.bench-marking-sec-width{
  padding-left:15px;
}
.benchmarking-map {
  margin: 0px 20px 20px 0px;
  position: relative;
  display: block;
    width: 100%;
    // min-width: 1600px;
    // overflow-x: scroll;
    // overflow-y: hidden;
}
.benchmarking-map-scroll{
  display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

// .benchmarking-map::before {
//   content: '';
//   position: absolute;
//   top: 30px;
//   left: 20px;
//   width: 94%;
//   height: 2px;
//   background-color: #979797;
// }

// .benchmarking-map::after{
//   content: '';
//   position: absolute;
//   top: 30px;
//   right: 0;
//   width: 33px;
//   height: 2px;
//   background-color: #fff;
// }
.benchmarking-map ul {
  margin-bottom: 0;
  margin-top: 30px;
  width: auto;
  // min-width: 1200px;
  // display: inline-block;
  display: flex;
  justify-content: space-between;
    position: relative;

  // width: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
}
.table-responsive{
  overflow-y: hidden;
}
.benchmarking-map ul:before{
  content: '';
  position: absolute;
  top: 0;
  left: 40px;
  width: 90%;
  height: 2px;
  background-color: #979797;
}
.benchmarking-map ul:after{
  content: '';
  position: absolute;
  top: 0;
  right: 0px;
  width: 48px;
  height: 2px;
  background-color: #fff;
}
.benchmarking-map ul li {
  font-size: 11px;
  font-weight: normal;
  letter-spacing: 0.16px;
  text-align: center;
  color: #1665d8;
  position: relative;
  padding-top: 20px;
  width: 100px !important;
  margin-left: 0px;
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

// .benchmarking-map ul li:last-child:after{
//   content: '';
//     position: absolute;
//     top: 0px;
//     right: 2px;
//     width: 46px;
//     height: 2px;
//     background-color: #ffffff;
//     border-radius: 20px;
// }

// .benchmarking-map ul li:first-child:after{
//   content: '';
//     position: absolute;
//     top: 0px;
//     left: 0px;
//     width: 36px;
//     height: 2px;
//     background-color: #ffffff;
//     border-radius: 20px;
// }
// .benchmarking-map ul li:last-child:before {
//   margin-left: -10px;
// }

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

@media (min-width: 2000px) {
  .benchmarking-map ul li:last-child:before {
    margin-left: -21px !important;
  }
  }


@media (max-width: 1024px) {
.bench-marking-sec .bg-light {
  width:100%;
  overflow:auto;
}
.benchmarking-map {
  width: 600px;
  overflow-x:auto;
  overflow-y:hidden;
}
}
@media (max-width: 480px) {
  .benchmarking-map ul li {
    font-size: 9px;
  }

  .benchmarking-map {
    margin: 30px 0px 0 0px;
  }
}
`;
export const QuizWrapper = styled.div`
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
  font-size: 11px;
  font-weight: normal;
  letter-spacing: 0.16px;
  color: #1665d8;
  padding-right: 20px;
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

.domain-slider-sec .domain-map {
  margin: 30px 0px 0 0px;
  position: relative;
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
  background: #eeeeee;
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
  position: relative;
  height: 30px;
  width: 96%;
  left: 1.1%; 
}

.domain-map ul {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.domain-slider-sec .domain-map ul li {
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

.domain-slider-sec .domain-map ul li:before {
  display: none;
}

.domain-slider-sec .domain-map ul li.active:before {
  content: '';
  position: absolute;
  top: -8px;
  margin-left: -7px;
  left: 40%;
  width: 22px;
  height: 22px;
  background-color: #038e8e;
  border-radius: 20px;
  border: 2px #fff solid;
  z-index: 4;
  display: block;
}

.domain-slider-sec .domain-map ul li.active span {
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
}
.domain-slider-sec .domain-pa-culture ul {
  display: flex;
  justify-content: space-between;
}
/* Selected style */
.domain-slider-sec .domain-pa-culture ul.active li{
  position: relative;
 }
 .domain-slider-sec .domain-pa-culture ul.active li::before{
  content: '';
  left: 0;
  z-index: 1;
  top: 0;
  background-color: #ffffffc4;
  position: absolute;
  height: 100%;
  width: 100%;
}
.domain-slider-sec .domain-pa-culture ul.active li.selected::before{
  background-color: #fff0;
}

/* End Selected style */
.domain-slider-sec .domain-pa-culture ul li {
  position: relative;
  text-align: center;
  margin: 0 6px;
  width: 20%;
}
.domain-slider-sec .domain-pa-culture ul li .h-72{
  height: 72px;
  overflow: hidden;
}
.domain-slider-sec .domain-pa-culture ul li .slider-number{
  font-size: 16px;
  font-weight: bold;
  color: rgba(51, 51, 51, 0.6);
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}
.domain-slider-sec .domain-pa-culture ul li .slider-icon i{
  font-size: 23px;
  font-weight: bold;
  color: rgba(51, 51, 51, 0.6);
  text-align: center;
  width: 48px;
  height: 48px;
  background-color: #efefef;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.domain-slider-sec .domain-pa-culture ul li .slider-img {
  width: 100%;
  height: 30px;
  font-weight: 700;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 12px;
  font-size: 13px;
  text-align: center;
  padding: 6px;
  position: relative;
  margin-top: 20px;
  font-weight: 700;
}

.domain-slider-sec .domain-pa-culture ul li .slider-img::before{
  content: '';
  position: absolute;
  bottom: -14px;
  left: 50%;
  margin-left: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid transparent;
}
.domain-slider-sec .domain-pa-culture ul li .slider-img::after{
  content: '';
  position: absolute;
  top: -14px;
  left: 50%;
  margin-left: -10px;
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid transparent;
}
.domain-slider-sec .domain-pa-culture ul li .slider-img.bg-primary::after{
  border-bottom: 15px solid #36a2eb;
}
.domain-slider-sec .domain-pa-culture ul li .slider-img.bg-danger1::after{
  border-bottom: 15px solid #ff6384;
}
.domain-slider-sec .domain-pa-culture ul li .slider-img.bg-danger.bg-danger1::before{
  border-top: 15px solid transparent;
}
.domain-slider-sec .domain-pa-culture ul li .slider-img.bg-danger::before{
  border-top: 15px solid #ff6384;
}
.domain-slider-sec .domain-pa-culture ul li .slider-img.bg-info::before{
  border-top: 15px solid #4bc0c0;
}
.domain-slider-sec .domain-pa-culture ul li .slider-img.bg-warning::before{
  border-top: 15px solid #ffce56;
}

.domain-slider-sec .domain-pa-culture ul li .slider-img p{
  margin-bottom: 0;
}
.domain-slider-sec .domain-pa-culture ul li .slider-text p{
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  margin-bottom: 0;
  height: 105px;
  overflow: hidden;
  line-height: 1.23;
  letter-spacing: normal;
  color: #333333;
  text-align: left;
}
.domain-slider-sec .domain-pa-culture ul .bg-primary{
  background-color: #36a2eb !important;
}
.domain-slider-sec .domain-pa-culture ul .bg-warning{
  background-color: #ffce56!important;
}
.domain-slider-sec .domain-pa-culture ul .bg-danger{
  background-color: #ff6384!important;
}
.domain-slider-sec .domain-pa-culture ul .bg-info{
  background-color: #4bc0c0!important;
}

.domain-pa-culture {
  position: relative;
}

.domain-pa-culture .img-slide-next {
  position: absolute;
  right: -76px;
  top: 22px;
  width: 50px;
  cursor: pointer;

.domain-pa-culture .img-slide-back {
  position: absolute;
  left: -53px;
  top: 15px;
  width: 32px;
  cursor: pointer;
}



  
}
@media (max-width: 1024px) {
  // .domain-slider-sec .domain-pa-culture ul {
  //   overflow: hidden;
  //   margin: 0 auto;
  //   width: 408px;
  // }
  .domain-slider-sec .bg-light {
    width:100%;
    overflow:auto;
  }
  .domain-pa-culture .img-slide-next {
    right: -100px;
  }
  .domain-slider-sec .domain-pa-culture ul, .domain-pa-culture, .domain-slider-sec .domain-map{
    width:600px;
  }
}

@media (max-width: 767px) {
  // .domain-slider-sec .domain-pa-culture ul {
  //   overflow: hidden;
  //   margin: 0 auto;
  //   width: 273px;
  // }

  .domain-pa-culture.img-slide-next {
    right: -15px;
    width: 24px;
  }
}

@media (max-width: 480px) {

  .domain-slider-sec .domain-pa-culture ul li .slider-img {
    width: 100px;
  }

}
`;

export const RangeSliderWrapper = styled.div`
.rangeslider {
  position: relative;
  background: #e6e6e6;
  -ms-touch-action: none;
  touch-action: none;
}
.rangeslider,
.rangeslider .rangeslider__fill {
  display: block;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
}
.rangeslider .rangeslider__handle {
  background: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 -1px 3px rgba(0, 0, 0, 0.4);
}
.rangeslider .rangeslider__handle .rangeslider__active {
  opacity: 1;
}
.rangeslider .rangeslider__handle-tooltip {
  width: 40px;
  height: 40px;
  text-align: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  font-weight: normal;
  font-size: 14px;
  transition: all 100ms ease-in;
  border-radius: 4px;
  display: inline-block;
  color: white;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.rangeslider .rangeslider__handle-tooltip span {
  margin-top: 12px;
  display: inline-block;
  line-height: 100%;
}
.rangeslider .rangeslider__handle-tooltip:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
}
/**
* Rangeslider - Horizontal slider
*/
.rangeslider-horizontal {
  height: 12px;
  border-radius: 10px;
}
.rangeslider-horizontal .rangeslider__fill {
  height: 100%;
  background-color: #7cb342;
  border-radius: 10px;
  top: 0;
}
.rangeslider-horizontal .rangeslider__handle {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.rangeslider-horizontal .rangeslider__handle:after {
  content: ' ';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 6px;
  left: 6px;
  border-radius: 50%;
  background-color: #dadada;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) inset, 0 -1px 3px rgba(0, 0, 0, 0.4) inset;
}
.rangeslider-horizontal .rangeslider__handle-tooltip {
  top: -55px;
}
.rangeslider-horizontal .rangeslider__handle-tooltip:after {
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, 0.8);
  left: 50%;
  bottom: -8px;
  transform: translate3d(-50%, 0, 0);
}
/**
* Rangeslider - Vertical slider
*/
.rangeslider-vertical {
  height: 314px;
  max-width: 6px;
  background-color: transparent;
  border-radius: 6px;
}
.rangeslider-vertical .rangeslider__fill,
.rangeslider-vertical .rangeslider__handle {
  position: absolute;
}
.rangeslider-vertical .rangeslider__fill {
  width: 100%;
  background-color: #82d0ec;
  box-shadow: none;
  bottom: 0;
}
.rangeslider-vertical .rangeslider__handle {
  width: 22px;
  height: 22px;
  left: -8px;
  border-radius: 20px;
  border: 2px #fff solid;
  background-color: #038e8e;
  box-shadow: none;
}
.rangeslider-vertical .rangeslider__handle-tooltip {
  left: -100%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.rangeslider-vertical .rangeslider__handle-tooltip:after {
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid rgba(0, 0, 0, 0.8);
  left: 100%;
  top: 12px;
}
/**
* Rangeslider - Reverse
*/
.rangeslider-reverse.rangeslider-horizontal .rangeslider__fill {
  right: 0;
}
.rangeslider-reverse.rangeslider-vertical .rangeslider__fill {
  top: 0;
  bottom: inherit;
}
/**
* Rangeslider - Labels
*/
.rangeslider__labels {
  position: relative;
}
.rangeslider-vertical .rangeslider__labels {
  position: relative;
  list-style-type: none;
  margin: 0 0 0 24px;
  padding: 0;
  text-align: left;
  width: 250px;
  height: 100%;
  left: 10px;
}
.rangeslider-vertical .rangeslider__labels .rangeslider__label-item {
  position: absolute;
  transform: translate3d(0, -50%, 0);
}
.rangeslider-vertical .rangeslider__labels .rangeslider__label-item::before {
  content: '';
  width: 10px;
  height: 2px;
  background: black;
  position: absolute;
  left: -14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
}
.rangeslider__labels .rangeslider__label-item {
  position: absolute;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  top: 10px;
  transform: translate3d(-50%, 0, 0);
}
`;

export const KnowledgeWrapper = styled.div`
.domain-pa-knowledge ul {
  display: flex;
  justify-content: space-between;
}

.domain-pa-knowledge ul li {
  position: relative;
  text-align: center;
  margin: 0 8px;
  width: 20%;
}
/* Selected style */

.domain-pa-knowledge ul.active li{
  position: relative;
 }
.domain-pa-knowledge ul.active li::before{
  content: '';
  left: 0;
  z-index: 1;
  top: 0;
  background-color: #ffffffc4;
  position: absolute;
  height: 100%;
  width: 100%;
}
.domain-pa-knowledge ul.active li.selected::before{
  background-color: #fff0;
}
/* End Selected style */

.domain-pa-knowledge ul li .slider-img {
  width: 100%;
  height: 195px;
  border-radius: 6px;
  color: #fff;
  margin-bottom: 20px;
  font-size: 13px;
  text-align: left;
  padding: 10px;
  position: relative;
}
.domain-pa-knowledge ul li .slider-img.bg-primary::before{
  content: '';
  position: absolute;
  bottom: -14px;
  left: 50%;
  margin-left: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid #36a2eb;
}
.domain-pa-knowledge ul li .slider-img::before{
  content: '';
  position: absolute;
  bottom: -14px;
  left: 50%;
  margin-left: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid transparent;
}
.domain-pa-knowledge ul li .slider-img.bg-primary::before{
  border-top: 15px solid #36a2eb;
}
.domain-pa-knowledge ul li .slider-img.bg-danger::before{
  border-top: 15px solid #ff6384;
}
.domain-pa-knowledge ul li .slider-img.bg-info::before{
  border-top: 15px solid #4bc0c0;
}

.domain-pa-knowledge ul li .slider-img p{
  margin-bottom: 0;
  height: 172px;
    overflow: hidden;
}
.domain-pa-knowledge ul li .slider-text {
  font-size: 24px;
  font-weight: bold;
  color: rgba(51, 51, 51, 0.6);
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.domain-pa-knowledge ul .bg-primary{
  background-color: #36a2eb !important;
}
.domain-pa-knowledge ul .bg-warning{
  background-color: #ffce56!important;
}
.domain-pa-knowledge ul .bg-danger{
  background-color: #ff6384!important;
}
.domain-pa-knowledge ul .bg-info{
  background-color: #4bc0c0!important;
}

.domain-pa-knowledge {
  position: relative;
}

.domain-pa-knowledge .img-slide-next {
  position: absolute;
  right: -76px;
  top: 22px;
  width: 50px;
  cursor: pointer;
}

.domain-pa-knowledge .img-slide-back {
  left: -53px;
  top: 15px;
  width: 32px;
  cursor: pointer;
}




@media (max-width: 1024px) {
.domain-pa-knowledge .img-slide-next {
    right: -100px;
  }
  .domain-pa-knowledge ul{
    width:600px;
  }
  .domain-pa-knowledge {
    width: 630px;
   }
}

@media (max-width: 767px) {
  // .domain-pa-knowledge ul {
  //   overflow: hidden;
  //   margin: 0 auto;
  //   width: 273px;
  // }

  .domain-pa-knowledge.img-slide-next {
    right: -15px;
    width: 24px;
  }
}

@media (max-width: 480px) {

  .domain-pa-knowledge ul li .slider-img {
    width: 100px;
  }

  // .domain-pa-knowledge ul {
  //   width: 240px;
  // }
}
`;

export const ProcessesWrapper = styled.div`
ul li {
  position: relative;
  text-align: left;
  margin: 0;
  list-style: none;
}

.pa-process-map {
  width: 40px;
  position: relative;
}

.pa-process-map ul li.active:before {
  content: '';
  position: absolute;
  top: -2px;
  right: -29px;
  width: 22px;
  height: 22px;
  background-color: #038e8e;
  border-radius: 20px;
  border: 2px #fff solid;
  z-index: 4;
  display: block;
}

.pa-process-map ul.slider-side-labels {
  width: 40px;
  position: relative;
}

.pa-process-map ul li {
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 0.16px;
  text-align: center;
  color: #babcbd;
  position: relative;
  padding-top: 0px;
  width: 32px;
  margin-left: -12px;
  height: 60px;
  margin-right: 0;
}

.pa-process-map ul li::after {
  content: '-';
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  display: block;
}
/* Selected style */

.domain-pa-processes ul.active li{
  position: relative;
  height: 60px;
    overflow: hidden;
 }
 .domain-pa-processes ul.active li::before{
  content: '';
  left: 0;
  z-index: 1;
  top: 0;
  background-color: #ffffffc4;
  position: absolute;
  height: 100%;
  width: 100%;
}
.domain-pa-processes ul.active li.selected::before{
  background-color: #fff0;
}

/* End Selected style */
.domain-pa-processes .process-box {
  display: flex;
}

.domain-pa-processes .process-box .map-box {
  width: 40px;
}

.domain-pa-processes .process-box .map-box-content {
  width: 80%;
  padding-left: 50px;
}

.domain-pa-processes ul li .slider-img p {
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: #333333;
}

.domain-pa-processes ul li .slider-img p b {
  display: inline-block;
  margin-left: -22px;
  font-size: 13px;
  font-weight: 700;
  color: #36a2eb;
}

.domain-pa-processes ul li .slider-img::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 41px;
  height: 100%;
  background-color: transparent;
}

.domain-pa-processes ul li .slider-img {
  padding: 10px 10px 10px 30px;
}

.domain-pa-processes ul li .slider-img p {
  margin-bottom: 0;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.23;
  text-align: left;
}

.domain-pa-processes ul li .slider-text p {
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: #333333;
  text-align: left;
}

.domain-pa-processes {
  position: relative;
}

.domain-pa-processes .pa-process-map ul {
  padding: 0;
}

.domain-pa-processes .img-slide-next {
  position: absolute;
  right: -76px;
  top: 22px;
  width: 50px;
  cursor: pointer;
}

.domain-pa-processes .img-slide-back {
  position: absolute;
  left: -53px;
  top: 15px;
  width: 32px;
  cursor: pointer;
}




@media (max-width: 992px) {
  .domain-pa-processes .img-slide-next {
    right: 0;
  }
}

@media (max-width: 575px) {
  .domain-pa-processes .img-slide-next {
    right: -15px;
    width: 24px;
  }

  .domain-pa-processes .process-box .map-box-content {
    width: 80%;
    padding-left: 18px;
  }
}

`;

export const StrategyWrapper = styled.div`
.domain-pa-slider ul {
  display: flex;
  justify-content: space-between;
}

.domain-pa-slider ul li {
  position: relative;
  text-align: center;
  margin: 0 8px;
  width: 20%;
}

/* Selected style */

.domain-pa-slider ul.active li{
  position: relative;
 }
 .domain-pa-slider ul.active li::before{
  content: '';
  left: 0;
  z-index: 1;
  top: 0;
  background-color: #ffffffc4;
  position: absolute;
  height: 100%;
  width: 100%;
}
.domain-pa-slider ul.active li.selected::before{
  background-color: #fff0;
}
.domain-pa-slider ul.active li.active::before{
  background-color: #fff0;
}

/* Selected style */
/* .domain-pa-slider ul li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffffd1;
  z-index: 9;
}

.domain-pa-slider ul li.active::before {
  background-color: transparent;

} */

.domain-pa-slider ul li .slider-img {
  width: 100%;
  height: 84px;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 20px;
}

.domain-pa-slider ul li .slider-text p {
  font-size: 13px;
  font-weight: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: #333333;
  text-align: left;
  height: 136px;
    overflow: hidden;
    margin-bottom: 0;
}
.domain-pa-slider ul .bg-primary{
  background-color: #36a2eb !important;
}
.domain-pa-slider ul .bg-warning{
  background-color: #ffce56!important;
}
.domain-pa-slider ul .bg-danger{
  background-color: #ff6384!important;
}
.domain-pa-slider ul .bg-info{
  background-color: #4bc0c0!important;
}
.domain-pa-slider {
  position: relative;
}

.domain-pa-slider .img-slide-next {
  position: absolute;
  right: -76px;
  top: 22px;
  width: 50px;
  cursor: pointer;
}

.domain-pa-slider .img-slide-back {
  position: absolute;
  left: -53px;
  top: 15px;
  width: 32px;
  cursor: pointer;
}




@media (max-width: 1024px) {
  .domain-pa-slider .img-slide-next {
    right: -60px;
  }
  .domain-pa-slider{
    width:670px;
  }
  .domain-pa-slider ul{
    width:650px;
  }
}


@media (max-width: 480px) {

  .domain-pa-slider ul li .slider-img {
    width: 100px;
  }

}
`;

export const TechnologyWrapper = styled.div`
.domain-pa-technology ul li {
  position: relative;
  text-align: center;
  margin: 0 8px;
}
/* Selected style */

.domain-pa-technology ul.active li{
  position: relative;
 }
.domain-pa-technology ul.active li::before{
  content: '';
  left: 0;
  z-index: 1;
  top: 0;
  background-color: #ffffffc4;
  position: absolute;
  height: 100%;
  width: 100%;
}
.domain-pa-technology ul.active li.selected::before{
  background-color: #fff0;
}

/* End Selected style */

.domain-pa-technology ul li .slider-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 5px;
  padding: 6px;
  position: relative;
  height:79px;
  overflow: hidden;
}

.domain-pa-technology ul li .slider-img.active::after {
  content: "\f00c";
  font-family: "Font Awesome 5 Free";
  font-weight: 700;
  position: absolute;
  top: 17%;
  left: 7px;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 20px;
  color: #84c778;
  font-size: 15px;
  padding-top: 2px;
}

.domain-pa-technology ul li .slider-img::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 41px;
  height: 100%;
  background-color: transparent;
}

.domain-pa-technology ul li .slider-img.bg-danger::before {
  background-color: #e9a1b0;
}

.domain-pa-technology ul li .slider-img.bg-info::before {
  background-color: #92d8d8;
}

.domain-pa-technology ul li .slider-img.bg-primary::before {
  background-color: #62b1e7;
}

.domain-pa-technology ul li .slider-img {
  padding: 10px 10px 10px 55px;
}

.domain-pa-technology ul li .slider-img p {
  margin-bottom: 0;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.23;
  text-align: left;
  height: 61px;
  overflow: hidden;
}

.domain-pa-technology ul li .slider-text p {
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: #333333;
  text-align: left;
}

.domain-pa-technology ul .bg-primary {
  background-color: #36a2eb !important;
}

.domain-pa-technology ul .bg-warning {
  background-color: #ffce56 !important;
}

.domain-pa-technology ul .bg-danger {
  background-color: #ff6384 !important;
}

.domain-pa-technology ul .bg-info {
  background-color: #4bc0c0 !important;
}

.domain-pa-technology {
  position: relative;
}

.domain-pa-technology .img-slide-next {
  position: absolute;
  right: -76px;
  top: 22px;
  width: 50px;
  cursor: pointer;
}

.domain-pa-technology .img-slide-back {
  position: absolute;
  left: -53px;
  top: 15px;
  width: 32px;
  cursor: pointer;
}




@media (max-width: 1024px) {
  .domain-pa-technology .img-slide-next {
    right: 0;
  }
  .domain-pa-technology {
   width:600px;

  }
}

@media (max-width: 767px) {
  .domain-pa-technology.img-slide-next {
    right: -15px;
    width: 24px;
  }
}
`;

export const QuestionaireAsideWrapper = styled.aside`
  &.toggled {
    right: 0;
    top: 53px !important;
    margin-right: 0;
    width: 300px !important;
    height: 100%;
    position: fixed;
    background-color:#fff;
    z-index: 4;
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &.collapsed {
    display: none;
  }
  .nav-tabs {
    border-color: #c8ced3;
  }
.questionaireRightBar{
  width: 100%;
  text-align: center;
  padding: 14px 18px;
  background-color: #d8d8d8;
  color: #708393;
  height: 50px;
}
.nav-tabs .nav-link {
  padding:0.84rem 1rem !important;
  color: #23282c;
  border-top: 0;
  border-radius: 0;
  border-right-color: #c8ced300!important;
  border-left-color: #c8ced300!important;
  background-color: #c8ced300!important;
  border-top-color: #ccc!important;
  border-bottom-color: #ccc!important;
  text-align: center!important;
}

.nav-tabs .nav-link.active {
  color: #c6c7c7;
    background-color: #c8ced300 !important;
    text-align: center;
}

.nav-tabs .nav-item {
  width: 100%;
}

.nav-tabs .nav-item:first-child .nav-link {
  border-left: 0;
  text-align: center;
}

.tab-content {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  border: 0;
  border-top: 1px solid #c8ced3;
  border-left: 1px #c8ced3 solid;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-left: 0;
}

.tab-content::-webkit-scrollbar {
  width: 10px;
  margin-left: -10px;
  -webkit-appearance: none;
  appearance: none;
}

.tab-content::-webkit-scrollbar-track {
  background-color: white;
  border-right: 1px solid #f2f2f2;
  border-left: 1px solid #f2f2f2;
}

.tab-content::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #e6e6e6;
  background-clip: content-box;
  border-color: transparent;
  border-style: solid;
  border-width: 1px 2px;
}

.tab-content .tab-pane {
  /* height: 500px; */
  /* border-left: 1px #c8ced3 solid; */
  padding-left: 0;
  margin-bottom: 100px;
  overflow-x: hidden;
  overflow-y: auto;
}


.app-body .aside-menu.aside-menu-right {
  -ms-flex: 0 0 250px;
  flex: 0 0 250px;
}

.tab-pane h3 {
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.05px;
  color: #5f6c72;
  border-bottom: 1px #d8d8d8 solid;
  padding: 16px 0 16px 17px;
  margin-bottom: 0;
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

.message p small {
  font-size: 11px;
  font-weight: bold;
  color: #333333;
}

.message a {
  font-size: 13px;
  font-weight: normal;
  letter-spacing: -0.05px;
  color: #1665d8;
  text-decoration: underline;
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
}
.message .rectangle-box.selected{
  border: 2px #2D353C solid;
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

@media (max-width: 575.98px) {
  &.toggled {
    width: 260px;
  }
  .main {
    position: relative;
  }

  .main::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1018;
    width: 100%;
    height: 100%;
    content: "";
    background: rgba(0, 0, 0, 0.7);
    -webkit-animation: opacity 0.25s;
    animation: opacity 0.25s;
  }

  .tab-content {
    padding-left: 15px;
  }

  .nav-tabs .nav-item {
    width: auto;
    display: inline-block;
  }
}
`;