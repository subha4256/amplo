import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import {PainPointsWrapper} from './Styling/PainPointsResult'
import FooterComponent from '../includes/dashboardFooter/FooterComponent';

import SidebarJs from '../../common/js/sidebarAnimation';
import  Loader  from '../Loader';
import {saveClientAnalyticsUsecaseruns,getClientAnalyticsUsecaserunsDetails,fetchPainPointsInitiatives,setProject,resetInitiatives} from '../../actions/benchmarkingActions'
// import axios from 'axios';
// import {errorAlert,responseMessage} from '../../utils/alert';
// import CacheStorage from '../../utils/CacheStorage';
// import $ from 'jquery'
// import ReactTable from 'react-table';

const config = require('../../config');

//.. Reviewed by Ashim:: Need to implement LoadAPI > action creators

class PainPoints extends Component {
    constructor(props){
        super(props)
        this.state = {
painpointsData:[]
        }
    }
    componentDidMount(){
      let projectId = this.props.match.params.projectId;
      let projName = this.props.match.params.projectName
      this.props.fetchPainPointsInitiatives(projectId);
      // this.props.setProject({projId:projectId,projName:projName})
    
    }
    componentWillUnmount(){
      this.props.resetInitiatives();
    }
    static getDerivedStateFromProps(nextProps,prevState){
      console.log('pain',nextProps)
      let obj = Object.assign({},prevState);
      if(nextProps.painpointInitiatives.length>0){
        obj.painpointsData = nextProps.painpointInitiatives
      }
      return obj
    }
    render(){
// columns
// let columns = [ {
 
//   Header:'Painpoints',
  
//   // sortable: false,
//   Cell: props => {
//       console.log('The proops',props.original.Painpoints)
//       return(
//         <>{props.original.Painpoints.length>0?
//           <>
//            <ol class="hlist">
//          { props.original.Painpoints.map(points=>{
//            console.log('points')
//           return(
//             <>
            
//                           <li>{points.PainPoints}</li>
                         
                        
//             </>
//           )
//         })}
//         </ol>
//         </>
//         :""}</>
//       )}
// }, {
 
//   Header: 'Function',
//   // sortable: false,
//   Cell: props => <>{  ( props.original.Function !==null ? props.original.Function : '' ) }</>
// },
// {
//   Header:'Root Cause',
//   accessor:'CreatedDate',
//   Cell: props => { 
//       return(
//           <>{props.original.Root_cause.length>0?
//             <>
//              <ol class="hlist">
//            { props.original.Root_cause.map(root_cause=>{
//             return(
//               <>
              
//                             <li>{root_cause.Root_cause}</li>
                           
                          
//               </>
//             )
//           })}
//           </ol>
//           </>
//           :""}</>
//       )
//   }
// },
// {
//   Header:'Solutions',
//   Cell:props=>{
//    console.log('Solutions',props)
//     return(
//       <>{props.original.Solutions.length>0?
//         <>
//          <ol class="hlist">
//        { props.original.Solutions.map(solution=>{
//         return(
//           <>
          
//                         <li>{solution.Solutions}</li>
                       
                      
//           </>
//         )
//       })}
//       </ol>
//       </>
//       :""}</>
//     )
//   },
// },
// {

// Header:'Solution KPI Recommendation',
// Cell:props=>{
  
//   return(
//     <>{props.original.Solution_KPI_Recommendation.length>0?
//       <>
//        <ol class="hlist">
//      { props.original.Solution_KPI_Recommendation.map(item=>{
//       return(
//         <>
        
//                       <li>{item.Solution_KPI_Recommendation}</li>
                     
                    
//         </>
//       )
//     })}
//     </ol>
//     </>
//     :""}</>
//   )
// },

// },
// {

//   Header:'Painpoint KPI Recommendation',
//   Cell:props=>{
   
   
//   return(
//     <>{props.original.Painpoint_KPI_Recommendation.length>0?
//       <>
//        <ol class="hlist">
//      { props.original.Painpoint_KPI_Recommendation.map(item=>{
//       return(
//         <>
        
//                       <li>{item.Painpoint_KPI_Recommendation}</li>
                     
                    
//         </>
//       )
//     })}
//     </ol>
//     </>
//     :""}</>
//   )
//   },
  
//   }

// ];
// columns end
const tableConfig = {
  defaultPageSize: this.state.painpointsData.length>0?this.state.painpointsData.length:6
}
let tableData = this.state.painpointsData.length>0?this.state.painpointsData.map((painPoint=>{
return(
  <tr>
    
    <td>
    <ol class="hlist">
     
          
            <li>{painPoint.Painpoints}</li>
          
       
                          </ol>
                          </td>
                          <td>
                          <ol className="hlist">
                          {painPoint.Function.length>0?painPoint.Function.map((func)=>{
        return(
          
            <li>{func.Function}</li>
          
        )
      }):""}
                          </ol>
                          </td>
                          <td>
                          <ol className="hlist">
                            {painPoint.Root_cause.length>0?painPoint.Root_cause.map(rootCause=>{
                              return(
                                
                                  <li>{rootCause.Root_cause}</li>
                               
                              )
                            }):""}
                             </ol>
                          </td>
                          <td>
                          <ol>
                            {painPoint.Solutions.length>0?
                              painPoint.Solutions.map(solutions=>{
                                return(
                                 
                                  <li>{solutions.Solutions}</li>
                                  
                                )
                              }):
                              ""}
                              </ol>
                          </td>
                          <td>
                            <ol className="hlist">
                              {painPoint.Solution_KPI_Recommendation.length>0?
                              painPoint.Solution_KPI_Recommendation.map(item=>{
                                return(
                                  <li>{item.Solution_KPI_Recommendation}</li>
                                )
                              }):""}
                            </ol>
                          </td>
                          <td>
                            <ol className="hlist">
                              {painPoint.Painpoint_KPI_Recommendation.length>0?
                                painPoint.Painpoint_KPI_Recommendation.map(item=>{
                                  return(<li>{item.Painpoint_KPI_Recommendation}</li>)
                                })
                                :""}
                            </ol>
                          </td>
  </tr>
)
})) :""    
return(
            <>
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <Loader loading={this.state.loading}/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item active">Capability Modeling</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                                <span className="position-relative helpwrap">
                                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                                        <p>Lorem Ipsum Dolor</p>
                                    </div>
                                </span>
                            </li>
                            <li className="breadcrumb-menu d-md-down-none">
                                {<img src={require('./../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />}
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                <i>Powered by Amploglobal</i>
                                </a>
                            </li>
                        </ol>
                        <PainPointsWrapper>
                        <div class="container-fluid container-dashboard">
          <div class="heatmap-content">
          <div class="card table-section mt-4 mb-5">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center heatmap-header">
                  <h2>Project 1 - Painpoint Initiatives</h2>
                  <Link to={`/capability/${this.props.match.params.projectId}`} className="backlink">Back</Link>
                </div>

                <div class="heatmap-table table-responsive">
                  <table class="table table-bordered mb-0">
                    <thead class="thead-dark">
                      <tr>
                        <th>Painpoints </th>
                        <th>Functions</th>
                        <th>Root Cause</th>
                        <th>Solutions</th>
                        <th>Solution KPI Recommendation</th>
                        <th>Painpoints KPI Recommendations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.painpointsData.length>0?tableData:<tr>
                        <td>No Painpoints Available</td>
                      </tr>}
                      {/* <tr>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                          </ol>
                        </td>
                        <td>Procurement</td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                          </ol>
                        </td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                          </ol>
                        </td>
                        <td>Inventory Management</td>
                        <td>Purchase Order Cycle Time</td>
                      </tr>
                      <tr>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                            <li>Integration of HR Technologies</li>
                          </ol>
                        </td>
                        <td>Procurement</td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>Inventory Management</td>
                        <td>Purchase Order Cycle Time</td>
                      </tr>
                      <tr>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                            <li>Integration of HR Technologies</li>
                          </ol>
                        </td>
                        <td>Procurement</td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>Inventory Management</td>
                        <td>Purchase Order Cycle Time</td>
                      </tr>
                      <tr>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                            <li>Integration of HR Technologies</li>
                          </ol>
                        </td>
                        <td>Procurement</td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>Inventory Management</td>
                        <td>Purchase Order Cycle Time</td>
                      </tr>
                      <tr>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                            <li>Integration of HR Technologies</li>
                          </ol>
                        </td>
                        <td>Procurement</td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>Inventory Management</td>
                        <td>Purchase Order Cycle Time</td>
                      </tr>
                      <tr>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                            <li>Integration of HR Technologies</li>
                          </ol>
                        </td>
                        <td>Procurement</td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>
                          <ol class="hlist">
                            <li>Leveraging Talent Analytics</li>
                            <li>Leveraging Brand</li>
                            <li>Focus on Candidate Experience</li>
                          </ol>
                          Integration of HR Technologies
                        </td>
                        <td>Inventory Management</td>
                        <td>Purchase Order Cycle Time</td>
                      </tr> */}
                    </tbody>
                  </table>

                  {/* <ReactTable
                                        className="table table-bordered mb-0"
                        data={this.state.painpointsData}
                        columns={columns}
                        {...tableConfig}
                    /> */}
                </div>

              </div>
          
            </div>
          </div>
          </div>
          </PainPointsWrapper>
                        </div>
                        </div>
                        </div>
                        <FooterComponent/>
                        </>
        )
    }
}
const mapStateToProps = state => ({
  // processData: state.capability.processData,
  // processes: state.capability.processes,
  // functions: state.capability.functions,
  // phases: state.capability.phases,
  // scores: state.capability.scores,
  // activity: state.capability.activity,
  // activityLocation: state.capability.activityLocation,
  // loadingstatus: state.capability.loadingstatus,
  // copySuccess: state.capability.copySuccess,
  // CLientAnalyticsUsecaseData:state.benchmarkingData.setCLientAnalyticsUsecaseData
  painpointInitiatives:state.benchmarkingData.painpointInitiatives
});
export default connect(mapStateToProps,{resetInitiatives,setProject,fetchPainPointsInitiatives})(PainPoints)