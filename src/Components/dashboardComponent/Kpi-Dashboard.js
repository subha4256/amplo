import React,{Component,useState,useEffect} from 'react';
import DashboardHeader from '../includes/dashboardHeader/DashboardHeader';
import DashboardSidebar from '../includes/dashboardSidebar/DashboardSidebar';
import SidebarJs from '../../common/js/sidebarAnimation';
import {getSignIn} from '../../common/js/ApiRequest';
import {getAccessToken,getEmbedToken,getAllReports,reInitialize} from '../../actions/powerbiActions';
import {connect} from 'react-redux'
import $ from 'jquery'
import CacheStorage from '../../utils/CacheStorage'; 
const KpiDashboard= (props) => {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         embedToken:"",
    //         embedUrl:"",
    //         accessToken:""
    //     }
    //     // this.sidebarAnimation=new SidebarJs();
    // }
    const [state,setState] = useState({selectedReport:{},embedToken:"",embedUrl:"",accessToken:"",reports:[],reportId:"",pageName:""})
   const [visual,setVisual] = useState({visuals:[],loaded:false});
const [selectedVisual,setSelectedVisual] = useState({selected:[],isSelected:false});
const [mainVisual,setMainVisual] = useState("")
    useEffect(()=>{
props.reInitialize()
    },[])
    useEffect(()=>{
        props.getAccessToken();
    },[])
    useEffect(()=>{
// if()
// console.log('nextprops',nextProps);
// let returnObj = {...prevState}
const {powerbiData} = props;
const {powerbiAccessToken} = powerbiData;
if(
powerbiAccessToken.access_token && 
powerbiAccessToken.access_token!==""){
    CacheStorage.setItem("pbi-token",powerbiAccessToken.access_token)
    setState({
        ...state,
        accessToken:powerbiAccessToken.access_token
    })
 
}
    },[props.powerbiData.powerbiAccessToken])

    useEffect(()=>{
if(state.accessToken !== "")
    {
        setState({...state,
        selectedReport:{embedUrl:"https://app.powerbi.com/reportEmbed?reportId=a9bb1614-2498-4b13-9614-7ff5f25335e4&groupId=d89c33a4-823b-4979-8ea1-4cca40db8ff3&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWV9fQ%3d%3d",
    reportId:"a9bb1614-2498-4b13-9614-7ff5f25335e4"}})
}
    },[state.accessToken])

    useEffect(()=>{
        
if(state.accessToken !== ""){
    
    if(state.selectedReport.hasOwnProperty("reportId")){
        props.getEmbedToken(state.selectedReport)
    }
    
}
    },[state.selectedReport])
    
    useEffect(()=>{
        if(!state.selectedReport.hasOwnProperty("reportId")){
            return
        }
       
        var embedToken = props.powerbiData.powerbiEmbedToken.token;
        var models = window['powerbi-client'].models
        var permissions = models.Permissions.All;
            var config = {
                type: 'report',
                tokenType:models.TokenType.Embed,
                accessToken:embedToken,
                embedUrl: state.selectedReport.embedUrl,
                id: state.selectedReport.reportId,
                permissions: permissions,
                settings: {
                  panes: {
                    filters: {
                      visible: true
                    },
                    pageNavigation: {
                      visible: true
                    }
                  }
                }
            };
            console.log('Config object',config)
          var  embedContainer = $('#embedContainer')[0]
       
        // // Embed the report and display it within the div container.
        var report = window.powerbi.embed(embedContainer, config);
         
        // Report.off removes a given event handler if it exists.
        report.off("loaded");
         
        // Report.on will add an event handler which prints to Log window.
        
        report.on("loaded", function () {
          
        });
        report.off("pageChanged");
 
        // Report.on will add an event listener.
      
        // Report.off removes a given event handler if it exists.
        report.off("rendered");
         
        // Report.on will add an event handler which prints to Log window.
        report.on("rendered", function () {
          
        });
       
            
       

    },[props.powerbiData.powerbiEmbedToken])
    const selectReport = (e,report)=>{
        
        let reportId = report.reportId;
        let embedUrl = report.reportEmbedUrl;
        let obj = {
            reportId:reportId,
            embedUrl:embedUrl
        }
setState({...state,selectedReport:obj})

    }
//     useEffect(()=>{
// if(visual.length>0){

// }
//     },[visual])
    const onVisualSelect = (visual,isSelected)=>{
        if(isSelected === true){
            setMainVisual(visual.name)
        }
        else{
            console.log('state array',selectedVisual.selected)
            console.log('visual name',visual.name)
            var newVisualArray = selectedVisual.selected.filter((item)=>{
                console.log('item name',item)
                return visual.name !== item
            })
            console.log('new array',newVisualArray)
            setSelectedVisual({...selectedVisual,selected:newVisualArray})
        }
    }
//   
    // render(){
        return(
            <>
            <DashboardHeader/>
            <div id="wrapper" key="body-wrapper">
        <DashboardSidebar/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">

          <ol className="breadcrumb dashbread">
          <li className="breadcrumb-item active">Home</li>
              <li className="breadcrumb-item active">Dashboard</li>
              <li className="breadcrumb-item active">FPM</li>
              <li className="breadcrumb-menu d-md-down-none ml-auto">
              {<img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                  <a className="btn powered p-0" href="#">
                    <i className="icon-graph"></i> &nbsp;
                    <i>Powered by Amploglobal</i>
                  </a>
               
              </li>
            </ol>
            <div className="container-fluid container-dashboard mt-3">
        
            {/* <iframe width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=756cb5ac-a71a-4247-a83f-80f86adaa70b&autoAuth=true&ctid=7aeb1417-d9cf-43c8-a378-5dc3c6383163&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWItcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe> */}
          <div className="mainReport" id="reportArea">
              
            <div style={{width:'100%',height:700}} id="embedContainer"></div>
            </div>
           
            </div>
          </div>
          </div>
          </div>
            </>
        )
    // }
}
const mapStateToProps = state => ({
    powerbiData:state.powerbiData
})
export default connect(mapStateToProps,{getAccessToken,getEmbedToken,getAllReports,reInitialize})(KpiDashboard);