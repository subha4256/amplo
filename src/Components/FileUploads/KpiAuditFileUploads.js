import React, {Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import FileUpload from "./FileUpload";
import { kpiAudituploadFiles } from '../../actions/fileUploadActions';
import { getAuditHistory } from '../../actions/kpiActions';
//import ImageUpload from "../common/ImageUpload";

class KpiAuditFileUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      module: 'Kpi',
      uploadObj:"",
      warningMsg:"",
      processLevelId: this.props.match.params.processId,
      kpiId:this.props.match.params.kpiId
    }
  }
  componentDidMount = () => {
    this.props.getAuditHistory(this.state.kpiId);
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
        uploadObj.append('files[]', file[x]);
      }
      uploadObj.append('module',this.state.module);
      uploadObj.append('kpiId',this.state.kpiId);
     
      this.setState({
        uploadObj:uploadObj
      })
      //this.props.uploadFiles(uploadObj);
    });
  };
  kpiAudituploadFiles = (event) =>{
    if(this.state.uploadObj==''){
      const message = "Please choose file";
      this.setState({ warningMsg: message });
    }else{
      this.setState({ warningMsg: "" });
      if(this.props.auditHistory.length > 0){
        if(window.confirm('Do you want to overwrite the data ?')){
          this.props.kpiAudituploadFiles(this.state.uploadObj);
        }
      }else{
        this.props.kpiAudituploadFiles(this.state.uploadObj);
      }
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
          <Col sm="4"><button onClick={ this.kpiAudituploadFiles } class="btn btn-primary">Upload File</button></Col>
        </Row>
        <FileUpload addFile={this.addFile} files={this.state.files} warningMsg={this.state.warningMsg}/>
      </Container>
    );
  }
}

KpiAuditFileUploads.propTypes = {
  kpiAudituploadFiles: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auditHistory: state.kpiData.auditHistory
});
export default connect(mapStateToProps, { kpiAudituploadFiles, getAuditHistory })(KpiAuditFileUploads);
