import styled from 'styled-components';

export const BenchmarkWrapper = styled.div`
h1.heading {
    font-size: 23px;
    font-weight: 700;
    letter-spacing: 0.33px;
    color: #000000;
    margin-bottom: 20px;
}
.left-check-box{
    margin-right:5px;
}
.dragLabel {
    margin-bottom: 0;
}
.right-user-check-box{
    margin-right:5px;
}
.set-section .card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: #f0f3f5;
    border-bottom: 1px solid #c8ced3;
}
.set-section .card-body .card-text {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0.2px;
    color: #000000;
}

.set-section .card-body .user-form-section .form-group label {
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.set-section .card-body .user-form-section .form-group .form-control {
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
}

.set-section .card-body .user-form-section .drag-drop-sec h2 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.33px;
    color: #000000;
    margin-bottom: 10px;
    margin-top: 20px;
}

.set-section .card-body .user-form-section .drag-drop-sec h3 {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #000000;
}

.has-search {
    position: relative;
  }
  .has-search .form-control {
    padding-left: 1rem;
    padding-right: 2.375rem;
    height: 40px;
    font-size: 13px;
  }
  .form-control-search {
    position: absolute;
    right: 16px;
    top: 0;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
  }

.set-section .card-body .user-form-section .drag-drop-sec .box-1 {
    width: 291px;
    height: 200px;
    border: solid 1px #979797;
    overflow: auto;
    padding: 10px;
}
.pd-0-box{
    padding:0 !important;
}

.set-section .card-body .user-form-section .drag-drop-sec .box-2 {
    width: 50px;
}
.select-all{
    text-align:right;
    width:291px;
}
.center-alignment{
    justify-content:center
}

.set-section .card-body .user-form-section .drag-drop-sec .custom-control.custom-checkbox {
    width: 291px;
    text-align: right;
}

.user-pl {
    padding-left: 3rem;
}

.user-pt {
    padding-top: 5.5rem;
}

.set-section .card-body .user-form-section .drag-drop-sec .btn-light {
    background-color: #d8d8d8 !important;
}

.set-section .card-body .user-form-section .drag-drop-sec .btn-project {
    font-size: 13px;
    font-weight: 700;
}
.fit-list{
    padding-left:0 !important;
    padding-right: 0 !important;
    overflow-y:auto !important;
}
.ReactTable .rt-table {
    text-align: center;
}
.user-table .table-striped{
    border:1px solid #dee2e6;
    }
    .table-section .card-header {
      padding: .75rem 1.25rem;
      margin-bottom: 0;
      background-color: #f0f3f5;
      border-bottom: 1px solid #c8ced3;
    }

@media (max-width: 1170px) {

    .set-section .card-body .user-form-section .drag-drop-sec .box-1,
    .set-section .card-body .user-form-section .drag-drop-sec .custom-control.custom-checkbox {
        width: 100%;
    }

    .user-pl {
        padding-left: 0;
    }

}

@media (max-width: 767px) {
    .user-pt {
        padding-top: 20px;
        margin-bottom: 20px;
    }

    .set-section .card-body .user-form-section .drag-drop-sec .box-2 {
        width: 100%;
    }
    .user-pl {
        padding-left: 15px;
    }
}`;