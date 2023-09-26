import styled from 'styled-components';

export const KpiSettingWrapper = styled.div`
.row.kpi-setting-sec{
  min-height: 800px;
  }
  .bbg-warning-custom{
    background-color: rgb(255, 223, 131) !important;
    }
    .box-headerlabel{
    font-size: 18px;
    font-weight: 400;
    color: rgb(0, 0, 0);
    margin-bottom:0
    }
    .box-body-label{
    color: rgb(0, 0, 0);
    font-size: 14px;
    text-align:center;
    }
    .box-body-value{
    font-size: 36px;
    font-weight: 800;
    color: rgb(0, 0, 0);
    margin-top: 10px;
    text-align:center;
    }
#fromDate{
  padding-top: 0;
  padding-left: 0 !important;
  padding-bottom: 14px;
  border:0;
  color: #3f51b5;
}
#toDate{
  padding-top: 0;
  padding-right: 0 !important;
  padding-bottom: 14px;
  border:0;
  color: #3f51b5;
  text-align: right;
}
.filter-col .btn{
  width: 140px;
height: 36px;
border-radius: 4px;
border: solid 1px #083ac8;
background-color: #ffffff;
font-size: 14px;
font-weight: bold;
line-height: 23px;
letter-spacing: 0.54px;
text-align: center;
color: #083ac8;
}
.card_kpi_data{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.filter-col .filterblock{
  position: absolute;
  z-index: 9999;
  min-width: 65%;
  border-radius: 0;
border: solid 1px rgba(46, 91, 255, 0.08);
box-shadow: 0 10px 20px 0 rgba(46, 91, 255, 0.07);
background-color: #ffffff;
margin-top: 10px;
}
.filter-col .form-group {
  margin-bottom: 1.5rem;
}
.filterfrm{
  padding: 25px;
}
.filterfrm h3{
font-size: 14px;
font-weight: 400;
letter-spacing: normal;
text-align: left;
color: #979da2;
margin-bottom: 19px;
text-transform: uppercase;
}
.filterfrm label{
  font-size: 14px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.3px;
color: #2f353a;
}
.filterfrm select{
  height: 35px;
border-radius: 4px;
border: solid 1px #c8ced3;
background-color: #ffffff;
font-size: 13px;
font-weight: 400;
letter-spacing: 0.3px;
color: #73818f;
}
.filterfrm input{
  height: 35px;
border-radius: 4px;
border: solid 1px #c8ced3;
background-color: #ffffff;
font-size: 13px;
font-weight: 400;
letter-spacing: 0.3px;
color: #73818f;
}
.btnsave{
  width: 114px;
height: 40px;
border-radius: 4px;
border: solid 1px #083ac8;
background-color: #083ac8;
font-size: 13px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 37px;
letter-spacing: 0.5px;
text-align: center;
color: #ffffff !important;
text-decoration: none;
}
.btnsave:hover{
  text-decoration: none;
  opacity: .9;
}
a.clear{
  font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
color: #4a90e2;
}
.framelabel{
position: absolute;
top: 0;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
}
.framelabel span{
  font-size: 14px;
font-weight: normal;
line-height: 1.57;
letter-spacing: normal;
color: #3f51b5;
}

.timerange .slider {
-webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(46, 91, 255, 0.15);
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  margin-top: 25px;
}
.timerange .slider::before{
content: '';
position: absolute;
height: 31px;
width: 1px;
left: 50%;
background-color:#e0e7ff;
bottom: -6px;
}
.timerange .slider:hover {
opacity: 1;
}

.timerange .slider::-webkit-slider-thumb {
-webkit-appearance: none;
appearance: none;
width: 16px;
height: 16px;
border: solid 4px #2e5bff;
background-color: #ffffff;
border-radius: 100%;
cursor: pointer;
position: relative;
z-index: 5;
}

.MuiSlider-root {
  margin-top : 5%;
}

.MuiSlider-thumb {
  top : 22px;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 11px solid #3f51b5;
  background : transparent;
  border-radius : 0;
}

.timerange .slider::-moz-range-thumb {
width: 16px;
height: 16px;
border: solid 4px #2e5bff;
background-color: #ffffff;
border-radius: 100%;
cursor: pointer;
position: relative;
z-index: 5;
}
button:focus, textarea:focus, input:focus, select:focus{
  outline: none!important;
  box-shadow:none !important;
}
.addicn{
color: #000;
font-size: 16px;
}

@media (min-width: 1600px) {
.filter-col .filterblock{
  min-width: 45%;
}
}
.add-new-btn span{
  font-size: 14px;
   font-weight: normal;
   letter-spacing: normal;
   color: #083AC8;
  text-decoration: none;
  }
  .add-new-btn i{
      width: 24px;
      height: 24px;
      border: solid 1px #D2D3D4;
      background-color: #fff;
      color: #000;
      border-radius: 100%;
      text-align: center;
      line-height: 22px;
  }
.mtrics-h{
  height: 50px;
  overflow: hidden;
}
.mtrics-h .txt-w{
display: inline-block;
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kpi-setting-sec .heading {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0.02px;
    color: #131313;
    margin: 30px 0;
  }

  .widthcont-add-tab-bg{
    width:280px;
  }
  .Labelname-kpiset {
    font-size: 18px;
    margin-bottom: 5px;
}
.wi200px{
  width:20px !important;
}
  .kpi-setting-sec .price-container .price-box {
    width: 279px;
    // height: 445px;
    height: 475px;
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1);
    background-color: #fff;
    overflow: hidden;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  
  .kpi-setting-sec .price-container .price-box .dropdown .dropdown-menu {
    margin-left: -45px;
    transform: translate3d(110px, 11px, 0px);
    min-width: 0;
    border-radius: 0;
    padding-bottom: 0;
    padding-top: 11px;
  }
  
  .kpi-setting-sec .price-container .price-box .dropdown-toggle::after {
    display: none;
  }
  
  .kpi-setting-sec .price-container .price-box .dropdown-item {
    padding: 5px 10px;
    display: block;
    margin-bottom: 5px;
  }
  
  .kpi-setting-sec .add-tab .add-tab-bg {
    width: 279px;
    height: 167px;
    border-radius: 5px;
    border: solid 1px #4a90e2;
    background-color: rgba(74, 144, 226, 0.09);
    position: relative;
    cursor: pointer;
  
  }
  .kpi-setting-sec .add-tab .add-tab-bg a{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:1;
  }
  .kpi-setting-sec .add-tab .add-tab-bg .lever-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-top: -37px;
    margin-left: -38px;
  }
  
  .kpi-setting-sec .add-tab .add-tab-bg .lever-icon i {
    color: #083ac8;
    font-size: 40px;
  }
  
  .kpi-setting-sec .add-tab .add-tab-bg .lever-icon span {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #4a90e2;
  }
  
  .kpi-setting-sec .price-container .price-box .top-bg {
    height: 130px;
    padding: 22px;
    overflow: hidden;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content {
    padding: 22px;
  }
  
  .kpi-setting-sec .price-container .price-box .bg-warning {
    background-color: #ffdf83 !important;
  }
  
  .kpi-setting-sec .price-container .price-box .bg-danger {
    background-color: #fbb5b5 !important;
  }
  
  .kpi-setting-sec .price-container .price-box .bg-info {
    background-color: #b2e1ef !important;
  }
  
  .kpi-setting-sec .price-container .price-box .top-bg p {
    font-size: 14px;
    font-weight: 400;
    line-height: 0.71;
    letter-spacing: normal;
    color: #747474;
  }
  
  .kpi-setting-sec .price-container .price-box .top-bg h3 {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.33;
    letter-spacing: normal;
    color: #000000;
  }
  
  .kpi-setting-sec .price-container .price-box .top-bg a {
    color: #000;
    margin-top: -10px;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content p {
    color: #000;
    font-size: 14px;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content p.txt-gray {
    color: #979da2;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content .kpi-price {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: normal;
    color: #000000;
    line-height: 40px;
    margin-top: 10px;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content .badge {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2px;
    color: #434343;
    text-align: center;
    padding: 7px 20px;
    margin-top: 20px;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content .badge-warning {
    background-color: #ffebb2;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content .badge-danger {
    background-color: #fbb5b5;
  }
  
  .kpi-setting-sec .price-container .price-box .bottom-content .badge-info {
    background-color: #b2e1ef;
  }
  
  
  @media (max-width: 480px) {
    .price-container {
      width: 100%;
      text-align: center;
    }
  
    .kpi-setting-sec .price-container .price-box {
      margin-right: 0;
      margin-bottom: 15px;
    }
  
    .add-tab-bg {
      display: inline-block;
    }
  }
`;

