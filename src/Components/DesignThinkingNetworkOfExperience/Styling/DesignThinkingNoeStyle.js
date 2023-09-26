import styled from 'styled-components';

export const DesignThinkingNoeStyle = styled.div`
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
    
    .epic-version .custom-select.custom-select1 {
        width: 112px;
    }
    
    .epic-version .custom-select {
        width: 211px;
        height: 40px;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }
    
    .epic-version .nxtbtn {
        width: 109px;
        height: 40px;
        display: inline-block;
        border-radius: 5px;
        border: solid 1px #083ac8;
        background-color: #fff;
        font-size: 13px;
        font-weight: bold;
        line-height: 36px;
        text-align: center;
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
    
    .epic-details-row .epic-col-wraper .media img {
        width: 67px;
        height: 67px;
        border-radius: 100%;
        object-fit: cover;
        object-position: 50% top;
    }
    
    .epic-details-row .epic-col-wraper .media h5 {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
    }
    
    .epic-details-row .epic-col-wraper .media p {
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #131313;
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
    
    .table-section .tbltitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 30px 10px 40px;
    }
    
    .table-section .tbltitle ul {
        margin: 0;
    }
    
    .table-section .tbltitle ul li a,
    .table-section .tbltitle ul li {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.3px;
        text-align: right;
        color: #083ac8 !important;
    }
    
    .table-section .tbltitle h2 {
        font-size: 24px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.02px;
        color: #000000;
        margin: 0;
    }
    
    .table-section .tbltitle h2 a {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.3px;
        color: #083ac8;
    }
    
    .table-section .tbltitle h2 a i.fa-plus {
        width: 24px;
        height: 24px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #000;
        border-radius: 100%;
        text-align: center;
        line-height: 22px;
    }
    
    .table-section .tbltitle h2 .btn-drop {
        font-size: 24px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.02px;
        color: #000000;
        margin: 0;
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
        background-color: #4c9ce0 !important;
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
        font-size: 10px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 0.21px;
        color: #2f353a;
        display: block;
    }
    
    .process-table .tbltxt6 {
        font-size: 10px;
        font-weight: 400;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: 0.21px;
        color: #000;
    }
    
    .process-table .tbltxt6 i {
        color: rgb(170, 24, 24);
    }
    
    .process-table .process-sm-img {
        width: 30px;
        height: 30px;
    }
    
    .process-table td .circle {
        width: 25px;
        height: 25px;
        border-radius: 100%;
        border: solid 1px #c8ced3;
        display: inline-block;
    }
    
    .process-table td .circle-green {
        background-color: #78b76b;
    }
    
    .process-table td .circle-yellow {
        background-color: #fbf075;
    }
    
    .process-table td .circle-red {
        background-color: #e06862;
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
    
    .process-table td p input {
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 14px;
        letter-spacing: 0.24px;
        color: #2f353a;
        border: none;
        outline: none !important;
    }
    
    .process-table td p .dot {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 10px;
    }
    
    .process-table td p .greendot {
        background-color: #94ce65;
    }
    
    .process-table td p .yellowdot {
        background-color: #f6c851;
    }
    
    .process-table td p .reddot {
        background-color: #e75c53;
    }
    
    .process-table td p input::placeholder {
        color: #2f353a;
        opacity: 1;
    }
    
    .process-table td p input:-ms-input-placeholder {
        color: #2f353a;
    }
    
    .process-table td p input::-ms-input-placeholder {
        color: #2f353a;
    }
    
    .process-table .circle-container {
        position: relative;
    }
    
    .process-table .circle-container1 {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }
    
    .process-table .circle-container1 i.fa-plus {
        width: 50px;
        height: 50px;
        border: solid 1px #d2d3d4;
        background-color: #fff;
        color: #afadad;
        border-radius: 100%;
        font-size: 20px;
        text-align: center;
        line-height: 47px;
    }
    
    .process-table .circle-container .circle {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        font-weight: normal;
        letter-spacing: 0.21px;
        color: #2f353a;
    }
    
    .process-table .red-circle {
        width: 30px;
        height: 30px;
        background-color: #ff5353;
        border-radius: 100%;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f3b7b7;
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
    
    .stakmodal .nav-tabs li {
        margin-right: 10px;
    }
    
    .stakmodal .nav-tabs li a {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        color: #2e384d;
        padding: 10px 0;
        border: 3px transparent solid;
        border-radius: 0;
    }
    
    .stakmodal .nav-tabs li a.active,
    .stakmodal .nav-tabs li a:hover {
        border: 3px transparent solid;
        border-bottom: 3px #083ac8 solid !important;
    }
    
    .table-responsive {
        max-width: 1200px;
        min-width: 100%;
    }
    
    #emotionModal h5 {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        color: #2e384d;
    }
    
    #emotionModal label {
        font-size: 13px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: #333333;
    }
    
    #emotionModal .form-control,
    #emotionModal .dropdown-toggle {
        height: 40px;
        border: solid 1px #d3d8e1;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: rgba(46, 56, 77, 0.79);
    }
    
    #emotionModal textarea {
        height: 100px !important;
    }
    
    #emotionModal .dropdown-toggle {
        height: 40px;
        border: solid 1px #d3d8e1;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: rgba(46, 56, 77, 0.79);
        display: block;
        border-radius: .25rem;
        line-height: 35px;
        padding: 0 10px;
        text-decoration: none;
    }
    
    #emotionModal .dropdown-toggle::after {
        float: right;
        margin-top: 17px;
    }
    
    #emotionModal .dropdown-menu .dropdown-item {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: rgba(46, 56, 77, 0.79);
    }
    
    #emotionModal .addlink a {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.3px;
        color: #083ac8;
        text-decoration: none;
    }
    
    .highlight-sec .switch {
        position: relative;
        display: inline-block;
        height: 9px;
        margin-right: 34px;
    }
    
    .highlight-sec .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .highlight-sec .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transition: .4s;
        transition: .4s;
        width: 34px;
        height: 14px;
        background-color: #00a9dd54;
    }
    
    .highlight-sec .slider:before {
        position: absolute;
        content: "";
        left: -6px;
        bottom: -3px;
        background-color: #00a9dd;
        -webkit-transition: .4s;
        transition: .4s;
        width: 20px;
        height: 20px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
    }
    
    .highlight-sec input:checked+.slider {
        background-color: #e4e7e9;
    }
    
    .highlight-sec input:focus+.slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    .highlight-sec input:checked+.slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
    
    
    /* Rounded sliders */
    
    .highlight-sec .slider.round {
        border-radius: 34px;
    }
    
    .highlight-sec .slider.round:before {
        border-radius: 50%;
    }
    
    .highlight-sec span.htxt {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }
    
    .highlight-sec {
        position: relative;
    }
    
    .highlight-sec .card {
        width: 308px;
        height: 88px;
        border-radius: 5px;
        border: solid 1px rgba(46, 91, 255, 0.08);
        background-color: #fff;
        border-left: solid 2px #2e5bff;
    }
    
    .highlighttoggle {
        position: absolute;
        right: 15px;
        top: 30px;
    }
    
    .highlight-sec .card .texthead a {
        color: #000;
        margin-top: -14px;
    }
    
    .highlight-sec .card .texthead p {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #2e384d;
        margin: 0;
    }
    
    .highlight-sec .card .updated {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }
    
    .highlight-sec .card .updated span {
        font-size: 11px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #8798ad;
    }
    
    .highlight-sec .card .updated span.txtblue {
        color: #083ac8;
    }
    
    .highlight-sec1 .highlight-slider {
        display: flex;
        justify-content: space-between;
        padding: 0 60px;
        width: 100%;
    }
    
    .highlight-sec1 .card {
        border-left: solid 2px #00c1d4;
    }
    
    .highlight-sec1 .controlbtn {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        margin-top: -15px;
    }
    
    .highlight-sec1 .controlbtn a {
        width: 34px;
        height: 34px;
        border: solid 1px #e5e8eb;
        background-color: #fff;
        border-radius: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ccc;
    }
    
    .highlight-sec1 .controlbtn a.next-icon {
        position: absolute;
        right: 17px;
        top: 0;
    }
    
    .highlight-sec1 .controlbtn a.pre-icon {
        position: absolute;
        left: 17px;
        top: 0;
    }
    
    .tabletop-details {
        background-color: #e0f2f8;
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }
    
    .tabletop-details h2 {
        font-size: 15px;
        font-weight: bold;
        color: #2e384d;
        margin-right: 30px;
    }
    
    .tabletop-details h2 small {
        font-size: 12px;
        letter-spacing: 0.01px;
        color: #708393;
    }
    
    .process-sm-img {
        width: 30px;
        height: 30px;
    }
    
    .process-sm-img img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        object-position: 50% top;
        border-radius: 100%;
        overflow: hidden;
    }
    .red-circle {
        width: 30px;
        height: 30px;
        background-color: #ff5353;
        border-radius: 100%;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f3b7b7;
    }
    .tablecol .list-inline {
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 0.01px;
        color: #708393;
    }
    
    .tablecol {
        display: flex;
        align-items: center;
    }
    
    .tablecolright small {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #708393;
    }
    
    .tablecolright .btndown {
        width: 38px;
        height: 38px;
        border: solid 1px #e5e8eb;
        background-color: #3c3c3d;
        text-decoration: none;
        color: #ccc;
        border-radius: 100%;
        text-align: center;
        line-height: 40px;
    }
    
    .tablecolright .btn-close{
        width: 34px;
        height: 34px;
        border: solid 1px #e5e8eb;
        background-color: #fff;
        border-radius: 100%;
        color: #ccc;
        text-align: center;
        line-height: 33px;
        margin-left: 10px;
    } 
    .border-red{
        border-left: 3px #fa5d48 solid;
        margin-left: -12px;
        padding-left: 6px;
    }
    .border-blue{
        border-left: 3px #4c9ce0 solid;
        margin-left: -12px;
        padding-left: 6px;
    }
    .border-green{
        border-left: 3px #389e22 solid;
        margin-left: -12px;
        padding-left: 6px;
    }
    .staktxt span{
    font-size: 11px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: 0.24px;
      color: #2f353a;
      padding-left: 6px;
        line-height: 12px;
    }
    @media (max-width: 1280px) {
        .highlight-sec .card {
            display: inline-block;
            margin: 0 10px 10px 10px;
        }
        .highlight-sec1 .highlight-slider {
            display: block;
            text-align: center;
        }
        .highlight-sec1 .controlbtn {
            width: 98%;
        }
        .list-inline.pager-list,
        .highlighttoggle {
            padding-right: 40px;
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
        .highlight-sec1 .controlbtn a {
            height: inherit;
            border: none;
            background-color: transparent;
        }
        .highlight-sec1 .controlbtn a.pre-icon {
            left: -4px;
        }
        .highlight-sec1 .highlight-slider {
            padding: 0 20px;
        }
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
    
    .epic-version .custom-select.custom-select1 {
        width: 112px;
    }
    
    .epic-version .custom-select {
        width: 211px;
        height: 40px;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }
    
    .epic-version .nxtbtn {
        width: 109px;
        height: 40px;
        display: inline-block;
        border-radius: 5px;
        border: solid 1px #083ac8;
        background-color: #fff;
        font-size: 13px;
        font-weight: bold;
        line-height: 36px;
        text-align: center;
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
    
    .stakmodal .modal-dialog .modal-content {
        border-radius: 0;
        border: solid 0px rgba(46, 91, 255, 0.08);
    }
    
    .stakmodal .modal-dialog .modal-content .modal-header {
        padding: 5px 1rem;
        border-bottom: 0px solid #dee2e6;
    }
    
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
    
    .stakmodal .nav-tabs li {
        margin-right: 10px;
    }
    
    .stakmodal .nav-tabs li a {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        color: #2e384d;
        padding: 10px 0;
        border: 3px transparent solid;
        border-radius: 0;
    }
    
    .stakmodal .nav-tabs li a.active,
    .stakmodal .nav-tabs li a:hover {
        border: 3px transparent solid;
        border-bottom: 3px #083ac8 solid !important;
    }
    
    .table-responsive {
        max-width: 1200px;
        min-width: 100%;
    }
    
    .highlight-sec {
        position: relative;
    }
    
    .highlight-sec .card {
        width: 308px;
        height: 88px;
        border-radius: 5px;
        border: solid 1px rgba(46, 91, 255, 0.08);
        background-color: #fff;
        border-left: solid 2px #2e5bff;
    }
    
    .highlighttoggle {
        position: absolute;
        right: 15px;
        top: 30px;
    }
    
    .highlight-sec .card .texthead a {
        color: #000;
        margin-top: -14px;
    }
    
    .highlight-sec .card .texthead p {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #2e384d;
        margin: 0;
    }
    
    .highlight-sec .card .updated {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }
    
    .highlight-sec .card .updated span {
        font-size: 11px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #8798ad;
    }
    
    .highlight-sec .card .updated span.txtblue {
        color: #083ac8;
    }
    
    .highlight-sec1 .highlight-slider {
        display: flex;
        justify-content: space-between;
        padding: 0 60px;
        width: 100%;
    }
    
    .highlight-sec1 .card {
        border-left: solid 2px #00c1d4;
    }
    
    .highlight-sec1 .controlbtn {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        margin-top: -15px;
    }
    
    .highlight-sec1 .controlbtn a {
        width: 34px;
        height: 34px;
        border: solid 1px #e5e8eb;
        background-color: #fff;
        border-radius: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ccc;
    }
    
    .highlight-sec1 .controlbtn a.next-icon {
        position: absolute;
        right: 17px;
        top: 0;
    }
    
    .highlight-sec1 .controlbtn a.pre-icon {
        position: absolute;
        left: 17px;
        top: 0;
    }
    
    .highlight-sec .switch {
        position: relative;
        display: inline-block;
        height: 9px;
        margin-right: 34px;
    }
    
    .highlight-sec .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .highlight-sec .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transition: .4s;
        transition: .4s;
        width: 34px;
        height: 14px;
        background-color: #00a9dd54;
    }
    
    .highlight-sec .slider:before {
        position: absolute;
        content: "";
        left: -6px;
        bottom: -3px;
        background-color: #00a9dd;
        -webkit-transition: .4s;
        transition: .4s;
        width: 20px;
        height: 20px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
    }
    
    .highlight-sec input:checked+.slider {
        background-color: #e4e7e9;
    }
    
    .highlight-sec input:focus+.slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    .highlight-sec input:checked+.slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
    
    
    /* Rounded sliders */
    
    .highlight-sec .slider.round {
        border-radius: 34px;
    }
    
    .highlight-sec .slider.round:before {
        border-radius: 50%;
    }
    
    .highlight-sec span.htxt {
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }
    
    .lifecycle-container {
        border: solid 1px #dfe0e2;
        background-color: #fff;
        overflow-y: hidden;
        overflow-x: auto;
        margin-top: 25px;
    }
    
    .lifecycle-main {
        width: 1138px;
        min-width: 100%;
    }
    
    .lifecycle-row {
        display: flex;
    }
    
    .lifecycle-main .col1 {
        width: 34%;
        border-right: 1px #dfe0e2 solid;
    }
    
    .lifecycle-main .col1:last-child {
        border-right: 0px #dfe0e2 solid;
    }
    
    .lifecycle-main .box-head {
        height: 81px;
        width: 404px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
    }
    
    .lifecycle-main .box-head .headleft p {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #2e384d;
        margin: 0;
    }
    
    .lifecycle-main .box-head .headleft small {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.01px;
        color: #708393;
    }
    
    .lifecycle-main .box-head .headright span {
        font-size: 14px;
        letter-spacing: 0.01px;
        color: #708393;
    }
    
    .lifecycle-main .box-head .headright i {
        width: 38px;
        height: 38px;
        border: solid 1px #e5e8eb;
        background-color: #3c3c3d;
        border-radius: 100%;
        text-align: center;
        line-height: 35px;
        font-size: 18px;
        color: #d8d4d4;
        margin-left: 10px;
    }
    
    .lifecycle-main .box-gray {
        height: 44px;
        width: 404px;
        border-bottom: solid 1px #c8ced3;
        border-right: solid 1px #c8ced3;
        background-color: #d9dee1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px;
    }
    
    .lifecycle-main .box-gray.box-gray1 {
        justify-content: flex-end;
    }
    
    .lifecycle-main .box-gray:last-child,
    .lifecycle-main .box-white:last-child {
        border-right: solid 0px #c8ced3;
    }
    
    .lifecycle-main .grayleft span {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
    }
    
    .lifecycle-main .grayleft i {
        color: #73818f;
    }
    
    .lifecycle-main .grayright span {
        width: 44px;
        height: 22px;
        line-height: 23px;
        border-radius: 11px;
        background-color: #3c3c3d;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 0.01px;
        display: inline-block;
        color: #47b2cb;
        text-align: center;
    }
    
    .lifecycle-main .box-white {
        border-bottom: 1px #dfe0e2 solid;
        padding: 15px 20px;
        width: 404px;
        border-right: solid 1px #c8ced3;
    }
    
    .lifecycle-main .process-sm-img {
        width: 30px;
        height: 30px;
        display: inline-block;
    }
    
    .lifecycle-main .process-sm-img img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        object-position: 50% top;
        border-radius: 100%;
        overflow: hidden;
    }
    
    .lifecycle-main .red-circle {
        width: 30px;
        height: 30px;
        background-color: #ff5353;
        border-radius: 100%;
        display: inline-block;
        color: #f3b7b7;
        text-align: center;
        line-height: 31px;
    }
    
    .lifecycle-main .cyclelist {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .lifecycle-main .cyclelist li {
        display: block;
        font-size: 11px;
        letter-spacing: 0.24px;
        font-weight: 500;
        color: #2f353a;
        margin-bottom: 10px;
    }
    
    .lifecycle-main .box-white p {
        font-size: 14px;
        font-weight: normal;
        line-height: 1.71;
        letter-spacing: normal;
        color: #000000;
        margin: 0;
    }
    
    .lifecycle-main .box-head.blue {
        background-color: #e0f2f8;
        border-bottom: 1px #dfe0e2 solid;
    }
    
    .lifecycle-main .box-head.orange {
        background-color: #fff1bc;
        border-bottom: 1px #dfe0e2 solid;
    }
    
    .lifecycle-main .box-head.green {
        background-color: #ecf8d5;
        border-bottom: 1px #dfe0e2 solid;
    }
    
    #painpointModal h5 {
        font-size: 24px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.02px;
        color: #000000;
    }
    
    #painpointModal .modal-dialog {
        max-width: 90%;
        width: 90%;
    }
    
    .modal-body {
        overflow-y: hidden;
        overflow-x: auto;
    }
    
    .scrollwraper {
        width: 1115px;
    }
    
    .paintpointgraph {
        border-left: 1px #ccc solid;
        border-bottom: 1px #ccc solid;
        height: 430px;
        display: flex;
        margin-top: 30px;
        position: relative;
    }
    
    .paintpointgraph-cycle {
        display: flex;
    }
    
    .paintpointgraph-cycle .box {
        width: 34%;
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #2e384d;
        margin: 10px 0;
    }
    
    .paintpointgraph .box {
        width: 34%;
        border-right: 1px #ccc solid;
    }
    
    .paintpointgraph .box:last-child {
        border: none;
    }
    
    #painpointModal .modal-body {
        padding: 1rem 2.5rem;
    }
    
    .paintpointanalytics {
        position: absolute;
        left: 30px;
        top: 30px;
        width: 418px;
        height: 151px;
        border-radius: 1px;
        border: solid 1px rgba(46, 91, 255, 0.08);
        background-color: #fff;
        box-shadow: 0 10px 20px 0 rgba(46, 91, 255, 0.07);
        padding: 20px;
    }
    
    .paintpointanalytics h2 {
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.47;
        letter-spacing: normal;
        color: #2e384d;
    }
    
    .paintpointanalytics p {
        font-size: 13px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.85;
        letter-spacing: 0.12px;
        color: #333333;
    }
    
    .paintpointanalytics select {
        border-radius: 1px;
        border: solid 1px rgba(46, 91, 255, 0.08);
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 0.12px;
        color: rgba(0, 0, 0, 0.6);
    }
    
    @media (min-width: 1340px) {
        .lifecycle-main .box-head,
        .lifecycle-main .box-gray,
        .lifecycle-main .box-white {
            width: 34%;
        }
    }
    
    @media (max-width: 1280px) {
        .highlight-sec .card {
            display: inline-block;
            margin: 0 10px 10px 10px;
        }
        .highlight-sec1 .highlight-slider {
            display: block;
            text-align: center;
        }
        .highlight-sec1 .controlbtn {
            width: 98%;
        }
        .list-inline.pager-list,
        .highlighttoggle {
            padding-right: 40px;
        }
    }
    
    @media (max-width: 767px) {
        .dt-btn-sec {
            margin-top: 20px;
        }
    }
    
    @media (max-width: 860px) {
        .highlighttoggle {
            position: absolute;
            right: 50%;
            margin-right: -80px;
            top: 94%;
            padding-right: 0;
        }
    }
    
    @media (max-width: 575px) {
        .dt-project-sec1 .warehousing-slider li {
            width: 57px;
        }
        .dt-screen-main .dt-content-wrapper {
            padding-left: 0px;
        }
        .highlight-sec1 .controlbtn a {
            height: inherit;
            border: none;
            background-color: transparent;
        }
        .highlight-sec1 .controlbtn a.pre-icon {
            left: -4px;
        }
        .highlight-sec1 .highlight-slider {
            padding: 0 20px;
        }
    }
  
  
    
`;