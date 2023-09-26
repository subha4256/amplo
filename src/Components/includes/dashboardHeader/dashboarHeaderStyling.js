/* dashboard header css */
import styled from 'styled-components';

export const DashboardHeaderNav = styled.header`
.user-drop.welcomeuser p {
  margin: 0;
  color: #46464A;
  font-size: 14px;
}
.user-drop.welcomeuser{
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
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
.navbar-brand{
  padding-top: 0;
}
.diva-logo{
  width: 115px;
  margin-right: 20px;
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
  z-index: 99999;
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
  height: 3.7rem;
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

.topbar .dropdown-list .dropdown-item .small {
  font-size: 11px;
  font-weight: normal;
  letter-spacing: normal;
  color: #778591;
}

.topbar .dropdown-list .dropdown-item p.font-weight-bold {
  font-size: 14px;
  color: #333333;
}

.topbar .dropdown-list .dropdown-item p {
  font-size: 11px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.64;
  letter-spacing: normal;
  color: #738190;
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

.topbar .nav-item.dropdown .dropdown-toggle::after {
  display: none;
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
    height: 55px;
    padding: 0 10px;
    border-right: 0px #d2d3d4 solid;
    border-left: 1px #d2d3d4 solid !important;
  }

  .topbar .dropdown .dropdown-menu {
    width: auto;
    right: 0;
  }

  .topbar .dropdown.user-drop .dropdown-menu {
    min-width: 89px;
    margin-top: -1px;
  }

  .topbar .dropdown.user-drop .dropdown-menu .dropdown-item {
    display: block;
    padding: 0 10px;
    font-size: 14px;
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
  `;