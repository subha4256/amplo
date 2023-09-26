import styled from 'styled-components';

export const BenchReportsWrapper = styled.div`
div.CustomRadio{
    display: inline-block;
    min-height: 45px;
    margin: 0 25px;
  }
  .iconWrap {
    line-height: 30px;
    text-align: center;
    width: 30px;
    margin-right: 5px;
  }
  .businessModellingWrap{
    background-color: #ffc107;
  }
  .processAccessmentWrap{
    background-color: #20a8d8;
  }
  .designThinkingWrap{
    background-color: #4dbd74;
  }
  .kpiWrap{
    background-color: #f86c6b;
  }
  .roadmapWrap{
    background-color: #17a2b8;
  }

  .header-sec {
    display: flex;
    margin-top: 20px;
    align-items: center;
}

.icon-sec p {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.01px;
    color: #131313;
    //margin-bottom: 0;
    text-transform: uppercase;
    margin:7px 0;
}

.header-sec .modeling-list li {
    margin-right: 1px !important;
}

.header-sec .modeling-list li a {
    height: 55px;
    width: 55px;
    text-align: center;
    padding: 4px 6px 5px 6px;
    color: #fff;
    opacity: .3;
}

.header-sec .modeling-list li.active a {
    opacity: 1;
}

.header-sec .modeling-list li a img {
    -webkit-filter: brightness(250%);
    filter: brightness(250%);
}

.header-sec .modeling-list li a.bg-blue {
    background-color: #20a8d8;
}

.header-sec .modeling-list li a.bg-yellow {
    background-color: #ffc107;
}

.header-sec .modeling-list li a.bg-green {
    background-color: #4dbd74;
}

.header-sec .modeling-list li a.bg-red {
    background-color: #f86c6b;
}

.header-sec .modeling-list li a.bg-blue-light {
    background-color: #17a2b8;
}

.header-sec .report-btn a {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #083ac8;
}

.header-sec .toggle-btn .btn-unlock {
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

.header-sec .toggle-btn .btn-unlock i {
    font-size: 11px;
}
.posrelative-span{
    position:relative;
    top:-5px;
}
.header-sec .toggle-btn .btn-lock {
    background-color: #fff;
    border-radius: 30px;
    height: 25px;
    font-size: 13px;
    padding: 0 10px 0 0;
    width: 85px;
    text-align: center;
    margin-right: -20px;
}

.header-sec h1 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.34px;
    color: #000000;
}

.header-sec .back-btn .btn-primary {
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0.04px;
    color: #fff;
    width: 107px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    text-transform: uppercase;
    border: 0;
}
/* End top report style */
.processes-head h1{
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #000000;
}
.bg-white1 {
    border-radius: 4px;
    background-color: #fff;
    margin: 26px 0 0px 0;
	height: 100%;
}

.report-capability-sec.bg-white1 {
    display: block;
    padding: 0 38px 20px 38px;
    width: 100%;
    margin-top:37px;
   
}
.report-capability-sec.bg-white1 .weighted-average-sec{
    overflow-x: auto;
    overflow-y: hidden;
}
.report-capability-sec.bg-white1 .top-heading {
    display: flex;
    justify-content: space-between;
}

.report-capability-sec.bg-white1 .top-heading .dropdown .dropdown-item {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.2px;
    color: #2f353a;
}

.report-capability-sec.bg-white1 .top-heading .dropdown a i {
    color: #2f353a;
}

.report-capability-sec.bg-white1 .top-heading .dropdown-menu {
    min-width: 8rem;
    left: -31px !important;
}

.report-capability-sec.bg-white1 .top-heading .heading {
    font-size: 24px;
    font-weight: normal;
    letter-spacing: 0.02px;
    color: #131313;
    margin-bottom: 28px;
}
.heading-weighte-avg{
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 600 !important;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    -webkit-letter-spacing: 0.02px;
    -moz-letter-spacing: 0.02px;
    -ms-letter-spacing: 0.02px;
    letter-spacing: 0.02px;
    color: #000000;
    //padding:23px 0;
    margin-bottom:8px !important;
}
.top-heading-padding-control{
    padding:23px 0;
}
.weighted-scroll{
    width: 1050px;
}

.weighted-row,
.weighted-row1 {
    display: flex;
}

.weighted-row .weighted-box:first-child {
    width: 50px;
}

.weighted-row .weighted-box {
    //width: 255px;
    width:25%;
    text-align: center;
}

.weighted-row .weighted-box p {
    // font-size: 15px;
    // font-weight: 400;
    // line-height: 1.47;
    // letter-spacing: normal;
    // text-align: center;
    // color: #aaacae;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    //line-height: 1.47;
    line-height: 16px;
    letter-spacing: normal;
    text-align: center;
    color: #787a7d;
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    padding: 0 10px
}

.weighted-row1 .weighted-box:first-child {
    width: auto;
    background-color: transparent;
    border-color: transparent;
}

.weighted-row1 .weighted-box:first-child p.vert-text {
    margin: 0px -60px 0px 0px;
   transform: rotate(270deg);
    font-size: 15px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: normal;
    text-align: center;
    color: #AAACAE;
    width: 128px;
    height: 100px;
    word-break: break-word;
    padding: 0 10px;
}

.weighted-row1 .weighted-box {
    //width: 255px;
    width:25%;
    height: 130px;
    text-align: center;
    background-color: #ccc;
    border: solid 1px #c5c2c2;
    align-items: center;
    justify-content: center;
    display: flex;
}

.weighted-row1 .weighted-box.bg-green {
    background-color: #60b17e;
}

.weighted-row1 .weighted-box.bg-yellow {
    background-color: #ffe687;
}

.weighted-row1 .weighted-box.bg-orange {
    background-color: #ffae7a;
}

.weighted-row1 .weighted-box.bg-red {
    background-color: #ff786e;
}

.weighted-row1 .weighted-box.bg-light-green {
    background-color: #b2cc83;
}

.weighted-row1 .weighted-box.bg-excellent {
    background-color: #60b17e;
}
  
.weighted-row1 .weighted-box.bg-good {
    background-color: #b2cc83;
}
  
.weighted-row1 .weighted-box.bg-average {
    background-color: #ffe687;
}
  
.weighted-row1 .weighted-box.bg-satisfactory {
    background-color: #ffae7a;
}
.weighted-row1 .weighted-box.bg-poor {
    background-color: #ff786e;
}
.weighted-row1 .weighted-box.bg-nil {
    background-color: #ffff;
}

.weighted-row1 .weighted-box p {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.23px;
    color: #333333;
    margin: 0;
}

.Lprocesses .bg-white1 {
    padding: 15px;
    border-radius: 4px;
  box-shadow: 0 0 4px 0 #aeacac, 0 2px 4px 0 rgba(174, 172, 172, 0.5);
  padding-bottom:0;
}

.report-capability-sec .Lprocesses.top-heading .heading{
    font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.02px;
  color: #131313;
  margin-bottom: 0;
}
.Lprocesses .bg-white1 .dropdown .dropdown-item {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.2px;
    color: #2f353a;
}

.Lprocesses .bg-white1 .dropdown-menu {
    min-width: 8rem;
    left: -9rem !important;
}
.Lprocesses .last-Lp .bg-white1 .dropdown-menu {
    left: -5rem !important;
}
.Lprocesses .bg-white1 h3 {
    // font-size: 13px;
    // font-weight: 400;
    // letter-spacing: -0.08px;
    // color: #485465;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.08px;
    color: #330000;
}

.Lprocesses .bg-white1 h3 i {
    color: #485465;
}

.Lprocesses .bg-white1 .d-flex .rating {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: -0.08px;
    color: #485465;
    padding-right: 5px;
    padding-left: 5px;
    width: 100px;
    position:relative;
}
.Lprocesses .bg-white1 .d-flex .rating  p{
    margin-bottom: 0;
    min-width: 25px;
}
.value-data {
    position: absolute;
    top: 3px;
    font-size: 11px !important;
    color:#000 !important;
    left:4px;
}
.Lprocesses .bg-white1 .d-flex .rating:last-child{
    padding-right: 0;
}

.Lprocesses .bg-white1 .d-flex .rating span {
    font-size: 8px;
    font-weight: 400;
    letter-spacing: -0.05px;
    color: #a2a6ad;
}

.Lprocesses .bg-white1 .d-flex .rating span.dot {
    width: 7.1px;
    display: inline-block;
    margin-left: -10px;
    margin-right: 1px;
    height: 7.1px;
    border-radius: 10px;

}

.Lprocesses .bg-white1 .d-flex .rating span.dot.excellent {
    background-color: #60b17e;
}

.Lprocesses .bg-white1 .d-flex .rating span.dot.good {
    background-color: #b2cc83;
}

.Lprocesses .bg-white1 .d-flex .rating span.dot.average {
    background-color: #ffe687;
}

.Lprocesses .bg-white1 .d-flex .rating span.dot.satisfactory {
    background-color: #ffae7a;
}

.Lprocesses .bg-white1 .d-flex .rating span.dot.poor {
    background-color: #ff786e;
}

.processes-summary .bg-white1 {
    margin-top: 10px;
    margin-bottom: 0px;
}

.processes-summary .bg-white1 .dropdown .dropdown-item {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.2px;
    color: #2f353a;
}

.processes-summary .bg-white1 .dropdown-menu {
    min-width: 8rem;
    left: -9rem !important;
}

.processes-summary .bg-white1 h3 i {
    color: #485465;
    font-size: 16px;
}

.processes-summary .bg-white1 h3 {
    font-size: 24px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #131313;	
	padding: 23px 28px;
	text-align: center;
}

.first-piechart .apexcharts-canvas{
    margin:0 auto;
}
.popup-tabledata thead tr th{
    opacity: 0.76;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #2f353a;
}
.reportModal .modal-title{
    font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.02px;
  color: #000000;
}
.width20-percent{
    flex: 0 0 20%;
    max-width: 20%;
}
.fisie18{
    font-size:18px !important;
}
.posrelatives{
    position:relative;
}

.ontop-posab{
    position:absolute;
    bottom:-36px;
}
.ontop-posab-first{
    position: absolute;
    bottom: -29px;
}
.posrelclass{
    min-height:460px !important;
    position:relative;
}
.posrelative-span-topprogress{
    font-size:12px;
    margin-right:12px;
}
.dot-top{
    margin-right:5px;
}
.dot-top.excellent i{
    color:#60b17e;
}
.dot-top.good i{
    color:#b2cc83;
}
.dot-top.average i{
    color:#ffe687;
}
.dot-top.satisfactory i{
    color:#ffae7a;
}
.dot-top.poor i{
    color:#ff786e;
}
@media (max-width: 767px) {
    .header-sec {
        display: block;
    }
    .width20-percent{
        flex: 0 0 100%;
    max-width: 100%;
    }
    .header-sec .icon-sec,
    .header-sec .report-btn,
    .header-sec .toggle-btn,
    .header-sec .back-btn {
        display: inline-block;
    }

    .header-sec .report-btn,
    .header-sec .toggle-btn,
    .header-sec .back-btn {
        margin-bottom: 15px;
    }
}
@media only screen and (max-width: 1024px) and (min-width: 768px)  {
    .width20-percent{
        flex: 0 0 50%;
    max-width: 50%;
    }
}
@media only screen and (max-width: 1149px) and (min-width: 1025px)  {
    .width20-percent{
        flex: 0 0 33.3%;
    max-width: 33.3%;
    }
}
@media only screen and (max-width: 1279px) and (min-width: 1050px)  {
    .width20-percent{
        flex: 0 0 25%;
    max-width: 25%;
    }
}
@media (max-width: 575px) {
    .report-capability-sec.bg-white1 .top-heading .heading {
        font-size: 18px;
    }

    .processes-summary .bg-white1 h3 {
        font-size: 18px;
    }

    .processes-summary .bg-white1 {
        margin-bottom: 30px;
        min-height: auto;
    }
}
`;