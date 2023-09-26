import React, {Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import FileUpload from "./FileUpload";
import { kpiuploadFiles , uploadFilesValidate } from '../../actions/fileUploadActions';
import { Global } from '../../utils/Env';
//import ImageUpload from "../common/ImageUpload";

class KpiFileUploads extends Component {
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
    Global.callback.uploadFilesValidate_onComplete = (res) => {
      if(res.data.status == 0 || res.data.status == '0'){
        this.props.kpiuploadFiles(this.state.uploadObj);
      }else if(res.data.status == 1 || res.data.status == '1'){
        if(window.confirm('Do you want to overwrite existing KPI Data')){
          this.props.kpiuploadFiles(this.state.uploadObj);
        }
      }else if(res.data.status == 2 || res.data.status == '2'){
        window.alert('There is no KPI data in excel sheet, Please upload excel sheet with data.')
      }else if(res.data.status == 3 || res.data.status == '3'){
        window.alert(res.message)
      }else if(res.data.status == 4 || res.data.status == '4'){
        window.alert('Some error occurred. Please try again later.')
      }
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
  kpiuploadFiles = (event) =>{
    if(this.state.uploadObj==''){
      const message = "Please choose file";
      this.setState({ warningMsg: message });
    }else{
      this.setState({ warningMsg: "" });
      this.props.uploadFilesValidate(this.state.uploadObj);
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
          <Col sm="4"><button onClick={ this.kpiuploadFiles } class="btn btn-primary">Upload File</button></Col>
        </Row>
        <FileUpload addFile={this.addFile} files={this.state.files} warningMsg={this.state.warningMsg}/>
      </Container>
    );
  }
}

KpiFileUploads.propTypes = {
    kpiuploadFiles: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, { kpiuploadFiles, uploadFilesValidate })(KpiFileUploads);
