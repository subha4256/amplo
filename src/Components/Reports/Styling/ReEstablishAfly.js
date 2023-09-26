import styled from 'styled-components';

export const ReEstablishAflyWrapper = styled.div`
.afly.bg-white {
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1);
    background-color: #F3F1F5;
    padding: 35px;
    margin: 22px 0 0 0;
    }
    .title h1{
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #000000;
    margin: 15px 0 0 0;
    }
    .afly.bg-white .heading {
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #131313;
    margin-bottom: 20px;
    }
    
    .afly.bg-white .btn.btn-primary{
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    border: none;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04px;
    color: #fff;
    font-family: Montserrat;
    }
    .afly.bg-white .btn.btn-primary:hover{
        background-color: #0733ad;
    }
    .table.table-striped{
        table-layout: fixed;
        min-width: 900px;
        max-width: 100%;  
    }
    .table.table-striped th{
    text-align: right;
    }
    .table.table-striped th, .table.table-striped td{
    padding-right: 30px
    }
    .table.table-striped td span{
    text-align: right;
    display: block;
    }
    .table.table-striped tfoot td{
     padding-top: 30px;
     font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.01px;
      color: #131313;
    }
    @media (max-width: 575px) {
    .afly.bg-white {
    padding: 25px 15px;
    }
    
    .afly.bg-white .heading {
    font-size: 19px;
    }
    
    .afly.bg-white {
    margin: 18px 0 50px 0;
    }
    }
    .jUSOFo .table.table-striped tfoot td {
        padding-top: 30px;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #131313;
    }
`