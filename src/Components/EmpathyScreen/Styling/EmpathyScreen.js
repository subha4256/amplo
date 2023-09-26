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

    .personamodal .modal-body .card {
        max-height: 180px;
    overflow-x: hidden;
    overflow-y: auto;
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
    width: 37px;
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
    top:164px;
    z-index: 99;
    }
    
    .dt-left-list {
        list-style: none;
        padding: 0;
        width: 55px;
        border: 1px #ccc solid;
        height: 100%;
    }
    .nav.nav-pills .nav-item{
        margin-right:2px;
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
        height: 54vh;
    overflow-x: hidden;
    overflow-y: scroll;
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
        padding-left: 30px;
        
        white-space: nowrap; 
        width: 100%; 
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        height: 27px;
        padding-top: 5px;
        margin-top: -7px;

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
        margin-top: 0;
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
    
    .dt-btn-sec a {
        font-size: 14px;
        font-weight: normal;
        letter-spacing: normal;
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
    .dt-screen-main .dt-content-wrapper.right-toggle{
        padding-left: 345px;
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
    
    .interviews-tabs .nav-pills {
        justify-content: flex-end;
    }
    
    .interviews-tabs .nav-pills .nav-link.active,
    .interviews-tabs .nav-pills .show>.nav-link {
        background-color: #ffe687;
    }
    
    .interviews-tabs .nav-pills .nav-link {
        width: 197px;
        height: 65px;
        background-color: #e9e9ea;
        font-size: 18px;
        line-height: 53px;
        font-weight: 700;
        letter-spacing: 0.01px;
        text-align: center;
        color: #131313;
        border-radius: 0;
        margin: 0 3px;
    }
    
    .interviews-tabs h1 {
        font-size: 18px;
        letter-spacing: 0.01px;
        color: #708393;
    }
    
    .interview-left {
        /* border: 1px #ccc solid;
        border-right: 0px transparent solid !important; */
        height: 100%;
        background-color: #f9f9f8;
    }
    
    .interview-left .interview-row {
        padding: 20px;
        border-bottom: 1px #c8ced3 solid;
    }
    
    
    /* .interview-left .interview-row:last-child {
        border-bottom: 0px #c8ced3 solid;
    } */
    
    .interview-left .interview-row:nth-of-type(odd) {
        background-color: #f9f9f8;
    }
    
    .interview-left .interview-row :nth-of-type(even) {
        background-color: #f0f8ff;
    }
    
    .interview-left .interview-row h3 {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .interview-left .interview-row.interview-info {
        padding: 10px 20px;
    }
    
    .interview-left .interview-row.interview-info.active {
        background-color: #f0f8ff
    }
    
    .interview-left .interview-row.interview-info h4 {
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        color: #2e384d;
        margin-bottom: 0px;
    }
    
    .interview-left .interview-row.interview-info p {
        font-size: 15px;
        line-height: 1.47;
        letter-spacing: normal;
        color: #8798ad;
        margin-bottom: 6px;
    }
    
    .interview-left .interview-row .epic-icon i.fa-plus,
    .interview-left .interview-row .epic-icon i.fa-minus {
        width: 24px;
        height: 24px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #000;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
    }
    
    .interview-left .interview-row.interview-info .epic-icon span {
        font-size: 12px;
        letter-spacing: normal;
        color: #6b6b6b;
    }
    
    .interview-left .interview-row.interview-info .epic-icon i {
        font-size: 18px;
        color: #b6dcfe;
    }
    
    .interview-user-info-sec {
        border-left: 1px #c8ced3 solid;
        padding-left: 37px;
    }
    
    .dt-tab-content {
        border: 1px #c8ced3 solid;
        background-color: #fff;
    }
    
    .interview-user-info-sec .interview-heading {
        border-bottom: 1px #c8ced3 solid;
    }
    
    .interview-user-info-sec .interview-heading h2 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #708393;
        margin: 0;
    }
    
    // .interview-user-info-sec .interview-heading .dropdown .dropdown-toggle {
    //     width: 148px;
    //     height: 40px;
    //     border: solid 1px rgba(0, 0, 0, 0.32);
    //     background-color: #fff;
    //     font-size: 13px;
    //     line-height: 1.85;
    //     letter-spacing: 0.12px;
    //     text-align: left;
    //     color: rgba(0, 0, 0, 0.6);
    // }
    
    // .interview-user-info-sec .interview-heading .dropdown .dropdown-toggle::after {
    //     margin-left: 5em;
    // }
    .interview-user-info-sec .interview-heading .dropdown .dropdown-menu{
        padding: 0;
        width: 216px;
        left: -54px;
    }
    .interview-user-info-sec .interview-heading .dropdown .dropdown-menu a {
        display: block;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.17px;
        color: #333333 !important;
        border-bottom: 1px #c8ced3 solid;
        text-decoration: none;
        padding: 15px;
    }
    .interview-user-info-sec .interview-heading .dropdown .dropdown-menu a:last-child{
        border: none;
    }
    /* .interview-user-info-sec .interview-heading a {
        font-size: 14px;
        letter-spacing: 0.3px;
        text-align: right;
        color: #083ac8;
    } */
    
    .interview-user-info-sec h2 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .interview-user-info-sec h3 {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .border-box {
        border: solid 1px #e5e8eb;
        padding: 10px;
    }
    
    .border-box p {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.01px;
        color: #333333;
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
    
    .version-drop .dropdown-menu .version-style p span.fontbold {
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
    
    .top-dropdown-sec .custom-select {
        width: 148px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.32);
        background-color: #fff;
        font-size: 13px;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }
    
    .interviews-tabs .custom-select {
        width: 112px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.32);
        background-color: #fff;
        font-size: 13px;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }
    
    @media (min-width: 992px) {
        .noiModal .modal-lg {
            max-width: 1045px;
        }
    }
    
    @media (max-width: 767px) {
        .dt-btn-sec {
            margin-top: 20px;
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
    .empathymap-left .empathymap-tab {
        width: 65px;
        display: flex;
        align-items: end;
        padding-top: 100px;
        border-right: solid 1px #C8CED3;
    }

    .empathymap-left .empathymap-tab .nav li {
        height: 92px;
        width: 64px;
        border-top: solid 1px #c8ced3;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .empathymap-left .empathymap-tab .nav li:last-child {
        border-bottom: solid 1px #c8ced3;
    }

    .empathymap-left .empathymap-tab .nav li.active {
        background-color: #f0f8ff;
    }

    .empathymap-left .empathymap-tab .nav li a {
        width: 39px;
        height: 39px;
        border: solid 1px #d8d5d5;
        background-color: #fff;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.01px;
        color: #131313;
        border-radius: 100%;
        padding: 0;
        text-align: center;
        line-height: 38px;
    }

    .empathymap-left .empathymap-tab .nav li a img {
        border-radius: 100%;
        object-fit: cover;
        object-position: 50% top;
        height: 100%;
        width: 100%;
        display: flex;
    }

    .empathymap-content {
        padding: 20px;
    background-color: #f6f7f8;
    width: 100%;
    }

    .empathymap-content h2 {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
        margin-bottom: 30px;
    }

    .empathymap-content p {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #333333;
    }

    .empathymap-content .stikynote-box {
        position: relative;
        height: 340px;
    }

    .empathymap-content .stikynote-box .stikynote {
        position: absolute;
        height: 80px;
        width: 80px;
        padding: 10px;
        box-shadow: 0px 3px 9px #00000026;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .empathymap-content .stikynote-box .stikynote p {
        font-size: 10px;
        color: #000;
        margin: 0;
        text-align: center;
    }

    .empathymap-content .stikynote-box .stikynote.bg-blue {
        background-color: #c6e2f5;
    }

    .empathymap-content .stikynote-box .stikynote.bg-orange {
        background-color: #f8dcaf;
        left: 58%;
    }

    .empathymap-content .stikynote-box .stikynote.bg-green {
        background-color: #cee6b2;
        left: 38%;
        top: 48%;
    }

    .interview-user-info-sec {
        border-left: 1px #c8ced3 solid;
        padding-left: 37px;
    }

    .dt-tab-content {
        border: 1px #c8ced3 solid;
        background-color: #fff;
    }

    .interview-user-info-sec .interview-heading {
        border-bottom: 1px #c8ced3 solid;
    }

    .interview-user-info-sec .interview-heading h2 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #708393;
        margin: 0;
    }

    .interview-user-info-sec .interview-heading h2.map-title {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
    }

    .interview-user-info-sec .interview-heading a {
        font-size: 14px;
        letter-spacing: 0.3px;
        text-align: right;
        color: #083ac8;
        text-decoration: none;
    }

    .interview-user-info-sec .interview-heading a i {
        color: #000;
    }

    .interview-user-info-sec .interview-heading a i.fa-plus {
        width: 24px;
        height: 24px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #000;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
    }

    .empathy-map-block .empathy-map-sec {
        width: 760px;
        position: relative;
        border: solid 1px #979797;
        display: flex;
        flex-wrap: wrap;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box {
        width: 50%;
        height: 231px;
        border-bottom: solid 1px #979797;
        padding: 10px;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box .note-container {
        position: relative;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box-bottom {
        height: 222px;
        position: relative;
        border-bottom: solid 0px #979797;
        width: 16.66%;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box-bottom.bg-red {
        background-color: #ffe7d7;
    }
    .empathy-map-block .empathy-map-sec .empathy-map-box-bottom.bg-orange {
        background-color: #fff1bc;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box-bottom.bg-green {
        background-color: #ecf8d5;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box.bg-lightblue {
        background-color: #e5f8ff;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box.bg-blue {
        background-color: #deefff;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box h3 {
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #083ac8;
    }

    .empathy-map-block .empathy-map-sec .empathy-map-box.border-right {
        border-right: solid 1px #979797 !important;
    }

    /* .empathy-map-block .empathy-map-sec .empathy-map-box-bottom.bg-red h3 {
        color: #e81a0b;
    } */

    .empathy-map-block .empathy-map-sec .empathy-map-box-bottom.bg-green h3 {
        color: #169822;
    }

    .empathy-map-block .empathy-map-sec .notes {
        width: 28px;
        height: 28px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.3px;
        text-align: center;
        color: #333333;
        display: inline-block;
        line-height: 27px;
        // position: absolute;
        margin-right: 10px;
        margin-bottom: 10px;

    }

    .empathy-map-block .empathy-map-sec .notes a {
        color: #333333;
        text-decoration: none;
    }

    .empathy-map-block .empathy-map-sec .notes.position-1 {
        top: 0px;
        left: 40%;
    }

    .empathy-map-block .empathy-map-sec .notes.position-2 {
        top: 40px;
        left: 50%;
    }

    .empathy-map-block .empathy-map-sec .notes.position-3 {
        top: -14px;
        left: 77%;
    }

    .empathy-map-block .empathy-map-sec .notes.position-4 {
        top: 109px;
        left: 85%;
    }

    .empathy-map-block .empathy-map-sec .notes.bg-orange {
        background-color: #fdebb1;
    }

    .note-tooltip {
        position: relative;
    }

    .note-tooltip .tooltiptext {
        visibility: hidden;
        width: 231px;
        background-color: white;
        text-align: left;
        border-radius: 6px;
        padding: 10px;
        border: solid 1px #c8ced3;
        position: absolute;
        margin-left: 11px;
        margin-top: -30px;
        z-index: 1;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 0.01px;
        line-height: 15px;
        color: #333333;
    }

    .note-tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .modal-open {
        overflow: auto;
        padding-right: 0 !important;
    }

    .modal-open .modal-backdrop {
        background-color: transparent;
        display: none;
    }

    .empathyModal .modal-dialog {
        max-width: 418px;
        margin: 1.75rem 16% 0 auto;
    }

    .empathyModal .modal-dialog .modal-content {
        border-radius: 0;
        border: solid 1px rgba(46, 91, 255, 0.08);
    }

    .empathyModal .modal-dialog .modal-content .modal-header {
        padding: 5px 1rem;
        border-bottom: 0px solid #dee2e6;
    }

    .empathyModal .modal-dialog .modal-body {
        padding: 0 1rem;
    }

    .empathy-link,
    .empathy-link a {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.3px;
        color: #083ac8;
        text-decoration: none;
        display: inline-block;
        margin: 0 10px;
    }

    .empathy-link a:first-child {
        margin-left: 0;
    }

    .interview-user-info-sec h2 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.01px;
        color: #131313;
    }

    .interview-user-info-sec h3 {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.01px;
        color: #131313;
    }

    /* Modal */
    /* .button {
        font-size: 1em;
        padding: 10px;
        color: #fff;
        border: 2px solid #06D85F;
        border-radius: 20px/50px;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.3s ease-out;
    }
    
    .button:hover {
        background: #06D85F;
    } */

    .modal-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /* background: rgba(0, 0, 0, 0.7); */
        visibility: hidden;
        opacity: 0;
        display: none;
    }

    .modal-overlay:target {
        visibility: visible;
        opacity: 1;
        display: block;
    }

    .modal-overlay .popup {
        margin: 40% 10% 10px auto;
        padding: 20px;
        border: solid 1px #979797;
        background-color: #fff;
        border-radius: 0px;
        width: 419px;
        /* height: 459px; */
        position: relative;
        /* transition: all 5s ease-in-out; */
    }
    .modal-overlay .popup .form-group a{
 text-decoration: none;
    }

    .modal-overlay .popup textarea {
        height: 150px;
    }

    .modal-overlay .popup h2 {
        margin-top: 0px;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.01px;
        color: #131313;
    }

    .modal-overlay .popup .close {
        position: absolute;
        top: 0px;
        right: 7px;
        transition: all 200ms;
        font-size: 30px;
        font-weight: 400;
        text-decoration: none;
        color: #b9b9b9;
    }

    .modal-overlay .popup .close:hover {
        color: #06D85F;
    }

    .modal-overlay .popup .content {
        width: 100%;
        text-align: center;
    }

    .btn-login {
        background-color: #6EDAB4;
        color: #fff;
        font-size: 14px;
        padding: 11px 30px;
        border-radius: 30px;
        font-weight: 700;
        border: 0;
        outline: none;
        color: #fff;
        font-size: 14px;
        padding: 11px 30px;
        border-radius: 30px;
        font-weight: 700;
        border: 0;
        outline: none;
        width: 165px;
    }

    .modal-footer {
        margin-top: -29px;
        z-index: 9;
        position: relative;
    }

    .modal-footer p {
        font-size: 13px;
        text-decoration: none;
        margin-top: 20px;
        color: #fff;
    }

    .modal-footer p a {
        font-size: 12px;
        text-decoration: none;
        color: #6EDAB4;
        margin: 0;
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

    .version-drop .dropdown-menu .version-style p span.fontbold {
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

    .interviews-tabs .custom-select {
        width: 112px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.32);
        background-color: #fff;
        font-size: 13px;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }

    .interview-heading .version-drop .dropdown-toggle {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.01px;
        color: #131313;
        margin-top: 6px;
        display: inline-block;
    }

    @media screen and (min-width: 1366px) {
        .empathy-map-block .empathy-map-sec {
            width: 100%;
        }
    }

    @media screen and (max-width: 700px) {
        .modal-overlay .popup {
            width: 240px;
        }
    }

    @media (max-width: 1170px) {
        .interviews-tabs .nav-pills .nav-link {
            width: 100%;
        }

        .map-responsive {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    @media (max-width: 992px) {
        .interviews-tabs .nav-pills .nav-link {
            width: 100%;
        }

        .interview-user-info-sec {
            border-left: 0px #c8ced3 solid;
        }

        .interview-left {
            border-bottom: 1px #c8ced3 solid;
        }
    }

    @media (max-width: 767px) {
        .dt-btn-sec {
            margin-top: 20px;
        }
    }

    @media (max-width: 575px) {
        .dt-project-sec1 .warehousing-slider li {
            width: 57px;
        }

        .dt-screen-main .dt-content-wrapper {
            padding-left: 0px;
        }

        .interviews-tabs .nav-pills {
            justify-content: end;
        }

        .interviews-tabs .nav-pills .nav-link {
            width: 140px !important;
            height: 48px;
            font-size: 15px;
            line-height: 36px;
        }
    }

    .process-user-info-sec .interview-heading {
        border-bottom: 1px #c8ced3 solid;
    }
    
    .process-user-info-sec .interview-heading h2 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #708393;
        margin: 0;
    }
    
    .process-user-info-sec .interview-heading h2 a i {
        color: #ccc !important;
    }
    
    .process-user-info-sec .interview-heading h2 a.active {
        background-color: #e9e9ea;
        padding: 5px 7px;
    }
    
    .process-user-info-sec .interview-heading h2.map-title {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .process-user-info-sec .interview-heading a {
        font-size: 14px;
        letter-spacing: 0.3px;
        text-align: right;
        color: #083ac8;
        text-decoration: none;
    }
    
    .process-user-info-sec .interview-heading a i {
        color: #000;
    }
    
    .process-user-info-sec .interview-heading a i.fa-plus {
        width: 24px;
        height: 24px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #000;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
    }
    
    .process-table i.fa-plus,
    .process-table i.fa-minus {
        width: 24px;
        height: 24px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #000;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
    }
    
    .process-table thead td,
    .process-table thead th {
        line-height: 16px;
        font-size: 12px;
    }
    
    .process-table .tableTopTr td {
        border: 0px transparent solid !important;
        position: relative;
    }
    
    .process-table .tableTopTr td a {
        position: absolute;
        right: 0;
        bottom: 20px;
        margin-right: -13px;
        display: inline-block;
        z-index: 2;
    }
    
    .process-table .tableTopTr td a::before {
        content: '';
        bottom: -20px;
        right: 12px;
        position: absolute;
        width: 1px;
        height: 21px;
        background-color: #ccc;
    }
    
    .process-table td:first-child,
    .process-table th:first-child {
        width: 150px;
    }
    
    .process-table .substages {
        background-color: #9d9e9f !important;
        color: #fff;
    }
    
    .process-table .bg-gray {
        background-color: #f4f4f4;
    }
    
    .process-table .tbltxt1 {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.34px;
    }
    
    .process-table .tbltxt2 {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.34px;
    }
    
    .process-table .tbltxt3 {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.26px;
    }
    
    .process-table .tbltxt4 {
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #000000;
    }
    
    .process-table .tbltxt5 {
        font-size: 11px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #000000;
    }
    
    .process-table .process-sm-img {
        width: 30px;
        height: 30px;
    }
    
    .process-table .process-sm-img img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        object-position: 50% top;
        border-radius: 100%;
        overflow: hidden;
    }
    
    .process-table td p {
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 14px;
        letter-spacing: 0.24px;
        color: #2f353a;
        /* height: 28px;
        overflow: hidden; */
        margin-bottom: 10px;
    }
    
    .process-user-info-sec h2 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .process-user-info-sec h3 {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.01px;
        color: #131313;
    }
    /* Modal */
    /* .stakmodal .modal-dialog {
        max-width: 418px;
        margin: 1.75rem 16% 0 auto;
    } */
    .stakmodal .modal-dialog .modal-content {
        border-radius: 0;
        border: solid 0px rgba(46, 91, 255, 0.08);
    }
    
    .stakmodal .modal-dialog .modal-content .modal-header {
        padding: 5px 1rem;
        border-bottom: 0px solid #dee2e6;
    }
    /*     
    .stakmodal .modal-dialog .modal-body {
        padding: 0 1rem;
    }
     */
    
    .stakmodal .modal-dialog .modal-body .media {
        align-items: center;
    }
    
    .stakmodal .modal-dialog .modal-body .media img {
        width: 84px;
        height: 84px;
        object-fit: cover;
        object-position: 50% top;
        border-radius: 100%;
    }
    
    .stakmodal .modal-dialog .modal-body .media h5 {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: .5px;
        color: #2e384d;
        margin: 0;
    }
    
    .stakmodal .modal-dialog .modal-body .media p {
        font-size: 15px;
        font-weight: 400;
        letter-spacing: normal;
        color: #8798ad;
        margin: 0;
    }
    
    .stakmodal .modal-dialog .modal-body .media p span {
        font-size: 13px;
        font-weight: 500;
        color: #2e384d;
        margin: 0;
    }
    
    .stakmodal .connections h3 {
        font-size: 15px;
        font-weight: 700;
        color: #2e384d;
        text-align: left;
        margin-top: 20px;
    }
    
    .stakmodal .connections .impact-block {
        display: flex;
        justify-content: space-between;
    }
    
    .stakmodal .connections .impact-block p {
        font-size: 13px;
        font-weight: 700;
        color: #2e384d;
        text-align: left;
    }
    
    .stakmodal .connections .impact-block p span {
        font-size: 13px;
        font-weight: 400;
        color: #8798ad;
    }
    
    .stakmodal .connections select {
        width: 95px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.32);
        background-color: #fff;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
        margin-left: 10px;
    }
    
    .stakmodal .connections .impct span {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.13px;
        color: #2f353a;
    }
    
    .stakmodal .connections .influence-block {
        display: flex;
        align-items: center;
    }
    
    .stakmodal .connections .influence-block .dropdown-toggle {
        width: 75px;
        height: 40px;
        border: solid 1px rgba(0, 0, 0, 0.32);
        background-color: #fff;
        border-radius: 5px;
        display: inline-block;
        line-height: 36px;
    }
    
    .stakmodal .connections .influence-block .dropdown-toggle::after {
        display: none;
    }
    
    .stakmodal .connections .influence-block .dropdown-toggle::before {
        width: 17px;
        text-align: center;
        float: right;
        vertical-align: 0;
        padding-right: 14px;
        padding-top: 4px;
        border: 0;
        font-weight: 900;
        color: #708088;
        font-size: 12px;
        content: '\f078';
        font-family: 'Font Awesome 5 Free';
    }
    
    .stakmodal .connections .influence-block .dropdown-menu {
        min-width: 76px;
        text-align: center;
    }
    
    .influence-img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        object-position: 50% top;
        border-radius: 100%;
    }
    
    .stakmodal .connections .influence-block .arrow-lg {
        position: relative;
        text-align: center;
    }
    
    .stakmodal .connections .influence-block .arrow-lg p {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -13px;
        text-align: center;
        margin: 0;
        font-size: 12px;
        font-weight: 400;
        color: #8798ad;
    }
    
    .stakmodal .add-comment h3 {
        font-size: 15px;
        font-weight: 700;
        color: #2e384d;
        text-align: left;
        margin-top: 20px;
    }
    
    .stakmodal .add-comment textarea {
        width: 100%;
        height: 151px;
        border-radius: 4px;
        border: solid 1px #d3d8e1;
        background-color: #fff;
    }
    /* .modal.stakmodal {
        position: absolute;
        z-index: 3;
    } */
    
    // @media screen and (max-width: 1366px) {
    //     .process-table {
    //         width: 1247px;
    //     }
    // }
    
    @media screen and (max-width: 700px) {
        .modal-overlay .popup {
            width: 240px;
        }
    }
    
    @media (max-width: 1170px) {
        .interviews-tabs .nav-pills .nav-link {
            width: 100%;
        }
        .map-responsive {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
    
    @media (max-width: 992px) {
        .interviews-tabs .nav-pills .nav-link {
            width: 100%;
        }
        .process-user-info-sec {
            border-left: 0px #c8ced3 solid;
        }
        .interview-left {
            border-bottom: 1px #c8ced3 solid;
        }
    }
    
    @media (max-width: 767px) {
        .dt-btn-sec {
            margin-top: 20px;
        }
    }
    
    @media (max-width: 575px) {
        .dt-project-sec1 .warehousing-slider li {
            width: 57px;
        }
        .dt-screen-main .dt-content-wrapper {
            padding-left: 0px;
        }
        .interviews-tabs .nav-pills {
            justify-content: end;
        }
        .interviews-tabs .nav-pills .nav-link {
            width: 140px !important;
            height: 48px;
            font-size: 15px;
            line-height: 36px;
        }
    }


    .empathymap-left .empathymap-tab {
        width: 65px;
        display: flex;
        align-items: end;
        padding-top: 100px;
        border-right: solid 1px #C8CED3;
    }
    
    .empathymap-left .empathymap-tab .nav li {
        height: 92px;
        width: 64px;
        border-top: solid 1px #c8ced3;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .empathymap-left .empathymap-tab .nav li:last-child {
        border-bottom: solid 1px #c8ced3;
    }
    
    .empathymap-left .empathymap-tab .nav li.active {
        background-color: #f0f8ff;
    }
    
    .empathymap-left .empathymap-tab .nav li a {
        width: 39px;
        height: 39px;
        border: solid 1px #d8d5d5;
        background-color: #fff;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.01px;
        color: #131313;
        border-radius: 100%;
        padding: 0;
        text-align: center;
        line-height: 38px;
    }
    
    .empathymap-left .empathymap-tab .nav li a img {
        border-radius: 100%;
        object-fit: cover;
        object-position: 50% top;
        height: 100%;
        width: 100%;
        display: flex;
    }
    
    .empathymap-content {
        padding: 20px;
    background-color: #f6f7f8;
    width:100%;
    }
    
    .empathymap-content h2 {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
        margin-bottom: 30px;
    }
    
    .empathymap-content p {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #333333;
    }
    
    .empathymap-content .stikynote-box {
        position: relative;
        height: 340px;
    }
    
    .empathymap-content .stikynote-box .stikynote {
        position: absolute;
        height: 80px;
        width: 80px;
        padding: 10px;
        box-shadow: 0px 3px 9px #00000026;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    
    .empathymap-content .stikynote-box .stikynote p {
        font-size: 10px;
        color: #000;
        margin: 0;
        text-align: center;
    }
    
    .empathymap-content .stikynote-box .stikynote.bg-blue {
        background-color: #c6e2f5;
    }
    
    .empathymap-content .stikynote-box .stikynote.bg-orange {
        background-color: #f8dcaf;
        left: 58%;
    }
    
    .empathymap-content .stikynote-box .stikynote.bg-green {
        background-color: #cee6b2;
        left: 38%;
        top: 48%;
    }
    
    .interview-user-info-sec {
        border-left: 1px #c8ced3 solid
    }
    
    .dt-tab-content {
        border: 1px #c8ced3 solid;
        background-color: #fff;
    }
    
    .interview-user-info-sec .interview-heading {
        border-bottom: 1px #c8ced3 solid;
    }
    
    .interview-user-info-sec .interview-heading h2 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #708393;
        margin: 0;
    }
    
    .interview-user-info-sec .interview-heading h2.map-title {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .interview-user-info-sec .interview-heading a {
        font-size: 14px;
        letter-spacing: 0.3px;
        text-align: right;
        color: #083ac8;
        text-decoration: none;
    }
    
    .interview-user-info-sec .interview-heading a i {
        color: #000;
    }
    
    .interview-user-info-sec .interview-heading a i.fa-plus {
        width: 24px;
        height: 24px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #000;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
    }
    
    .btn-login {
        background-color: #6EDAB4;
        color: #fff;
        font-size: 14px;
        padding: 11px 30px;
        border-radius: 30px;
        font-weight: 700;
        border: 0;
        outline: none;
        color: #fff;
        font-size: 14px;
        padding: 11px 30px;
        border-radius: 30px;
        font-weight: 700;
        border: 0;
        outline: none;
        width: 165px;
    }
    
    .add-photo-box {
        width: 100%;
        height: 221px;
        position: relative;
    }
    
    .add-photo-box img {
        width: 100%;
        height: 221px;
        object-fit: cover;
        object-position: 50% top;
    }
    
    .add-photo-box .upload-btn-wrapper {
        position: absolute;
        position: absolute;
        left: 50%;
        top: 50%;
        overflow: hidden;
        display: inline-block;
        margin-top: -40px;
        margin-left: -33px;
    }
    
    .add-photo-box .btn {
        width: 78px;
        height: 78px;
        background-color: #fff;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.3px;
        text-align: center;
        color: #083ac8;
        border-radius: 100%;
    }
    
    .add-photo-box .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
    
    .description-box {
        width: 100%;
        box-shadow: 0 2px 8px 0 rgba(209, 209, 209, 0.8);
        background-color: #4c9ce0;
        padding: 20px;
        margin-top: 30px;
    }
    
    .description-box p {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -0.16px;
        color: #fff;
        margin: 0;
    }
    
    .user-info-box {
        margin-top: 30px;
    }
    
    .user-info-box p {
        font-size: 12px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.16px;
        color: #3d3d3d;
        margin: 0 0 8px 0;
    }
    
    .bio-info-box {
        width: 100%;
        height: 150px;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 rgba(209, 209, 209, 0.8);
        background-color: #fff;
        padding: 20px;
        overflow: hidden;
    }
    
    .bio-info-box h3 {
        text-shadow: 0 2px 8px rgba(209, 209, 209, 0.8);
        font-size: 16px;
        font-weight: bold;
        color: #4084bf;
    }
    
    .bio-info-box p {
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.16px;
        color: #3d3d3d;
        height: 90px;
        overflow: hidden;
    }
    
    .goal-interest-box h3 {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 400;
        color: #3d3d3d;
    }
    
    .goal-interest-box ul {
        padding-left: 16px;
        line-height: 15px;
    }
    
    .goal-interest-box li {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -0.16px;
        color: #3d3d3d;
        padding-left: 10px;
    }
    
    .motivation-box h3 {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 400;
        color: #3d3d3d;
        margin-bottom: 20px;
    }
    
    .motivation-box .motivation-row h4 {
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.16px;
        color: #3d3d3d;
        margin-bottom: 5px;
    }
    
    .motivation-box .motivation-row .motivation-bar {
        width: 100%;
        height: 13px;
        border-radius: 10px;
        background-color: #f6f6f6;
        position: relative;
    }
    
    .motivation-box.personality-box .motivation-row .motivation-bar,
    .motivation-box.personality-box .motivation-row .motivation-bar .blue-bar {
        height: 10px;
    }
    
    .motivation-box .motivation-row .motivation-bar .blue-bar {
        height: 13px;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 rgba(209, 209, 209, 0.8);
        background-image: linear-gradient(to bottom, #74bae1, #4084bf);
        position: absolute;
        left: 0;
        top: 0;
    }
    
    .journey-btn a {
        width: 303px;
        height: 40px;
        border-radius: 4px;
        border: solid 1px #083ac8;
        background-color: #083ac8;
        font-size: 13px;
        font-weight: 600;
        line-height: 26px;
        letter-spacing: 1px;
        text-align: center;
        font-family: Montserrat;
    }
    
    .personamodal h5 {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .personamodal .modal-body .card {
        border-radius: 0;
        height: 153px;
    }
    
    .personamodal .modal-body h3 {
        font-size: 14px;
        font-weight: 700;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .personamodal .close {
        padding: 0;
    }
    
    .personamodal .modal-body h3 .custom-control .custom-control-label {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.3px;
        color: #2f353a;
    }
    
    .personamodal .modal-body .card .custom-control-label {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.17;
        letter-spacing: 0.17px;
        color: #000000;
    }
    
    .personamodal .modal-body .card .custom-control-label::before {
        top: -1px;
    }
    
    .personamodal .modal-body .card .custom-control-label::after {
        top: 0px;
    }
    
    .personamodal .modal-footer .text-primary {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #083ac8;
    }
    
    .personamodal .modal-footer .btn {
        width: 106px;
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
        text-transform: uppercase;
    }
    
    @media screen and (max-width: 700px) {
        .modal-overlay .popup {
            width: 240px;
        }
    }
    
    @media (max-width: 1170px) {
        .interviews-tabs .nav-pills .nav-link {
            width: 100%;
        }
        .map-responsive {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
    
    @media (max-width: 992px) {
        .interviews-tabs .nav-pills .nav-link {
            width: 100%;
        }
        .interview-user-info-sec {
            border-left: 0px #c8ced3 solid;
        }
        .interview-left {
            border-bottom: 1px #c8ced3 solid;
        }
    }
    
    @media (max-width: 767px) {
        .dt-btn-sec {
            margin-top: 20px;
        }
    }
    
    @media (max-width: 575px) {
        .dt-project-sec1 .warehousing-slider li {
            width: 57px;
        }
        .dt-screen-main .dt-content-wrapper {
            padding-left: 0px;
        }
        .interviews-tabs .nav-pills {
            justify-content: end;
        }
        .interviews-tabs .nav-pills .nav-link {
            width: 140px !important;
            height: 48px;
            font-size: 15px;
            line-height: 36px;
        }
        .journey-btn a {
            width: 100%;
        }
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
    .oval-shape bg-yellow{
        background-color: #FDEBB1;
    }
    .oval-shape {
        position : absolute;
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
    button#tab-tab1 {
        width: 100%;
        height: 65px;
        background-color: #e9e9ea;
        font-size: 18px;
        line-height: 53px;
        font-weight: 700;
        letter-spacing: 0.01px;
        text-align: center;
        color: #131313;
        border-radius: 0;
        margin: 0 3px;
        border:none;
        padding: 0 60px;
    }
    button#tab-tab2 {
        width: 100%;
        height: 65px;
        background-color: #e9e9ea;
        font-size: 18px;
        line-height: 53px;
        font-weight: 700;
        letter-spacing: 0.01px;
        text-align: center;
        color: #131313;
        border-radius: 0;
        margin: 0 3px;
        border:none;
        padding: 0 60px;
    }
    button#tab-tab3 {
        width: 100%;
        height: 65px;
        background-color: #e9e9ea;
        font-size: 18px;
        line-height: 53px;
        font-weight: 700;
        letter-spacing: 0.01px;
        text-align: center;
        color: #131313;
        border-radius: 0;
        margin: 0 3px;
        border:none;
        padding: 0 60px;
    }
    
    button#tab-tab4 {
        width: 100%;
        height: 65px;
        background-color: #e9e9ea;
        font-size: 18px;
        line-height: 53px;
        font-weight: 700;
        letter-spacing: 0.01px;
        text-align: center;
        color: #131313;
        border-radius: 0;
        margin: 0 3px;
        border:none;
        padding: 0 60px;
    }
    .formscroll {
        max-height: 300px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .dt-content-wrapper.right-toggle button#tab-tab1, .dt-content-wrapper.right-toggle button#tab-tab2, 
    .dt-content-wrapper.right-toggle button#tab-tab3, .dt-content-wrapper.right-toggle button#tab-tab4{
        padding: 0 36px;
    }
    .tab-link-active{
    background-color: #ffe687 !important;
    }
    // range slider for personas tab
    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
      }
      
    //   .slider:hover {
    //     opacity: 1;
    //   }
      
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 10px;
        // background: #4CAF50;
        cursor: pointer;
        
        // height: 13px;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 rgba(209, 209, 209, 0.8);
        background-image: linear-gradient(to bottom, #74bae1, #4084bf);
        // position: absolute;
        // left: 0;
        // top: 0;
      }
      
      .slider::-moz-range-thumb {
        width: 25px;
        height: 10px;
        background-image: linear-gradient(to bottom, #74bae1, #4084bf);
        background: #4CAF50;
        cursor: pointer;
      }
      


    .rangeslider-horizontal .rangeslider__fill{
        height: 13px;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 rgba(209, 209, 209, 0.8);
        background-image: linear-gradient(to bottom, #74BAE1, #4084BF);
    }
    .rangeslider, .rangeslider .rangeslider__fill{
        box-shadow:none !important;
        height: 13px;
        border-radius: 10px;
        background-color: #F6F6F6;
    }
    input.slider{
        height: 10px;
        border-radius: 10px;
        background-color: #F6F6F6;
    }
    .rangeslider-horizontal .rangeslider__handle{
        display: none;
    }
    .rangeslider-horizontal:hover .rangeslider__handle{
        display: block !important;
    }
    .rangeslider-horizontal .rangeslider__handle:after{
        display: none;
    }
    .rangeslider-horizontal .rangeslider__handle {
        width: 20px;
        height: 20px;
    }
    .motivation-box.personality-box .motivation-row .motivation-bar {
        height: 0;
        margin-bottom: 25px;
    }

      .goalsLists div {
          display: list-item
      }
      .painPointsLists div {
        display: list-item
    }
    .activeStage{
        border: 0px #083AC8 solid !important;
        box-shadow: inset 0px 0px 0px 2px #083AC8;
        box-sizing: border-box;
    }
    .active-commentCol{
        border-left: 2px #F5BD14 solid!important;
        border-right: 2px #F5BD14 solid!important;
    }
    .activeSubStage{
        border: 0px #389E22 solid!important;
        box-shadow: inset 0px 0px 0px 2px #389E22;
        box-sizing: border-box;
    }
    .version-drop .dropdown-menu {
        padding: 10px 0 !important;
        width: 354px !important;left: 0 !important;
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
        color: #083AC8;
    }
    .version-drop .dropdown-menu .version-style p span.fontbold {
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
        color: #083AC8;
    }
    .empathyMapTextarea:disabled {
        background-color: #fff !important;
    }
    .empathyMapTextarea{
        border: none;
        display: block; 
        overflow: hidden; 
        resize: none;
        height: 600px;
        width: 312px;
    }
    .noiModal .modal-body {
        padding: 0 1rem;
    }
    .noiModal .modal-body .bg-gray {
        background-color: #EFEFF0;
    }
    .noiModal .modal-body .bg-gray h3 {
        font-size: 20px;
        margin-top: 20px;
    }
    .noiModal .search-box .media {
        border-bottom: solid 1px rgba(46, 91, 255, 0.08);
        padding-bottom: 15px;
        margin-top: 5px;
        margin-bottom: 15px !important;
    }
    .noiModal .search-box .media img {
        border-radius: 100%;
        object-fit: cover;
        object-position: 50% top;
        height: 50px;
        width: 50px;
    }
    .noiModal .search-box .media h5 {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        color: #2E384D;
        margin-bottom: 5px;
    }
    .noiModal .search-box .media p {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.57;
        letter-spacing: normal;
        color: #8798AD;
        margin-bottom: 0;
    }
    .noiModal .modal-body .bg-gray ul {
        list-style: none;
        text-align: left;
        font-size: 15px;
        margin-top: 20px;
    }
    .noiModal .search-box {
        height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .noiModal .modal-footer {
        margin-top: 0 !important;
    }
    .version-drop .dropdown-menu.ls-dropdown {
        padding: 10px 15px !important;
        width: 354px !important;
        left: 0 !important;
        height: 200px!important;
        overflow-x: hidden!important;
        overflow-y: auto!important;
    }
    .version-drop .dropdown-menu.ls-dropdown p {
        font-size: 14px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .stkbox{
        overflow-x: hidden;
        overflow-y: auto;
    }
    .demo-editor{
        height: 200px;
    }
    .tab-content-mx{
        margin:0;
        border:none !important;
    }
    .tableTopTr small{
        font-size:13px!important;
    }
    @media (max-width: 1200px) {
        .process-table-responsive{
            overflow-x: scroll;
            overflow-y: hidden;
            background-color: white;
            width: 100%;
            display: block;
        }
    }
    .scrollmedia{
        height: 60vh;
        overflow-x: hidden;
        overflow-y: scroll;
        margin-top:20px;
    }
    .scrollmedia .media img{
        height: 50px;
        width: 50px;
        border-radius: 100%;
        overflow: hidden;
        object-fit: cover;
        object-position: 50% top;
    }
    .scrollmedia .media p{
        padding:0;
    }

`;