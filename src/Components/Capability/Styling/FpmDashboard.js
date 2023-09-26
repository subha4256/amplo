import styled from 'styled-components';

export const FpmWrapperWrapper = styled.div`
 button:focus,
textarea:focus,
input:focus,
select:focus {
    outline: none!important;
    box-shadow: none !important;
}
 
.fpmtopfrm label {
    justify-content: end;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #2f353a;
}

.fpmtopfrm .custom-select {
    height: 35px;
    border-radius: 4px;
    border: solid 1px #c8ced3;
    background-color: #ffffff;
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #73818f;
}

.fpmtopfrm .btn-primary {
    height: 37px;
    border-radius: 4px;
    border: solid 1px #083ac8;
    background-color: #083ac8;
    font-family: Montserrat;
    font-size: 13px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.5px;
    text-align: center;
    color: #ffffff;
    padding: 0 20px;
    margin-top: 27px;
}

.fpmtopfrm .pager-list {
    margin-top: 34px;
}

.fpmtopfrm .pager-list a {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #083ac8;
    text-decoration: none !important;
}

.fpmtopfrm .pager-list a i {
    color: #000;
}

.form-row>.col,
.form-row>[class*=col-] {
    padding-right: 15px;
    padding-left: 15px;
}

.heading {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #131313;
}

.subheading {
    font-size: 18px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #131313;
    margin-top: 20px;
}

.tblstyle h3 {
    padding: 6px 15px;
    margin: 0;
}

.tblstyle h3.bg-white {
    padding: 6px 10px 6px 0;
}

.tblstyle h3.bg-blue {
    background-color: #66c3df;
}

.tblstyle h3.bg-gray {
    background-color: #c9cccd;
}

.tblstyle h3.bg-white .badge {
    border: solid 1px #c9cccd;
    padding: 2px 15px;
}

.tblstyle h3.bg-white .Ltxt {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #131313;
}

.tblstyle h3 .Ltxt {
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    color: #ffffff;
}

.tblstyle h3.bg-gray .Ltxt.Ltxt1 {
    color: #333333;
}

.tblstyle h3 .badge {
    height: 21px;
    border-radius: 9px;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.03px;
    color: #333333;
}

.fpm-col-wraper h3 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.01px;
    color: #131313;
}

.fpm-col-wraper .dropdown-item {
    font-size: 12px;
    color: #083ac8;
}

.fpm-table td {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: normal;
    color: #000;
    vertical-align: middle;
    padding: 6px .75rem;
    height: 44px;
}

.fpm-table td.active {
    background-color: #e6e8e9;
    color: #000;
    font-weight: bold;
}

.fpm-table .btn {
    width: 61px;
    height: 30px;
    border-radius: 5px;
    border: none;
    font-size: 12px;
    font-weight: normal;
    color: #fff;
    text-transform: uppercase;
}

.fpm-table .btn-green {
    background-color: #31b479;
}

.fpm-table .btn-lightgreen {
    background-color: #aace7a;
}

.fpm-table .btn-orange {
    background-color: #ffaa70;
}

.fpm-col-wraper .table-responsive {
    display: block;
    max-height: 240px;
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
}

.fpm-col-wraper .table-responsive.comparisontbl {
    display: block;
    max-height: 100% !important;
    width: 100%;
    overflow-x: inherit;
    overflow-y: inherit;
}

.fpm-col-wraper .tblstyle1 .table-responsive {
    max-height: 282px;
}

.fpm-col-wraper .table-responsive::-webkit-scrollbar {
    width: 5px;
}

.fpm-col-wraper .table-responsive::-webkit-scrollbar-track {
    background: transparent
}

.fpm-col-wraper .table-responsive::-webkit-scrollbar-thumb {
    background: #d8d8d8;
}

.fpm-comparison-row {
    border-radius: 6px;
    padding: 20px 30px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

.btn-container {
    border: solid 1px #e4e8f0;
    background-color: #f6f7f8;
    display: block;
    height: 270px;
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    padding-top: 14px;
}

.fpn-btn {
    height: 36px;
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    font-weight: bold;
    line-height: 35px;
    text-align: center;
    letter-spacing: .5px;
    color: #ffffff;
    text-transform: uppercase;
    width: 100%;
    text-decoration: none;
}

.fpn-btn:hover {
    opacity: .8;
    color: #ffffff;
    text-decoration: none;
}

.fpn-btn.btn-green {
    border: solid 1px #979797;
    background-color: #aace7a;
}

.fpn-btn.btn-red {
    border: solid 1px #979797;
    background-color: #e04949;
}

.fpm-table .card {
    box-shadow: none;
    border-radius: 0;
    border: none;
}

.fpm-table .card-header {
    padding: 10px 1.25rem;
    background-color: transparent;
    border: solid 1px #6236ff;
    margin-bottom: 0;
    border-radius: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

.fpm-table .card-header h5>a {
    display: block;
    position: relative;
    font-size: 11px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.16px;
    color: #333333;
    text-decoration: none;
}

.fpm-table .card-header h5>a span {
    white-space: nowrap;
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
}

.fpm-table .card-header h5>a:after {
    content: "\f067";
    /* fa-chevron-down */
    font-family: "Font Awesome 5 Free";
    position: absolute;
    right: 0;
    font-weight: 900;
}

.fpm-table .card-header h5>a[aria-expanded="true"]:after {
    content: "\f068";
    /* fa-chevron-up */
}

.table-sameL {
    margin-top: 2px;
}

.table-sameL .fpm-table td {
    height: 47px
}

.comparison-select select {
    width: 295px;
    height: 35px;
    border-radius: 4px;
    border: solid 1px #c8ced3;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #333333;
}

.comparisontbl .fpm-table .card-header {
    width: 225px;
    margin-bottom: 4px;
    margin-top: 4px;
}

.comparisontbl .fpm-table .card-header.active {
    padding: 10px 1.25rem;
    border: solid 1px #6d7278;
    background-color: #e6e8e9;
}

.comparisontbl .fpm-table .card .card-body {
    padding: 0px 1.25rem;
}

@media (max-width: 767px) {}

@media (max-width: 575px) {}
 `