import React, {Component} from "react";
import Dropzone from 'react-dropzone';

// for pdf files
class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningMsg: ""
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.warningMsg!=""){
      this.setState({ warningMsg: nextProps.warningMsg });
    }
  }
  onDrop = (accepted, rejected) => {
    if (Object.keys(rejected).length !== 0) {
      const message = "Please submit valid file type";
      this.setState({ warningMsg: message });
    } else {
      this.props.addFile(accepted);
      this.setState({ warningMsg: "" });
      //console.log(accepted[0].preview);

      var blobPromise = new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(accepted[0]);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      blobPromise.then(value => {
        //console.log(value);
      });
    }
  };

  render() {
    const { files } = this.props;
    const renderFiles =
      Object.keys(files).length !== 0 ? (
        files.map(file => <p key={file.name}>{file.name}</p>)
      ) : (
        <p className="hello">Please drop only .XLS files</p>
      );

    return (
      <div>
        <h2 className="text-danger">{this.state.warningMsg}</h2>
        <Dropzone 
          multiple={false} 
          accept="application/xls, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
          onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            border: " 2px dashed",
            cursor: "pointer"
          }}>
              <input {...getInputProps()} />
              {renderFiles}
            </div>
          </section>
        )}
      </Dropzone>
        {/*<Dropzone
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            border: " 2px dashed"
          }}
          multiple={false}
          accept="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
        >
          {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragReject) return "Please submit a valid file";
            return renderFiles;
          }}
        </Dropzone>*/}
      </div>
    );
  }
}

export default FileUpload;
