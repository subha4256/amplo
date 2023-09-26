import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row,Modal,ModalHeader,ModalBody,ModalFooter,Button,Label } from 'reactstrap';
import {Prompt} from 'react-router-dom';
import {getFPMMerge,saveFPMMerge,fetchDependentDetails} from '../../actions/capabilityActions';
import _ from 'underscore';
import { CapabilityWrapper } from './Styling/CapabilityStyling';
import { Global } from '../../utils/Env';
import { toast } from "react-toastify";
import  Loader  from '../Loader';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';

class FPMMerge extends Component {
    constructor (props){
        super (props);
        this.state = {
           projectId1:0,
           projectId2:0,
           FPMData:{FunctionPhase:[]}
        };
        Global.callback.getfpm_onComplete = () => {
            console.log("success");
            let FPMData=this.parseFPMObject(this.props.fpmData);
            console.log("FPMData",FPMData)
            console.log("props FPMData",this.props.fpmData)
            this.setState({FPMData:FPMData});
        }
    
        Global.callback.savefpm_onComplete = () => {
            toast.info("FPM Merge Succesful",{autoClose: 5000,position: toast.POSITION.BOTTOM_RIGHT});
            this.redirectToCapability();
        }
    }
    handleProject1Change = (e)=>{
        let projectId=e.target.value;
        this.setState({projectId1:projectId})
        if(this.state.projectId2==projectId)
        toast.info("Both Projects Are Same Please select different projects",{autoClose: 5000,position: toast.POSITION.BOTTOM_RIGHT});
        if(this.state.projectId2!=0 && projectId!=0 && this.state.projectId2!=projectId)
        this.props.getFPMMerge({projectId1:projectId,projectId2:this.state.projectId2})
        else
        this.setState({FPMData:{FunctionPhase:[]}});
    }
    redirectToCapability=()=>{
        this.props.history.push( 
            {
                pathname: `capability`,
                state: {
                },
            })
    }
    handleProject2Change = (e)=>{
        let projectId=e.target.value;
        this.setState({projectId2:projectId})
        if(this.state.projectId1==projectId)
        toast.info("Both Projects Are Same Please select different projects",{autoClose: 5000,position: toast.POSITION.BOTTOM_RIGHT});
        if(this.state.projectId1!=0 && projectId!=0 && this.state.projectId1!=projectId)
        this.props.getFPMMerge({projectId1:this.state.projectId1,projectId2:projectId})
        else
        this.setState({FPMData:{FunctionPhase:[]}});
    }

    parseFPMObject=(obj)=>{
        let temp={};
        let project1Name='';
        let project2Name='';
        temp.ProjectId1=this.state.projectId1;
        temp.ProjectId2=this.state.projectId2;
        project1Name=this.props.projects.filter((proj)=>proj.DecompositionProjectID==temp.ProjectId1)[0].ProjectName;
        project2Name=this.props.projects.filter((proj)=>proj.DecompositionProjectID==temp.ProjectId2)[0].ProjectName;
        temp.ProjectName=`Merge ${project1Name} and ${project2Name}`;
        let data=[];
        Object.keys(obj).map((head)=>{
            Object.keys(obj[head]).map((sub)=>{
                let tempObject={};
                if(obj[head][sub].length>0)
                {
                    tempObject.FunctionName=obj[head][sub][0].function_name;
                    tempObject.PhaseName=obj[head][sub][0].phase_Name;
                    tempObject.Process=[];
                    obj[head][sub].map((proc)=>{
                        tempObject.Process.push({ProcessName:proc.ProcessLevel1Name,projectName:proc.ProjectName});
                    })
                    data.push(tempObject);
                }
            }) 
        })
        temp.FunctionPhase=data;
        return temp;
    }
    deleteFunction=(i)=>{
        let data=JSON.parse(JSON.stringify(this.state.FPMData));
        let temp=[];
        data.FunctionPhase.map((item,index)=>{
            if(index!=i)
            temp.push(item);
        })
        data.FunctionPhase=temp;
        this.setState({FPMData:data});
    }
    deletePhase=(i,j)=>{
        let data=JSON.parse(JSON.stringify(this.state.FPMData));
        let temp=[];
        data.FunctionPhase.map((item,index)=>{
            if(index!=i)
            temp.push(item);
            else
            {
                let d=JSON.parse(JSON.stringify(item));
                let t=[];
                d.Process.map((sub,sub_index)=>{
                    if(sub_index!=j)
                    t.push(sub);
                });
                d.Process=t;
                temp.push(d);
            }
        })
        data.FunctionPhase=temp;
        this.setState({FPMData:data});
    }
    handleSave=()=>{
        let payload=JSON.parse(JSON.stringify(this.state.FPMData));
        if(!payload.ProjectId1 || payload.ProjectId1=='' || !payload.ProjectId2 || payload.ProjectId2=='')
        return toast.info("Both Projects Not Selected",{autoClose: 5000,position: toast.POSITION.BOTTOM_RIGHT});
        if(payload.ProjectName=='')
        return toast.info("Project Name Not Defined",{autoClose: 5000,position: toast.POSITION.BOTTOM_RIGHT});
        if(!payload.FunctionPhase.length>0)
        return toast.info("Projects Incorrectly Selected",{autoClose: 5000,position: toast.POSITION.BOTTOM_RIGHT});
        payload.FunctionPhase.map((item,index)=>{
            item.Process.map((sub,sub_i)=>{
                delete payload.FunctionPhase[index].Process[sub_i].projectName;
            })
        })
        this.props.saveFPMMerge(payload);
    }
    handleNameChange=(e)=>{
        let name=e.target.value;
        let payload=JSON.parse(JSON.stringify(this.state.FPMData));
        payload.ProjectName=name;
        this.setState({FPMData:payload});
    }

