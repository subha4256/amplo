import styled from 'styled-components';

export const GoalSettingsWrapper = styled.div`
.pa-goal-setting .row.border-bottom {
    padding-top: 20px;
  }
  
  .pa-goal-setting .domain-map ul li {
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0.16px;
    text-align: center;
    color: #5c5f61;
    position: relative;
    padding-top: 0;
    margin-top: -22px;
    width: 32px;
    margin-left: -12px;
    height: 32px;
    margin-right: 0;
  }
  
  .pa-goal-setting .domain-map::before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: #e4e7ea;
    border-radius: 0px;
  }
  
  .pa-goal-setting .domain-map::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 48%;
    height: 6px;
    background-color: transparent;
    border-radius: 0px;
  }
  .pa-goal-setting .domain-map.bg-blue::after{
    background-color: #82d0ec;
  }
  .pa-goal-setting .domain-map.bg-red::after{
    background-color: #ff6384;
  }
  .pa-goal-setting .domain-map.bg-green::after{
    background-color: #4bc0c0;
  }
  .pa-goal-setting .domain-map.bg-yellow::after{
    background-color: #ffce56;
  }
  .pa-goal-setting .domain-map ul li.active:before {
    content: '';
    position: absolute;
    top: 19px;
    left: 40%;
    width: 12px;
    height: 12px;
    background-color: #074256;
    border-radius: 20px;
    border: 2px #fff solid;
    z-index: 4;
  }
  
  .pa-goal-setting .domain-map ul li.active span {
    position: absolute;
      top: -5px;
      margin-left: -12px;
      font-size: 10px;
      left: 40%;
      height: 22px;
      background-color: #e2e6e6;
      border-radius: 4px;
      color: #777575;
      padding: 2px 3px;
      border: 2px #fff solid;
      z-index: 4;
  }
  .pa-goal-setting .btext{
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 0.13px;
    color: #2f353a;
    padding-top: 20px;
  }
  .pa-goal-setting .slider-handle-triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #c9cece;
    position: absolute;
    top: 35px;
  }
  .pa-goal-setting .slider-handle-triangle span.tooltp, .pa-goal-setting .slider-handle-triangle1 span.tooltp{
    position: absolute;
      top: -40px;
      margin-left: -12px;
      font-size: 10px;
      left: 40%;
      height: 22px;
      background-color: #e2e6e6;
      border-radius: 4px;
      color: #777575;
      padding: 2px 3px;
      border: 2px #fff solid;
      z-index: 4;
  }
  .pa-goal-setting .slider-handle-triangle1 {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #c9cece;
    position: absolute;
    top: 35px;
  }
  .pa-goal-setting ul li .slider-img.bg-danger::before {
    background-color: #e9a1b0;
  }
  
  .pa-goal-setting ul li .slider-img.bg-info::before {
    background-color: #92d8d8;
  }
  
  .pa-goal-setting ul li .slider-img.bg-primary::before {
    background-color: #62b1e7;
  }
  
  
  
  .pa-goal-setting ul .bg-primary {
    background-color: #36a2eb !important;
  }
  
  .pa-goal-setting ul .bg-warning {
    background-color: #ffce56 !important;
  }
  
  .pa-goal-setting ul .bg-danger {
    background-color: #ff6384 !important;
  }
  
  .pa-goal-setting ul .bg-info {
    background-color: #4bc0c0 !important;
  }
  
  .domain-pa-technology {
    position: relative;
  }

.pa-goal-setting .input-range__label--min,
.pa-goal-setting .input-range__label--max {
  bottom: 1rem;
  position: absolute;
display: block; }

.pa-goal-setting .input-range__label--min .input-range__label-container,
.pa-goal-setting .input-range__label--max .input-range__label-container {
  background-color: #fff;
}

.pa-goal-setting .input-range__slider {
  height: 12px;
  width: 12px;
  background-color: #074256;
  margin-top: -0.55rem;
}

.pa-goal-setting .goalSlider1 .input-range__track--active,
.pa-goal-setting .goalSlider5 .input-range__track--active {
  background-color: #ff6384;
}

.pa-goal-setting .goalSlider2 .input-range__track--active {
  background-color: #4bc0c0;
}

.pa-goal-setting .goalSlider3 .input-range__track--active {
  background-color: #ffce56;
}

.pa-goal-setting .input-range__track--background {
  margin-top: 0.70rem;
}
.newBenchmarks p{
  color: rgb(55, 61, 63);
  font-size: 12px;
  font-weight: 400;
  font-family: Helvetica, Arial, sans-serif;
  margin: 0 0 2px 0;
}
  @media (max-width: 992px) {}
  
  @media (max-width: 767px) {}
`;