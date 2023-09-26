import styled from 'styled-components';
export const GettingStartedWrapper = styled.div`
.getting-started-sec .bg-white {
  border-radius: 5px;
  border: solid 1px #d6d7d8;
  padding:22px 22px 40px 44px;
  width: 100%;
}

.getting-started-sec .maping-sec h1 {
  font-size: 14px;
  font-weight: 700;
  line-height: 2.43;
  letter-spacing: normal;
  color: #63c2de;
  margin-bottom: 0;
}

.getting-started-sec .maping-sec h2 {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.27px;
  color: #333333;
}

.getting-started-sec .maping-sec p {
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
.flex-column.nav-tabs .nav-item {
  margin-bottom: 0;
}
.flex-column.nav-tabs {
  border-bottom: 0px solid #dee2e6;
}
.flex-column.nav-tabs .nav-link p{
  display: none;
}
.flex-column.nav-tabs .nav-link.active p{
  display: block;
  font-weight: 400 !important;
  margin-bottom: 5px;
}
.engage-user-sec {
  border-radius: 5px;
  border: solid 1px #d6d7d8;
  background-color: #e5f1f5;
  padding: 60px 40px;
}

.engage-user-sec h2 {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #333333;
}

.engage-user-sec h3 {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.27px;
  text-align: center;
  color: #333333;
}

.engage-user-sec .engage-user-head p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
}

.engage-user-sec .bg-white {
  border-radius: 5px;
  box-shadow: 0 11px 23px 0 rgba(0, 0, 0, 0.18);
  padding: 53px 42px;
  text-align: center;
}
.engage-user-sec .bg-white  h3 {
  font-family: Montserrat;
font-size: 18px;
font-weight: 700;
text-align: center;
color: #4a4a4a;
height: 24px;
overflow: hidden;
}
.engage-user-sec .engage-row .bg-white p {
  font-family: Montserrat;
  font-size: 15x !important;
  text-align: center;
  color: #6b6b6b;
  height: 21px;
  overflow: hidden;
}
.engage-user-sec .bg-white .btn-info {
  height: 41.6px;
  border-radius: 19px;
  box-shadow: 0 6px 12px 0 rgba(27, 105, 253, 0.39);
  background-color: #083ac8;
  width: 100%;
  font-size: 16px;
font-weight: 700;
}

@media (max-width: 992px) {
  .engage-user-sec .bg-white .btn-info{
      width: 100%;
  }
}
@media (max-width: 576px) {
  .engage-user-sec {
      padding: 40px 20px;
  }
  .engage-user-sec h3 {
      font-size: 19px;
  }
  .engage-user-sec .bg-white .btn-info{
      width: 100%;
  }
  .getting-started-sec .maping-sec h2 {
      font-size: 20px;
  }
}
`;