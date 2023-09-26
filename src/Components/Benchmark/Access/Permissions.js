import React, {Component} from 'react';
import { Label, FormGroup } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedCol: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.currentUser !== this.props.currentUser) {
            this.setState({
                selectedCol: ""
            })
        }
        if(nextProps.domains.length > 0 && nextProps.domains !== this.props.domains) {
            for(let p in nextProps.domains) {
                let permissionArr = ['noAccess', 'read', 'readWrite'];
                for(let i in permissionArr) {
                    this.setState({
                        ['selectAll'+permissionArr[i]+nextProps.domains[p].DomainID]: false
                    })
                }
                this.setState({
                    ['selectAll'+nextProps.domains[p].AccessType+nextProps.domains[p].DomainID]: true
                })
            }
        }
    }
    handlePermissionChange(domainId, permission) {
        let permissionArr = ['noAccess', 'read', 'readWrite'];
        for(let i in permissionArr) {
            this.setState({
                ['selectAll'+permissionArr[i]+domainId]: false
            })
        }
        this.setState({
            ['selectAll'+permission+domainId]: true
        }, function() {
            console.log(this.state)
            this.props.handlePermissionChange(domainId, permission);
        })
        this.handleSelectAllCheckUncheck(permission);
    }

    handleSelectAllCheckUncheck(permission) {
        let trueCount = 1;
        for (let i in this.props.domains) {
            if (this.state['selectAll' + permission + this.props.domains[i].DomainID]) {
                trueCount++
            }
        }
        console.log(trueCount);
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
        let permissionArr = ['noAccess', 'read', 'readWrite'];
        for(let i in this.props.domains) {
            for(let j in permissionArr) {
                this.setState({
                    ['selectAll'+permissionArr[j]+this.props.domains[i].DomainID]: false
                })
            }
        }
        if(e.target.checked) {
            for(let i in this.props.domains) {    
                this.setState({
                    ['selectAll'+permission+this.props.domains[i].DomainID]: true
                }, function() {
                    this.props.handlePermissionChange(this.props.domains[i].DomainID, permission);
                })
            }
            this.setState({
                selectedCol: permission
            })
        }else{
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
        if(this.props.domains) {
            domainsData = this.props.domains;
        }
        let columns = [{
            Header: 'Domain',
            accessor: 'DomainName' // String-based value accessors!
          }, {
            id: 'action',
            Header: props => <div className="custom-control custom-checkbox text-center">
                <input type="checkbox" className="custom-control-input" id="check2" name="noAccessSelectAll" onChange={(e) => this.handleSelectAll(e, 'noAccess')}  checked={this.state.selectedCol === 'noAccess' ? true : false} />
                <Label className="custom-control-label" for="check2">No Access</Label>
            </div>,
            sortable: false,
            Cell: props => <div className="custom-control custom-radio text-center">
                <input type="radio" className="custom-control-input" id={"domainRadio"+props.original.DomainID} name={"domain"+props.original.DomainID} onChange={this.handlePermissionChange.bind(this, props.original.DomainID, 'noAccess')} checked={this.state['selectAllnoAccess'+props.original.DomainID] ? true : false} />
                <Label className="custom-control-label" for={"domainRadio"+props.original.DomainID}></Label>
            </div>
        }, {
            id: 'action2',
            Header: props => <div className="custom-control custom-checkbox text-center">
                <input type="checkbox" className="custom-control-input" id="check3" name="readSelectAll" onChange={(e) => this.handleSelectAll(e, 'read')} checked={this.state.selectedCol === 'read' ? true : false} />
                <Label className="custom-control-label" for="check3">Read Only</Label>
            </div>,
            sortable: false,
            Cell: props => <div className="custom-control custom-radio text-center">
                <input type="radio" className="custom-control-input" id={"domainRadioa"+props.original.DomainID} name={"domain"+props.original.DomainID} onChange={this.handlePermissionChange.bind(this, props.original.DomainID, 'read')} checked={this.state['selectAllread'+props.original.DomainID] ? true : false} />
                <Label className="custom-control-label" for={"domainRadioa"+props.original.DomainID}></Label>
            </div>
        }, {
            id: 'action3',
            Header: props => <div className="custom-control custom-checkbox text-center">
                <input type="checkbox" className="custom-control-input" id="check4" name="readWriteSelectAll" onChange={(e) => this.handleSelectAll(e, 'readWrite')} checked={this.state.selectedCol === 'readWrite' ? true : false} />
                <Label className="custom-control-label" for="check4">Read/Write</Label>
            </div>,
            sortable: false,
            Cell: props => <div className="custom-control custom-radio text-center">
                <input type="radio" className="custom-control-input" id={"domainRadiob"+props.original.DomainID} name={"domain"+props.original.DomainID} onChange={this.handlePermissionChange.bind(this, props.original.DomainID, 'readWrite')} checked={this.state['selectAllreadWrite'+props.original.DomainID] ? true : false} />
                <Label className="custom-control-label" for={"domainRadiob"+props.original.DomainID}></Label>
            </div>
        }];
        /*const domainWrap = this.props.domains.map((domain, key) => {
            return (
                <tr key={'domainDiv'+domain.DomainID}>
                    <td className="pl-5">{domain.DomainName}</td>
                    <td className="td-wth text-center">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id={"domainRadio"+domain.DomainID} name={"domain"+domain.DomainID} onChange={this.handlePermissionChange.bind(this, domain.DomainID, 'noAccess')}  checked={this.state['selectAllnoAccess'+domain.DomainID] ? true : false} />
                            <Label className="custom-control-label" for={"domainRadio"+domain.DomainID}></Label>
                        </div>
                    </td>
                    <td className="td-wth text-center">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id={"domainRadioa"+domain.DomainID} name={"domain"+domain.DomainID} onChange={this.handlePermissionChange.bind(this, domain.DomainID, 'read')} checked={this.state['selectAllread'+domain.DomainID] ? true : false} />
                            <Label className="custom-control-label" for={"domainRadioa"+domain.DomainID}></Label>
                        </div>
                    </td>
                    <td className="td-wth text-center">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id={"domainRadiob"+domain.DomainID} name={"domain"+domain.DomainID} onChange={this.handlePermissionChange.bind(this, domain.DomainID, 'readWrite')} checked={this.state['selectAllreadWrite'+domain.DomainID] ? true : false} />
                            <Label className="custom-control-label" for={"domainRadiob"+domain.DomainID}></Label>
                        </div>
                    </td>
                </tr>
            )
        })*/
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