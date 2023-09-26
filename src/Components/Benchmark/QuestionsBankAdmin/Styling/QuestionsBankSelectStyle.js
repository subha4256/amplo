import styled from 'styled-components';

export const QuestionsBankSelectStyleWrapper = styled.div`

.filename{
  position: relative;
}
.upfilename{
  border-radius: 30px;
position: relative;
height: 35px;
line-height: 30px;
border: 1px #ccc solid;
display: inline-block;
padding: 0 30px;
margin-bottom: 20px;
}
.upfilename i{
  color: #000 !important;
position: absolute !important;
right: 14px !important;
top: 10px !important;
font-size: 14px !important;
}
.upload-area{
  height: 240px !important;
}

#picktemplate .list-inline img{
    border:2px #ccc solid;
   }
  #picktemplate .list-inline .custom-control-label{
    font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.85;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 0, 0.6);
  }
  .upload-row h2{
    font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0.01px;
  color: #131313;
  }
  .upload-row .custom-control .custom-control-label{
  font-size: 12px !important;
  font-weight: 400!important;
  font-stretch: normal;
  color: #666666!important;
  }
  .upload-files h2{
    font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #3648a5;
  }
  .upload-area{
  max-width: 374px;
  height: 193px;
  border-radius: 7.5px;
  border: dashed 1.5px #777eff;
  margin: 0 auto;
  padding: 30px;
  }
  .upload-area i{
    font-size: 40px;
  }
  .upload-area span{
    font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.93;
  letter-spacing: normal;
  text-align: center;
  color: #43434a;
  }
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  
  .upload-btn-wrapper .btn {
    font-size: 14px;
  text-align: center;
  color: #3648a5;
  }
  
  .upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .upload-row .custom-control-label::before {
    top: 1px;
  }
  .upload-row .custom-control-label::after {
    position: absolute;
    top: 1px;
  }
  @media (min-width: 992px) {
  
    .modal-lg,
    .modal-xl {
        max-width: 860px;
    }
  }
`;