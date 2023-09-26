import styled from 'styled-components';

export const BenchWrapper = styled.div`

.newBenchmarks{
    position: absolute;
    right: -19px;
    top: 23px;
}
.newBenchmarks p{
    color: rgb(55, 61, 63);
    font-size: 12px;
    font-weight: 400;
    font-family: Helvetica, Arial, sans-serif;
    margin: 0 0 2px 0;
}
  a{
    color: #083ac8;
  }
  button.btn{
    width: 107px;
    line-height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    padding:0;
    font-size:13px;
    letter-spacing:0.04px;
    text-transform:uppercase;
  }
  div.CustomRadio{
    display: inline-block;
    min-height: 45px;
    margin: 0 25px;
  }
  .iconWrap {
    line-height: 30px;
    text-align: center;
    width: 30px;
    margin-right: 5px;
  }
  .businessModellingWrap{
    background-color: #ffc107;
  }
  .processAccessmentWrap{
    background-color: #20a8d8;
  }
  .designThinkingWrap{
    background-color: #4dbd74;
  }
  .kpiWrap{
    background-color: #f86c6b;
  }
  .roadmapWrap{
    background-color: #17a2b8;
  }
  /* Start top report style */
.header-sec {
    display: flex;
    margin-top: 20px;
    align-items: center;
}

.icon-sec p {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.01px;
    color: #131313;
    margin-bottom: 0;
    text-transform: uppercase;
}

.header-sec .modeling-list li {
    margin-right: 1px !important;
}

.header-sec .modeling-list li a {
    height: 55px;
    width: 55px;
    text-align: center;
    padding: 4px 6px 5px 6px;
    color: #fff;
    opacity: .3;
}

.header-sec .modeling-list li.active a {
    opacity: 1;
}

.header-sec .modeling-list li a img {
    -webkit-filter: brightness(250%);
    filter: brightness(250%);
}

.header-sec .modeling-list li a.bg-blue {
    background-color: #20a8d8;
}

.header-sec .modeling-list li a.bg-yellow {
    background-color: #ffc107;
}

.header-sec .modeling-list li a.bg-green {
    background-color: #4dbd74;
}

.header-sec .modeling-list li a.bg-red {
    background-color: #f86c6b;
}

.header-sec .modeling-list li a.bg-blue-light {
    background-color: #17a2b8;
}

.header-sec .report-btn a {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #083ac8;
}

.header-sec .toggle-btn .btn-unlock {
    height: 34px;
    border-radius: 30px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    background-color: #083ac8;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    position: relative;
    z-index: 2;
}

.header-sec .toggle-btn .btn-unlock i {
    font-size: 11px;
}

.header-sec .toggle-btn .btn-lock {
    background-color: #fff;
    border-radius: 30px;
    height: 25px;
    font-size: 13px;
    padding: 0 10px 0 0;
    width: 77px;
    text-align: center;
    margin-right: -20px;
}

.header-sec h1 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.34px;
    color: #000000;
}

.header-sec .back-btn .btn-primary {
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0.04px;
    color: #fff;
    width: 107px;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    text-transform: uppercase;
    border: 0;
}

/* End top report style */

.bg-white1 {
    background-color: #fff;
    margin: 26px 0 0px 0;
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1), 2px 2px 4px 0 rgba(0, 0, 0, 0.12);
}

.report-benchmarking-sec.bg-white1 {
    display: block;
    padding: 30px 38px 60px 38px;
}

.report-benchmarking-sec.bg-white1 .top-heading .heading {
    font-size: 24px;
    font-weight: normal;
    letter-spacing: 0.02px;
    color: #131313;
    margin-bottom: 28px;
}

.score-table td {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #2f353a;
}

.report-benchmarking-sec.bg-white1 .score-table td .badge {
    width: 30px;
    height: 16px;
    padding: 4px 0;
}

.report-Detailed-sec.bg-white1 {
    display: block;
    padding: 30px 38px 30px 38px;
}

.report-Detailed-sec.bg-white1 .top-heading .heading {
    font-size: 24px;
    font-weight: normal;
    letter-spacing: 0.02px;
    color: #131313;
    margin-bottom: 0px;
}

.report-Detailed-sec.bg-white1 .top-heading {
    display: flex;
}

.report-Detailed-sec.bg-white1 .top-heading .report-btn a {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #083ac8;
}

.report-Detailed-sec.bg-white1 .top-heading .add-btn {
    margin-left: 20px;
}

.report-Detailed-sec.bg-white1 .top-heading .add-btn i {
    font-size: 20px;
    color: #00001e;
}

.request-btn .btn {
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04px;
    border: none;
}

@media (max-width: 767px) {
    .header-sec {
        display: block;
    }

    .header-sec .icon-sec,
    .header-sec .report-btn,
    .header-sec .toggle-btn,
    .header-sec .back-btn {
        display: inline-block;
    }

    .header-sec .report-btn,
    .header-sec .toggle-btn,
    .header-sec .back-btn {
        margin-bottom: 15px;
    }

    .report-benchmarking-sec.bg-white1 .score-table {
        width: 900px;
    }

    .report-benchmarking-sec.bg-white1 .top-heading .heading,
    .report-Detailed-sec.bg-white1 .top-heading .heading {
        font-size: 18px;
    }


}

@media (max-width: 575px) {
    .report-Detailed-sec.bg-white1 .top-heading {
        display: block;
    }
    .report-btn{
        display: inline-block;
    }
    .report-Detailed-sec.bg-white1 .top-heading .heading{
        margin-bottom: 15px;
    }
}
`;

export const Container = styled.div`
  padding: 24px 44px;
`;

export const Rectangle = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1), 2px 2px 4px 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  margin: 12px 0;
  display: inline-block;
  width: 100%;
  padding: 48px 57px;
`;

export const Heading = styled.h1`
  font-size: 24px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.02px;
  color: #131313;
  font-family: 'Montserrat', sans-serif;
`;

export const SubHeading = styled.h3`
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.02px;
  color: #131313;
  margin-bottom: 14px;
`;

export const PageTag = styled.label`
  font-size: 14px;
  letter-spacing: 0.01px;
  color: #131313;
  margin-top: 11px;
  margin-bottom: 21px;
  text-transform: uppercase;
`;