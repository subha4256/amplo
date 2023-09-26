import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import  Loader  from '../Loader';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardFooter from "../includes/dashboardFooter/FooterComponent";
import { DTRoadmapStyle } from './Styling/DTRoadmapStyle';
import { setFetchOwners, setFetchTasks } from '../../actions/roadmapActions';
import DTRoadmapBody from './DTRoadmapBody';
import DTRoadmapBreadcrumb from './DTRoadmapBreadcrumb';
import DTRoadmapTopbar from './DTRoadmapTopbar';
import DTLeftSidebar from '../common/DTLeftSideBar/DTLeftSideBar';
import { fetchBenchmarkProjectsWithDomains, fetchDecompositionProjects, fetchKpisControls } from '../../actions/epicScreenActions';
import { responseMessage } from '../../utils/alert';
const config = require('../../config');

class DTRoadmap extends Component {
    constructor(props) {
      super(props);
      this.state = {
        decompositionchildData:[],
        loading:false,
        dragValue:{},
        filterVal:'',
        ptype:'',
        FilterStackHolderLeftSidebar:[],
        StackHolder:[],
        projectId: this.props.match.params.projectId,
        epicId: this.props.match.params.epicId,
        viewModel: {},
        projectId: this.props.match.params.projectId,
        epicId: this.props.match.params.epicId
      }
    }
    async componentDidMount() {
      this.props.fetchBenchmarkProjectsWithDomains();
      this.props.fetchDecompositionProjects();
      this.props.fetchKpisControls();
    }
    async getChild(data){
      let selfOBj = this;
      selfOBj.setState({loading:true});
      axios.get(config.laravelBaseUrl+'getDecompositionProjectsFunctionPhaseLevel/' + data.projectId,{
          headers: {
              "authorization": "Bearer " + sessionStorage.getItem("userToken")
          }
        }).then(function(response){
            selfOBj.setState({loading:false});
            let jsonObj = {
                projectId:data.projectId,
                data:response.data.data
            }
            selfOBj.setState({decompositionchildData:jsonObj})
        });
    }
    getDesignThinkingStakeHolders(){
      axios.get(config.laravelBaseUrl+'getDesignThinkingStakeHolders',{
          headers: {
              "authorization": "Bearer " + sessionStorage.getItem("userToken")
          }
      }).then(res=> {
          console.log('getDesignThinkingStakeHolders',res)
          this.setState({StackHolder: res.data.data,FilterStackHolder: res.data.data, FilterStackHolderLeftSidebar: res.data.data})
      })
    }
    searchStakeholdersLeftSidebar = (e) => {
      const text = e.target.value;
      const regex = new RegExp(text.toLowerCase(), "i");
      let data = this.state.StackHolder.filter(word => regex.test(word.StakeHolderName.toLowerCase()));
      this.setState({FilterStackHolderLeftSidebar: data})
    } 
    filterProject(e,type){
      this.setState({filterVal:e.target.value,ptype:type})
    }
    addDrag(e,domain){
      const data = {id: domain.id,name:domain.name}
      this.setState({'dragValue':data});      
    }
    dragStakeholder = (e) => {
      this.setState({draggedStakeholderId: e})
    }
    handleSetViewModel = (viewModel) => {
      this.setState({viewModel})
    }


 

    
    
 


    handleRoadmapSave = async () => {
      let saveRoadmap = await axios.post(config.laravelBaseUrl+'saveRoadMap', this.state.viewModel.events, {
        headers: {
            "authorization": "Bearer " + sessionStorage.getItem("userToken")
        }
      });
      if(saveRoadmap.data.success) {
          responseMessage("success", saveRoadmap.data.data[0].message, "");


          let owners = await axios.get(config.laravelBaseUrl+'getRoadMapOwner/1/0/0',{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        
        let tasks = await axios.get(config.laravelBaseUrl+'getRoadMapTasks/1/0/0/0',{
          headers: {
            "authorization": "Bearer " + sessionStorage.getItem("userToken")
          }
        });
        this.props.setFetchOwners(owners.data);
        this.props.setFetchTasks(tasks.data);
        window.location.reload();


      }else{
          responseMessage("error", saveRoadmap.data.data[0].message, "");
      }


    }




    render(){
        // const {data, chartData, expData, showNoOfForms, options} = this.state;
        
        return(
        <>
            <DashboardHeader/>
            <Loader loading={this.state.loading}/>
            {/* <!-- Page Wrapper --> */}
            <DTRoadmapStyle id="wrapper">
            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

              {/* <!-- Main Content --> */}
              <div id="content">

                {/* <!-- Breadcrumb --> */}
                <DTRoadmapBreadcrumb />
                {/* <!-- End Breadcrumb --> */}

                {/* <!-- Begin Page Content --> */}
                <div className="container-fluid container-dashboard">
                  <DTRoadmapTopbar handleRoadmapSave={this.handleRoadmapSave} projectId={this.state.projectId} epicId={this.state.epicId} />

                  <div className="row">
                    <div className="dt-screen-main">
                      {/* <!-- Start Left Content --> */}
                      <DTLeftSidebar ptype={this.state.ptype} 
                        filterVal={this.state.filterVal} 
                        filterProject={this.filterProject.bind(this)} 
                        addDrag={this.addDrag.bind(this)} 
                        getChild={this.getChild.bind(this)}
                        decompositionchildData ={this.state.decompositionchildData}
                        StackHolderLeftSidebar={this.state.FilterStackHolderLeftSidebar}
                        searchStakeholdersLeftSidebar={this.searchStakeholdersLeftSidebar.bind(this)}
                        dragStakeholder={(e) => this.dragStakeholder(e)} />
                      {/* <!-- End Left Content --> */}

                      {/* <!-- Start Body Content --> */}
                        <DTRoadmapBody handleSetViewModel={this.handleSetViewModel} projectId={this.state.projectId} epicId={this.state.epicId} />

                    </div>
                    {/* <!-- End Body Content --> */}

                  </div>
                  
                </div>

                {/* <!-- /End container-fluid --> */}

              </div>
              {/* <!-- End of Main Content --> */}

            </div>
            {/* <!-- End of Content Wrapper --> */}

          </DTRoadmapStyle>
          <DashboardFooter/>
        </>
    )};
} 
export default connect(null,{fetchBenchmarkProjectsWithDomains, fetchDecompositionProjects, fetchKpisControls , setFetchOwners, setFetchTasks})(DTRoadmap);