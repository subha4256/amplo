import styled from 'styled-components';

export const DesignThinkingStakeHolderViewWrapper = styled.div`
.search-list1 .media img {
    height: 48px;
    width: 48px;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 100%;
    overflow: hidden;
}

.dt-screen-main .dt-content-wrapper .right-sec {
    position: relative;
    z-index: 2;
}
.stakeholderdrag{
    display: block;
    padding: 20px !important;
    border-bottom: solid 1px rgba(46, 91, 255, 0.08);
    text-align: center;
    padding: 0;
}
.stakeholderdrag div.media{

}
.no-pointer-event{
    pointer-events:none;
}

.network-circle{
    z-index:1;
}
.jtk-endpoint{
    z-index:2;
}
div.dropdown-menu.show .img-fluid{
    pointer-events:none;
}

.network-circle img{
    pointer-events:none;
}

.dt-left-nav-bar {
    -ms-flex-direction: row;
    flex-direction: row;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    background-color: #f6f7f8;
}

.dt-left-list {
    list-style: none;
    padding: 0;
    width: 55px;
    border: 1px #ccc solid;
    background-color: #fff;
}

.dt-left-nav-bar .dt-left-list li {
    display: block;
    padding: 10px;
    text-align: center;
}

.dt-left-list.stake-list li.dropright .dropdown-toggle::after {
    display: none;
}

.dt-left-list.stake-list li a i.fas.fa-plus {
    text-align: center;
    color: #73818f;
    background-color: #ccc;
    width: 29px;
    height: 29px;
    line-height: 28px;
    font-size: 11px;
    border: solid 1px #e4e6ed;
    background-color: #f6f7fb;
    border-radius: 100%;
}

.dt-left-list.stake-list li .dropdown-menu {
    top: -17px !important;
    left: auto !important;
    width: 290px;
    border-radius: 0;
    padding: 0 !important;
    border: solid 1px #eff2ff !important;
    z-index: 2;
}

.dt-left-list.stake-list li .dropdown-menu h2 {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .5px;
    color: #2e384d;
    padding: 10px 20px;
    margin: 0;
}



.dt-left-list.stake-list .search-area {
    background-color: #efeff0;
}

.dt-left-list.stake-list .form-group.has-search {
    position: relative;
    background-color: #efeff0;
    padding: 5px 10px;
    margin-bottom: 0;
}

.dt-left-list.stake-list .has-search .form-control {
    padding-right: 2.375rem;
    border-radius: 30px;
    border: 0px transparent solid;
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.dt-left-list.stake-list .has-search .form-control-feedback {
    position: absolute;
    right: 12px;
    top: 4px;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}

.dt-left-list.stake-list .filter-box {
    padding: 10px 20px;
}

.dt-left-list.stake-list .filter-box h3 {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.search-btn .btn-gray {
    width: 100%;
    height: 44px;
    border-radius: 30px;
    background-color: #e3e5ec;
    display: flex;
    align-items: center;
    padding: 5px;
    position: relative;
    z-index: 5;
    text-decoration: none;
    border-bottom: 3px #fff solid;
    box-shadow: 3px 3px 0px #e3e5ec;
    margin-bottom: 20px;
}

.search-btn .btn-gray .btn-txt {
    width: 33px;
    height: 33px;
    font-size: 22.4px;
    line-height: 28px;
    text-align: center;
    color: #000000;
    background-color: #fff;
    border-radius: 100%;
    margin-right: 10px;
}

.search-btn .btn-gray span {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
    letter-spacing: .5px;
}

.search-btn .net-stake-txt {
    display: flex;
    justify-content: center;
    padding: 40px 0;
}

.search-btn .net-stake-txt span {
    font-size: 13px;
    font-weight: 400;
    color: #727373;
    padding: 0 25px;
}

.dt-left-list.stake-list .close {
    margin-top: -5px;
    line-height: 1;
    text-shadow: none;
    opacity: 1;
}

.dt-left-list.stake-list .search-list1 {
    list-style: none;
    padding: 0;
    position: relative;
}

.dt-left-list.stake-list .search-list1 li {
    display: block;
    padding: 20px !important;
    border-bottom: solid 1px rgba(46, 91, 255, 0.08);
    text-align: center;
    padding: 0;
}

.dt-left-list.stake-list .search-list1 li.active {
    background-color: #e6ebf8;
}

.search-list1 .media img {
    height: 48px;
    width: 48px;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 100%;
    overflow: hidden;
}

.search-list1 .media .media-body h5 {
    font-family: 'Rubik', sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.47;
    letter-spacing: .5px;
    color: #2e384d;
    margin-bottom: 5px;
}

.search-list1 .media .media-body p {
    font-size: 15px;
    font-weight: normal;
    letter-spacing: normal;
    color: #8798ad;
    margin: 0;
}

.search-list1 .card-body {
    padding: 10px
}

.search-list1 .search-letter {
    position: absolute;
    right: 0;
    top: 4px;
    width: 30px;
}

.isInfluencedEndpoint{
    display:none;
}
.biArrowEndpoint{
    display:none;
}

.search-list1 .search-letter .search-txt {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 18px;
    color: #333;
    text-transform: uppercase;
}

.dt-left-list.stake-list li.arrow-list .dropdown-menu {
    top: -14px !important;
    left: -6px !important;
    padding: 20px 20px 0 20px !important;
    min-width: 259px;
    width: 259px;
    border: solid 1px #e4e6ed !important;
}

.arrow-list .dropdown-menu .arrow-type {
    width: 60px;
    text-align: center;
}

.arrow-list .dropdown-menu .arrow-type a {
    width: 60px;
    height: 57px;
    border: solid 1px #e4e6ed;
    background-color: #fff;
    text-align: center;
    line-height: 55px;
    line-height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 7px;
}

.arrow-list .dropdown-menu .arrow-type a.active {
    border: solid 2px #083ac8;
}

.arrow-list .dropdown-menu .arrow-type p {
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    color: #2e384d;
}

.dt-left-list.stake-list li.arrow-list .dropdown-menu h2 {
    padding: 0 0 15px 0 !important;
}
.network-circle .ep{
    width: 86%;
    height: 94%;
    margin: 0 auto;
    background:transparent;
    border-radius: 50%;
    z-index:2;
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

.dt-project-sec1 .form-group {
    margin: 0;
}

.dt-project-sec1 .custom-select {
    width: 67px;
    height: 40px;
}

.dt-project-sec1 .form-group input {
    height: 40px;
    width: 303px;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.updated-col span {
    font-size: 12px;
    font-weight: normal;
    color: #6b6b6b;
    display: inline-block;
    padding-top: 10px;
    padding-left: 10px;
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
    display: flex;
    margin-top: 0px;
    width: 100%;
    overflow: hidden;
}

.dt-screen-main .dt-content-wrapper {
    background-color: #f6f7f8;
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
}

.dt-screen-main .dt-content-wrapper .right-sec .custom-select {
    width: 148px;
    height: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.14);
    background-color: #fff;
    border: 0px transparent solid;
    font-size: 14px;
    font-weight: normal;
    color: #2c2c2c !important;

}

.dt-screen-main .dt-content-wrapper .right-sec .stake-menu-icon {
    width: 44px;
    height: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.14);
    background-color: #fff;
    padding: 10px 15px;
    display: inline-block;
    margin-left: 15px;
}

.dt-screen-main .dt-content-wrapper .right-sec .stake-menu-icon.dropleft .dropdown-toggle::before {
    display: none;
}

.dt-screen-main .dt-content-wrapper .right-sec .stake-menu-icon.dropleft .dropdown-menu {
    width: 107px;
    min-width: 107px;
    border-radius: 3px;
    border: solid 1px #c8ced3;
    padding: 0;
    top: 32px !important;
    left: 32px !important;
}

.dt-screen-main .dt-content-wrapper .right-sec .stake-menu-icon.dropleft .dropdown-menu a {
    display: block;
    padding: 10px 10px;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.2px;
    color: #2f353a;
    text-decoration: none;
}

.right-sec .stake-menu-icon i {
    color: #6f6f6f;
}

.network-influence-graph .network-first-circle {
    height: 675px;
    width: 675px;
    background-color: #fff;
    border: solid 1px #e4e6ed;
    margin: 0 auto;
    border-radius: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.network-influence-graph .network-second-circle {
    width: 468px;
    height: 468px;
    border: solid 1px #e4e6ed;
    background-color: #f6f7fb;
    margin: 0 auto;
    border-radius: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

}

.network-influence-graph .network-third-circle {
    width: 247px;
    height: 247px;
    border: solid 1px #d9dadd;
    background-color: #e3e5ec;
    margin: 0 auto;
    border-radius: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.network-circle {
    width: 25px;
    height: 25px;
    line-height: 19px;
    border-radius: 100%;
    position: absolute;
    left: 0;
    padding: 2px;
}

.network-circle.circle-green {
    background-color: #aace7a;
}
.network-circle.circle-yellow {
    background-color: #f7d474;
}
.network-circle.circle-blue {
    background-color: #36a2eb;
}

.network-circle.circle-red {
    background-color: #ec605a;
}

.network-circle.circle-img {
    // background-color: #aace7a;
}

.network-circle.circle-img img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 100%;
}

.network-circle.circle1 {
    left: 10%;
    top: 23%;
}

.network-circle.circle2 {
    left: 5%;
    top: 54%;
}

.network-circle.circle3 {
    left: 20%;
    top: 83%;
}

.network-circle.circle4 {
    left: 39%;
    bottom: 7%;
}

.network-circle.circle5 {
    left: 72%;
    bottom: 10%;
}

.network-circle.circle6 {
    left: 90%;
    top: 31%;
}

.network-influence-graph .circle-text {
    font-family: Arial;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 0.23px;
    color: #73818f;
    position: absolute;
    left: 50%;
    bottom: 1%;
}

.network-second-circle .network-circle.circle1 {
    left: 19%;
    top: 17%;
}

.network-second-circle .network-circle.circle2 {
    left: 38%;
    top: 4%;
}

.network-second-circle .network-circle.circle3 {
    left: 59%;
    top: 7%;
}

.network-second-circle .network-circle.circle4 {
    left: 74%;
    top: 20%;
}

.network-second-circle .network-circle.circle5 {
    left: 43%;
    bottom: 6%;
}

.network-second-circle .network-circle.circle-img {
    background-color: #36a2eb;
}

.network-third-circle .network-circle.circle-img {
    background-color: #ec605a;
}

.network-third-circle .network-circle.circle1 {
    left: 19%;
    top: 17%;
}

.network-third-circle .network-circle.circle2 {
    left: 69%;
    top: 11%;
}

.network-third-circle .network-circle.circle3 {
    left: 42%;
    top: 36%;
}

.network-third-circle .network-circle.circle4 {
    left: 23%;
    top: 68%;
}

.network-influence-buttons .btn-gray {
    width: 172px;
    height: 44px;
    border-radius: 30px;
    background-color: #bdbdbd;
    display: flex;
    align-items: center;
    padding: 5px;
    position: relative;
    z-index: 5;
    text-decoration: none;
    border-bottom: 3px #fff solid;
    box-shadow: 3px 3px 0px #e3e5ec;
    margin: 0 25px;
}

.network-influence-buttons .btn-gray .btn-txt {
    width: 34px;
    height: 34px;
    font-size: 22.4px;
    font-weight: 700;
    text-align: center;
    color: #000000;
    background-color: #fff;
    border-radius: 100%;
    margin-right: 10px;
}

.network-influence-buttons .btn-gray span {
    font-size: 15.4px;
    font-weight: 700;
    color: #fff;
}

.network-influence-buttons .net-btn {
    display: flex;
    justify-content: center;
}

.net-stake-txt {
    display: flex;
    justify-content: center;
    padding: 40px 0;
}

.net-stake-txt span {
    font-size: 13px;
    font-weight: 400;
    color: #727373;
    padding: 0 25px;
}

.dot-green {
    width: 8px;
    height: 8px;
    background-color: #bdd441;
    padding: 0 !important;
    display: inline-block;
    border-radius: 100%;
    margin-right: 5px;
}

.dot-red {
    width: 8px;
    height: 8px;
    background-color: #ff5353;
    padding: 0 !important;
    display: inline-block;
    border-radius: 100%;
    margin-right: 5px;
}

.dot-blue {
    width: 8px;
    height: 8px;
    background-color: #00a4f1;
    padding: 0 !important;
    display: inline-block;
    border-radius: 100%;
    margin-right: 5px;
}

.dot-yellow {
    width: 8px;
    height: 8px;
    background-color: #f7d474;
    padding: 0 !important;
    display: inline-block;
    border-radius: 100%;
    margin-right: 5px;
}

.modal-open {
    overflow: auto;
    padding-right: 0 !important;
}

.modal-open .modal-backdrop {
    background-color: transparent;
    display: none;
}

.stakmodal .modal-dialog {
    max-width: 418px;
    margin: 1.75rem 16% 0 auto;
}

.stakmodal .modal-dialog .modal-content {
    border-radius: 0;
    border: solid 1px rgba(46, 91, 255, 0.08);
}

.stakmodal .modal-dialog .modal-content .modal-header {
    padding: 5px 1rem;
    border-bottom: 0px solid #dee2e6;
}

.stakmodal .modal-dialog .modal-body {
    padding: 0 1rem;
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

.modal.stakmodal {
    position: absolute;
    z-index: 3;
}

.circle-container {
    display: block;
    width: 100%;
    margin-top: -80px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0px 0 30px 0;
}
.network-influence-graph{
    margin-top: -80px;
}

@media (max-width: 1400px) {
    .network-influence-graph .network-first-circle {
        height: 535px;
        width: 535px;
    }
    .network-influence-graph .network-second-circle {
        width: 390px;
        height: 390px;
    }
    .network-influence-graph .network-third-circle {
        width: 220px;
        height: 220px;
    }
}
@media (max-width: 992px) {
    .network-influence-graph .network-first-circle {
        height: 500px;
        width: 500px;
    }
    .network-influence-graph .network-second-circle {
        width: 350px;
        height: 350px;
    }
    .network-influence-graph .network-third-circle {
        width: 190px;
        height: 190px;
    }
}

@media (max-width: 800px) {
    .network-influence-graph{
        margin-top: 0px;
    }
    .right-sec {
        padding-right: 30px;
    }

    .dt-screen-main .dt-content-wrapper .right-sec .custom-select {
        width: 120px;
    }

    .circle-container {
        display: block;
        width: auto;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding: 0px 40px 30px 0;
        margin-right: 30px;
        margin-top: 0;
    }

    .dt-btn-sec.text-right {
        text-align: left !important;
        padding-left: 15px;
        margin-top: 10px;
    }
    .network-influence-buttons .net-btn, .net-stake-txt{
        flex-wrap: wrap;
    }
}

@media (max-width: 767px) {
    .dt-left-list.stake-list li .dropdown-menu {
        left: 11px !important;
        width: 250px;
    }
    .dt-left-list.stake-list li.arrow-list .dropdown-menu {
        left: 47px !important;
        min-width: 250px;
        width: 250px;
    }
    .network-influence-buttons .btn-gray{
        margin: 0 10px 10px 10px;
    }
    .modal-body {
        max-width: 900px;
        overflow-x: auto;
   }
   .popup-responsive{
    width: 370px;
    padding-right: 20px;
}
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
    width: 37px;
  }
`;