import styled from 'styled-components';
export const DTLeftSideBarWrapper = styled.div`
.dt-left-nav-bar {
    height: 100%;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    background-color: #fff;

}

.dt-left-list {
    list-style: none;
    padding: 0;
    width: 55px;
    border: 1px #ccc solid;
    height: 100%;
}

.dt-left-nav-bar .dt-left-list li {
    display: block;
    padding: 10px;
    text-align: center;
}

.dt-left-nav-bar .dt-left-list li a i {
    color: #708393;
}

.dt-left-nav-bar .dt-left-list li a:hover i {
    color: #708393ce;
}

.dt-left-nav-bar .active-left-panel {
    width: 267px;
    height: 100%;
    border: 1px #ccc solid;
}

.active-left-panel .search-area {
    background-color: #efeff0;
}

.active-left-panel h2 {
    font-size: 14px;
    font-weight: 700;
    color: #000000;
    padding: 12px;
    border-bottom: 1px #ccc solid;
}

.active-left-panel .form-group.has-search {
    margin-bottom: 0;
}

.active-left-panel p {
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    padding: 0 12px;
}

.active-left-panel .benchmarking-list {
    padding: 20px;
}

.active-left-panel .benchmarking-list .card {
    border: 0px transparent solid;
    padding: 0px 0 12px 20px;
}

.active-left-panel .benchmarking-list .card a {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: normal;
    color: #000000;
    text-decoration: none;
}

.active-left-panel .benchmarking-list .card a:after {
    align-items: center;
    width: 26px;
    height: 26px;
    background-color: #c7c9cb;
    border-radius: 100%;
    text-align: center;
    float: left;
    justify-content: center;
    display: flex;
    border: 0;
    font-weight: 900;
    color: #fff;
    font-size: 12px;
    content: '\f068';
    font-family: 'Font Awesome 5 Free';
    margin-top: -5px;
    margin-right: 8px;
}

.active-left-panel .benchmarking-list .card a.collapsed:after {
    content: '\f067';
}

.active-left-panel .benchmarking-list .card .domain-list {
    list-style: none;
    padding: 8px 0 0 28px;
    margin-bottom: 0;
}

.active-left-panel .benchmarking-list .card .domain-list li {
    position: relative;
    height: 36px;
    display: flex;
    align-items: center;
}

.active-left-panel .benchmarking-list .card .domain-list li::before {
    position: absolute;
    left: -45px;
    top: -20px;
    border-left-color: #c8ced2;
    border-left-style: solid;
    border-left-width: 1px;
    border-bottom-color: #c8ced2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    content: "";
    width: 30px;
    height: 100%;
}
.active-left-panel .benchmarking-list .card .domain-list li:first-child::before{
    height: 83%;
    top: -13px;
}
.active-left-panel .benchmarking-list .card .custom-checkbox{
    margin-top: -4px;
}
.active-left-panel .benchmarking-list .card .domain-list li label{
    font-size: 12px;
    font-weight: 500;
    letter-spacing: normal;
    color: #000000;
}
.active-left-panel .benchmarking-list .card .domain-list li .custom-control-label::before {
    position: absolute;
    top: 1px;
    border-radius: 3px !important;
}
.active-left-panel .benchmarking-list .card .domain-list li .custom-control-input:checked~.custom-control-label::before {
    color: #007bff;
    border-color: #c7c9cb;
    background-color: #fff;
    content: '\f00c';
    font-weight: 900;
    text-align: center;
    font-size: 9px;
    font-family: 'Font Awesome 5 Free';
    
}
.active-left-panel .benchmarking-list .card .domain-list li .custom-control-input:checked~.custom-control-label::after{
    background-image: none !important;
}
.active-left-panel .w-267{
    width: 267px;
}
.active-left-panel .draw-list .draw-link {
    font-size: 14px;
    font-weight: 600;
    color: #6c7883;
    text-decoration: none;
    display: block;
}
.active-left-panel .draw-list ul{
    padding-left: 20px;
    margin-top: 15px;
}
.active-left-panel .draw-list ul li{
    padding-right: 0;
    width: 40px;
    text-align: center;
    margin-bottom: 10px;
}

.active-left-panel .draw-list .draw-link:after {
    width: 14px;
    height: 25px;
    float: left;
    font-weight: 900;
    color: #ccc;
    font-size: 20px;
    content: '\f0d7';
    font-family: 'Font Awesome 5 Free';
    margin-top: -5px;
    margin-right: 8px;
}

.active-left-panel .draw-list .draw-link.collapsed:after {
    content: '\f0da';
}
`;