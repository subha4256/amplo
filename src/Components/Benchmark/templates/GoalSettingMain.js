import React, {Component} from 'react';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';
import {  Row, Col, Button } from 'reactstrap';
import { GoalSettingMainWrapper,DropdownWrapper  } from '../Styling/GoalSettingMain';
import axios from 'axios';
import { Global } from '../../../utils/Env';
import {resetSavedClient,getClientAnalyticsBenchmark,getClientAnalyticsBenchmarkDomain, getAflyScore,saveClientAnalyticsUsecaseruns, saveClientAnalyticsUsecaseruns2,getClientAnalyticsUsecaserunsDetails } from '../../../actions/benchmarkingActions';
import $ from 'jquery'
import { NavLink,Link } from 'react-router-dom';
import { responseMessage } from '../../../utils/alert';
const config = require('../../../config');
class GoalSettingMain extends Component {
    constructor(props) {
        super(props);        
        let domainsObj = {};
        for(let i=0; i < this.props.domains.length; i++) {
          //console.log(this.props.domains[i].score_values.goal_setting);
          domainsObj['sliderValue'+(i+1)] = this.props.domains[i].score_values.goal_setting;
        }
        this.state = {
          ...domainsObj,
          ASISAFlyscore : 0,
          disabled:true,
          radioSelected:false,
          leaderSelected:false,
          selectedCapProjectNameId: "",
          selectedCapProjectName:"",
          comparisonFlag:false,
          compStarted : false,
          isScoreDashboardEnable: false,
          scoreDetails: {
            AsIsAflyScore:"" ,
            ReestablishAsIsAflyScore:""
          } ,
          linkProjects: []
        };

        Global.callback.saveClientAnalyticsUsecaseruns2_onComplete = () => {
          if(this.state.compStarted){
            $('#showSuccess3').click();
            this.setState({
              comparisonFlag:false,
              compStarted : false
            })
          }
        }
    }

    getCapLinkageProjects =()=>{
      axios.get(`${config.laravelBaseUrl}GetAllCapabilityModelProjectLinkageWithAmpProjectNameFromUsecase3`,{
        headers : {
          authorization : sessionStorage.getItem('userToken')
        }
      }).then(res=>{
        console.log({res})
            if(res.status == 200) {
                 this.setState({linkProjects: res.data.data })
            }
      }).catch((error) =>{
        console.log("Error", error)
      })
    }