    render()
    {


        let projectOptions = [];
        if(this.props.projects.length > 0 ) {
            projectOptions = this.props.projects.map((project, i) => {
                let uniqId = project.ProjectName.trim() + '-'+ i;
                return (
                    <option value={project.DecompositionProjectID} key={uniqId}>{ project.ProjectName }</option>
                )
            })
        }
        return(
         <React.Fragment>
             <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <Loader loading={this.state.loading}/>
            <CapabilityWrapper id="content-wrapper" className="d-flex flex-column">
					<div style={{marginLeft:'5px'}}>
                        <div className="row">
                        <div className="col-md-12">
                            <div className="main-div-project">
							<div className="row">
								<div className="col-md-6">
                                <h3 className="main-project-name">Select 1st Project</h3>
                                <select className="form-control" name="project" onChange={(e) => this.handleProject1Change(e)} value={this.state.projectId1}>
                                        <option value={0}>Select Project</option>
                                        { projectOptions }
                                </select>
								</div>
								<div className="col-md-6">
                                <h3 className="main-project-name">Select 2nd Project</h3>
                                <select className="form-control" name="project" onChange={(e) => this.handleProject2Change(e)} value={this.state.projectId2}>
                                        <option value={0}>Select Project</option>
                                        { projectOptions }
                                </select>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
								<div className="mt-4">
									<h4 className="main-project-name">New Project Name</h4>
									<input type="text" onChange={this.handleNameChange} value={this.state.FPMData.ProjectName} style={{width:'48%'}} />
									</div>
								</div>
							</div>
                            {
                                this.state.FPMData.FunctionPhase.map((item,index)=>{
                                    return(
                                <div className="box-dependency">
                                   <div className="de-indecapa">
                                        <h4 className="sub-head">{item.FunctionName},{item.PhaseName}<i className="fa fa-trash trash-main" onClick={()=>this.deleteFunction(index)} aria-hidden="true"></i></h4>
                                        
                                    </div>
                                    {
                                    item.Process.map((sub,sub_index)=>{
                                        return(
                                    <div className="de-indecapa">
                                        <div className="ind-capadd">
                                        <p><span className="capability-list">{sub.ProcessName}: [{sub.projectName}]</span><i className="fa fa-trash trash-main-inner" onClick={()=>this.deletePhase(index,sub_index)} aria-hidden="true"></i></p>
                                        </div>
                                    </div>);
                                    })
                                    } 
                                </div>
                                )
                                })
                            }
                            </div>
							<div className="text-right">
			<button type="button" className="btn btn-danger mx-3" data-dismiss="modal" onClick={()=>this.redirectToCapability()}>Cancel</button>
			<button className="btn btn-primary" onClick={()=>this.handleSave()}>Save</button>
		</div>
                        </div>
                    </div>
                    </div>
                            

            </CapabilityWrapper>

            </div>
            <FooterComponent key="footer"></FooterComponent>

            
         </React.Fragment>  

        );

    }

}



const mapStateToProps = state => ({
    fpmData:state.capability.fpmData,
    saveFpmData:state.capability.saveFpmData,
    projects: state.capability.items
});
export default connect(mapStateToProps, {fetchDependentDetails,getFPMMerge,saveFPMMerge  })(FPMMerge);
