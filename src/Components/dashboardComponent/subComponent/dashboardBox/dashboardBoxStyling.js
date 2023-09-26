import styled from 'styled-components';

export const BoxWrapper = styled.div`
/* for box section 1*/
.box-sec-1 .bg-primary{
    background-image: #20a8d8 !important;
    font-size: 21px;
    background-color: #20a8d8 !important;
   }
   .box-sec-1 .card-graph{
       height: 70px;
   }
   .box-sec-1 .text-xs.mb-1{
    font-size: 14px
   }
   .box-sec-1 .card-graph .img-fluid {
       width: 100%;
       height: 84px;
       -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: .5;
   }

   .box-sec-2 .bg-warning {
    background-image: #ffc107 !important;
    font-size: 21px;
}
.box-sec-1 .bg-warning{
    background-color: #ffc107 !important;
}
.box-sec-1 .bg-danger{
    background-color: #f86c6b !important;
}
.box-sec-2 .card-graph {
    height: 70px;
}

.box-sec-2 .text-xs.mb-1 {
    font-size: 14px
}
.box-sec-2 .card-graph .img-fluid {
    width: 100%;
    height: 84px;
    -webkit-filter: grayscale(100%); 
    filter: grayscale(100%);
      opacity: .5;
}
.box-sec-3 .bg-danger {
    background-image: #f86c6b !important;
    font-size: 21px;
}

.box-sec-3 .card-graph {
    height: 70px;
}

.box-sec-3 .text-xs.mb-1 {
    font-size: 14px
}
ul.dashdrop {
    list-style: none;
    padding: 0;
    font-size: 14px;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}
ul.dashdrop li {
    font-size: 13px;
    cursor: pointer;
    padding: 6px 10px;
}
.box-sec-1 .card .dropdown-menu {
    min-width: 14rem !important;

}

.box-sec-3 .card-graph .img-fluid {
    width: 100%;
    height: 84px;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: .5;
}`;