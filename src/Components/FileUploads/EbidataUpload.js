import React, {Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import FileUpload from "./FileUpload";
import { uploadFiles,uploadEbiFiles } from '../../actions/fileUploadActions';
import { fetchProcessData } from '../../actions/capabilityModelingActions';
import {startLoader ,stopLoader} from '../../actions/loaderActions';
import axios from 'axios';
import { NavLink } from "react-bootstrap";
const config = require('../../config');
//import ImageUpload from "../common/ImageUpload";

class EbidataUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      module: 'ebidata',
      uploadObj:"",
      warningMsg:"",
    //   processLevelId: this.props.match.params.processId,
    //   projectId : this.props.match.params.projectId
    }
  }
  componentDidMount = () => {
    // this.props.startLoader();
    // axios.get(config.laravelBaseUrl+'getDecompositionProjectVersion/'+this.state.projectId+'/'+this.state.processLevelId+'/'+this.props.match.params.projectVersionId,{
    //   headers: {
    //       "authorization": "Bearer " + sessionStorage.getItem("userToken")
    //   }
    // }).then(response=>{
    //   this.props.stopLoader();
    //   let  versionId = response.data.data[0]? response.data.data[0].VersionId : 0 ;
    //   let params = {
    //     projectId: this.state.projectId,
    //     processId: this.state.processLevelId,
    //     version: versionId,
    //     ProjectVersionId : this.props.match.params.projectVersionId
    //   }
    //   this.props.fetchProcessData(params)
    // }).catch(err =>{
    //   this.props.stopLoader();
    // })
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
    //   uploadObj.append('processLevelId',this.state.processLevelId);
    //  uploadObj.append('projectId',this.state.projectId)
      this.setState({
        uploadObj:uploadObj
      })
      //this.props.uploadFiles(uploadObj);
    });
  };
  uploadFiles = (event) =>{
    if(this.state.uploadObj==''){
      const message = "Please choose file";
      this.setState({ warningMsg: message });
    }else{
      this.setState({ warningMsg: "" });
    //   if(this.props.processes.hasOwnProperty('processes')){
    //     if(this.props.processes.processes[0] != ''){
    //       if(this.props.processes.processes[0].hasOwnProperty('child')){
    //         if(this.props.processes.processes[0].child.length > 0){
    //           if(window.confirm('Do you want to overwrite the process data ?')){
    //             this.props.uploadFiles(this.state.uploadObj);
    //           }
    //         }else{
    //           this.props.uploadFiles(this.state.uploadObj);
    //         }
    //       }else{
    //         this.props.uploadFiles(this.state.uploadObj);
    //       }
    //     }else{
    //       this.props.uploadFiles(this.state.uploadObj);
    //     }
    //   }else{
        this.props.uploadEbiFiles(this.state.uploadObj);
    //   }
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
          <Col sm="4"><button onClick={ this.uploadFiles } class="btn btn-primary">Upload File</button>
          <button style={{marginLeft:'10px'}} onClick={()=>this.props.history.push('/powerbi-report')} class="btn btn-primary">Back</button>
          </Col>
          {/* <Col style={{}} sm="4"><button onClick={ this.uploadFiles } class="btn btn-primary">Upload File</button></Col> */}

        </Row>
        <FileUpload addFile={this.addFile} files={this.state.files} warningMsg={this.state.warningMsg}/>
      </Container>
    );
  }
}

// EbidataUpload.propTypes = {
//   uploadFiles: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
  errors: state.errors,
  processes: state.capabilityModeling.processes
});
export default connect(mapStateToProps, { uploadEbiFiles,uploadFiles, fetchProcessData, startLoader ,stopLoader })(EbidataUpload);
