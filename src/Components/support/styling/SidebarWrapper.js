import styled from 'styled-components';

export const SidebarWrapper = styled.div`
.bg-gradient-primary {
    background-color: #3a4248;
    background-size: cover;
}

.sidebar-container-bg {
    background-color: #3a4248;
}

.text-uppercase,
.dropdown .dropdown-menu .dropdown-header,
.sidebar .sidebar-heading {
    text-transform: uppercase !important;
}

.sidebar .sidebar-heading {
    font-size: 12px;
    color: #fff !important;
}

@-webkit-keyframes growIn {
    0% {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
        opacity: 0;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes growIn {
    0% {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
        opacity: 0;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}

.animated--grow-in,
.sidebar .nav-item .collapse {
    -webkit-animation-name: growIn;
    animation-name: growIn;
    -webkit-animation-duration: 200ms;
    animation-duration: 200ms;
    -webkit-animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1), opacity cubic-bezier(0, 1, 0.4, 1);
    animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1), opacity cubic-bezier(0, 1, 0.4, 1);
}

.dropdown .dropdown-menu {
    font-size: 0.85rem;
}

.dropdown .dropdown-menu .dropdown-header {
    font-weight: 800;
    font-size: 0.65rem;
    color: #b7b9cc;
}

.dropdown.no-arrow .dropdown-toggle::after {
    display: none;
}

.sidebar .nav-item.dropdown .dropdown-toggle::after {
    width: 1rem;
    text-align: center;
    float: right;
    vertical-align: 0;
    border: 0;
    font-weight: 900;
    content: '\f105';
    font-family: 'Font Awesome 5 Free';
}

.sidebar .nav-item.dropdown.show .dropdown-toggle::after {
    content: '\f107';
}

.sidebar .nav-item .nav-link {
    position: relative;
}

.sidebar .nav-item .nav-link .badge-counter {
    position: absolute;
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
    -webkit-transform-origin: top right;
    transform-origin: top right;
    right: .25rem;
    margin-top: -.25rem;
}

.sidebar .nav-item .nav-link .img-profile {
    height: 2rem;
    width: 2rem;
}

.sidebar {
    width: 6.5rem;
    /* min-height: 100vh; */
}

.sidebar .nav-item {
    position: relative;
}

.sidebar .nav-item:last-child {
    margin-bottom: 1rem;
}

.sidebar .nav-item .nav-link {
    text-align: left;
    padding: 0.75rem 20px;
    width: 100%;
}


/* 
.sidebar .nav-item .nav-link span {
    font-size: 0.65rem;
    display: block;
}

.sidebar .nav-item.active .nav-link {
    font-weight: 700;
} */

.sidebar .nav-item .collapse {
    position: absolute;
    left: calc(6.5rem + 1.5rem / 2);
    z-index: 1;
    top: 2px;
}

.sidebar .nav-item .collapse .collapse-inner {
    border-radius: 0.35rem;
    -webkit-box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

.sidebar .nav-item .collapsing {
    display: none;
    -webkit-transition: none;
    transition: none;
}

.sidebar .nav-item .collapse .collapse-inner,
.sidebar .nav-item .collapsing .collapse-inner {
    padding: .5rem 0;
    min-width: 10rem;
    font-size: 0.85rem;
    margin: 0 0 1rem 0;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-header,
.sidebar .nav-item .collapsing .collapse-inner .collapse-header {
    margin: 0;
    white-space: nowrap;
    padding: .5rem 1.5rem;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 0.65rem;
    color: #b7b9cc;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-item,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item {
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    display: block;
    color: #3a3b45;
    text-decoration: none;
    border-radius: 0.35rem;
    white-space: nowrap;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-item:hover,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item:hover {
    background-color: #eaecf4;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-item:active,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item:active {
    background-color: #dddfeb;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-item.active,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item.active {
    color: #4e73df;
    font-weight: 700;
}

.sidebar #sidebarToggle {
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
    cursor: pointer;
}

.sidebar #sidebarToggle::after {
    font-weight: 900;
    content: '\f104';
    font-family: 'Font Awesome 5 Free';
    margin-right: 0.1rem;
}

.sidebar #sidebarToggle:hover {
    text-decoration: none;
}

.sidebar #sidebarToggle:focus {
    outline: none;
}

.sidebar.toggled {
    width: 0 !important;
    overflow: hidden;
}

.sidebar.toggled #sidebarToggle::after {
    content: '\f105';
    font-family: 'Font Awesome 5 Free';
    margin-left: 0.25rem;
}

.sidebar .sidebar-brand {
    height: 54px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 800;
    padding: 1.5rem 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    z-index: 1;
}

.sidebar .sidebar-brand .sidebar-brand-icon i {
    font-size: 2rem;
}

.sidebar .sidebar-brand .sidebar-brand-text {
    display: block;
}

.sidebar hr.sidebar-divider {
    margin: 0 1rem 1rem;
}

.sidebar .sidebar-heading {
    text-align: left;
    padding: 0 20px;
    font-weight: 800;
}

@media (min-width: 768px) {
    .sidebar {
        width: 14rem !important;
    }
    .sidebar .nav-item .collapse {
        position: relative;
        left: 0;
        z-index: 1;
        top: 0;
        -webkit-animation: none;
        animation: none;
    }
    .sidebar .nav-item .collapse .collapse-inner {
        border-radius: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .sidebar .nav-item .collapsing {
        display: block;
        -webkit-transition: height 0.15s ease;
        transition: height 0.15s ease;
    }
    .sidebar .nav-item .collapse,
    .sidebar .nav-item .collapsing {
        margin: 0 1rem;
    }
    .sidebar .nav-item .nav-link {
        display: block;
        width: 100%;
        text-align: left;
        padding: 5px 1rem 5px 32px;
        width: 14rem;
    }
    .sidebar .nav-item .nav-link i {
        font-size: 0.85rem;
        margin-right: 0.25rem;
    }
    .sidebar .nav-item .nav-link span {
        font-size: 14px;
        display: inline;
    }
    .sidebar .nav-item .nav-link[data-toggle="collapse"]::after {
        width: 1rem;
        text-align: center;
        float: right;
        vertical-align: 0;
        border: 0;
        font-weight: 900;
        content: '\f107';
        font-family: 'Font Awesome 5 Free';
    }
    .sidebar .nav-item .nav-link[data-toggle="collapse"].collapsed::after {
        content: '\f105';
    }
    .sidebar .sidebar-brand .sidebar-brand-icon i {
        font-size: 2rem;
    }
    .sidebar .sidebar-brand .sidebar-brand-text {
        display: inline;
        color: #000;
    }
    .sidebar .sidebar-heading {
        text-align: left;
    }
    /* .sidebar.toggled {
        overflow: visible;
        width: 80px !important;
    } */
    .sidebar.toggled .sidebar-brand {
        font-size: 13px;
    }
    .sidebar.toggled .nav-item .collapse {
        position: absolute;
        left: calc(6.5rem + 1.5rem / 2);
        z-index: 1;
        top: 2px;
        -webkit-animation-name: growIn;
        animation-name: growIn;
        -webkit-animation-duration: 200ms;
        animation-duration: 200ms;
        -webkit-animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1), opacity cubic-bezier(0, 1, 0.4, 1);
        animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1), opacity cubic-bezier(0, 1, 0.4, 1);
    }
    .sidebar.toggled .nav-item .collapse .collapse-inner {
        -webkit-box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
        box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
        border-radius: 0.35rem;
    }
    .sidebar.toggled .nav-item .collapsing {
        display: none;
        -webkit-transition: none;
        transition: none;
    }
    .sidebar.toggled .nav-item .collapse,
    .sidebar.toggled .nav-item .collapsing {
        margin: 0;
    }
    /* .sidebar.toggled .nav-item:last-child {
        margin-bottom: 1rem;
    }
    .sidebar.toggled .nav-item .nav-link {
        text-align: center;
        padding: 0.70rem 10px;
        width: 70px;
    }
    .sidebar.toggled .nav-item .nav-link span {
        font-size: 0.65rem;
        display: none;
    }
    .sidebar.toggled .nav-item .nav-link i {
        margin-right: 0;
    }
    .sidebar.toggled .nav-item .nav-link[data-toggle="collapse"]::after {
        display: none;
    }
    .sidebar.toggled .sidebar-brand .sidebar-brand-icon i {
        font-size: 2rem;
    }
    .sidebar.toggled .sidebar-brand .sidebar-brand-text {
        display: block;
    }
    .sidebar.toggled .sidebar-heading {
        text-align: center;
        font-size: 9px;
        display: none;
    }
    */
}

.sidebar .nav-item .nav-link .badge-counter.beta-b {
    margin-top: 4px;
    margin-right: 10px;
}


/* Light Sidebar */

.sidebar.sidebar-light {
    height: 100% !important;
}

.sidebar.sidebar-light .nav-item .nav-link .badge-counter.beta-b {
    margin-top: 0px !important;
    margin-right: 10px;
    border-radius: 30px;
    background-color: #4db4cc;
    color: #fff;
    padding: 7px 20px;
}

.bg-gradient-primary.sidebar-light {
    background-color: #fff !important;
    border-right: 1px #e1e2e3 solid;
}

.sidebar-light .sidebar-container-bg {
    background-color: #fff;
}

.sidebar.sidebar-light .nav-item.active {
    background-color: #e6e7e8;
    margin-bottom: 15px;
    height: 55px;
    padding-top: 12px;
}

.sidebar.sidebar-light .nav-item.active span {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #333333
}

.sidebar-light .sidebar-brand {
    color: #6e707e;
}

.sidebar-light hr.sidebar-divider {
    border-top: 1px solid #eaecf4;
}

.sidebar-light .sidebar-heading {
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0.17px;
    color: #4db4cc !important;
    margin: 11px 0;
}

.sidebar-light .nav-item .nav-link {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: 0.2px;
    color: #333333;
    padding: 6px 1rem 6px 32px;
}

.sidebar-light .nav-item .nav-link i {
    color: #d1d3e2;
}

.sidebar-light .nav-item .nav-link:active,
.sidebar-light .nav-item .nav-link:focus,
.sidebar-light .nav-item .nav-link:hover {
    color: #6e707e;
}

.sidebar-light .nav-item .nav-link[data-toggle="collapse"]::after {
    color: #b7b9cc;
}

.sidebar-light .nav-item.active .nav-link {
    color: #6e707e;
}

.sidebar-light .nav-item.active .nav-link i {
    color: #6e707e;
}

.sidebar-light #sidebarToggle {
    background-color: transparent !important;
}

.sidebar-light #sidebarToggle::after {
    color: #8e909e;
    font-size: 24px;
}

.sidebar-light #sidebarToggle:hover {
    background-color: transparent;
}

.bottom-bg {
    height: 51px;
    background-color: #e6e7e8a8;
    margin-top: 80px;
    padding-top: 5px;
}

@media (max-width: 767px) {
    .sidebar-light.sidebar {
        width: 250px;
    }
}


/* End Light Sidebar */
`