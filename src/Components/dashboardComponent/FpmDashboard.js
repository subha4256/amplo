import React,{Component,useState,useEffect} from 'react';
import DashboardHeader from '../includes/dashboardHeader/DashboardHeader';
import DashboardSidebar from '../includes/dashboardSidebar/DashboardSidebar';
import SidebarJs from '../../common/js/sidebarAnimation';
import {connect} from 'react-redux';
import {FpmWrapperWrapper} from '../Capability/Styling/FpmDashboard';
import {saveFpmDashboards,getFpmDashboards} from '../../actions/dashboardAction';
// import Select from "react-dropdown-select"; 
import Dropdown from 'react-dropdown';
class FpmDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            fpmData:[],
            selectedProj1:null,
            selectedProj2:null,
            dropValue:"",
            dropValue2:""
        }
    }
    componentDidMount(){
        this.props.getFpmDashboards();
    }
    static getDerivedStateFromProps(nextProps,prevState){
        console.log('next',nextProps)
        let obj = Object.assign({},prevState);
        if(nextProps.getFpmComparisonProjects.length>0){
            obj.fpmData = nextProps.getFpmComparisonProjects
        }
        return obj
    }
    handleProjectChange = (e,number)=>{
        // var index = e.nativeEvent.target.selectedIndex;
// this.setState({...this.state,selectedProj1:e})
let result = e.target.value.split("#");
        console.log('result',result)
        if(number === 1){
            this.setState({...this.state,selectedProj1:{projId:result[0],versionId:result[1]},dropValue:e.target.value})

        }
        else{
            this.setState({...this.state,selectedProj2:{projId:result[0],versionId:result[1]},dropValue2:e.target.value})

        }
    }
    onRunComparison = ()=>{
        if(this.state.dropValue === this.state.dropValue2){
            alert('Choose different projects')
        }
        else{
            //  {"ProjectId1":1,"VersionId1":0,"ProjectId2":2,"VersionId2":0}
            let obj = {
                ProjectId1:this.state.selectedProj1.projId,
                VersionId1:this.state.selectedProj1.versionId,
                ProjectId2:this.state.selectedProj2.projId,
                VersionId2:this.state.selectedProj2.versionId
            }
            this.props.saveFpmDashboards(obj)
        }
    }
    render(){
        return(
            <>
              
            <div id="wrapper" key="body-wrapper">
        
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">

            <div class="container-fluid container-dashboard"></div>
<FpmWrapperWrapper>
<div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-11 col-xl-11 m-auto">
                            <div class="row fpmtopfrm">
                                <div class="col-sm-12 col-md-12 col-lg-9 px-1">
                                    <form class="form-row py-3">
                                        <div class="col-md-4 form-group mb-2">
                                            <label class="w-100">Select FPM1</label>
                                         {/* {  this.state.fpmData.length>0? <Dropdown
                                           value={this.state.selectedProj1}
                                            onChange={this.handleProjectChange}
                                            options={this.state.fpmData}
                                            />:""} */}
                                            <select class="custom-select" value={this.state.dropValue} onChange={(e)=>this.handleProjectChange(e,1)}>
                                              {/* <option selected>1.1 FPM 1</option> */}
                                              {/* <option>1.1 FPM 1</option>
                                              <option>1.1 FPM 1</option> */}
                                            <option selected>Select Project</option>
                                              {this.state.fpmData.length>0?this.state.fpmData.map(prj=>{
                                                  return(
                                                      <option key={prj.DecompositionProjectId} name={prj.VersionId} value={prj.DecompositionProjectId+"#"+prj.VersionId}>{prj.Version} {prj.ProjectName} </option>
                                                  )
                                              }):""}
                                             </select>  
                                        </div>
                                        <div class="col-md-4 form-group mb-2">
                                            <label class="w-100">Compare to FPM2</label>
                                            <select value={this.state.dropValue2} class="custom-select" onChange={(e)=>this.handleProjectChange(e,2)}>
                                              {/* <option selected>1.1 FPM 2</option>
                                              <option>1.1 FPM 2</option>
                                              <option>1.1 FPM 2</option> */}
                                               <option selected>Select Project</option>
                                                {this.state.fpmData.length>0?this.state.fpmData.map(prj=>{
                                                  return(
                                                      <option key={prj.DecompositionProjectId} name={prj.VersionId} value={prj.DecompositionProjectId+"#"+prj.VersionId}>{prj.Version} {prj.ProjectName}</option>
                                                  )
                                              }):""}
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <button onClick={this.onRunComparison} type="button" class="btn btn-primary">Run Comparison</button>
                                        </div>

                                    </form>

                                </div>
                              
                            </div>
                        </div>
                    </div>
</FpmWrapperWrapper>
            </div>
            </div>
            </div>
            </>
        )
    }
}
const mapStateToProps = state =>({
    getFpmComparisonProjects:state.dashboardData.getFpmComparisonData,
    
    })
export default connect(mapStateToProps,{saveFpmDashboards,getFpmDashboards})(FpmDashboard);