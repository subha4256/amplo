import styled from 'styled-components';

export const DesignThinkingEpicDetailScreenWrapper = styled.div`
body{
    font-family: 'Roboto', sans-serif;
  }
  #wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 55px;
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
    overflow-x: hidden;
  }
  .breadcrumb.dashbread{
   background-color: #fff;
   padding: 10px 1em 10px 1rem;
  }
  .breadcrumb.dashbread .powered{
    color: #708393;
    font-size:12px;
  }
  .breadcrumb.dashbread .breadcrumb-item {
    padding-top: 7px;
  }
  
  .logo-img {
    width: 32px;
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
        padding: 8px 0 0 9px;
        margin-bottom: 0;
    }
    
    .active-left-panel .benchmarking-list .card .domain-list li {
        position: relative;
        
        display: flex;
        align-items: center;
    }
    
    .active-left-panel .benchmarking-list .card .domain-list li::before {
        position: absolute;
        left: -27px;
        top: -27px;
        border-left-color: #c8ced2;
        border-left-style: solid;
        border-left-width: 1px;
        border-bottom-color: #c8ced2;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        content: "";
        width: 23px;
        height: 100%;
    }
    .active-left-panel .benchmarking-list .card .domain-list li[draggable="true"]{
 margin-bottom:3px;
 padding-left: 20px;
    }
    .active-left-panel .benchmarking-list .card .domain-list li[draggable="true"]::before{
        left: -27px;
    top: -15px;
    width: 24px;
    height: 120%;
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
    .active-left-panel .custom-control-label::before {
        position: absolute;
        top: 1px;
        border-radius: 3px !important;
        background: #fff!important;
    z-index: 1!important;
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
    .dt-right-panel .accordion .card-header:after {
        width: 17px;
        text-align: center;
        float: right;
        vertical-align: 0;
        padding-right: 14px;
        padding-top: 4px;
        border: 0;
        font-weight: 900;
        color: #9e9b9b;
        font-size: 12px;
        content: '\f068';
        font-family: 'Font Awesome 5 Free';
    }
    .dt-right-panel .accordion .card-header.collapsed:after {
        content: '\f067';
    }
    .dt-right-panel {
        width: 263px;
        flex: none;
        display: block;
        border-left: 1px #ccc solid;
        height: 100%;
        /*display: flex;
        -ms-flex-direction: column;
        flex-direction: column;*/
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }
    
    .dt-right-panel .card .card-title {
        font-size: 14px;
        font-weight: 700;
        color: #000000;
    }
    
    .dt-right-panel .accordion>.card .card-header {
        height: 40px;
        border: solid 1px #e4e8f0;
    }
    
    .dt-right-panel .card .media img {
        height: 40px;
        width: 40px;
        object-fit: cover;
        object-position: 50% top;
        border-radius: 100%;
        overflow: hidden;
    }
    
    .dt-right-panel .card .media .media-body h5 {
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: normal;
        color: #333333;
        margin: 0;
    }
    
    .dt-right-panel .card .media .media-body p {
        font-size: 12px;
        font-weight: normal;
        line-height: 1.67;
        letter-spacing: normal;
        color: #333333;
        margin: 0;
    }
    
    .dt-right-panel .card .card-body.collapse {
        padding: 10px 0;
    }
    .dt-right-panel .card .card-body.collapse .media{
        padding: 10px;
    }
    .dt-right-panel .card .card-header {
        padding: 10px;
    }
    #associated .card-body{
        padding: 10px 0;
    }
    .dt-right-panel .card .link-txt p {
        font-size: 12px;
        font-weight: normal;
        letter-spacing: normal;
        color: #000;
        margin: 0 0 10px 0;
    
    }
    
    .dt-right-panel .card .link-txt p a {
        font-size: 12px;
        font-weight: normal;
        letter-spacing: normal;
        color: #0038d0;
    }
    
    #nois p {
        font-size: 12px;
        font-weight: normal;
        letter-spacing: normal;
        color: #333333;
    }
    
    #nois .btn-outline-primary {
        color: #083ac8;
        background-color: #fff;
        border-color: #083ac8;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 700;
        height: 40px;
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
    
    .dt-right-panel #associated .card .media .media-body h5 {
        font-size: 15px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: normal;
        color: #333333;
        margin: 0;
    }
    
    .dt-right-panel #associated .card .media .media-body p {
        font-size: 15px;
        font-weight: normal;
        letter-spacing: normal;
        color: #8798ad;
        margin: 0;
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
    .epic-version .custom-select{
        width: 100px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.17);
        background-color: #fff;
        font-size: 13px;
        margin-left: 10px;
    }
    .epic-version .btn-next{
        width: 109px;
        height: 40px;
        line-height: 37px;
        border-radius: 5px;
        border: solid 1px #083ac8;
        background-color: #fff;
        display: inline-block;
        font-size: 13px;
      font-weight: bold;
      text-align: center;
      color: #083ac8;
    }
    .version-drop .dropdown-menu {
        padding: 10px 0;
        width: 354px;
    }
    
    .version-drop .btn-drop {
        width: 112px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.17);
        background-color: #fff;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
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
        padding-left: 88px;
        padding-right: 25px;
    }
    .dt-screen-main .dt-content-wrapper.right-toggle {
        padding-left: 345px !important;
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
    
    .bench-mark-table td {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: normal;
        color: #083ac8;
        vertical-align: middle;
        padding: 6px .75rem;
        height: 44px;
    }
    
    .bench-mark-table .btn {
        width: 61px;
        height: 30px;
        border-radius: 5px;
        border: none;
        font-size: 12px;
        font-weight: normal;
        color: #fff;
        text-transform: uppercase;
    }
    
    .bench-mark-table .btn-green {
        background-color: #31b479;
    }
    
    .bench-mark-table .btn-lightgreen {
        background-color: #aace7a;
    }
    
    .bench-mark-table .btn-orange {
        background-color: #ffaa70;
    }
    
    .benchmarking-col-wraper .table-responsive {
        display: block;
        max-height: 240px;
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
    }
    .subepic-details-row .bench-mark-table td{
     color: #000 !important;
    }
    .subepic-version .epic-icon {
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
        border: 1px #ccc solid;
        padding: 10px 15px;
        border-radius: 5px;
        height: 40px;
        width: 153px;
        background-color: #fff;
    }
    .subepic-version .epic-icon i {
        width: 24px;
        height: 24px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #000;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
    }
    .subepic-version .pager-list select{
        font-size: 13px;
        font-weight: normal;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
        height: 38px;
    }
    .dt-project-sec1 .warehousing-slider{
        margin: 18px 0 0 0;
    }
    .dt-project-sec1 .warehousing-slider li{
        font-size: 11px;
        letter-spacing: 0.16px;
        text-align: left;
        color: #1665d8;
        position: relative;
        margin: -3px;
        width: 100px;
    }
    .dt-project-sec1 .warehousing-slider li span{
        display: inline-block;
        margin-left: -17px;
    }
    .dt-project-sec1 .warehousing-slider li:first-child span{
        margin-left: -5px;
    }
    .dt-project-sec1 .warehousing-slider li:nth-child(3) span{
        margin-left: -8px;
    }
    .dt-project-sec1 .warehousing-slider li:before{
        content: "";
        position: absolute;
        left: 0;
        top:-14px;
        width: 100%;
        height: 2px;
        background-color: #ccc;
    }
    .dt-project-sec1 .warehousing-slider li:after{
        content: "";
        position: absolute;
        left: 0;
        top:-19px;
        width: 12px;
        height: 12px;
        border-radius: 30px;
        background-color: #cccbcd
    }
    .dt-project-sec1 .warehousing-slider li.active:after{
        background-color: #20a8d8;
    }
    .dt-project-sec1 .warehousing-slider li:last-child:before{
        display: none;
    }
    .asubEpic{
        display:block;
    }
    .dsubEpic{
        display:none;
    }
    
.noiModal .modal-title {
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #000000;
}

.noiModal .modal-footer .btn-primary {
    width: 190px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-align: center;
    color: #fff;
}

.noiModal .modal-footer .btn-link {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: normal;
    color: #083ac8;
}

.noiModal .modal-header {
    border-bottom: 0px transparent solid;
    padding: 40px 20px 20px 20px;
}

.noiModal .search-box {
    border: solid 1px rgba(46, 91, 255, 0.08);
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;

}

.noiModal .search-box h2 {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.57;
    letter-spacing: normal;
    color: #2e384d;
    margin: 0;
    padding: 10px 22px;
}

.noiModal .search-box h2 i {
    width: 24px;
    height: 24px;
    border: solid 1px #d2d3d4;
    background-color: #fff;
    border-radius: 100%;
    text-align: center;
    line-height: 24px;
    font-size: 13px;
    color: #000;
}

.noiModal .bg-gray,
#nois .bg-gray {
    background-color: #f6f7f8;
}

.noiModal .network-search-list {
    border-bottom: solid 1px rgba(46, 91, 255, 0.08);
    padding: 22px;
}

.noiModal .network-search-list.active {
    background-color: #eff3ff;
}

.noiModal .network-search-list h3 {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: normal;
    color: #2e384d;
    margin: 0;
}

.noiModal .network-search-list p {
    font-size: 14px;
    font-weight: 400;
    color: #8798ad;
    margin: 0;
}

.noiModal .modal-body {
    padding-bottom: 0;
    padding-top: 0;
}
.noiModal .modal-header .close {
    padding: 0 16px 0 0;
    margin: -19px -1rem -1rem auto;
    opacity: 1;
}
    @media (min-width: 992px) {
        .noiModal .modal-lg {
            max-width: 1045px;
        }
    }
    @media (max-width: 767px) {
        .dt-btn-sec{
            margin-top: 20px;
        }
    }
    @media (max-width: 575px) {
        .dt-project-sec1 .warehousing-slider li{
            width: 57px;
        }
        .dt-screen-main .dt-content-wrapper {
            padding-left: 0px;
        }
    }
    .dt-left-nav-bar{
        position: fixed;
        left: 0;
        z-index: 999;
    }
    .dt-screen-main .dt-content-wrapper {
        padding-left: 65px !important;
    }
    .active-left-panel .w-267 {
        width: 267px;
       
    }
  
`;