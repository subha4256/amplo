import styled from 'styled-components';

export const DesignThinkingHomepageWrapper = styled.div`
.design-thinking .bg-white {
    border-radius: 5px;
    border: solid 1px #d6d7d8;
    padding: 22px 22px 40px 44px;
    width: 100%;
}

.design-thinking .maping-sec h1 {
    font-size: 14px;
    font-weight: 700;
    line-height: 2.43;
    letter-spacing: normal;
    color: #63c2de;
    margin-bottom: 0;
}

.design-thinking .maping-sec p {
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: normal;
    color: #333333;
}

.flex-column.nav-tabs .nav-link.active {
    border-color: #dee2e600 #dee2e60d #3142c6 !important;
    color: #083ac8;
    border-width: 0 0 2px 0;
}

.flex-column.nav-tabs .nav-link {
    border-color: #dee2e600 #24415f00 #d6d7d8;
    border-width: 0 0 1px 0;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.44;
    letter-spacing: normal;
    color: #333333;
    border-radius: 0;
    padding: .8rem 0;
}

.design-user-sec {
    border-radius: 5px;
    border: solid 1px #d6d7d8;
    background-color: #fff;
    padding: 60px 40px;
}

.design-user-sec h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    padding-left: 15px;
}

.design-user-sec h3 {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.27px;
    text-align: center;
    color: #333333;
}

.design-user-sec .engage-user-head p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #333333;
}

.design-user-sec .bg-white {
    border-radius: 5px;
    box-shadow: 0 11px 23px 0 rgba(0, 0, 0, 0.18);
    padding: 53px 42px;
    text-align: center;
}

.design-user-sec .bg-white h3 {
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #4a4a4a;
    height: 24px;
    overflow: hidden;
}

.design-user-sec .btn-new {
    height: 40px;
    border-radius: 6px;
    background-color: #083ac8;
    width: auto;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    line-height: 27px;
    margin-left: 15px;
}

.design-user-sec .engage-row .bg-white p {
    font-family: Montserrat;
    font-size: 15x !important;
    text-align: center;
    color: #6b6b6b;
    height: 21px;
    overflow: hidden;
}

.design-user-sec .bg-white .btn-info {
    height: 41.6px;
    border-radius: 19px;
    box-shadow: 0 6px 12px 0 rgba(27, 105, 253, 0.39);
    background-color: #083ac8;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
}

.projects-row .bg-projects .pro-img {
    display: block;
    text-align: center;
    height: 170px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.18);
    border: solid 1px #cecdcd;
}

.projects-row .bg-projects h3 {
    font-size: 16px;
    font-weight: 700;
    color: #4a4a4a;
}

.projects-row .bg-projects p {
    font-size: 12px;
    font-weight: 400;
    color: #6b6b6b;
}

.descover-img {
    height: 100px;
}

@media (max-width: 992px) {
    .col-lg-4{
        max-width:100% !important;
    }
    .design-user-sec .bg-white .btn-info {
        width: 100%;
    }
    .design-user-sec .bg-white{
        margin-bottom: 20px;
    }
}

@media (max-width: 576px) {
    .design-user-sec {
        padding: 40px 20px;
    }

    .design-user-sec h3 {
        font-size: 19px;
    }

    .design-user-sec .bg-white .btn-info {
        width: 100%;
    }
    

    .design-thinking .maping-sec h2 {
        font-size: 20px;
    }
}`;