export const KpiCreateWrapper = styled.div`
    .new-kpi-col {
    margin-left: 20%;
  }
  
  .new-kpi-col .bg-white {
    border-radius: 6px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 30, 0.1), 0 4px 8px 0 rgba(0, 0, 30, 0.1), 0 0 2px 0 rgba(0, 0, 30, 0.1);
    padding: 36px;
  }
  
  .new-kpi-col .add-tab-bg {
    height: 167px;
    border-radius: 5px;
    border: solid 1px #4a90e2;
    background-color: rgba(74, 144, 226, 0.09);
    position: relative;
    cursor: pointer;
  }
  
  .new-kpi-col .add-tab-bg .lever-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-top: -34px;
    margin-left: -51px;
  }
  
  .new-kpi-col .add-tab-bg .lever-icon i {
    color: #083ac8;
    font-size: 40px;
  }
  
  .new-kpi-col .add-tab-bg .lever-icon span {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #4a90e2;
  }
  
  .new-kpi-col .bg-white .form-group label {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #2f353a;
  }
  
  .new-kpi-col .bg-white .form-group .form-control {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0.5px;
    color: #73818f;
    height: 38px;
    border-radius: 4px;
    border: solid 1px #c8ced3;
  }

  .react-datepicker__input-container,
  .w-90 {
    width: 90%;
  }
  
  .new-kpi-col .kpi-heading {
    margin: 20px 0;
  }
  
  .new-kpi-col .kpi-heading h2 {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.01px;
    color: #708393;
    margin-top: 8px;
  }
  
  .new-kpi-col .kpi-heading .kpi-btn a {
    font-size: 14px;
    font-weight: 400;
    color: #4a90e2;
    margin-right: 20px;
  }

  .btn-primary {
    border: solid 1px #083ac8;
    background-color: #083ac8;
  }
  
  .new-kpi-col .kpi-heading .kpi-btn .btn {
    width: 140px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
  }
  
  .new-kpi-col .kpi-heading .kpi-btn .btn:hover {
    border: solid 1px #333;
    background-color: #333;
  }
  
  
  /* Start control Lever Section */
  
  .new-kpi-col .bg-white .control-lever .badge {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2px;
    color: #434343;
    text-align: center;
    padding: 7px 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .new-kpi-col .bg-white .control-lever .badge-warning {
    background-color: #ffebb2;
  }
  
  .new-kpi-col .bg-white .control-lever .badge-info {
    background-color: #e7f6fa;
  }
  
  .new-kpi-col .bg-white .form-group .delete-field {
    position: relative;
    margin-bottom: 10px;
  }
  
  .new-kpi-col .bg-white .form-group .delete-field .btn i {
    opacity: 0.5;
    color: #00001e;
  }
  
  .new-kpi-col .bg-white .form-group .delete-field .btn {
    position: absolute;
    right: -42px;
    top: 0;
    outline: none;
  }
  
  @media (max-width: 767px) {
    .new-kpi-col {
      margin-left: 0;
    }
  
    .new-kpi-col .bg-white .control-lever {
      width: 80%;
    }
  }
`;

