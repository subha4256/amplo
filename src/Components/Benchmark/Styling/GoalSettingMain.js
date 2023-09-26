import styled from 'styled-components';

export const GoalSettingMainWrapper = styled.div`

.bench-top-sec form label {
  font-size: 16px;
  color: #000;
  font-weight: 700;
}

.bench-top-sec form .form-control {
  font-size: 13px;
  height: 40px;
  font-stretch: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}

.bench-marking-sec .bg-light {
  border-radius: 4px;
  padding: 17px;
  background-color: #ffffff !important;
}

.bench-marking-sec h2 {
  font-size: 16px;
  letter-spacing: 0.23px;
  font-weight: 700;
  color: #000000;
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
    width: 70px;
    margin-left: -30px;
    margin-right: 0 !important;
    height: 50px;
    cursor: pointer;
}
.benchmarking-map ul li:last-child{
  margin-right: -10px !important
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
  left: 50%;
  width: 24px;
  height: 24px;
  background-color: #20a8d8;
  border-radius: 20px;
  color: #fff;
  font-size: 15px;
  padding-top: 2px;
  margin-left: -12px;
}

@media (max-width: 480px) {
  .benchmarking-map ul li {
    font-size: 9px;
  }

  .benchmarking-map {
    margin: 30px 0px 0 0px;
  }
}
/* -------------------------PA Goal Slider------------------------ */
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

.domain-slider-sec .domain-map::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 6px;

  background-color: #e4e7ea;
  border-radius: 6px;
}

.domain-slider-sec .domain-map::after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0;
  width: 60%;
  height: 6px;
  background-color: #82d0ec;
  border-radius: 6px;
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

/* ----------------------------------------------- */
.flyscore h2{
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.23px;
  color: #000000;
}
.flyscore-row h3{
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  color: #000000;
  margin-bottom: 18px;
}
.flyscore-row .point-txt{
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.29px;
  color: #ebaa0c;
}
.flyscore-row .data-btn{
  height: 35px;
  border-radius: 4px;
  border: solid 1px #083ac8;
  background-color: #ffffff;
  font-family: Arial;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.12px;
  color: #083ac8;
  display: inline-block;
  padding: 5px 14px;
    text-decoration: none;
    line-height: 23px;
    transition: 0.5s;
}
.flyscore-row .data-btn:hover{
  background-color: #083ac8;
  text-decoration: none;
  color: #fff;
}
.pa-goal-setting .row.border-bottom {
  padding-top: 20px;
  padding-bottom: 22px;
}

.pa-goal-setting .domain-map ul li {
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 0.16px;
  text-align: center;
  color: #5c5f61;
  position: relative;
  padding-top: 0;
  margin-top: -22px;
  width: 32px;
  margin-left: -12px;
  height: 32px;
  margin-right: 0;
}

.pa-goal-setting .domain-map::before {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: #e4e7ea;
  border-radius: 0px;
}

.pa-goal-setting .domain-map::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 48%;
  height: 6px;
  background-color: transparent;
  border-radius: 0px;
}
.pa-goal-setting .domain-map.bg-blue::after{
  background-color: #82d0ec;
}
.pa-goal-setting .domain-map.bg-red::after{
  background-color: #ff6384;
}
.pa-goal-setting .domain-map.bg-green::after{
  background-color: #4bc0c0;
}
.pa-goal-setting .domain-map.bg-yellow::after{
  background-color: #ffce56;
}
.pa-goal-setting .domain-map ul li.active:before {
  content: '';
    position: absolute;
    top: 16px;
    left: 40%;
    width: 18px;
    height: 18px;
    background-color: #074256;
    border-radius: 20px;
    border: 2px #fff solid;
    z-index: 4;
}

.pa-goal-setting .domain-map ul li.active span {
  position: absolute;
  top: -5px;
  margin-left: -20px;
  font-size: 10px;
  left: 50%;
  height: 22px;
  width: 36px;
  background-color: #d8d8d8;
  border-radius: 7px;
  color: #777575;
  padding: 2px 3px;
  border: 2px #fff solid;
  z-index: 4;
}
.pa-goal-setting .btext{
  font-size: 16px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 0.13px;
    color: #2f353a;
    padding-top: 0;
    height: 55px;
    margin: 0;
    display: flex;
    align-items: center;
}
.pa-goal-setting .slider-handle-triangle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #c9cece;
  position: absolute;
  top: 6px;
  left: 20%;
}
.pa-goal-setting .slider-handle-triangle span.tooltp, .pa-goal-setting .slider-handle-triangle1 span.tooltp{
  position: absolute;
  top: -32px;
  margin-left: -15px;
  font-size: 10px;
  left: 50%;
  height: 22px;
  background-color: #e2e6e6;
  border-radius: 7px;
  color: #777575;
  padding: 2px 7px;
  border: 2px #fff solid;
  z-index: 4;
}
.pa-goal-setting .slider-handle-triangle1 {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #c9cece;
  position: absolute;
  top: 6px;
  left: 80%;
}
.pa-goal-setting ul li .slider-img.bg-danger::before {
  background-color: #e9a1b0;
}

.pa-goal-setting ul li .slider-img.bg-info::before {
  background-color: #92d8d8;
}

.pa-goal-setting ul li .slider-img.bg-primary::before {
  background-color: #62b1e7;
}



.pa-goal-setting ul .bg-primary {
  background-color: #36a2eb !important;
}

.pa-goal-setting ul .bg-warning {
  background-color: #ffce56 !important;
}

.pa-goal-setting ul .bg-danger {
  background-color: #ff6384 !important;
}

.pa-goal-setting ul .bg-info {
  background-color: #4bc0c0 !important;
}

.domain-pa-technology {
  position: relative;
}


@media (max-width: 992px) {}

@media (max-width: 767px) {}

/* ------Modal Style ---------------*/
.modal .modal-content{
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #cccccc;
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
`
export const DropdownWrapper = styled.div`
.greport-sec label{
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.23px;
  color: #000000;
}
.greport-sec select{
  width: 296px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px rgba(0, 0, 0, 0.32);
  background-color: #ffffff;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
}
.greport-sec .btn.btn-info{
  width: 97px;
  height: 40px;
}
.greport-sec.border-top {
    border-top: 1px solid #d6d6d6!important;
}
`