import styled from 'styled-components';

export const SidebarWrapper = styled.div `
.bg-gradient-primary .toggale-arrow{
  background-color: #252a2e;
}
.sidebar-container-bg {
  background-color: #3a4248;
  font-family: 'sf_ui_displayregular' !important;
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
.bg-gradient-primary{
  height: 100% !important;
  z-index: 1050;
  position: relative !important;
  background: #e4e5e6 !important;
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
}

.sidebar .nav-item {
  position: relative;
}

.sidebar .nav-item:last-child {
  margin-bottom: 1rem;
}

.sidebar .nav-item .nav-link {
  text-align: center;
  padding: 0.75rem 1rem;
  width: 6.5rem;
}

.sidebar .nav-item .nav-link span {
  font-size: 0.65rem;
  display: block;
  font-family: 'sf_ui_displayregular' !important;
}
.sidebar .nav-item.active{
  background-color: #2d353c;
  margin-bottom: 18px;
}
.sidebar .nav-item.active .nav-link {
  font-weight: 700 !important;
  padding: 11px 1em;
}

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

/* .sidebar .nav-item .collapse .collapse-inner,
.sidebar .nav-item .collapsing .collapse-inner {
  padding: .5rem 0;
  min-width: 10rem;
  font-size: 0.85rem;
  margin: 0;
} */

/* .sidebar .nav-item .collapse .collapse-inner .collapse-header,
.sidebar .nav-item .collapsing .collapse-inner .collapse-header {
  margin: 0;
  white-space: nowrap;
  padding: .5rem 1.5rem;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.65rem;
  color: #b7b9cc;
} */

.sidebar .nav-item .collapse .collapse-inner .collapse-item,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item {
  padding: 0.5rem 2.4rem;
  margin: 0;
  display: block;
  color: #fff;
  text-decoration: none;
  border-radius: 0;
  white-space: nowrap;
  font-size: 15px !important;
  letter-spacing: 0.21px;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-item:hover,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item:hover {
  background-color: #20a8d8;
  color: #fff !important;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-item:active,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item:active {
  background-color: #20a8d8;
  color: #fff !important;
}

.sidebar .nav-item .collapse .collapse-inner .collapse-item.active,
.sidebar .nav-item .collapsing .collapse-inner .collapse-item.active {
  font-weight: 400;
  background-color: #20a8d8;
}

.sidebar #sidebarToggle {
  width: 2.5rem;
  height: 50px;
  text-align: center;
  margin-bottom: 0;
  cursor: pointer;
}
.sidebar.toggled #sidebarToggle{
 margin-right: 20px;
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
  text-align: center;
  padding: 0 1rem;
  font-weight: 400;
  letter-spacing: 0.17px;
}

@media (max-width: 767px) {
  .sidebar .sidebar-heading {
    font-size: 9px !important;
    display: none;
  }
  .sidebar #sidebarToggle{
    margin-right: 20px;
   }
  .sidebar .nav-item .nav-link span {
    display: none;
  }

  .sidebar .nav-item .nav-link {
    width: 60px;
  }

  .sidebar {
    width: 68px;
  }
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
    background-color: transparent !important;
    padding: 0 !important;

  }

  .sidebar .nav-item .collapse .collapse-inner a {
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.21px;
    color: #fff;
  }

  .sidebar .nav-item .collapsing {
    display: block;
    -webkit-transition: height 0.15s ease;
    transition: height 0.15s ease;
  }

  .sidebar .nav-item .collapse,
  .sidebar .nav-item .collapsing {
    margin: 0;
  }

  .sidebar .nav-item .nav-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 1rem;
    width: 14rem;
  }

  .sidebar .nav-item .nav-link i {
    font-size: 0.85rem;
    margin-right: 0.25rem;
    display: inline-block;
    width: 20px;
    vertical-align: top;
    margin-top: 4px;
  }

  .sidebar .nav-item .nav-link span {
    font-size: 15px;
    // display: inline;
    font-weight: 400;
    display: inline-block;
    width: 148px;
    letter-spacing: 0.21px;
  }

  .sidebar .nav-item .nav-link[data-toggle="collapse"]::after {
    width: 1rem;
    text-align: right;
    margin-top: 4px;
    float: right;
    vertical-align: 0;
    border: 0;
    font-weight: 900;
    content: '\f0de';
    font-family: 'Font Awesome 5 Free';
    color: #e4e5e6;
  }

  .sidebar .nav-item .nav-link[data-toggle="collapse"].collapsed::after {
    content: '\f0dd';
    margin-top: -2px;
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

  .sidebar.toggled {
    overflow: visible;
    width: 80px !important;
  }

  .sidebar.toggled .nav-item .collapse {
    position: absolute;
    left: calc(6.5rem + -40px / 2);
    z-index: 1;
    background-color: #fff;
    top: 2px;
    /* -webkit-animation-name: growIn;
    animation-name: growIn;
    -webkit-animation-duration: 200ms;
    animation-duration: 200ms;
    -webkit-animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1), opacity cubic-bezier(0, 1, 0.4, 1);
    animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1), opacity cubic-bezier(0, 1, 0.4, 1); */
  }

  .sidebar.toggled .nav-item .collapse .collapse-inner {
    -webkit-box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
    border-radius: 0.35rem;
  }
  .sidebar.toggled .nav-item .collapse .collapse-inner a{
    color: #333;
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

  .sidebar.toggled .nav-item:last-child {
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
}

.sidebar-light .sidebar-brand {
  color: #6e707e;
}

.sidebar-light hr.sidebar-divider {
  border-top: 1px solid #eaecf4;
}

.sidebar-light .sidebar-heading {
  color: #b7b9cc;
}

.sidebar-light .nav-item .nav-link {
  color: #858796;
}

.sidebar-light .nav-item .nav-link i {
  color: #d1d3e2;
}

.sidebar-light .nav-item .nav-link:active,
.sidebar-light .nav-item .nav-link:focus,
.sidebar-light .nav-item .nav-link:hover {
  color: #6e707e;
}

.sidebar-light .nav-item .nav-link:active i,
.sidebar-light .nav-item .nav-link:focus i,
.sidebar-light .nav-item .nav-link:hover i {
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
  background-color: #eaecf4;
}

.sidebar-light #sidebarToggle::after {
  color: #b7b9cc;
}

.sidebar-light #sidebarToggle:hover {
  background-color: transparent;
}

.sidebar-dark .sidebar-brand {
  color: #000;
  background-color: #fff;
}

.sidebar-dark hr.sidebar-divider {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.sidebar-dark .sidebar-heading {
  color: rgba(255, 255, 255, 0.4);
}

.sidebar-dark .nav-item .nav-link {
  color: #fff;
  font-size: 15px;
}

.sidebar-dark .nav-item .nav-link i {
  color: rgba(255, 255, 255, 0.3);
}

.sidebar-dark .nav-item .nav-link:active,
.sidebar-dark .nav-item .nav-link:focus,
.sidebar-dark .nav-item .nav-link:hover {
  color: #fff;
}

.sidebar-dark .nav-item .nav-link:active i,
.sidebar-dark .nav-item .nav-link:focus i,
.sidebar-dark .nav-item .nav-link:hover i {
  color: #fff;
}

.sidebar-dark .nav-item .nav-link[data-toggle="collapse"]::after {
  color: rgba(255, 255, 255, 0.78)
}

.sidebar-dark .nav-item.active .nav-link {
  color: #fff;
}

.sidebar-dark .nav-item.active .nav-link i {
  color: #fff;
}

.sidebar-dark #sidebarToggle {
  background-color: transparent !important;
}

.sidebar .nav-item .nav-link .badge-counter.beta-b {
  margin-top: 4px;
  width: 42px;
}

.sidebar-dark #sidebarToggle::after {
  color: rgba(255, 255, 255, 0.5);
}

.sidebar-dark #sidebarToggle:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.sidebar-dark.toggled #sidebarToggle::after {
  color: rgba(255, 255, 255, 0.5);
}
`;