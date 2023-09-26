import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row,Modal,ModalHeader,ModalBody,ModalFooter,Button,Label } from 'reactstrap';
import {Prompt} from 'react-router-dom';
import {fetchDependentDetails} from '../../actions/capabilityActions';
import _ from 'underscore';

class CapabilityDependentDetails extends Component {
    constructor (props){
        super (props);
        this.state = {
           
        };
    }
    componentDidMount() {
        console.log("inside mount")
        this.props.fetchDependentDetails({projectId:this.props.projectId,processId:this.props.processId?this.props.processId:0});
    }
    componentDidUpdate(prevProps){
        console.log("inside dependent details")
        if(this.props.projectId!=prevProps.projectId || this.props.processId!=prevProps.processId)
            this.props.fetchDependentDetails({projectId:this.props.projectId,processId:this.props.processId?this.props.processId:0});
    }

    render()
    {
        console.log("props.projectDependentDetails",this.props.projectDependentDetails)
        return(
         <React.Fragment>
            {this.props.projectDependentDetails.length && this.props.projectDependentDetails[0].DecompositionProjectID==this.props.projectId?
            <div>
                {
                    this.props.projectDependentDetails.map((item)=>{
                        return(
                        <React.Fragment>
                        <div><b>Dependent</b></div>
                        <Label>{`${item?.ProjectName}`}</Label>
                        <Label>{`${item?.DependentFunctionName},${item?.DependentPhaseName},${item?.DependentProcessLevelName}`}</Label>
                        <div>
                        <b>Independents</b>
                        </div>
                        <div>
                        <Label>{`${item.IndependentProcess.length?item.IndependentProcess[0].IndependentProjectName:''}`}</Label>
                        {
                            item.IndependentProcess.map((sub)=>{
                                return (
                                    <React.Fragment>
                                    <Label>{`${sub?.IndependentFunctionName},${sub?.IndependentPhaseName},${sub?.IndependenProcessName}`}</Label>
                                    </React.Fragment>
                                )
                            })
                        }
                        </div>
                        </React.Fragment>
                    );
                    })
                }
            </div>:''}
         </React.Fragment>  

        );

    }

}



const mapStateToProps = state => ({
    processes: state.adminCapabilityModeling.processes,
    projectDependentDetails:state.capability.projectDependentDetails
});
export default connect(mapStateToProps, {fetchDependentDetails  })(CapabilityDependentDetails);
