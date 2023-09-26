import React, {Component} from 'react';
import { Label, Row, Col, FormGroup, Button } from 'reactstrap';
import _ from 'underscore';
import tableDragger from 'table-dragger'

class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state={
            checkSelectedFunction : 0,
            checkSelectedPhases : 0,
            permissionChecks: {

            },
            selectall: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.firstTimeSave === true){
            if(nextProps.userId != 0){
                this.props.handleUserChange({target:{value:0}})
            }
            if(this.state.checkSelectedFunction != nextProps.selectedFunctions.length || this.state.checkSelectedPhases != nextProps.selectedPhases.length){
                if(nextProps.selectedFunctions.length > 0 && nextProps.selectedPhases.length > 0){
                    this.handleSelectAll({target:{checked:true}})
                }
                this.setState({
                    checkSelectedFunction : nextProps.selectedFunctions.length,
                    checkSelectedPhases : nextProps.selectedPhases.length
                })
            }
        }else{
            if(this.props.userPermissions !== nextProps.userPermissions) {
                // console.log(nextProps.userPermissions);
                // console.log(this.props.userPermissions);
                if(nextProps.userPermissions.length > 0 && this.props.userPermissions !== 'undefined'){
                    var count = 0;
                    for(let i in this.props.selectedFunctions) {
                        for(let j in this.props.selectedPhases) {
                            let Index = _.findIndex(nextProps.userPermissions, {"FunctionID": this.props.selectedFunctions[i].FunctionId, "PhaseID": this.props.selectedPhases[j].PhaseId});
                            //console.log(Index);
                            if(Index > -1){                            
                                this.setState({
                                    ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: true,
                                    //selectall: true
                                }, function() {
                                    this.props.handlePermissionChange(true, this.props.selectedPhases[j].PhaseId, this.props.selectedFunctions[i].FunctionId);
                                })    
                            }else{
                                this.setState({
                                    ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: false,
                                    //selectall: false
                                },function() {
                                    this.props.handlePermissionChange(false, this.props.selectedPhases[j].PhaseId, this.props.selectedFunctions[i].FunctionId);
                                })
                            }
                            count++;                    
                        }
                        
                    }
                    //console.log(count, nextProps.userPermissions.length);
                    if(count === nextProps.userPermissions.length){
                        this.setState({
                            selectall: true
                        })
                    }else{
                        this.setState({
                            selectall: false
                        })
                    }
                }
                else{  
                    this.setState({
                        selectall: false
                    })
                    //console.log(2);              
                    for(let i in this.props.selectedFunctions) {
                        for(let j in this.props.selectedPhases) {
                            this.setState({
                                ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: false,
                                //selectall: true
                            }, function() {
                                this.props.handlePermissionChange(false, this.props.selectedPhases[j].PhaseId, this.props.selectedFunctions[i].FunctionId);
                            })                        
                        }
                    }
                }
            }
            else{
                // if(this.props.userPermissions === undefined && this.props.selectedFunctions.length > 0){
                //     //this.handleSelectAll({target:{checked: true}});
                //     for(let i in this.props.selectedFunctions) {
                //         for(let j in this.props.selectedPhases) {
                //             this.setState({
                //                 ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: true,
                //                  //selectall: true
                //             })
                //         }
                //     }
                // }
            }
        }
    }

    componentDidUpdate() {
        if(this.props.selectedFunctions.length > 0 && this.props.selectedPhases.length > 0) {
            var el = document.getElementById('table');
            var dragger = tableDragger(el, {
                mode: 'row',
                dragHandler: '',
                onlyBody: true,
                animation: 300
            });
            dragger.on('drop',function(from, to) {
                // console.log(from);
                // console.log(to);
            });
        }
    }

    componentDidMount() {
        // console.log('In did mount')        
        // var el2 = document.getElementById('tablee');
        // var dragger2 = tableDragger(el2, {
        // mode: 'free',
        // dragHandler: '.handle',
        // onlyBody: true,
        // });
        // dragger2.on('drop',function(from, to){
        // console.log(from);
        // console.log(to);
        // });
    }

    handlePermissionChange(e, phaseId, functionId) {
        let permissionIndex = _.findIndex(this.props.permissions, {FunctionId: functionId, PhaseId: phaseId});
        //console.log(permissionIndex);
        this.setState({selectall: false});
        if(e.target.checked) {
            if(permissionIndex === -1){
                this.setState({
                    ['permission-'+phaseId+functionId] : true,
                }, function() {
                    this.props.handlePermissionChange(true, phaseId, functionId);
                })
            }
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
            // console.log(this.props.selectedFunctions,this.props.selectedPhases,"inSelectAll")
            for(let i in this.props.selectedFunctions) {
                for(let j in this.props.selectedPhases) {
                    this.setState({
                        ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: true,
                         selectall: true
                    }, function() {
                        this.props.handlePermissionChange(true, this.props.selectedPhases[j].PhaseId, this.props.selectedFunctions[i].FunctionId);
                    })
                }
            }
        }else{
            for(let i in this.props.selectedFunctions) {
                for(let j in this.props.selectedPhases) {
                    this.setState({
                        ['permission-'+this.props.selectedPhases[j].PhaseId+this.props.selectedFunctions[i].FunctionId]: false,
                        selectall: false
                    }, function() {
                        this.props.handlePermissionChange(false, this.props.selectedPhases[j].PhaseId, this.props.selectedFunctions[i].FunctionId);
                    })
                }
            }
        }
    }

    renderItems() {
        return this.props.selectedPhases.map(phase => {
            //let funcIndex = _.findIndex(this.props.projectFunctions, {"FunctionId": nextProps.userPermissions[i].FunctionID});
            let phaseIndex = _.findIndex(this.props.projectPhases, {"DecompositionPhaseID": phase.PhaseId});
            if(phaseIndex > -1){
                return (
                    <tr key={'accessTr-'+phase.PhaseId} id={phase.PhaseId}>
                        <td className="handle">{phase.PhaseName}</td>
                        {
                            this.props.selectedFunctions.map(func => {
                                return (
                                    <td key={'accessTd-'+func.FunctionId+phase.PhaseId}>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" className="custom-control-input" disabled={this.props.firstTimeSave === true?true:false} id={"phseca_"+func.FunctionId+phase.PhaseId} onChange={(e) => this.handlePermissionChange(e, phase.PhaseId, func.FunctionId)} 
                                            checked={(this.state['permission-'+phase.PhaseId+func.FunctionId]) ? true : false} />
                                            <label className="custom-control-label custom-control-label-big" htmlFor={"phseca_"+func.FunctionId+phase.PhaseId}></label>
                                        </div>
                                    </td>
                                )
                            })
                        }
                    </tr>
                )
            }
        })
    }
    
    render() {


        console.log("Permisstion State =>>>",this.state)

        // console.log(this.props.userId)
        let projectUsers = this.props.projectUsers.map(user => {
            return(
                <option key={user.UserID} value={user.UserID} title={user.EmailAddress}>{user.UserName}</option>
            )
        })
        return (
            <>
                <div className="card manage-section" style={{marginTop:"20px",marginBottom:"30px"}}>
                    <div className="card-header">
                        Manage User Specific Access
                    </div>
                    <div className="card-body">
                        <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                            <p className="card-text" style={{lineHeight:"22px"}}>Assign access to Users for Functions and Phases for the respective Capability Modeling Projects. By default read/write access will be provided to all Functions and Phases for the respective Capability Modeling Projects.</p>
                            <Row className="form-group">
                                <Col sm="6" className="tab-fullwidth100">
                                <label>Select User<span className="text-danger">*</span></label>
                                <select className="form-control" disabled={this.props.firstTimeSave===true?true:false} onChange={(e) => this.props.handleUserChange(e)} value={this.props.userId}>
                                    <option value="0">All Users</option>
                                    {projectUsers}
                                </select>
                                </Col>
                                <Col sm="6">
                                    <label className="disnone-tab">&nbsp;</label>
                                    <div className="custom-control custom-checkbox mt-2">
                                        <input type="checkbox" className="custom-control-input" id="allfunction" onChange={(e) => this.handleSelectAll(e) } disabled={this.props.firstTimeSave===true?true:false} checked={(this.state.selectall === true) ? true : false} />
                                        <label className="custom-control-label custom-control-label-big" htmlFor="allfunction">All Functions and Phases<span className="text-danger">*</span></label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group row-btn mt-4">
                                <Col sm="12">
                                    <div className="manage-table manage-table-dragtable table-responsive">
                                        <table className="table table-striped table-bordered" id="table">
                                            <thead className="text-center">
                                                <tr>
                                                    <th>&nbsp;</th>
                                                    {
                                                        this.props.selectedFunctions.map(func => {
                                                            return (
                                                                <th key={'accessTh-'+func.FunctionId}>{func.FunctionName}</th>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                { this.renderItems() }
                                            </tbody>
                                        </table>
                                        {/*<table id="tablee" className="table">
                                            <thead>
                                                <tr>
                                                    <th>header1</th>
                                                    <th>header2</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="handle">conten1</td>
                                                    <td>conten2</td>
                                                </tr> 
                                                <tr>
                                                    <td className="handle">conten2</td>
                                                    <td>conten3</td>
                                                </tr> 
                                            </tbody>
                                        </table>*/}
                                    </div>
                                </Col>
                            </Row>
                            {this.props.firstTimeSave!=true?<Row className="form-group row-btn mt-4">
                                <Col sm="6">
                                    <Button color="primary" className="mr-3" onClick={()=>this.props.handleSavePermissions()}>SAVE</Button>
                                    <a href="javascript:void(0)" onClick={ ()=>this.props.handleGoBack() }>Cancel</a>
                                </Col>
                            </Row>:null}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Permissions;