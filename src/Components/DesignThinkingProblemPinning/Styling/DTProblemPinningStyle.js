import styled from 'styled-components';

export const DTProblemPinningStyle = styled.div`
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

    footer .copyright{
        font-size: 13px;
        color: #708393;
    }

    .topbar .nav-item.dropdown .dropdown-toggle::after {
        width: 1rem;
        text-align: center;
        float: right;
        vertical-align: 0;
        border: 0;
        font-weight: 900;
        content: '\f105';
        font-family: 'Font Awesome 5 Free';
      }
      
      .topbar .nav-item.dropdown.show .dropdown-toggle::after {
        content: '\f107';
      }
      
      .topbar .nav-item .nav-link {
        position: relative;
      }
      
      .topbar .nav-item .nav-link>img {
        height: 35px;
        width: 35px;
        border-radius: 100%;
        object-fit: cover;
      }
      
      .topbar .nav-item .nav-link .badge-counter {
        position: absolute;
        -webkit-transform: scale(0.7);
        transform: scale(0.7);
        -webkit-transform-origin: top right;
        transform-origin: top right;
        right: .25rem;
        margin-top: -.25rem;
        font-size: 12px;
      }
      
      .topbar .nav-item .nav-link .img-profile {
        height: 2rem;
        width: 2rem;
      }
      
      #sidebarToggleTop i,
      #sidebarRightToggle i {
        color: #73818f;
      }
      
      .topbar {
        height: 55px;
        border-bottom: 1px solid #c8ced3;
        z-index: 5;
      }
      
      .topbar #sidebarToggleTop {
        height: 2.5rem;
        width: 2.5rem;
        margin-left: -28px;
        background-color: transparent !important;
      }
      
      .topbar #sidebarToggleTop:hover {
        background-color: #eaecf4;
      }
      
      .topbar #sidebarToggleTop:active {
        background-color: #dddfeb;
      }
      
      .topbar .navbar-search {
        width: 25rem;
      }
      
      .topbar .navbar-search input {
        font-size: 0.85rem;
      }
      
      .topbar .topbar-divider {
        width: 0;
        border-right: 1px solid #e3e6f0;
        height: calc(4.375rem - 2rem);
        margin: auto 1rem;
      }
      
      .topbar .nav-item .nav-link {
        height: 4.375rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 0.75rem;
      }
      
      .topbar .nav-item .nav-link:focus {
        outline: none;
      }
      
      .topbar .nav-item:focus {
        outline: none;
      }
      
      .topbar .dropdown {
        position: static;
      }
      
      .topbar .dropdown .dropdown-menu {
        width: calc(100% - 1.5rem);
        right: 0.75rem;
      }
      
      .topbar .dropdown-list {
        padding: 0;
        border: none;
        overflow: hidden;
      }
      
      .topbar .dropdown-list .dropdown-header {
        background-color: #4e73df;
        border: 1px solid #4e73df;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        color: #fff;
      }
      
      .topbar .dropdown-list .dropdown-item {
        white-space: normal;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-left: 1px solid #e3e6f0;
        border-right: 1px solid #e3e6f0;
        border-bottom: 1px solid #e3e6f0;
        line-height: 1.3rem;
      }
      
      .topbar .dropdown-list .dropdown-item .dropdown-list-image {
        position: relative;
        height: 2.5rem;
        width: 2.5rem;
      }
      
      .topbar .dropdown-list .dropdown-item .dropdown-list-image img {
        height: 2.5rem;
        width: 2.5rem;
      }
      
      .topbar .dropdown-list .dropdown-item .dropdown-list-image .status-indicator {
        background-color: #eaecf4;
        height: 0.75rem;
        width: 0.75rem;
        border-radius: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 0.125rem solid #fff;
      }
      
      .topbar .dropdown-list .dropdown-item .text-truncate {
        max-width: 10rem;
      }
      
      .topbar .dropdown-list .dropdown-item:active {
        background-color: #eaecf4;
        color: #3a3b45;
      }
      
      .topbar .sidebar-brand {
        width: 200px;
        text-decoration: none;
      }
      
      .topbar .sidebar-brand .sidebar-brand-text {
        color: #000 !important;
        font-weight: 700;
      }
      
      @media (max-width: 767px) {
        .navbar-nav-top-left {
          display: none;
        }
      
        .navbar-nav-top-right .nav-item.dropdown.no-arrow.mx-1 {
          display: none;
        }
      
        .topbar #sidebarToggleTop {
          margin-left: 0;
        }
      
        .topbar .sidebar-brand {
          width: 100px;
        }
      
      }
      
      @media (min-width: 576px) {
        .topbar .dropdown {
          position: relative;
        }
      
        .topbar .dropdown .dropdown-menu {
          width: auto;
          right: 0;
        }
      
        .topbar .dropdown-list {
          width: 20rem !important;
        }
      
        .topbar .dropdown-list .dropdown-item .text-truncate {
          max-width: 13.375rem;
        }
      }
      
      .topbar.navbar-light .navbar-nav .nav-item .nav-link {
        color: #858796;
        font-size: 14px;
      }
      
      .topbar.navbar-light .navbar-nav .nav-item .nav-link:hover {
        color: #b7b9cc;
      }
      
      .topbar.navbar-light .navbar-nav .nav-item .nav-link.active {
        color: #2e343a;
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
    
    button:focus, textarea:focus, input:focus{
        outline: none!important;
        box-shadow:none !important;
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
    .epic-version .pager-list a {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: normal;
        color: #083ac8;
        text-decoration: none;
    }
    .epic-version .pager-list .nextbtn{
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
    .generate-ideas-row .card.ideascard{
        border-radius: 0;
        height: 100%;
    }
    .generate-ideas-row .card .card-header{
        background-color: #fff;
        padding: 6px 1.25rem;
        height: 50px;
    }
    .generate-ideas-row .card .card-body{
        background-color: #ebeef0;
    }
    .idea-box-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
    }
    .idea-box-wrapper.mh-700 {
        min-height: 700px;
    }
    .generate-ideas-row .card .card-header h3{
        font-size: 15px;
        font-weight: bold;
        letter-spacing: normal;
        color: #2e384d;
        margin: 0;
    }
    .generate-ideas-row .card .card-header .custom-select{
        width: 141px;
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
    .generate-ideas-row .card .card-header .submit-idea .btn-outline-primary{
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

    .generate-ideas-row .card .card-header .submit-idea .btn-outline-primary.mark-complete {
        width: 142px;
    }
    
    .idealeft .card-body .card {
        border-left: 2px #00c1d4 solid !important;
        border-radius: 6px;
        max-width: 60%;
    }
    .idealeft .card-body .card.active{
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
    .idealeft .card-body .card input{
        border:none;
        outline: none !important;
        width: 83%;
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
    .card-body.ideas-card{
        display: flex;
        flex-wrap: wrap;
    }
    .ideas-card .ideas-box{
        width: 260px;
      height: 222px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      background-color: #fdebb1;
        padding: 15px;
        margin: 10px;
    }
    .ideas-card .ideas-box h3{
        font-size: 14px;
      font-weight: bold;
      color: #2e384d;
    }
    .ideas-card .ideas-box p{
        font-size: 12px;
      letter-spacing: 0.26px;
      color: #2f353a;
    }
    .ideas-card .ideas-box .ideas-description {
        width: 100%;
        height: 90%;
        background-color: #fdebb1;
        border-color: #fdebb1;
        resize: none;
    }
    .epic-header a{
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-decoration: none;
        color: #2e384d;
        padding: 10px 0;
        margin-right: 25px;
        display: inline-block;
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
    }
    @media (max-width: 575px) {
        .dt-project-sec1 .warehousing-slider li{
            width: 57px;
        }
        .dt-screen-main .dt-content-wrapper {
            padding-left: 0px;
        }
    }
    .ideascard-expanded .ideas-box {
        width: 261px;
    }
    .ideascard-expanded  .card-body.ideas-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .pinning-area{
        position: relative;
        width: 100%;
    }
    .pinning-area .pinning-bg{
        background-color: #fff;
        border: solid 1px #c8ced3;
        float: left;
        width: 92%;
       height: 443px;
       position: relative;
    }
    .pinning-left .pintext{
      transform: rotate(270deg);
      font-weight: bold;
      color: #2e384d;
      margin: 0;
    }
    .pinning-left .pintext.txt2{
        width: 209px;
        font-size: 18px;
        position: absolute;
        left: -84px;
        top: 50%;
        margin-top: -50px;
    }
    .pinning-left .pintext.txt3{
        width: 61px;
        font-size: 12px;
        font-weight: 600;
        position: absolute;
        left: -6px;
        bottom: 22px;
    }
    .pinning-left .pintext.txt1{
        width: 34px;
        font-size: 12px;
        font-weight: 600;
        position: absolute;
        left: 9px;
        top: 5px;
    }
    .pinning-left{
        float: left;
        width: 8%;
        position: relative;
        height: 443px;
    }
    .pinning-bottom{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding-left: 44px;
        padding-top: 10px;
        align-items: center;
    }
    .pinning-bottom .pintext{
        font-size: 12px;
        font-weight: 500;
        font-stretch: normal;
        color: #2e384d;
    }
    .pinning-bottom .pintext.txt2{
        font-size: 18px;
        font-weight: 600;
        color: #2e384d;
    }
    .pinning-area .pinning-bg .pinning-box{
        width:50%;
        height: 222px;
        position: relative;
        padding: 10px;
        float: left;
    }
    .pinning-area .pinning-bg .pinning-box:first-child{
        border-right: 1px #ccc solid;
        border-bottom: 1px #ccc solid;
    }
    .pinning-area .pinning-bg .pinning-box:nth-child(2){
        border-bottom: 1px #ccc solid;
    }
    .pinning-area .pinning-bg .pinning-box:nth-child(3){
        border-right: 1px #ccc solid;
    }
    .pinning-area .pinning-bg .pinning-box .pintext{
        font-size: 15px;
        font-weight: bold;
        letter-spacing: normal;
        color: #2e384d;
        position: absolute;
    }
    .pinning-area .pinning-bg .pinning-box .pintext.txt1{
        right: 10px;
        top: 26px;
    }
    .pinning-area .pinning-bg .pinning-box .pintext.txt2{
        left: 62px;
        bottom: 62px;
    }
    .pinning-area .pinning-bg .pindot{
      width: 28px;
      height: 28px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      background-color: #fdebb1;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #333333;
      line-height: 28px;
      position: absolute;
    }
    .pinning-area .pinning-bg{
        position: relative;
        overflow: hidden
      }
      .curve1{
        position: absolute;
        right: -51%;
        top: -63%;
        height: 100%;
        border-radius: 100%;
        width: 100%;
        border: 1px #ccc solid;
        z-index: 9;
      }
      .curve2{
        position: absolute;
        right: -81%;
        top: -86%;
        height: 150%;
        border-radius: 100%;
        width: 150%;
        border: 1px #ccc solid;
        z-index: 5;
      }
      .curve3{
        position: absolute;
        right: -106%;
        top: -106%;
        height: 200%;
        border-radius: 100%;
        width: 200%;
        border: 1px #ccc solid;
        z-index: 2;
      }
      .curve4 {
          z-index: 1;
      }
      .pinning-area .pinning-bg .pinning-box .pintext.txt3 {
        right: 15px;
        top: 25px;
    }
    .vote-client{
        text-align: right;
    }
    .vote-client li{
        margin-right: 5px !important;
    }
    .vote-client li a {
        display: inline-block;
        position: relative;
        text-decoration: none;
    }
    
    .vote-client li a img {
        height: 20px;
        width: 20px;
        border-radius: 100%;
        object-fit: cover;
        object-position: 50% top;
    }
    
    .vote-client li a i {
        position: absolute;
        right: 0;
        bottom: -3px;
        color: #fff;
        background-color: #067eff;
        font-size: 8px;
        padding: 3px;
        border-radius: 10px;
    }
    .expandIdeas {
        position: absolute;
        left: -5%;
        top: 50%;
    }
    .collapseIdeas {
        position: absolute;
        top: 50%;
        left: 0.6%;
    }
    .full-width {
        width: 100%;
    }
    .subEpisWrapper{
        padding-left:40px;
    }
  
`;