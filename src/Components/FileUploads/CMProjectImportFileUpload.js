import React, {Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import FileUpload from "./FileUpload";
import { CMProjectImportUploadFile } from '../../actions/fileUploadActions';
import { fetchProcessData } from '../../actions/capabilityModelingActions';
import {startLoader ,stopLoader} from '../../actions/loaderActions';
import axios from 'axios';
const config = require('../../config');
//import ImageUpload from "../common/ImageUpload";

class CMProjectImportFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      module: 'capability',
      uploadObj:"",
      warningMsg:"",
      projectId : this.props.match.params.projectId
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  handleModuleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addFile = file => {
    //console.log(file);
    this.setState({
      files: file.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    }, function() {
      let uploadObj = new FormData();
      for(var x = 0; x<file.length; x++) {
        uploadObj.append('files', file[x]);
      }
      uploadObj.append('module',this.state.module);
      uploadObj.append('projectId',this.state.projectId);
     
      this.setState({
        uploadObj:uploadObj
      })
      //this.props.uploadFiles(uploadObj);
    });
  };
  uploadFiles = () =>{
    if(this.state.uploadObj==''){
        const message = "Please choose file";
        this.setState({ warningMsg: message });
    }else{
        this.setState({ warningMsg: "" });
        this.props.CMProjectImportUploadFile(this.state.uploadObj);
        // setTimeout(() =>{
        //        this.props.history.goBack()
        // }, 8000)
    }
  }
  render() {

    
    return (
      <Container className="mt-5">
        {/*<ImageUpload addFile={this.addFile} files={this.state.files} />*/}
        <Row>
          {/* <Col sm="6">
            <select name="module" className="form-control" onChange={(e) => this.handleModuleChange(e)}>
              <option value="capability_modeling">Capability Modeling</option>
              <option value="decomposition">Decomposition</option>
            </select>
          </Col> */}
          <Col sm="4"><button onClick={ this.uploadFiles } class="btn btn-primary">Upload File</button></Col>
        </Row>
        <FileUpload addFile={this.addFile} files={this.state.files} warningMsg={this.state.warningMsg}/>
      </Container>
    );
  }
}

CMProjectImportFileUpload.propTypes = {
  uploadFiles: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { CMProjectImportUploadFile, fetchProcessData, startLoader ,stopLoader })(CMProjectImportFileUpload);
