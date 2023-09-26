import React, {Component} from 'react';
import {Label} from 'reactstrap';
import SidebarJs from '../../../common/js/sidebarAnimation';
import { Link } from "react-router-dom";
import axios from 'axios';
import Search from '../../common/Search/Search';
import CacheStorage from '../../../utils/CacheStorage';
const config = require('../../../config');
//import { saveAs } from 'file-saver';
class OrderExecution extends Component {
    constructor (props){
        super ( props );
        this.state = {
            processId:this.props.processId,
            templateId:this.props.templateId
          };
        this.sidebarAnimation=new SidebarJs();
    }

    //FileSaver saveAs(Blob/File data, optional DOMString filename, optional Boolean disableAutoBOM);
    exportDataHandler = () => {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken"),
            //"responseType": "arraybuffer"
        }
        //  axios.get('http://divadev.azurewebsites.net/public/api/generateCSV/9/598'+'/'+this.props.projectId+'/'+this.props.functionId, {
        //     headers: headers
        // })
        axios.get(config.laravelBaseUrl+ 'generateCSV/'+this.state.projectId+'/'+this.state.processId, {
            headers: headers
        })
        .then(res => {
            console.log(res.data);
            let fileName = res.data.data.file_name;
            window.open(config.ApiBaseUrl+fileName, '_blank');
            let fileArray = {
                'file_name': fileName
            }
            return axios.post(config.laravelBaseUrl+ 'unlinkFile', fileArray, {
                headers: headers
            })
        }); 
    }
    render(){
        const { disabledButton } = this.props;
        return(
                <>
                <div className="row header-row">
                    <div className="header-sec col-sm-12 p-0">
                        <h1 className="header-sec-h1">L1 - { this.props.processes.length > 0 ? this.props.processes[0].text : ""}</h1>
                        
                        <Search/>
                        <div className="back-btn ml-4">
                            <Link to={"/manage-templates/" + this.props.templateId}><i className="fas fa-chevron-left"></i> Back</Link>
                        </div>
                    </div>
                </div>

                <div className="row top-dropdown-sec">
                    <div className="ml-auto complete-sec">
                        <button type="button" className="btn btn-info"  disabled={ disabledButton ==1  ? true : false }  onClick={this.props.handleSaveData}>SAVE DATA</button>
                    </div>
                    {/* <div className="ml-auto complete-sec">
                        <button type="button" className="btn btn-info"  onClick={this.exportDataHandler}>EXPORT</button>
                    </div> */}
                </div>
                </>
            
        )
    }
}

export default OrderExecution;