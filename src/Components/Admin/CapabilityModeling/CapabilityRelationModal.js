import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row,Modal,ModalHeader,ModalBody,ModalFooter,Button } from 'reactstrap';
import {Prompt} from 'react-router-dom';
import _ from 'underscore';
import CapabilityDependentDetails from '../../Capability/CapabilityDependentDetails';

class CapabilityRelationModal extends Component {
    constructor (props){
        super (props);
        this.state = {
           
        };
    }
    componentDidMount() {
    }

    render()
    {
        return(
            <Modal isOpen={true} toggle={()=>this.props.updateRelation()}>
          <ModalHeader toggle={()=>this.props.updateRelation()}>Relation Data</ModalHeader>
          <ModalBody>
          {this.props.projectId && this.props.processId?<CapabilityDependentDetails projectId={this.props.projectId} processId={this.props.processId} />:''}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.props.updateRelation()}>Close</Button>
          </ModalFooter>
        </Modal>

        );

    }

}

CapabilityRelationModal.propTypes = {
    
}

const mapStateToProps = state => ({
    processes: state.adminCapabilityModeling.processes,
    saveDecomposition: state.adminCapabilityModeling.saveDecomposition,
    errors: state.errors
});
export default connect(mapStateToProps, {  })(CapabilityRelationModal);
