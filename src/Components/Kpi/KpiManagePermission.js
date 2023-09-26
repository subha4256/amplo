import React, { Component } from 'react';
import { Label, FormGroup } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCol: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.domains.length > 0 && nextProps.domains !== this.props.domains) {

            for (let p in nextProps.domains) {
                let permissionArr = ['Owner', 'noAccess', 'read', 'readWrite'];
                for (let i in permissionArr) {
                    this.setState({
                        ['selectAll' + permissionArr[i] + nextProps.domains[p].KPIID]: false
                    })
                }

                this.setState({
                    ['selectAll' + nextProps.domains[p].AccessType + nextProps.domains[p].KPIID]: true
                })
            }
            this.setState({
                selectedCol: ''
            })
            this.selectAllFromProps(nextProps.domains)
        }
    }

    selectAllFromProps = (domains) => {
        let permissionArr = ['Owner', 'noAccess', 'read', 'readWrite'];
        for (let i in permissionArr) {
            let accessCount = 0
            for (let p in domains) {
                if (domains[p].AccessType == permissionArr[i]) {
                    accessCount++
                }
            }
            console.log(accessCount)
            if (accessCount == domains.length) {
                this.setState({
                    selectedCol: permissionArr[i]
                })
            } 
        }
    }
    handlePermissionChange(KPIID, permission) {
        //console.log(KPIID, permission)
        let permissionArr = ['Owner', 'noAccess', 'read', 'readWrite'];
        for (let i in permissionArr) {
            this.setState({
                ['selectAll' + permissionArr[i] + KPIID]: false
            })
        }
        this.setState({
            ['selectAll' + permission + KPIID]: true
        }, function () {
            this.props.handlePermissionChange(KPIID, permission);
        })
        this.handleSelectAllCheckUncheck(permission)
    }

    handleSelectAllCheckUncheck(permission) {
        let trueCount = 1;
        for (let i in this.props.domains) {
            if (this.state['selectAll' + permission + this.props.domains[i].KPIID]) {
                trueCount++
            }
        }
        //console.log(trueCount);
        if (trueCount == this.props.domains.length) {
            this.setState({
                selectedCol: permission
            })
        } else {
            this.setState({
                selectedCol: ''
            })
        }
    }
    handleSelectAll(e, permission) {
        let permissionArr = ['Owner', 'noAccess', 'read', 'readWrite'];
        for (let i in this.props.domains) {
            for (let j in permissionArr) {
                this.setState({
                    ['selectAll' + permissionArr[j] + this.props.domains[i].KPIID]: false
                })
            }
        }
        if (e.target.checked) {
            for (let i in this.props.domains) {
                this.setState({
                    ['selectAll' + permission + this.props.domains[i].KPIID]: true
                }, function () {
                    this.props.handlePermissionChange(this.props.domains[i].KPIID, permission);
                })
            }
            this.setState({
                selectedCol: permission
            })
        } else {
            this.setState({
                selectedCol: ""
            })
        }
    }
    render() {
        const tableConfig = {
            defaultPageSize: 10
        }
        let domainsData = [];
        if (this.props.domains) {
            domainsData = this.props.domains;
        }
        let columns = [{
            Header: 'KPIs',
            accessor: 'KPIName' // String-based value accessors!
        }, {
            id: 'action0',
            Header: props => <div className="custom-control custom-checkbox text-center">
                <input type="checkbox" className="custom-control-input" id="check1" name="OwnerSelectAll" onChange={(e) => this.handleSelectAll(e, 'Owner')} checked={this.state.selectedCol === 'Owner' ? true : false} />
                <Label className="custom-control-label" for="check1">Owner</Label>
            </div>,
            sortable: false,
            Cell: props => <div className="custom-control custom-radio text-center">
                <input type="radio" className="custom-control-input" id={"domainRadiod" + props.original.KPIID} name={"domain" + props.original.KPIID} onChange={this.handlePermissionChange.bind(this, props.original.KPIID, 'Owner')} checked={this.state['selectAllOwner' + props.original.KPIID] ? true : false} />
                <Label className="custom-control-label" for={"domainRadiod" + props.original.KPIID}></Label>
            </div>
        }, {
            id: 'action1',
            Header: props => <div className="custom-control custom-checkbox text-center">
                <input type="checkbox" className="custom-control-input" id="check2" name="noAccessSelectAll" onChange={(e) => this.handleSelectAll(e, 'noAccess')} checked={this.state.selectedCol === 'noAccess' ? true : false} />
                <Label className="custom-control-label" for="check2">No Access</Label>
            </div>,
            sortable: false,
            Cell: props => <div className="custom-control custom-radio text-center">
                <input type="radio" className="custom-control-input" id={"domainRadioc" + props.original.KPIID} name={"domain" + props.original.KPIID} onChange={this.handlePermissionChange.bind(this, props.original.KPIID, 'noAccess')} checked={this.state['selectAllnoAccess' + props.original.KPIID] ? true : false} />
                <Label className="custom-control-label" for={"domainRadioc" + props.original.KPIID}></Label>
            </div>
        }, {
            id: 'action2',
            Header: props => <div className="custom-control custom-checkbox text-center">
                <input type="checkbox" className="custom-control-input" id="check3" name="readSelectAll" onChange={(e) => this.handleSelectAll(e, 'read')} checked={this.state.selectedCol === 'read' ? true : false} />
                <Label className="custom-control-label" for="check3">Read Only</Label>
            </div>,
            sortable: false,
            Cell: props => <div className="custom-control custom-radio text-center">
                <input type="radio" className="custom-control-input" id={"domainRadioa" + props.original.KPIID} name={"domain" + props.original.KPIID} onChange={this.handlePermissionChange.bind(this, props.original.KPIID, 'read')} checked={this.state['selectAllread' + props.original.KPIID] ? true : false} />
                <Label className="custom-control-label" for={"domainRadioa" + props.original.KPIID}></Label>
            </div>
        }, {
            id: 'action3',
            Header: props => <div className="custom-control custom-checkbox text-center">
                <input type="checkbox" className="custom-control-input" id="check4" name="readWriteSelectAll" onChange={(e) => this.handleSelectAll(e, 'readWrite')} checked={this.state.selectedCol === 'readWrite' ? true : false} />
                <Label className="custom-control-label" for="check4">Read/Write</Label>
            </div>,
            sortable: false,
            Cell: props => <div className="custom-control custom-radio text-center">
                <input type="radio" className="custom-control-input" id={"domainRadiob" + props.original.KPIID} name={"domain" + props.original.KPIID} onChange={this.handlePermissionChange.bind(this, props.original.KPIID, 'readWrite')} checked={this.state['selectAllreadWrite' + props.original.KPIID] ? true : false} />
                <Label className="custom-control-label" for={"domainRadiob" + props.original.KPIID}></Label>
            </div>
        }];
        return (
            <FormGroup>
                <div className="manage-table table-responsive">
                    <ReactTable
                        data={domainsData}
                        columns={columns}
                        {...tableConfig}
                    />
                </div>
            </FormGroup>
        )
    }
}

export default Permissions;