import styled from 'styled-components';

export const BenchWrapper = styled.div`
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