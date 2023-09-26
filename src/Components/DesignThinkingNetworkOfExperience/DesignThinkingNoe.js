import React,{Component, Fragment} from 'react';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import { DesignThinkingNoeStyle } from './Styling/DesignThinkingNoeStyle';
import DTNoeScreenBodyDetail from './DTNoeScreenBodyDetail';
import DTNoeScreenBreadcrumb from './DTNoeScreenBreadcrumb';
import DTNoeScreenTopbar from './DTNoeScreenTopbar';
import DTNoeScreenLeftSidebar from './DTNoeScreenLeftSidebar';
import DTNoeFooter from './DTNoeFooter';

import {responseMessage} from '../../utils/alert';
import { Global } from '../../utils/Env';
import { connect } from 'react-redux';
import axios from 'axios';
import { 
  fetchNoe
} from '../../actions/noeActions';
import { 
  fetchDesignThinkingProjectDetails
} from '../../actions/epicScreenActions';
const config = require('../../config');

class DesignThinkingNoe extends Component {
  state={
    noeSubepicData:[],
    noeData: [],
    dtId : this.props.match.params.dtId?this.props.match.params.dtId:0,
    epicId: this.props.match.params.epicId?this.props.match.params.epicId:0,
    versionHistoryNo: 0
  }
  componentDidMount(){
    this.props.fetchDesignThinkingProjectDetails(this.state.dtId,this.state.versionHistoryNo);
    axios.get(config.laravelBaseUrl+`getEpic/${this.state.dtId}/0/0`, {
      headers: {
          "authorization": "Bearer " + sessionStorage.getItem("userToken")
      }
      }).then((response) => {
          console.log("getEpic",response.data.data)
      })
    this.props.fetchNoe(this.state.epicId);
  }
  getData = () => {
    // axios.get(config.laravelBaseUrl+`getNOEBySubEpic/${this.state.epicId}`, {
    //   headers: {
    //       "authorization": "Bearer " + sessionStorage.getItem("userToken")
    //   }
    //   }).then((response) => {
    //     this.setState({noeSubepicData: response.data.data})
    //     console.log("getNOEBySubEpic",response.data.data)
    //   })
  }
  
  render(){
        return(
        <>
          <DashboardHeader/>
          <DesignThinkingNoeStyle id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <DTNoeScreenBreadcrumb />
                <div className="container-fluid container-dashboard">
                  <DTNoeScreenTopbar
                    dtId={this.state.dtId}
                    epicId={this.state.epicId}
                    dtProjects={this.props.dtProjects}
                  />
                  <div className="row">
                    <div className="dt-screen-main">
                      <DTNoeScreenLeftSidebar />
                      <DTNoeScreenBodyDetail 
                        noeData={this.props.noeData}
                        dtId={this.state.dtId}
                        epicId={this.state.epicId}
                        getData={() => this.getData()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DesignThinkingNoeStyle>
          <DesignThinkingNoeStyle>
          <DTNoeFooter />
          </DesignThinkingNoeStyle>
        </>
    )};
} 

const mapStatetoProps= (state) =>{

  return {
    noeData: state.noe.noeData,
    dtProjects: state.epicScreenData.dtProjects,
  }
}

export default connect(mapStatetoProps,{
  fetchDesignThinkingProjectDetails,
  fetchNoe
})(DesignThinkingNoe);
