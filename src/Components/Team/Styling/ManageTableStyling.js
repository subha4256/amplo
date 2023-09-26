import styled from 'styled-components';

export const TableWrapper = styled.div`
.search-container {
    position: relative;
  }
  
  .search-container input {
    padding: 6px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0.12px;
    color: rgba(0, 0, 0, 0.6);
    height: 40px;
    border: solid 1px rgba(0, 0, 0, 0.32);
    background-color: #fff;
    width: 264px;
    border-radius: 4px;
  }
  
  .search-container button {
    background: transparent;
    font-size: 17px;
    border: none;
    position: absolute;
    right: 4px;
    top: 7px;
    color: #54698d;
    outline: none;
  }
  
  .table-section .card-body {
    padding: 1.25rem 32px;
  }
  
  .manage-table .table-striped {
    border: 1px solid #dee2e6;
  }
  
  .table-section .card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: #f0f3f5;
    border-bottom: 1px solid #c8ced3;
  }
  
  .manage-table .table td,
  .manage-table .table th {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    color: #2f353a;
    vertical-align: middle;
  }
  
  .manage-table .table th {
    font-weight: 700;
    color: #2f353a;
  }
  
  .manage-table .table .badge {
    font-size: 10px;
  }
  
  .manage-table .table .btn.btn-info i {
    font-size: 14px;
    color: #040404;
  }

 .helpwrap .helpicon {
    margin-top: 3px;
    display: inline-block;
    color: #616161 !important;
    font-size: 20px;
    line-height: 10px;
}

.helpwrap .dropdown-toggle::after {
  display: none;
}

.helpwrap .dropdown-menu p {
  padding: 0 7px 0 7px;
  margin: 0;
  font-size: 13px;
}
  
  
  @media (max-width: 575px) {
    .search-container {
      margin-bottom: 20px;
    }
  
    .search-container input {
      width: 100% !important;
    }
  }
`;