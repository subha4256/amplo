import React, {Component} from 'react';
import { Label, FormGroup } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ReportPermissions extends Component {
    constructor(props) {
        super(props);
        this.state={
          selectAll: false
        }
    }

    componentWillReceiveProps(nextProps) {
      //console.log(nextProps.reports);
      for(let i in nextProps.reports){
        if(nextProps.reports !== undefined){
          //  console.log(this.props.reports);
          //  console.log(nextProps.reports);
          if(nextProps.reports !== this.props.reports){
          let serviceId = nextProps.reports[i].ServiceID;
          let reportId = nextProps.reports[i].report.ReportID;
          if(nextProps.reports[i].report.IsSelected == "1"){
          this.setState({
            ['selectAllReport'+serviceId+reportId]: true
          }, function() {
            this.props.handlePermissionChange(serviceId, reportId, 1)
          })
        }
        else{
          this.setState({
            ['selectAllReport'+serviceId+reportId]: false
          }, function() {
            this.props.handlePermissionChange(serviceId, reportId, 0)
          })
        }
      }
  }
        }
      }
      
    

    handlePermissionChange(e, serviceId, reportId) {
      if(e.target.checked) {
        this.setState({
          ['selectAllReport'+serviceId+reportId]: true
        }, function() {
          this.props.handlePermissionChange(serviceId, reportId, 1)
        })
      }else{
        this.setState({
          ['selectAllReport'+serviceId+reportId]: false
        }, function() {
          this.props.handlePermissionChange(serviceId, reportId, 0)
        })
      }
    }

    handleSelectAll(e) {
      if(e.target.checked) {
        for(let i in this.props.reports) {
          this.setState({
            ['selectAllReport'+this.props.reports[i].ServiceID+this.props.reports[i].report.ReportID]: true
          }, function() {
            this.props.handlePermissionChange(this.props.reports[i].ServiceID, this.props.reports[i].report.ReportID, 1);
          })
        }
        this.setState({
          selectAll: true
        })
      }else{
        for(let i in this.props.reports) {
          this.setState({
            ['selectAllReport'+this.props.reports[i].ServiceID+this.props.reports[i].report.ReportID]: false
          }, function() {
            this.props.handlePermissionChange(this.props.reports[i].ServiceID, this.props.reports[i].report.ReportID, 0);
          })
        }
        this.setState({
          selectAll: false
        })
      }
    }

    render() {
      const tableConfig = {
        defaultPageSize: 5
      }
      let reportData = [];
      if(this.props.reports) {
        reportData = this.props.reports;
      }
      let columns = [{
        Header: 'Module',
        accessor: 'ServicesName' // String-based value accessors!
      }, {
        Header: 'Report',
        accessor: 'report.ReportTitle'
      }, {
        id: 'action',
        Header: props => <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" name="viewAccess" id="check2" onChange={this.handleSelectAll.bind(this)} checked={this.state.selectAll ? true : false} />
        <Label className="custom-control-label" for="check2">View Access</Label>
      </div>,
        sortable: false,
        Cell: props => <div className="custom-control custom-checkbox custom-control-inline">
          <input type="checkbox" className="custom-control-input" name={"manage"+props.original.ServiceID+props.original.report.ReportID} id={"check"+props.original.ServiceID+props.original.report.ReportID} checked={(this.state['selectAllReport'+props.original.ServiceID+props.original.report.ReportID] ) ? true : false} onChange={(e) => this.handlePermissionChange(e, props.original.ServiceID, props.original.report.ReportID)} />
          <Label className="custom-control-label" for={"check"+props.original.ServiceID+props.original.report.ReportID}></Label>
        </div>
      }];
        return (
            <FormGroup>
                <div className="manage-table table-responsive">
                  {/*<table className="table table-striped">
                    <thead>
                      <tr>
                        <th>
                          <div>
                            <Label>Modules</Label>
                          </div>
                        </th>
                        <th>
                          <div>
                            <Label>Report</Label>
                          </div>
                        </th>
                        <th>
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name="viewAccess" id="check2" onChange={this.handleSelectAll.bind(this)} />
                            <Label className="custom-control-label" for="check2">View Access</Label>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportRow}
                    </tbody>
                  </table>*/}
                  <ReactTable
                    data={reportData}
                    columns={columns}
                    {...tableConfig}
                  />
                </div>
            </FormGroup>
        )
    }
}

export default ReportPermissions;