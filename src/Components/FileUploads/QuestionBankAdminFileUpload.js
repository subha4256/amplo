import React, {Component} from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {Container, Row, Col} from 'reactstrap';
import FileUpload from "./FileUpload";
import { questionsBankAdminUploadFile } from '../../actions/fileUploadActions';
import { Global } from '../../utils/Env';
import { getAmploQuestionBankImport , getAmploQuestionsBank} from "../../actions/benchmarkingActions"
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
    // Method: Update and New quesiton bank (Admin Side)
    // parameters: batchid and question bank name

    Global.callback.questionsBankAdminUploadFile_onComplete = async(response) => {
      //  FOR UPDATE THE QUESTION BANK ****************
   if(this.props.match.params.questionBankId) {
        responseMessage("success","Data save successfully");
      
       setTimeout(()=>{
         this.props.history.replace(`/questions-bank-admin-preview/${response.data[0].BatchId}/${this.props.match.params.questionBankId}` );
        },2000)
        
      }else {
        
        // FOR ADD NEW QUESIOTN BANK **********
        
        if(response.success) {
          await this.props.getAmploQuestionBankImport(response.data[0].BatchId)
          
              Global.callback.getAmploQuestionBankImport_onComplete = res => {
                  // console.log(res);
                  // console.log(this.state.questionsbanks) 
              const is_match = this.state.questionsbanks.some(item => item.QuestionBankName.toLowerCase() == res.data[0].QuestionBankName.toLowerCase());

              console.log(is_match)
  
              if(!is_match) {
                responseMessage("success","Data save successfully");
                 setTimeout(()=>{
                 this.props.history.replace('/questions-bank-admin-preview/'+response.data[0].BatchId  );
                 },2000)
                  }else {
                responseMessage("warning" , `${res.data[0].QuestionBankName} already exists, Choose a new question bank`);
             }
          }
        }
      }
    }
  }


  componentDidMount () {
    this.props.getAmploQuestionsBank()
    Global.callback.getAmploQuestionsBank_onComplete = res => {
      // console.log(res) 
      this.setState({
        questionsbanks: res?.data
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
      this.props.questionsBankAdminUploadFile(this.state.uploadObj)
    }
  }
  render() {
 
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
export default connect(mapStateToProps, { questionsBankAdminUploadFile , getAmploQuestionBankImport ,getAmploQuestionsBank })(FileUploads);
