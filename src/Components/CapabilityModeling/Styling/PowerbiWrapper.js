import styled from 'styled-components';

export const PowerbiWrapper = styled.div`
.modal .modal-content{
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #cccccc;
  }
  .modal .modal-title{
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    color: #000000;
    margin-top: 30px;
  }
  .modal h2{
    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.02px;
    text-align: center;
    color: #000000;
  }
  .modal .fa-check-circle{
    font-size: 70px;
    color: #a7df6d;
  }
  
  
  .modal p{
   font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.01px;
    color: #000000;
  }
  
  .modal .close img{
    width: 15px;
  }
 .dashboard-sec.bg-white {
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 30, 0.1), 0 1px 2px 0 rgba(0, 0, 30, 0.1), 0 0 1px 0 rgba(0, 0, 30, 0.1);
    background-color: #fff;
    padding: 40px 61px;
    margin: 13px 0 92px 0;
}

.dashboard-sec.bg-white .heading {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.02px;
    color: #000000;
    font-family: Montserrat;
    margin-bottom: 40px;
}

.dashboard-sec.bg-white .report-form .form-control {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #73818f;
}
.report-form label {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #2f353a;
}
.report-form .form-group {
    margin-bottom: 2rem;
}
.dashboard-sec.bg-white .report-form .form-group .btn.btn-primary,
.dashboard-sec.bg-white .report-form .form-group .btn.btn-primary.disabled {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #083ac8;
    border: none;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04px;
    color: #fff;
}

/* .dashboard-sec.bg-white .report-form .form-group .btn.btn-primary.disabled {
    background-color: #c4c4c4;
} */


@media (max-width: 575px) {
    .dashboard-sec.bg-white {
        padding: 25px 15px;
    }

    .dashboard-sec.bg-white .heading {
        font-size: 19px;
    }
   
    .dashboard-sec.bg-white {
        margin: 18px 0 50px 0;
    }
}
 `