    componentDidMount = () => {

      this.getCapLinkageProjects();

      axios.get(`${config.laravelBaseUrl}GetReestablishAflyScore/${this.props.projId}`,{
      headers : {
        authorization : sessionStorage.getItem('userToken')
      }
    }).then(res=>{
      console.log({res})
          if(res.status == 200) {
               this.setState({scoreDetails: {
                AsIsAflyScore: res.data.data[0].AsIsAflyScore ,
                ReestablishAsIsAflyScore: res.data.data[0].ReestablishAsIsAflyScore
               }})
          }
    }).catch((error) =>{
      console.log("Error", error)
    })


      axios.get(`${config.laravelBaseUrl}usecase3CheckAgainstProjectId/${this.props.lock.project_id}`,{
        headers : {
          authorization : sessionStorage.getItem('userToken')
        }
      }).then(res=>{
            console.log("Score details ==> " , res)
            if(res.data.data[0].IsSuccess == 1) {
              this.setState({isScoreDashboardEnable: true})
            }  else {
              this.setState({isScoreDashboardEnable: false})
            }

      }).catch((error) =>{
        console.log("Error", error)
      })

        axios.get(`${config.laravelBaseUrl}getASISAflyScores/${this.props.lock.project_id}`,{
          headers : {
            authorization : sessionStorage.getItem('userToken')
          }
        }).then(res=>{
          this.setState({
            ASISAFlyscore : res.data.data[0].AsIsAFlyScore
          });
        })
        // this.props.getClientAnalyticsUsecaserunsDetails(1,"clientTest");
        this.props.getClientAnalyticsBenchmark(this.props.projId);
        this.props.show()
      }
      componentDidUpdate(prevProps) {      
        if(prevProps.value !== this.props.value) {
          this.setState({value: this.props.value});
        }
      }
  onRadioSelect = (e,value)=>{
    console.log(e.target.checked)
if(e.target.checked){
  this.setState({...this.state,radioSelected:true})
}
else{
  this.setState({...this.state,radioSelected:false})
}
  }
      componentWillReceiveProps(nextProps,prevState) {
        console.log('Nextprops',nextProps);
        let obj = Object.assign({},prevState);
        
        if(nextProps.CLientAnalyticsUsecaseData && nextProps.CLientAnalyticsUsecaseData !== null &&
         typeof nextProps.CLientAnalyticsUsecaseData.success !== 'undefined' && nextProps.CLientAnalyticsUsecaseData.success === true){
          
          if(this.state.leaderSelected === true){
           
            $('#showSuccess2').click();
            obj.leaderSelected = false;
            this.props.resetSavedClient()
          }
          else{
            console.log('prevstate',prevState)
            
            $('#showSuccess').click();
            obj.leaderSelected = false;
            this.props.resetSavedClient()
          }
        }
        if(nextProps.validate!==""){
          
          $('#openComparison').click()
        }
        return obj
      }
      onLeaderSave = ()=>{
        this.setState({...this.state,leaderSelected:true})
        let InputJson = {
      
          "IndustryLeaderID" : 0,
          "IndustryLeaderName":0,
          "ProjectID":this.props.projId,
          "ProjectName"  :this.props.projName,
          "UseCaseName"  :"DomainLeaderScore", 
          "ProjectModuleName":"AmpMarking",
          "Version"      :"2.0",
          "RunStatus"    :1,
          "ComparisionProjectId":0,
          "ComparisionProjectName" :"",
          "ComparisionProjectModuleName" :""

        
      }
      this.props.saveClientAnalyticsUsecaseruns(InputJson)
      $('#close1').click();
      }
      onReEstablishAflyScore = ()=>{
        let compProj = this.state.selectedCapProjectName.split("##");
        let InputJson = {
          "IndustryLeaderID" : 0,
          "IndustryLeaderName":0,
          "ProjectID" : this.props.projId,
          "ProjectName"  : this.props.projName,
          "UseCaseName"  : "ReEstablishAflyScore", 
          "ProjectModuleName" : "AmpMarking",
          "Version"      :"2.0",
          "RunStatus"    :1,
          "ComparisionProjectId":compProj.length > 1 ? compProj[0] : 0,
          "ComparisionProjectName" : compProj.length > 1 ? compProj[1] : "",
          "ComparisionProjectModuleName" :"FPM"
        }
        this.props.saveClientAnalyticsUsecaseruns2(InputJson);
        this.setState({
          compStarted : true
        })
        $('#close3').click();

        
        axios.get(`${config.laravelBaseUrl}AmpProjectLinkWithCMProject/${this.state.selectedCapProjectNameId}/${this.props.projId}`,
        {
          headers: {
              "authorization": "Bearer " + sessionStorage.getItem("userToken")
          }
       }).then((res)=>{
          console.log({res})
          if(res.data.data[0].IsSuccess == 1) {
               this.getCapLinkageProjects();
                setTimeout(() => {
                  responseMessage("success" , res.data.data[0].MessageName)
                }, 3000);
          }
         
       }).catch(error =>  responseMessage("Error", "Something Went Wrong!", ""))

      }




  onSave = (e)=>{
   if(this.state.radioSelected === false){
     return
   }
    let InputJson = {
      
        "IndustryLeaderID" : 0,
        "IndustryLeaderName":0,
        "ProjectID":this.props.projId,
        "ProjectName"  :this.props.projName,
        "UseCaseName"  :"IndustryLeaderScore", 
        "ProjectModuleName":"AmpMarking",
        "RunStatus"    :1,
        "ComparisionProjectId":0,
          "ComparisionProjectName" :"",
         "ComparisionProjectModuleName" :""
      
    }
    this.props.saveClientAnalyticsUsecaseruns(InputJson)
    $('#close1').click();
    this.setState({...this.state,radioSelected:false})

    
  }
  
