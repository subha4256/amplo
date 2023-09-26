import React, {Component} from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import FileUpload from "./FileUpload";
import { questionsBankUploadFile } from '../../actions/fileUploadActions';
import { Global } from '../../utils/Env';
import { getClientQuestionBankImport, getClientQuestionsBank } from "../../actions/benchmarkingActions";
import { responseMessage } from "../../utils/alert";

class FileUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploadObj:"",
      warningMsg:"",
      questionsbanks: []
    }



    // Author: Sonu Sharma 
    // Profile; Fullstack developer
    // Data: 21/07/2021 
    // Method: Update and New quesiton bank (Users Side)
    // parameters: batchid and question bank name

    Global.callback.questionsBankUploadFile_onComplete = response => {

             

      if(this.props.match.params.questionBankId) {
        // responseMessage("success","Data save successfully");

        // console.log(this.props.match.params.questionBankId)
        responseMessage("success","Data save successfully");
        
         setTimeout(()=>{
           this.props.history.replace(`/questions-bank-preview/${response.data[0].BatchId}/${this.props.match.params.questionBankId}` );
         },2000)
  
       }else { 
        this.props.getClientQuestionBankImport(response.data[0].BatchId)
        Global.callback.getClientQuestionBankImport_onComplete = res => {
       
                 const is_match = this.state.questionsbanks.some(item => item.QuestionBankName == res.data[0].QuestionBankName);
 
                //  console.log(is_match)
 
                 if(!is_match ) {
                   responseMessage("success","Data save successfully");
                     setTimeout(()=>{
                       this.props.history.replace('/questions-bank-preview/'+response.data[0].BatchId);
 
                     },2000)
                 }else {
                   responseMessage("warning" , `${res.data[0].QuestionBankName} already exists, Choose a new question bank`);
                 }
 
               }  
          }

      }

  }


  componentDidMount () {
    this.props.getClientQuestionsBank(0)
    Global.callback.getClientQuestionsBank_onComplete=(quesitonBanks) => {

      // console.log(quesitonBanks.data)
      this.setState({
        questionsbanks:  quesitonBanks?.data
      })
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
    this.setState({
      files: file.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    }, function() {
        let uploadObj = new FormData();
        uploadObj.append('files', file[0]);
        uploadObj.append('ImportedOn', moment().format("YYYY-MM-DD HH:mm:ss"));
        this.setState({
            uploadObj:uploadObj
        })
    });
  };
  uploadFiles = (event) =>{
    if(this.state.uploadObj==''){
      const message = "Please choose a file";
      this.setState({ warningMsg: message });
    }else{
      this.setState({ warningMsg: "" });
      this.props.questionsBankUploadFile(this.state.uploadObj)
    }
  }
  render() {

    console.log("File Upload ==> ", this.props)
    // console.log(this.props.location.query.question_id)
    
    return (
      <Container className="mt-5">
        <Row>
          <Col sm="4"><button onClick={ this.uploadFiles } class="btn btn-primary">Upload File</button></Col>
        </Row>
        <FileUpload addFile={this.addFile} files={this.state.files} warningMsg={this.state.warningMsg}/>
      </Container>
    );
  }
}

FileUploads.propTypes = {
  uploadFiles: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  processes: state.capabilityModeling.processes
});
export default connect(mapStateToProps, { getClientQuestionBankImport,questionsBankUploadFile , getClientQuestionsBank })(FileUploads);
