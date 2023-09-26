import styled from 'styled-components';

export const SupportAmpWrapper = styled.div`
.container-support {
    background-color: #fff;
    padding-top: 30px;
}

.container-support h2 {
    font-size: 18px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    color: #333333;
}

.sidebar-heading {
    font-size: 12px;
    font-weight: bold;
    color: #4db4cc;
    text-transform: uppercase;
    margin: 20px 0;
    padding: 0 17px;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    color: #fff;
    background-color: #33426e;
}

.nav-pills .nav-item {
    margin-bottom: 25px;
}

.nav-pills .nav-link {
    font-size: 16px;
    color: #333;
    font-weight: 400;
}

.btn-support {
    width: 96px;
    height: 22px;
    border-radius: 10px;
    background-color: #4db4cc;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 10px;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
}

.container-support h2.title {
    font-size: 36px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    color: #333333;
    margin: 30px 0;
}

.ampsupport img {
    max-width: 100%;
    margin-bottom: 30px;
    margin-top: 20px;
}

.tab-content ul {
    list-style: none;
}

ol.lower {
    list-style-type: lower-latin;
    margin: 5px 0 20px 0;
}

ol.lower li {
    margin-bottom: 5px;
    margin-top: 5px;
    font-size: 15px!important;
    font-weight: 400 !important;
    font-stretch: normal;
    letter-spacing: normal;
    color: #333333;
}

ol.number {
    list-style-type: upper-greek;
    padding-left: 20px;
}

.p-right {
    padding-right: 10%;
}

p,
ol.number li {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
}
@media (min-width: 1700px) {
    .faqLeft {
        padding-right: 10% !important;
    }
}
@media (max-width: 767px) {
    .p-right {
        padding-right: 15px;
    }
}
`