import React,{Component, Fragment} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import  Loader  from '../Loader';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardFooter from "../includes/dashboardFooter/FooterComponent";
import { SwotAnalysisWrapper } from './Styling/DTSwotAnalysisStyle';
import DTSwotAnalysisBodyDetail from './DTSwotAnalysisBodyDetail';
import DTSwotAnalysisBreadcrumb from './DTSwotAnalysisBreadcrumb';
import DTSwotAnalysisTopbar from './DTSwotAnalysisTopbar';
import DTLeftSideBar from '../common/DTLeftSideBar/DTLeftSideBar';
import { fetchBenchmarkProjectsWithDomains, fetchDecompositionProjects, fetchKpisControls } from '../../actions/epicScreenActions';
const config = require('../../config');

class DTSwotAnalysis extends Component {
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
        DtProjectId : this.props.match.params.projectId,
        EpicId : this.props.match.params.epicId
      }
      this.child = React.createRef();
    }

    componentDidMount() {
      
      this.props.fetchBenchmarkProjectsWithDomains();
      this.props.fetchDecompositionProjects();
      this.props.fetchKpisControls();
    }

    saveSwot = () => {
      this.child.current.saveSwot();
    }
    
    async getChild(data){
      let selfOBj = this;
      selfOBj.setState({loading:true});
      axios.get(config.laravelBaseUrl+'getDecompositionProjectsFunctionPhaseLevel/' + data.projectId,{
          headers: {
              "authorization": "Bearer " + sessionStorage.getItem("userToken")
           }
         }).then(function(response){
             console.log(response);
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
    render(){
        // const {data, chartData, expData, showNoOfForms, options} = this.state;
        
        return(
        <>
            <DashboardHeader/>
            <Loader loading={this.state.loading}/>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">

              {/* <!-- Main Content --> */}
              <div id="content">

                {/* <!-- Breadcrumb --> */}
                <DTSwotAnalysisBreadcrumb />
                {/* <!-- End Breadcrumb --> */}

                {/* <!-- Begin Page Content --> */}
                <SwotAnalysisWrapper className="container-fluid container-dashboard">
                  <DTSwotAnalysisTopbar saveSwot={this.saveSwot} projectId={this.state.DtProjectId} epicId={this.state.EpicId} />

                  <div className="row">
                    <div className="dt-screen-main">
                      {/* <!-- Start Left Content --> */}
                      <DTLeftSideBar ptype={this.state.ptype} 
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
                        <DTSwotAnalysisBodyDetail ref={this.child} projectId={this.state.DtProjectId} epicId={this.state.EpicId} />

                    </div>
                    {/* <!-- End Body Content --> */}

                  </div>
                  
                </SwotAnalysisWrapper>

                {/* <!-- /End container-fluid --> */}

              </div>
              {/* <!-- End of Main Content --> */}

            </div>
            {/* <!-- End of Content Wrapper --> */}

          </div>
          <DashboardFooter/>
        </>
    )};
} 

export default connect(null,{fetchBenchmarkProjectsWithDomains, fetchDecompositionProjects, fetchKpisControls})(DTSwotAnalysis);