      handleNext() {
        let goalSettingData = [];
        for(let i=0; i < this.props.domains.length; i++) {
          goalSettingData.push({
            domain_id: this.props.domains[i].DomainID,
            goal_setting: this.state['sliderValue'+(i+1)]
          })
        }
        console.log(goalSettingData);
        this.props.onNext(goalSettingData);
      }
selectCapProject = (e)=>{

  this.setState({...this.state,leaderSelected:false,selectedCapProjectName:e.target.value,
    selectedCapProjectNameId: (e.target.value).split("#")[0]
  })

}
saveComparisonData = (e)=>{
  if(this.state.selectedCapProjectName === null || this.state.selectedCapProjectName === ""){
    alert('Please select a FPM project');
    return
  }
  this.setState(prevState=>{
let obj = Object.assign({},prevState);
obj.comparisonFlag = true
return true
  },()=>{
    let project = this.state.selectedCapProjectName.split("##");
    // console.log('selected proj',project)
    let InputJson = {
         "IndustryLeaderID" : 0,
      "IndustryLeaderName":0,
      "ProjectID":this.props.projId,
      "ProjectName"  :this.props.projName,
      "UseCaseName"  :"IndustryLeaderScore", 
      "ProjectModuleName":"AmpMarking",
      "RunStatus"    :1,
      "ComparisionProjectId":project[0],
        "ComparisionProjectName" :project[1],
   "ComparisionProjectModuleName" :"FPM"
    
  }
  this.props.saveClientAnalyticsUsecaseruns(InputJson);
  $('#close3').click();
  $('#closeIndustry').click();
  })
  
}
      render() {

        console.log("State of Goal ==>", this.state)
        console.log("Props of Goal ==>", this.props)

        let sliderValues = {...this.state};
        let greaterThenOne = false;
        for(let  i in sliderValues){
          if(sliderValues[i] > 0){
            greaterThenOne =true
          }
        }
        const { lock } = this.props
  
    let domainArr = this.props.domains.map((domain, key) => {
        console.log('the domain',domain);
        let ind_bench = this.props.aFlyDomainScore[key] ? this.props.aFlyDomainScore[key].DomainScore : null;
        
        return (
          <Row className={'border-bottom pb-3 goalSlider'+key} key={'domainSlider-'+key}>
            <Col sm="2">
              <p className="btext">{domain.DomainName}</p>
            </Col>
            <Col sm="10">
              <InputRange
                maxValue={5}
                minValue={0}
                step={0.1}
                formatLabel={value => Number.isInteger(value) ? value : `${value.toFixed(1)}`}
                value={this.state['sliderValue'+(key+1)]}
                onChange={value => this.setState({ ['sliderValue'+''+(key+1)]: value })}
                disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? true : Number(domain.score_values.asis_benchmark) > 0 ? false : true } 
                />
             
              <div className="slider-handle-triangle" style={{left: domain.score_values.asis_benchmark==5?(domain.score_values.asis_benchmark*20) - 4+"%":(domain.score_values.asis_benchmark * 20) -1 +'%'}}><span className="tooltp">{ domain.score_values.asis_benchmark }</span></div>
              {domain.score_values.leader_domain_score!==null?<div className="slider-handle-triangle" style={{left: domain.score_values.leader_domain_score == 5?(domain.score_values.leader_domain_score*20)-4 +'%':(domain.score_values.leader_domain_score * 20) - 2 +'%',borderBottom:'10px solid'}}><span className="tooltp">{ domain.score_values.leader_domain_score }</span></div>:""}
              <div className="slider-handle-triangle1" style={{left: ( ind_bench ? ind_bench * 20 : domain.score_values.industry_benchmark * 20) - 1 +'%'}}><span className="tooltp" style={{color : "#007bff"}} >{ ind_bench ? ind_bench : domain.score_values.industry_benchmark }</span></div>
            </Col>
          </Row>
        )
      });
      let NumForClass = this.state.ASISAFlyscore;
        return (
            <> 
          <div class="col-md-12 col-lg-12 col-xl-8 mb-4">
            <GoalSettingMainWrapper>
          <div class="bg-light flyscore">
          
          <h2>AFly Score</h2>
          
          <div class="flyscore-row row mt-3">
                  <div class="col-md-4 col-lg-4 mb-2 d-flex">
                    <div className="mr-1">
                    <p className="text-dark font-weight-bold ">AFLY Score:</p>
                    <div class="point-txt"><span className={Number(NumForClass) > 3 ? "text-success" : Number(NumForClass) < 3 ? "text-danger" : "text-warning" }><b> {NumForClass} </b></span></div>
                    </div>
                    <div className="ml-2">
                    <p className="text-dark font-weight-bold ">Re-Establish Score:</p>
                    <div class="point-txt"><span className={Number(NumForClass) > 3 ? "text-success" : Number(this.state?.scoreDetails?.ReestablishAsIsAflyScore) < 3 ? "text-danger" : "text-warning" }><b> {this.state.scoreDetails.ReestablishAsIsAflyScore || 0}</b></span></div>
                    </div>
                  </div>
                  <div class="col-md-4 col-lg-4 mb-2">
                    <p className="text-dark font-weight-bold ">Industry Benchmarked AFLY Score: {this.props.AflyScoreBenchmark.length>0?
                    this.props.AflyScoreBenchmark[0].AFlyscore:""}</p>
                    <a href="#industrydataModal" class="data-btn"  data-toggle="modal">Get Benchmark Data</a>
                  </div>
                  <div class="col-md-4 col-lg-4 mb-2">
                    <p className="text-dark font-weight-bold ">Leader Domain AFLY Score</p>
                    <a href="javascript:void(0)" onClick={this.onLeaderSave} className="data-btn">Get Leader Domain Data</a>
                  </div>
                </div>
            </div>
              <div class="bg-light">
              
                <div class="pa-goal-setting">
                  {domainArr}
                </div>
              
                </div>
                <a style={{display:'none'}} id="showSuccess" href="#requestPopup" className="data-btn"  data-toggle="modal">Success</a>
                <a style={{display:'none'}} id="showSuccess2" href="#requestPopup2" className="data-btn"  data-toggle="modal">Success</a>
                <a style={{display:'none'}} id="showSuccess3" href="#requestPopup3" className="data-btn"  data-toggle="modal">Success</a>
                <a style={{display:'none'}} id="openComparison" href="#comparisonModal" className="data-btn"  data-toggle="modal">Success</a>
              {/* Modal starts */}
              <div className="modal" id="industrydataModal" tabindex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header border-0">
          <h5 className="modal-title">Get Industry Benchmark Data</h5>
          <a id="close1" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><img src={require("../../../common/images/close-icon.png")} alt=""/></span>
          </a>
        </div>
        <div className="modal-body">
            <div className="custom-control custom-radio mb-3">
                <input checked={this.state.radioSelected} onChange={(e)=>this.onRadioSelect(e,"GetIndustryLeader")} type="radio" className="custom-control-input" id="industrydata1" name="industry"/>
                <label className="custom-control-label" for="industrydata1">Get industry leader against which you want to Benchmark:</label>
            </div>
            <div className="custom-control custom-radio mb-3">
                <input disabled={this.state.disabled} type="radio" class="custom-control-input" id="industrydata2" name="industry"/>
                <label className="custom-control-label" for="industrydata2">Select industry leader against which you want to Benchmark:</label>
            </div>
            <div className="form-group pl-4">
                <label class="d-block">Select Industry Leader</label>
                <select class="custom-select" disabled={this.state.disabled}>
                  <option selected>Select</option>
                  <option>Option1</option>
                  <option>Option2</option>
                </select>
            </div>
            <p class="mt-5 pl-4">On receival of the request the data will be processed and presented. You will receive an email with details regarding 
                this service. </p>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btncancel" data-dismiss="modal" style={{background:"none",border:"none"}}>Cancel</button>
          <button type="button" onClick={(e)=>{
            // this.props.getAflyScore(this.props.projId)
            this.onSave(e)
            }} class="btn btn-primary">Submit Request</button>
        </div>
      </div>
    </div>
  </div>
  {/* Success Popup */}
  <div class="modal" id="requestPopup" tabindex="-1" role="dialog">
    
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <a id="closeIndustry" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><img src={require("../../../common/images/close-icon.png")} alt=""/></span>
            </a>
          </div>
          <div class="modal-body text-center px-5 pb-5 pt-0">
            <div class="mb-4"><i class="fas fa-check-circle"></i></div>
 <h2>Your request is received!</h2>
              <p class="mb-5 mt-4 text-left">The score for Industry Leader will be processed and presented. You will receive an email with details regarding 
                  this service. </p>
          </div>
         
        </div>
      </div>
</div>
  {/* Success Popup Ends */}

  {/* Success Popup2 */}
  <div class="modal" id="requestPopup2" tabindex="-1" role="dialog">
    
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <a class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><img src={require("../../../common/images/close-icon.png")} alt=""/></span>
            </a>
          </div>
          <div class="modal-body text-center px-5 pb-5 pt-0">
            <div class="mb-4"><i class="fas fa-check-circle"></i></div>
 <h2>Your request is received!</h2>
              <p class="mb-5 mt-4 text-center">The Leader's domain score will be processed and presented. </p>
          </div>
         
        </div>
      </div>
</div>
<div class="modal" id="requestPopup3" tabindex="-1" role="dialog">
    
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <a class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"><img src={require("../../../common/images/close-icon.png")} alt=""/></span>
            </a>
          </div>
          <div class="modal-body text-center px-5 pb-5 pt-0">
            <div class="mb-4"><i class="fas fa-check-circle"></i></div>
 <h2>Your request is received!</h2>
              <p class="mb-5 mt-4 text-center">Data will be processed and presented. You will receive an email with details regarding this service. </p>
          </div>
         
        </div>
      </div>
</div>
  {/* Success Popup Ends */}
  {/* modal for comparison starts */}
  <div className="modal" id="comparisonModal" tabindex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header border-0">
          <h5 className="modal-title">Get Capability Modeling Projects</h5>
          <a id="close3" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><img src={require("../../../common/images/close-icon.png")} alt=""/></span>
          </a>
        </div>
        <div className="modal-body">
            
            {/* <div className="custom-control custom-radio mb-3">
                {/* <input disabled={this.state.disabled} type="radio" class="custom-control-input" id="industrydata2" name="industry"/> */}
                {/* <label className="custom-control-label" for="industrydata2">Select Capability Modeling Project</label> */}
            {/* </div> */} 
            <div className="form-group pl-4">
                <label class="d-block">Select Project</label>
                <select class="custom-select" value={this.state.selectedCapProjectName} onChange={this.selectCapProject}>
                  <option value="">Select</option>
                  {/* <option>Option1</option>
                  <option>Option2</option> */}
                  {this.state.linkProjects.length>0?this.state.linkProjects.map((project,i)=>{
                     let uniqId = project.OnlyProjectName.trim() + '-'+ i;
                    return(
                      <option className={project.Status != "Linked" && "text-dark"} disabled={project.Status == "Linked"? true : null} value={project.DecompositionProjectID+"##"+project.OnlyProjectName} key={uniqId}>{ project.BenchmarkProjectName }</option>
                    )
                  }):""}
                </select>
            </div>
            <p class="mt-5 pl-4">On receival of the request the data will be processed and presented. You will receive an email with details regarding 
                this service. </p>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btncancel" data-dismiss="modal" style={{background:"none",border:"none"}}>Cancel</button>
          <button type="button" class="btn btn-primary" disabled={this.state.selectedCapProjectName != "" ? false : true} onClick={this.state.selectedCapProjectName != "" ? ()=>this.onReEstablishAflyScore() : ()=>{}}>Submit Request</button>
        </div>
      </div>
    </div>
  </div>
  {/* modal for comparson ends */}
                {/* Modal Ends */}
                </GoalSettingMainWrapper>
                </div>
                <Col md="12" lg="12" xl="8" className="text-center mt-4">
              <>
              <Button color="info" className="mb-2 mr-4" onClick={this.handleNext.bind(this)} disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? true : greaterThenOne == true ? false : true }>SAVE PROGRESS</Button>
              {/* <Button color="info" className="mb-2" disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? true : false }>VIEW RESULTS</Button> */}
              <Button color="info" onClick={this.handleNext.bind(this)} disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? false : greaterThenOne == true ? false : true }  className="mb-2 mr-4">VIEW RESULTS</Button>
              <Link to={`/afly-report/${this.props.projId}/${this.props.projName}`} >
              <Button color="info"  className="mb-2">View Score</Button>
              </Link>
              
              </>   
             
            </Col>
            
              <div class="col-md-12 col-lg-12 col-xl-8 mt-4 border-top d-flex align-items-center greport-sec pt-4 mb-4">
              
                {/* <label style={{ fontSize: '16px',
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    letterSpacing:' 0.23px',
                    color: '#000000'}}>Generate Reports</label>
                <select style={selectStyle} class="custom-select mx-4">
                  <option>Report Type</option>
                  <option>Report1</option>
                  <option>Report2</option>
                </select> */}
                
                
            </div>
           
                </> 
               
        )

    }
  }
  const selectStyle = {
    width: '296px',
    height: '40px',
    borderRadius: '4px',
    border:' solid 1px rgba(0, 0, 0, 0.32)',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.85',
    letterSpacing: '0.12px',
    color: 'rgba(0, 0, 0, 0.6)'
  }
  const mapStateToProps = (state) => ({
    aFlyScore : state.benchmarkingData.aFlyScore,
    aFlyDomainScore : state.benchmarkingData.aFlyDomainScore,
    CLientAnalyticsUsecaseData:state.benchmarkingData.setCLientAnalyticsUsecaseData,
    AflyScoreBenchmark:state.benchmarkingData.aflyScoreNew,
    
  })
  export default connect(mapStateToProps, { resetSavedClient,getClientAnalyticsBenchmarkDomain,getClientAnalyticsBenchmark,getAflyScore,saveClientAnalyticsUsecaseruns,getClientAnalyticsUsecaserunsDetails, saveClientAnalyticsUsecaseruns2 })(GoalSettingMain);