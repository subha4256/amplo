import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Row, Col, FormGroup } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class AccountsTable extends Component {
    constructor(props) {
        super(props);
        this.state={
            search: '',
            values: "A"
        }
    }
    actionChangeHandler(e, data){
        this.props.approveHandler(e.target.value, data);
    }
    render() {
        const tableConfig = {
            defaultPageSize: 5,
            resizable: false,
            className: 'table-striped'
        }
        let accountsData = [];
        if(this.props.accounts) {
            accountsData = this.props.accounts;
        }
        if (this.state.search) {
          
            accountsData = accountsData.filter(row => {
                let clientName = row.ClientName? row.ClientName.toLowerCase() : '';
                let firstName = row.FirstName ? row.FirstName.toLowerCase() : '';
                let lastName = row.LastName ? row.LastName.toLowerCase() :  '';
                let email = row.Email ? row.Email.toLowerCase() : '';
                let licenseType = row.LicenseType ? row.LicenseType.toLowerCase():'';
                let licenseExpiryDate = row.LicenseExpiryDate ? row.LicenseExpiryDate.toLowerCase():'';
                let status = row.ApprovalStatus ? row.ApprovalStatus.toLowerCase():'';
				return clientName.includes(this.state.search.toLowerCase()) || row.registrationDate.includes(this.state.search) || row.CountryName.includes(this.state.search) || firstName.includes(this.state.search.toLowerCase()) || lastName.includes(this.state.search.toLowerCase()) || email.includes(this.state.search.toLowerCase()) || licenseType.includes(this.state.search.toLowerCase()) || licenseExpiryDate.includes(this.state.search.toLowerCase()) || status.includes(this.state.search.toLowerCase())
			})
		}
        let columns = [{
            Header: <strong>Registration Details</strong>,
            columns: [{
                Header: 'Client Name',
                accessor: 'ClientName',
                Cell: props => <Link to={"/enterprise-accounts/"+props.original.ClientID}>{props.original.ClientName}</Link>
            }, {
                Header: <p>Registration<br/>Date</p>,
                accessor: 'registrationDate'
            }, {
                Header: 'Country',
                accessor: 'CountryName'
            }]
          }, {
              Header: <strong>Point of Contact</strong>,
              columns: [{
                Header: 'First Name',
                    accessor: 'FirstName'
                }, {
                    Header: 'Last Name',
                    accessor: 'LastName'
                }, {
                    Header: <p>Email<br/>Address</p>,
                    accessor: 'Email'
                }]
            }, {
                Header: <strong>License & Approval</strong>,
                columns: [{
                    Header: <p>License<br/>Type</p>,
                    accessor: 'LicenseType'
                }, {
                    Header: <p>License<br/>Expiry</p>,
                    accessor: 'LicenseExpiryDate'
                }, {
                    Header: <p>Approval<br/>Status</p>,
                    accessor: 'ApprovalStatus' // String-based value accessors!
                }, {
                    Header: 'Action',
                    sortable: false,
                    //Cell: props => <a href="#" onClick={()=>console.log(props.original)}><span className="badge badge-info">Approve</span></a>
                    Cell: props => (
                    <select onChange={(e)=>this.actionChangeHandler(e,props)}>
                        <option></option>
                         <option value={(props.original.ApprovalStatus !== "Approved") ? "Approve" : ""}>{(props.original.ApprovalStatus !== "Approved") ? "Approve" : ""}</option>
                        <option value="Reject">Reject</option>
                        <option value="Request Info">Request Info</option>
                    </select>)
                }, {
                    Header: 'Workflow',
                    sortable: false,
                    Cell: props => <button className="btn btn-success fa fa-search-plus"></button>
                }]
            }];
        return (
            <FormGroup>
                <div className="manage-table table-responsive">
                    <Row className="mb-2 m-0">
                        <Col sm="8"></Col>
                        <Col sm="4">
                            <input value={this.state.search} placeholder="Search" className="search-input form-control" onChange={e => this.setState({search: e.target.value})} />
                            <button className="search-btn"><i className="fa fa-search"></i></button>
                        </Col>
                    </Row>
                    <Row className="m-0">
                        <Col sm="12">
                            <ReactTable
                                data={accountsData}
                                columns={columns}
                                {...tableConfig}
                            />
                        </Col>
                    </Row>
                </div>
            </FormGroup>
        )
    }
}

export default AccountsTable;