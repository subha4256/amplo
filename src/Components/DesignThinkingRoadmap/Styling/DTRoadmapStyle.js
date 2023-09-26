import styled from 'styled-components';

export const DTRoadmapStyle = styled.div`
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
    
    button:focus,
    textarea:focus,
    input:focus {
        outline: none !important;
        box-shadow: none !important;
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
    .epic-version h2 .dropdown-toggle{
        color: #000 !important;
    }
    .epic-version .pager-list a {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: normal;
        color: #083ac8;
        text-decoration: none;
    }
    
    .epic-version .pager-list .nextbtn {
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
    .sliderbar .graybar{
        width: 682px;
        max-width: 100%;
      height: 12px;
      border-radius: 6px;
      background-color: #d8d8d8;
      margin: 0 auto;
      position: relative;
    }
    .sliderbar .graybar .innerbar{
        position: absolute;
        left: 10%;
        width: 450px;
      height: 12px;
      border-radius: 6px;
      background-color: #808080;
    }
    .sliderbar .graybar .innerbar i{
        width: 20px;
        height: 20px;
        background-color: #726c6c;
        border-radius: 100%;
        position: absolute;
        color: #fff;
        text-align: center;
        line-height: 20px;
        top: -5px;
        left: -5px;
        cursor: pointer;
    }
    .sliderbar .graybar .innerbar i.fa-caret-right{
        right: 0;
        left: inherit;
        margin-left: auto;
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
    .dt-project-sec1 .warehousing-slider li.active::before {
        background-color: #20a8d8;
    }
    .dt-project-sec1 .warehousing-slider li:last-child:before {
        display: none;
    }
    .roadmap-responsive .roadmap-row1{
    height: 92px;
    width: 1215px;
    }
    .roadmap-responsive .col-milestone{
        width: 40px;
        height: 92px;
        background-color: #083ac8;
        position: relative;
        float: left;
    }
    
    .roadmap-responsive .roadmap-row2 {
        float: left;
        width: 1215px;
    }
    .roadmap-responsive .roadmap-row2 .col-milestone{
        height: 123px;
    }
    .roadmap-responsive .roadmap-row2 .col-milestone p{
        top: 46px;
    }
    .roadmap-responsive .col-milestone p{
        transform: rotate(-90deg);
        position: absolute;
        margin: 0;
        left: -20px;
        width: 80px;
        top: 30px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.01px;
        color: #fff;
    }
    .roadmap-row2 .roadmap-sm-row{
        float: left;
        margin-bottom: 5px;
    }
    .roadmap-row2 .roadmap-sm-row:last-child{
        margin-bottom: 0;
    }
    .roadmap-responsive p{
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.01px;
        color: #fff;
        margin: 0;  
    }
    .roadmap-responsive .col-owner{
        width: 83px;
      height: 92px;
      padding: 10px;
      background-color: #768eb3;
      float: left;
      display: flex;
      align-items: center;
      margin-left: 7px;
      margin-right: 15px;
    }
    .roadmap-responsive .lg-box{
        width: 265px;
        height: 92px;
        font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.01px;
      color: #333333;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      border-right: 1px #fff solid;
    }
    .roadmap-responsive .col-blue{
      background-color: #e0f2f8;
    }
    .roadmap-responsive .col-lightblue{
        background-color: #e5f8ff;
    }
    .roadmap-responsive .roadmap-row2 .col-owner{
     height: 27px;
    }
    .roadmap-responsive .roadmap-row2 .task-col{
        height: 27px;
        padding: 3px 10px;
        float: left;
        font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.01px;
      line-height: 23px;
      color: #fff;
      margin-right: 5px;
      cursor: pointer;
    }
    .task-col.bg-red{
        background-color: #e45f48;
    }
    .task-col.bg-green{
        background-color: #7fcd90;
    }
    .task-col.bg-yellow{
        background-color: #fcdc64;
        color: #000 !important;
    }
    .task-col.bg-lightblue{
        background-color: #a8e4f6;
        color: #000 !important;
    }
    .task-col.bg-blue{
        background-color: #ccd1cd;
    }
    .task-row{
        float: left;
        width: 1058px;
        background-color: #f6f7f8;
    }
    .task-row .dropdown-toggle::after{
        display: none;
    }
    .task-row .dropdown-menu{
     border-radius: 4px;
    }
    .task-row .dropdown-menu a{
        font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.17px;
      color: #333333;
      display: flex;
      align-items: center;
      background-color: transparent;
    }
    .task-row .dropdown-menu a i.dots{
        width: 21px;
        height: 21px;
        display: inline-block;
        border-radius: 100%;
        margin-right: 12px;
    }
    .task-row .dropdown-menu a i.dots.dot-green{
        background-color: #7fcd90
    }
    .task-row .dropdown-menu a i.dots.dot-yellow{
        background-color: #fcdc64;
    }
    .task-row .dropdown-menu a i.dots.dot-blue{
        background-color: #ccd1cd
    }
    .task-row .dropdown-menu a i.dots.dot-lightblue{
        background-color: #a8e4f6;
    }
    .task-row .dropdown-menu a i.dots.dot-red{
        background-color: #e45f48;
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
    
    @media (min-width: 1366px) {
    .roadmap-responsive{
        width: 1215px;
    }
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
        .dt-project-sec1 .warehousing-slider li {
            width: 57px;
        }
    
        .dt-screen-main .dt-content-wrapper {
            padding-left: 0px;
        }
    }
    .inner-dropdown{
        left: 157px !important;
        transform: none!important;
        top: -2px!important;
    }
    .inner-dropdown a{
     padding-left: 10px;
     text-decoration: none;
    }
    .dropdown-menu .dropdown-item{
     display: flex;
     justify-content: space-between;
     font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.17px;
      color: #083ac8 !important;
      text-decoration: none;
    }
    .task-row .dropdown-menu a .fa-check{
        background-color: #66be87;
        color: #fff;
        padding: 4px;
        border-radius: 100%;
        margin-left: 24px;
    }     
    
    .resource-table td[style="height: 26px; background-color: rgb(248, 248, 248);"]{
      background-color: #083ac8!important;
      font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.01px;
    color: #fff;
  }
  .resource-table td[ data-resource-id*="r1o"], .resource-table td[ data-resource-id*="r2o"], .resource-table td[ data-resource-id*="r3o"],
  .resource-table td[ data-resource-id="r1"]{
    background-color: #768eb3!important;
    font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.01px;
  color: #fff;
}
.event-container .round-all, .round-tail {
  border-radius: 0 !important;
}
.timeline-event .round-head {
  border-radius: 0;
}

.scheduler-bg-table thead th:nth-child(odd){
  background-color: #e0f2f8!important;
}

.scheduler-bg-table thead th:nth-child(even), .resource-table thead th{
background-color: #e5f8ff!important;
}
.slot-cell {
  display: flex!important;
  align-items: center!important;
}
.dropmenusec .dropDownStyle .inner-dropdown{
  left:137px !important;
  top:-30px!important;
}
`;