export const KpiDetailWrapper = styled.div`
.kpi-detail-sec .detail-left .kpi-heading {
    margin: 30px 0;
  }
  
  .kpi-detail-sec .detail-left h2.heading {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.01px;
    color: #708393;
    margin-top: 8px;
  }
  
  .kpi-detail-sec .detail-left {
    width: 340px;
    padding-left: 15px;
  }
  
  .kpi-detail-sec .price-container .price-box {
    width: 279px;
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1);
    background-color: #fff;
    overflow: hidden;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 15px;
  
  }
  .kpi-detail-sec .price-container .price-box .form-control {
    height: 35px;
    font-size: 13px;
    margin-bottom: 10px;
  }
  .kpi-detail-sec .price-container {
    position: relative;
  }
  .wi200px{
    width:200px !important;
  }
  .kpi-detail-sec .price-container::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    height: 2px;
    background-color: #22232447;
    width: 49px;
  }
  
  .kpi-detail-sec .price-container .price-box .dropdown .dropdown-menu {
    margin-left: -45px;
    transform: translate3d(110px, 11px, 0px);
    min-width: 0;
    border-radius: 0;
    padding-bottom: 0;
    padding-top: 11px;
  }
  
  .kpi-detail-sec .price-container .price-box .dropdown-toggle::after {
    display: none;
  }
  
  .kpi-detail-sec .price-container .price-box .dropdown-item {
    padding: 5px 10px;
    display: block;
    margin-bottom: 5px;
  }

  .btn-primary {
    border: solid 1px #083ac8;
    background-color: #083ac8;
  }

  .rollUp.btn-primary {
    padding: .300rem .75rem;
  }
  
  .kpi-detail-sec .add-tab .add-tab-bg {
    width: 279px;
    height: 167px;
    border-radius: 5px;
    border: solid 1px #4a90e2;
    background-color: rgba(74, 144, 226, 0.09);
    position: relative;
    cursor: pointer;
  
  }
  
  .kpi-detail-sec .add-tab .add-tab-bg .lever-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-top: -34px;
    margin-left: -51px;
  }
  
  .kpi-detail-sec .add-tab .add-tab-bg .lever-icon i {
    color: #083ac8;
    font-size: 40px;
  }
  
  .kpi-detail-sec .add-tab .add-tab-bg .lever-icon span {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #4a90e2;
  }
  
  .kpi-detail-sec .price-container .price-box .top-bg {
    height: 130px;
    padding: 22px;
    overflow: hidden;
  }
  
  .kpi-detail-sec .price-container .price-box .bottom-content {
    padding: 22px;
  }
  
  .kpi-detail-sec .price-container .price-box .bg-warning {
    background-color: #ffdf83 !important;
  }
  
  .kpi-detail-sec .price-container .price-box .bg-danger {
    background-color: #fbb5b5 !important;
  }
  
  .kpi-detail-sec .price-container .price-box .bg-info {
    background-color: #b2e1ef !important;
  }
  
  .kpi-detail-sec .price-container .price-box .top-bg p {
    font-size: 14px;
    font-weight: 400;
    line-height: 0.71;
    letter-spacing: normal;
    color: #747474;
  }
  
  .kpi-detail-sec .price-container .price-box .top-bg h3 {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.33;
    letter-spacing: normal;
    color: #000000;
  }
  
  .kpi-detail-sec .price-container .price-box .top-bg a {
    color: #000;
    margin-top: -10px;
    font-size: 13px;
  }
  .kpi-detail-sec .price-container .price-box .btn-primary {
    color: #fff;
    background-color: #083ac8;
    border-color: #083ac8;
    font-size: 14px;
    font-weight: 600;
}
  .kpi-detail-sec .price-container .price-box .bottom-content p {
    color: #000;
    font-size: 14px;
  }
  
  .kpi-detail-sec .price-container .price-box .bottom-content p.txt-gray {
    color: #979da2;
  }
  
  .kpi-detail-sec .price-container .price-box .bottom-content .kpi-price {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: normal;
    color: #000000;
    line-height: 40px;
    margin-top: 10px;
  }
  
  .kpi-detail-sec .price-container .price-box .bottom-content .badge {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2px;
    color: #434343;
    text-align: center;
    padding: 7px 20px;
    margin-top: 20px;
  }
  
  .kpi-detail-sec .price-container .price-box .bottom-content .badge-warning {
    background-color: #ffebb2;
  }
  
  .kpi-detail-sec .price-container .price-box .bottom-content .badge-danger {
    background-color: #fbb5b5;
  }
  
  .kpi-detail-sec .price-container .price-box .bottom-content .badge-info {
    background-color: #b2e1ef;
  }
  
  
  .new-kpidetail-col {
    margin-left: 60px;
    position: relative;
    width: 57%;
    padding-right: 15px;
  }
  
  .new-kpidetail-col::after {
    content: '';
    position: absolute;
    left: -56px;
    top: 201px;
    height: 75%;
    bottom: 200px;
    background-color: #2223243b;
    width: 0px;
  }
  
  .new-kpidetail-col::before {
    content: '';
    position: absolute;
    left: -55px;
    bottom: 67px;
    height: 2px;
    background-color: #2223243b;
    width: 100px;
    display: none;
  }
  
  .new-kpidetail-col .bg-white.newkpi-form::after {
    content: '';
    position: absolute;
    left: -56px;
    top: 126px;
    margin-top: 0;
    height: 106%;
    background-color: #22232447;
    width: 2px;
  }
  .new-kpidetail-col .bg-white.newkpi-form:last-child::after {
    content: '';
    position: absolute;
    left: -56px;
    top: 126px;
    margin-top: 0;
    height: 0;
    background-color: #22232447;
    width: 2px;
  }
  .new-kpidetail-col .bg-white.newkpi-form:last-child::after{
     display: none;
  }
  .new-kpidetail-col .bg-white {
    border-radius: 6px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 30, 0.1), 0 4px 8px 0 rgba(0, 0, 30, 0.1), 0 0 2px 0 rgba(0, 0, 30, 0.1);
    padding: 36px;
  }
  
  .new-kpidetail-col .bg-white.newkpi-form {
    position: relative;
  }
  
  
  
  .new-kpidetail-col .bg-white.newkpi-form::before {
    content: '';
    position: absolute;
    left: -56px;
    top: 124px;
    height: 2px;
    background-color: #22232447;
    width: 56px;
  }
  
  
  .new-kpidetail-col .bg-white.newkpi-form .summary .collapse:not(.show) {
    height: 40px !important;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .new-kpidetail-col .bg-white.newkpi-form .summary .collapse.collapsing {
    min-height: 40px !important;
  }
  
  .new-kpidetail-col .bg-white.newkpi-form .summary .readbtn.collapsed:after {
    content: 'Read More';
  }

  .new-kpidetail-col .bg-white .actionBtns .btn-primary {
    font-size: 13px;
    line-height: normal;
    -webkit-letter-spacing: normal;
    -moz-letter-spacing: normal;
    -ms-letter-spacing: normal;
    letter-spacing: normal;
    font-family: Montserrat;
    width: 78px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    border: none;
  }

  .input-group-text {
    padding: .500rem .75rem;
  }

  .new-kpidetail-col .bg-white .actionBtns {
    display: none;
  }
  
  .new-kpidetail-col .bg-white.newkpi-form .summary .readbtn:not(.collapsed):after {
    content: 'Read Less';
  }
  
  .bottom-btn-tab .add-tab-bg {
    height: 167px;
    border-radius: 5px;
    border: solid 1px #4a90e2;
    background-color: rgba(74, 144, 226, 0.09);
    position: relative;
    cursor: pointer;
  }
  
  .bottom-btn-tab .add-tab-bg .lever-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-top: -34px;
    margin-left: -51px;
  }
  
  .bottom-btn-tab .add-tab-bg .lever-icon i {
    color: #083ac8;
    font-size: 40px;
  }
  
  .bottom-btn-tab .add-tab-bg .lever-icon span {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #4a90e2;
  }
  
  /* .bottom-btn-tab .new-kpidetail-col{
    margin-left: 36%;
  } */
  .bottom-btn-tab .new-kpidetail-col::after,
  .bottom-btn-tab .new-kpidetail-col::before {
    display: none;
  }
  
  .bottom-btn-tab .detail-left {
    width: 340px;
    padding-left: 15px;
  }
  
  .new-kpidetail-col .bg-white .form-group label {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #2f353a;
  }
  
  .new-kpidetail-col .bg-white .form-group .form-control {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0.5px;
    color: #73818f;
    height: 34px;
    border-radius: 4px;
    border: solid 1px #c8ced3;
  }
  
  .new-kpidetail-col .kpi-heading {
    margin: 20px 0;
  }
  
  .new-kpidetail-col .kpi-heading h2 {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.01px;
    color: #708393;
    margin-top: 8px;
  }
  
  .new-kpidetail-col .kpi-heading .kpi-btn a,
  .new-kpidetail-col .kpi-btn a {
    font-size: 14px;
    font-weight: 400;
    color: #4a90e2;
    margin-right: 20px;
  }
  
  .new-kpidetail-col .kpi-heading .kpi-btn .btn,
  .new-kpidetail-col .kpi-btn .btn {
    width: 110px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
  }
  
  .new-kpidetail-col .kpi-heading .kpi-btn .btn:hover,
  .new-kpidetail-col .kpi-btn .btn:hover {
    border: solid 1px #333;
    background-color: #333;
  }
  
  
  /* Start control Lever Section */
  .new-kpidetail-col .bg-white .control-lever {
    width: 60%;
  }
  
  .new-kpidetail-col .bg-white .control-lever .badge {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.2px;
    color: #434343;
    text-align: center;
    padding: 7px 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .new-kpidetail-col .bg-white .control-lever .badge-warning {
    background-color: #ffebb2;
  }
  
  .new-kpidetail-col .bg-white .control-lever .badge-info {
    background-color: #e7f6fa;
  }
  
  .new-kpidetail-col .bg-white .form-group .delete-field {
    position: relative;
    margin-bottom: 10px;
  }
  
  .new-kpidetail-col .bg-white .form-group .delete-field .btn i {
    opacity: 0.5;
    color: #00001e;
  }
  
  .new-kpidetail-col .bg-white .form-group .delete-field .btn {
    position: absolute;
    right: -42px;
    top: 0;
    outline: none;
  }
  
  .new-kpidetail-col .bg-white .dropdown i {
    color: #000;
  }
  
  .new-kpidetail-col .bg-white .dropdown {
    margin-top: -10px;
    margin-right: -10px;
  
  }
  
  .new-kpidetail-col .bg-white .dropdown .dropdown-menu {
    margin-left: -45px;
    transform: translate3d(110px, 11px, 0px);
    min-width: 0;
    border-radius: 0;
    padding: 0;
  }
  
  .new-kpidetail-col .bg-white .dropdown-toggle::after {
    display: none;
  }
  
  .new-kpidetail-col .bg-white .dropdown-item {
    padding: 3px 10px;
  }
  
  .bg-white.newkpi-form .control-lever.default-view {
    width: 100%;
  }
  
  .bg-white.newkpi-form .control-lever.default-view .badge {
    margin-top: 10px;
  }
  
  .bg-white.newkpi-form .control-lever.default-view .form-group h3 {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.33;
    letter-spacing: normal;
    color: #000000;
  }
  
  .bg-white.newkpi-form .control-lever.default-view .form-group label {
    font-size: 14px;
    font-weight: normal;
    line-height: 0.71;
    letter-spacing: normal;
    color: #747474;
  }
  
  .bg-bottom {
    background-color: #c6c8ca;
    padding: 20px 0;
  }
  
  .bg-bottom .btn {
    height: 40px;
    width: 230px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
  }

  .inibitorText,
  .capabilityText {
    display: none;
  }

  @media (max-width: 1170px) {
    .new-kpidetail-col {
      width: 50%;
    }
  }
  
  @media (max-width: 1040px) {
    .kpi-detail-sec .detail-left {
      width: 100%;
    }
  
    .kpi-detail-sec .price-container::after,
    .new-kpidetail-col .bg-white.newkpi-form::before {
      display: none;
    }
  
    .new-kpidetail-col {
      margin-left: 15px;
      width: 100%;
      padding-right: 15px;
    }
  }
  
  @media (max-width: 767px) {
  
    .new-kpidetail-col .bg-white .control-lever {
      width: 95%;
    }
  
    .new-kpidetail-col .add-tab-bg {
      width: 100%;
    }
  }
  
  
  @media (max-width: 480px) {
    .price-container {
      width: 100%;
      text-align: center;
    }
  
    .kpi-detail-sec .price-container .price-box {
      margin-right: 0;
      margin-bottom: 15px;
      display: block;
      margin-left: 15px;
      text-align: left;
    }
  
    .add-tab-bg {
      display: inline-block;
    }
  
    .kpi-detail-sec .detail-left {
      padding-left: 0px;
    }
  
    .bg-white.newkpi-form .control-lever.default-view .form-group h3 {
      font-size: 15px;
      font-weight: 500;
    }
  
    .kpi-detail-sec .detail-left .kpi-heading {
      padding-left: 15px;
    }
  
  }
`;