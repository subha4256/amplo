import styled from 'styled-components';

export const ReportsWrapper = styled.div`
.report-sec.bg-white {
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1);
    background-color: #fff;
    padding: 40px 61px;
    margin: 26px 0 100px 0;
}
.form-inline .form-control {
    display: inline-block;
    width: 110px;
    border: 1px #CED4DA solid !important;
    vertical-align: middle;
    margin: 0 5px;
}

.report-sec.bg-white .heading {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.02px;
    color: #000000;
    font-family: Montserrat;
    margin-bottom: 28px;
}

.report-sec.bg-white .module-container {
    /* display: block; */
    display: flex;
    margin-bottom: 50px;
}

.report-sec.bg-white .module-container .module-box {
    width: 130px;
    /* height: 179px; */
    overflow: hidden;
    margin-right: 8px;
    margin-bottom: 8px;
    position: relative;
    cursor: pointer;
}

.report-sec.bg-white .module-container .module-box .top-icon {
    padding: 27px 24px;
}

.report-sec.bg-white .module-container .module-box .top-icon i {
    font-size: 48px;
    color: #fff;
}

.report-sec.bg-white .module-container .module-box .content-sec {
    padding: 13px;
    height: 100%;
}

.report-sec.bg-white .module-container .module-box .content-sec p {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #fff;
    height: 23px;
}

.report-sec.bg-white .module-container .module-box .content-sec .badge {
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    color: #2f353a;
    padding: 3px;
}

.report-sec.bg-white .module-container .module-box .content-sec p.sm-txt {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.26px;
    height: auto;
    margin-bottom: 0;
}

.report-sec.bg-white .module-container .bg-blue {
    background-color: #20a8d8;
}

.report-sec.bg-white .module-container .bg-dark-blue p.sm-txt {
    color: #20a8d8;
}

.report-sec.bg-white .module-container .bg-dark-blue {
    background-color: #0f5067;
}

.report-sec.bg-white .module-container .bg-yellow {
    background-color: #ffc107;
}

.report-sec.bg-white .module-container .bg-dark-yellow {
    background-color: #7a5c03;
}

.report-sec.bg-white .module-container .bg-dark-yellow p.sm-txt {
    color: #ffc107;
}

.report-sec.bg-white .module-container .bg-green {
    background-color: #4dbd74;
}

.report-sec.bg-white .module-container .bg-dark-green {
    background-color: #245a37;
}

.report-sec.bg-white .module-container .bg-dark-green p.sm-txt {
    color: #4dbd74;
}

.report-sec.bg-white .module-container .bg-red {
    background-color: #f86c6b;
}

.report-sec.bg-white .module-container .bg-dark-red p.sm-txt {
    color: #f86c6b;
}

.report-sec.bg-white .module-container .bg-dark-red {
    background-color: #763333;
}

.report-sec.bg-white .report-form .form-control {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #73818f;
}

.report-sec.bg-white .report-form .form-group .btn.btn-primary,
.report-sec.bg-white .report-form .form-group .btn.btn-primary.disabled {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    border: none;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04px;
    color: #fff;
}

.report-sec.bg-white .report-form .form-group .btn.btn-primary.disabled {
    background-color: #c4c4c4;
}


.report-sec.bg-white .module-container.selection {
    /* display: block; */
    display: flex;
    margin-bottom: 50px;
}
.report-sec.bg-white .module-container.selection .module-box::before {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #ffffff85;
}
.report-sec.bg-white .module-container.selection .module-box.active::before{
    background-color: transparent;
}
@media (max-width: 900px) {
    .report-sec.bg-white .module-container {
        display: flex;
        flex-wrap: wrap;
    }

    .report-sec.bg-white .module-container .module-box {
        display: inline-block;
    }
}
@media (max-width: 767px) {
    .report-sec.bg-white .module-container {
        display: flex;
        flex-wrap: wrap;
    }

    .report-sec.bg-white .module-container .module-box {
        display: inline-block;
    }
}

@media (max-width: 575px) {
    .report-sec.bg-white {
        padding: 25px 15px;
    }

    .report-sec.bg-white .heading {
        font-size: 19px;
    }
    .report-sec.bg-white .module-container .module-box {
        width: 116px;
        margin-right: 5px;
        cursor: pointer;
    }
    .report-sec.bg-white {
        margin: 18px 0 50px 0;
    }
}
`;