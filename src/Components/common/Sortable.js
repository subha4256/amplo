import React, {Component} from 'react';
import { Label, Row, Col, FormGroup } from 'reactstrap';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/disable-selection';

class Sortable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.userPermissions !== nextProps.userPermissions) {
            for(let i in nextProps.userPermissions) {
                this.setState({
                    ['permission-'+nextProps.userPermissions[i].PhaseID+nextProps.userPermissions[i].FunctionID]: true
                })
            }
        }
    }
    componentDidMount() {
        this.$node = $(".move-tbody");
        this.$node.sortable({
            stop: (event, ui) => this.props.onStop(event, ui)
        });
    }

    handlePermissionChange(e, phaseId, functionId) {
        if(e.target.checked) {
            this.setState({
                ['permission-'+phaseId+functionId] : true
            }, function() {
                this.props.handlePermissionChange(true, phaseId, functionId);
            })
        }else{
            this.setState({
                ['permission-'+phaseId+functionId] : false
            }, function() {
                this.props.handlePermissionChange(false, phaseId, functionId);
            })
        }
    }

    handleSelectAll(e) {
        if(e.target.checked) {
            for(let i in this.props.data.selectedFunctions) {
                for(let j in this.props.data.selectedPhases) {
                    this.setState({
                        ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: true
                    }, function() {
                        this.props.handlePermissionChange(true, this.props.selectedPhases[j].PhaseId, this.props.selectedFunctions[i].FunctionId);
                    })
                }
            }
        }else{
            for(let i in this.props.data.selectedFunctions) {
                for(let j in this.props.data.selectedPhases) {
                    this.setState({
                        ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: false
                    }, function() {
                        this.props.handlePermissionChange(false, this.props.selectedPhases[j].PhaseId, this.props.selectedFunctions[i].FunctionId);
                    })
                }
            }
        }
    }

    renderItems() {
        return this.props.data.selectedPhases.map(phase => {
            return (
                <tr key={'accessTr-'+phase.PhaseId} id={phase.PhaseId}>
                    <td>{phase.PhaseName}</td>
                    {
                        this.props.data.selectedFunctions.map(func => {
                            return (
                                <td key={'accessTd-'+func.FunctionId+phase.PhaseId}>
                                    <div className="custom-control custom-checkbox mt-2">
                                        <input type="checkbox" className="custom-control-input" id={"phseca_"+func.FunctionName+phase.PhaseId} onChange={(e) => this.handlePermissionChange(e, phase.PhaseId, func.FunctionId)} checked={this.state['permission-'+phase.PhaseId+func.FunctionId] ? true : false} />
                                        <label className="custom-control-label custom-control-label-big" htmlFor={"phseca_"+func.FunctionName+phase.PhaseId}></label>
                                    </div>
                                </td>
                            )
                        })
                    }
                </tr>
            )
        })
    }
    render() {
        let projectUsers = this.props.projectUsers.map(user => {
            return(
                <option key={user.UserID} value={user.UserID}>{user.UserName}</option>
            )
        })
        return (
            <>
                <Row className="form-group">
                    <Col sm="6" className="tab-fullwidth100">
                      <label>Select Users<span className="text-danger">*</span></label>
                      <select className="form-control" onChange={(e) => this.props.handleUserChange(e)}>
                        <option value="">All User</option>
                        {projectUsers}
                      </select>
                    </Col>
                    <Col sm="6">
                        <label className="disnone-tab">&nbsp;</label>
                        <div className="custom-control custom-checkbox mt-2">
                            <input type="checkbox" className="custom-control-input" id="allfunction" onChange={(e) => this.handleSelectAll(e)} />
                            <label className="custom-control-label custom-control-label-big" htmlFor="allfunction">All Functions and Phases<span className="text-danger">*</span></label>
                        </div>
                    </Col>
                </Row>
                <Row className="form-group row-btn mt-4">
                    <Col sm="12">
                        <div className="manage-table manage-table-dragtable table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="text-center move-thead">
                                    <tr>
                                        <th>&nbsp;</th>
                                        {
                                            this.props.data.selectedFunctions.map(func => {
                                                return (
                                                    <th key={'accessTh-'+func.FunctionId}>{func.FunctionName}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody className="text-center move-tbody">
                                    { this.renderItems() }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }

    componentWillUnmount() {
        this.$node.sortable('destroy');
    }
}

export default Sortable;