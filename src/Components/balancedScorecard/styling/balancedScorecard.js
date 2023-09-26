import styled from 'styled-components';

export const BalancedScorecardWrapper = styled.div`
#wrapper #content-wrapper {
    overflow: hidden;
}
.modal-body {
    height : 100px,
    overflow-y : scroll
}
#categories .domain-list li::before{
    display: none
}
.date-col .btn-primary {
    width: 107px;
    height: 40px;
    border-radius: 5px;
    background-color: #083AC8;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04px;
    color: #fff;
    text-transform: uppercase;
    line-height: 27px;
    border: none;
}
.sm-oval{
    height: 30px;
    width: 40px;
    display: inline-block;
    border-radius: 100%;
}
.sm-oval.bg-yellow{
    background-color: #FDEBB1;
}
.sm-oval.bg-blue{
    background-color:#c6e2f5;
}
.sm-oval.bg-green{
    background-color: #CDE4B2;
}
.sm-oval.bg-orange{
    background-color: #F8DCAF;
}
.sm-oval.active{
    border:1px #000 solid;
}
.card_details_kpi{
    width: 100%;
    height: 240px;
    overflow: auto;
    display: flex;
}
.card_details_col{
    flex: 0 0 330px;
}
#benchmarking1 .domain-list li::before {
    position: absolute;
    left: -16px;
    top: -20px;
    width: 13px;
    height: 100%;
}
.kpi-drop-area, .details-row .balanced-col-wraper .objectives-tbl td:nth-child(3) {
    width: 200px !important;
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
    padding-left: 70px;
    padding-right: 25px;
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
.oval-shape {
    position : absolute;
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

.balanced-version .btn-download {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.3px;
    color: #083ac8;
    text-decoration: none;
}

.balanced-version .btn-download i {
    color: #000;
}

.balanced-version h2 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.02px;
    color: #000000;
}

.balanced-version .pager-list a {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    color: #083ac8;
    text-decoration: none;
}

.balanced-version .pager-list .btn-back {
    width: 107px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04px;
    color: #fff;
    text-transform: uppercase;
    line-height: 27px;
}

.balanced-details-row {
    border-radius: 6px;
    padding: 20px 30px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

.balanced-details-row h1.head-title,
.balanced-details-row .head-title {
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #131313;
}

.balanced-details-row .balanced-col-wraper .row {
    margin: 0;
}

.balanced-details-row .balanced-col-wraper h2 {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.34px;
    color: #2f353a;
    margin: 0;
}

.balanced-details-row .balanced-col-wraper p {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.3px;
    text-align: center;
    color: #2f353a;
    margin: 0;
}

.balanced-details-row .balanced-col-wraper p span {
    border-right: 1px solid #dee2e6;
    width: 30%;
}

.balanced-details-row .balanced-col-wraper p span:last-child {
    border-right: 0px solid #dee2e6
}

.balanced-details-row .balanced-col-wraper .bg-yellow {
    background-color: #ffe687;
}

.balanced-details-row .balanced-col-wraper .bg-green {
    background-color: #b2cc83;
}

.balanced-details-row .balanced-col-wraper .bg-orange {
    background-color: #ffae7a;
}

.balanced-details-row .balanced-col-wraper .bg-lightblue {
    background-color: #a8e4f6
}

.balanced-details-row .balanced-col-wraper .bg-gray {
    background-color: #f4f4f4;
}

.balanced-details-row .balanced-col-wraper .objectives-tbl thead th {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.39px;
    color: #fff;
}

.balanced-details-row .balanced-col-wraper .table-striped tbody tr:nth-of-type(odd) {
    background-color: #fff
}

.balanced-details-row .balanced-col-wraper .table-striped tbody tr:nth-of-type(even) {
    background-color: #f4f4f4;
}

.balanced-details-row .balanced-col-wraper .objectives-tbl td {
    padding: 10px .75rem;
    position: relative;
}
.balanced-details-row .balanced-col-wraper p span i{
    pointer-events: none;
    border: 1px #ccc solid;
    background-color: #fff;
    height: 25px;
    width: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 100%;
    margin-left: 5px;
}

#benchmarkingaccord .domain-list li::before {
    position: absolute;
    left: -16px;
    top: -20px;
    width: 13px;
    height: 100%;
}
.kpi-drop-area, .balanced-details-row .balanced-col-wraper .objectives-tbl {
    width: 1140px !important;
    min-width: 100%;
}
.balanced-details-row .balanced-col-wraper .objectives-tbl td p {
    font-size: 14px;
    font-weight: 600;
    -webkit-letter-spacing: 0.3px;
    -moz-letter-spacing: 0.3px;
    -ms-letter-spacing: 0.3px;
    letter-spacing: 0.3px;
    color: #2F353A;
    text-align: left;
    margin-bottom: 15px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-word;
    min-height: 65px;
}
.balanced-details-row .balanced-col-wraper .objectives-tbl td .oval-shape p {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0;
    white-space: nowrap;
    justify-content:center;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
}
.oval-shape p {
    background-color: transparent;
    border-radius: 100%;
    height: 81px!important;
    width: 137px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    }
.hid{
    display:none;
}
.kpi-drop-area, .balanced-details-row .balanced-col-wraper .objectives-tbl td:nth-child(3){
    width: 200px !important;
}
.balanced-details-row .balanced-col-wraper .objectives-tbl td i{
    color: #EA0909;
    font-size: 16px;
    float: right;
    cursor: pointer;
}
.balanced-version h2{
    width: 256px;
}
#strategicPriorities{
    top: 15px;
    position: absolute;
    right: -36px;
    font-size: 17px;
}
.balanced-details-row .balanced-col-wraper p{
    position: relative;
}
.balanced-details-row .balanced-col-wraper .objectives-tbl td h3 {
    font-size: 18px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #000000;
}

.balanced-details-row .balanced-col-wraper .objectives-tbl td .oval-shape-row {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0;
    width: 100%;
    height: 110px;
}

.balanced-details-row .balanced-col-wraper .objectives-tbl td .oval-shape-row .oval-shape {
    width: 150px;
    height: 91px;
    border: solid 1px #979797;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.01px;
    text-align: center;
    color: #000000;
    line-height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 30px;
    margin: 0 10px;
    position: absolute;
    top: 0;
    left: 0;
}

.oval-shape.bg-yellow {
    background-color: #ffe687;
}

.oval-shape.bg-green {
    background-color: #b2cc83;
}

.oval-shape.bg-blue {
    background-color: #a8e4f6;
    margin-left: -7px !important;
}

.oval-shape.bg-blue:first-child {
    margin-left: 0 !important;
}

.oval-shape.bg-orange {
    background-color: #ffae7a;
}

.oval-shape.mt-minus {
    margin-top: -40px !important;
}

.oval-shape.mt-50 {
    margin-top: -50px !important;
}

@media (max-width: 992px) {
    .balanced-details-row .balanced-col-wraper p span {
        border-right: 0px solid #dee2e6;
        width: 100%;
        padding: 5px 0;
        display: block;
    }
}


/* @media (max-width: 767px) {
    .balanced-details-row .balanced-col-wraper p span {
        border-right: 0px solid #dee2e6;
        width: 100%;
    }
}

@media (max-width: 575px) {
    .dt-screen-main .dt-content-wrapper {
        padding-left: 0px;
    }
} */
body{
    font-family: 'Roboto', sans-serif;
  }
  #wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 55px;
  }
  span .btn-back {
    width: 207px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: 400;
    -webkit-letter-spacing: 0.04px;
    -moz-letter-spacing: 0.04px;
    -ms-letter-spacing: 0.04px;
    letter-spacing: 0.04px;
    color: #fff;
    text-transform: uppercase;
    line-height: 27px;
  }
  #wrapper #content-wrapper #content {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    font-size: 14px
  }
  #wrapper #content-wrapper {
    background-color: #e4e5e6;
    width: 100%;
  }
  .breadcrumb.dashbread{
   background-color: #fff;
   padding: 10px 1em 10px 1rem;
  }
  .breadcrumb.dashbread .powered{
    color: #708393;
    font-size:12px;
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
    .add-new-btn {
        margin-right: 36px;
    }
  .breadcrumb.dashbread .breadcrumb-item {
    padding-top: 7px;
  }
  
  .logo-img {
    width: 37px;
  }
  .ep {
    position: absolute;
    bottom: 0px;
    right: 0px;
    text-align: center;
    width: 100%;
    height: 88%;
    top: 0;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    -webkit-transition: -webkit-box-shadow 0.25s ease-in;
    -moz-transition: -moz-box-shadow 0.25s ease-in;
    -webkit-transition: box-shadow 0.25s ease-in;
    transition: box-shadow 0.25s ease-in;
}
.ovalDelete {
    position: absolute;
    top: -3px;
    right: -7px;
}

  @font-face {
    font-family: 'CoreUI-Icons-Linear-Free';
    src: url("../fonts/CoreUI-Icons-Linear-Free.eot?64h6xh");
    src: url("../fonts/CoreUI-Icons-Linear-Free.eot?64h6xh#iefix") format("embedded-opentype"), url("../fonts/CoreUI-Icons-Linear-Free.ttf?64h6xh") format("truetype"), url("../fonts/CoreUI-Icons-Linear-Free.woff?64h6xh") format("woff"), url("../fonts/CoreUI-Icons-Linear-Free.svg?64h6xh#CoreUI-Icons-Linear") format("svg");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'SF UI Display Ultralight';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Ultralight'), url('../fonts/sf-ui-display-ultralight-58646b19bf205.woff') format('woff');
    }
    
    
    @font-face {
    font-family: 'SF UI Display Thin';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Thin'), url('../fonts/sf-ui-display-thin-58646e9b26e8b.woff') format('woff');
    }
    
    
    @font-face {
    font-family: 'SF UI Display Light';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Light'), url('../fonts/sf-ui-display-light-58646b33e0551.woff') format('woff');
    }
    
    
    @font-face {
    font-family: 'SF UI Display Medium';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Medium'), url('../fonts/sf-ui-display-medium-58646be638f96.woff') format('woff');
    }
    
    
    @font-face {
    font-family: 'SF UI Display Semibold';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Semibold'), url('../fonts/sf-ui-display-semibold-58646eddcae92.woff') format('woff');
    }
    
    
    @font-face {
    font-family: 'SF UI Display Bold';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Bold'), url('../fonts/sf-ui-display-bold-58646a511e3d9.woff') format('woff');
    }
    
    
    @font-face {
    font-family: 'SF UI Display Heavy';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Heavy'), url('../fonts/sf-ui-display-heavy-586470160b9e5.woff') format('woff');
    }
    
    
    @font-face {
    font-family: 'SF UI Display Black';
    font-style: normal;
    font-weight: normal;
    src: local('SF UI Display Black'), url('../fonts/sf-ui-display-black-58646a6b80d5a.woff') format('woff');
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
        width:55px;
        position:fixed;
        z-index:99;
    
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
    .active-left-panel {
        background-color:#ffffffc2 !important;
    }
    .active-left-panel .card {
        background-color:transparent !important;
    }
    #categoriesaccord, #benchmarkingaccord{
        height:400px;
        overflow:auto;
        padding: 20px 10px;
    }
    .dt-left-nav-bar .active-left-panel {
        width: 267px;
        border: 1px #ccc solid;
        position: absolute;
        left: 55px;
        background-color: #fff;
        z-index: 2;
    }
    .dt-left-nav-bar .active-left-panel .searchKpi {
        margin: 0 0 0 33px;
    }
    .kpi-drop-area, .balanced-details-row .balanced-col-wraper .objectives-tbl td:nth-child(3), .balanced-details-row .balanced-col-wraper .objectives-tbl td:nth-child(4) {
        width: 190px !important;
    }
    .dt-left-nav-bar .active-left-panel .close {
        float: right;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: 1;
        z-index: 1;
        position: absolute;
        right: 8px;
        top: 0;
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
        width: 199px;
        padding-left: 31px;
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
        position: absolute;
    left: 20px;
    top: 0;
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
  
  
`;