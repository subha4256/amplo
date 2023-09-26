import React from 'react';
import DashboardHeader from '../includes/dashboardHeader/DashboardHeader';
import DashboardAccessWrapper from './DashboardAccessStyling';
import DashboardSidebar from '../includes/dashboardSidebar/DashboardSidebar';
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { ReactComponent as Logo } from '../../common/images/AmploFooter.svg'
import {connect} from 'react-redux';
import {fetchDashboardWidgets,saveDashboardAccess} from '../../actions/dashboardAction';
import { fetchKpiUserList} from '../../actions/kpiActions'
import {startLoader,stopLoader} from '../../actions/loaderActions'
import {fetchTeamUser} from '../../actions/teamActions';
import $ from 'jquery'
class DashboardAccess extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          dashboardWidgets:[],
          allUsers:[],
          UserId:"",
          postData:[],
          accessData:[],
          takeAccessData:[]
        }
    }
    componentDidMount(){
      this.props.fetchKpiUserList(); 
      // this.props.fetchTeamUser();
      $('#check4').prop('checked',false)
    }
    static getDerivedStateFromProps(nextProps,prevState){
      
      let obj = Object.assign({},prevState)
      if(typeof nextProps.dashboardWidgets!=='undefined' && nextProps.dashboardWidgets.length>0){
        
        obj.dashboardWidgets = nextProps.dashboardWidgets;
        obj.allUsers = nextProps.allUsers;
      
      }
      else if( nextProps.allUsers.length>0){
        
        obj.allUsers = nextProps.allUsers;
       
      }
     
      else if(nextProps.dashboardWidgets.length>0 && nextProps.allUsers.length>0){
        obj.dashboardWidgets = nextProps.dashboardWidgets;
      }
      else{
        // return obj
        
      }
      
      return obj;
    }
     onAccessChange = async(widget,isChecked) => {
       console.log('Widget',widget)
let mainData = []

let postObj = {}
if(isChecked === true){
  let stateArray = this.state.postData
widget.ViewAccess = 1
postObj.Dashboardwidgetid = widget.Dashboardwidgetid
postObj.DashboardReportAccessId = widget.DashboardReportAccessId
postObj.DashboardReportAccessName = widget.DashboardPowerBiReportName
postObj.ViewAccess = true
postObj.UserId = this.state.UserId;


let flag = this.haveObject(stateArray,widget)
if(flag !== false){
  stateArray[flag].ViewAccess = true;
  this.setState(prevState=>{
    let obj = Object.assign({},prevState);
    obj.postData = stateArray;
    return obj
  })
}

else{
  this.setState(prevState=>{
    let obj = Object.assign({},prevState);
    stateArray.push(postObj)
    obj.postData = stateArray;
    return obj
  })
}

}
else{
  widget.ViewAccess = 0
  postObj.Dashboardwidgetid = widget.Dashboardwidgetid
postObj.DashboardReportAccessId = widget.DashboardReportAccessId
postObj.DashboardReportAccessName = widget.DashboardPowerBiReportName
postObj.ViewAccess = false
postObj.UserId = this.state.UserId

let stateArray2 = [...this.state.postData];

let flag = this.haveObject(stateArray2,widget);
if(flag !== false){
  stateArray2[flag].ViewAccess = false;
  
  this.setState(prevState=>{
    let obj = Object.assign({},prevState);
    obj.postData = stateArray2;
    return obj
  })
}
else{
  stateArray2.push(postObj)
  this.setState(prevState=>{
    let obj = Object.assign({},prevState);
    obj.postData = stateArray2;
    return obj
  })
}


}
// loop for checking view access
let count = 0
$('input[name="domain1"]').each((index,element)=>{
  let obj = {}
  
  // console.log('checked element',$(element).prop("checked"))
  if($(element).prop("checked") === true){
count = count+1
  }


})
console.log('count val',count)
if(count == this.state.dashboardWidgets.length){
  $('#check4').prop("checked",true);
}
else{
  $('#check4').prop("checked",false);
}
// if(this.state.postData.length === this.state.dashboardWidgets.length){
//   console.log('true')
//   $('#check4').prop("checked",false);
// }
    }
    haveObject = (arr,widget)=>{
      for(var i = 0; i<arr.length; i++){
if(arr[i].Dashboardwidgetid === widget.Dashboardwidgetid){
  return i
} 
      }
      return false
    }
    onUserSelect = (e)=>{
      this.props.startLoader()
this.setState({...this.state,UserId:e.target.value},()=>{
  this.props.fetchDashboardWidgets(this.state.UserId);
  })
    }
    onSave = ()=>{
      let obj = {
        "InputJson":this.state.postData
      }
      this.props.saveDashboardAccess(obj)
    }
    selectAll = (e)=>{
//       widget.ViewAccess = 1
// postObj.Dashboardwidgetid = widget.Dashboardwidgetid
// postObj.DashboardReportAccessId = widget.DashboardReportAccessId
// postObj.DashboardReportAccessName = widget.DashboardPowerBiReportName
// postObj.ViewAccess = true
// postObj.UserId = this.state.UserId;
let mainData = this.state.dashboardWidgets;

      if(e.target.checked == true)
   {  
     let arr = []
      $('input[name="domain1"]').each((index,element)=>{
        let obj = {}
        this.state.dashboardWidgets[index].ViewAccess = 1
        console.log('checked element',$(element).prop("checked"))
        if($(element).prop("checked") !== true){
$(element).prop("checked",true);
        }
     obj.ViewAccess = 1;
     obj.Dashboardwidgetid = mainData[index].Dashboardwidgetid;
     obj.DashboardReportAccessId = mainData[index].DashboardReportAccessId;
     obj.DashboardReportAccessName = mainData[index].DashboardPowerBiReportName;
     obj.UserId = this.state.UserId;
     arr.push(obj)
     
      })
this.setState({...this.state,postData:arr})

    }
    else{
      let arr = []
      $('input[name="domain1"]').each((index,element)=>{
        if($(element).prop("checked") === true){
$(element).prop("checked",false);
let obj = {}
        this.state.dashboardWidgets[index].ViewAccess = 0
        console.log('checked element',$(element).prop("checked"))
        if($(element).prop("checked") !== true){
$(element).prop("checked",true);
        }
     obj.ViewAccess = 0;
     obj.Dashboardwidgetid = mainData[index].Dashboardwidgetid;
     obj.DashboardReportAccessId = mainData[index].DashboardReportAccessId;
     obj.DashboardReportAccessName = mainData[index].DashboardPowerBiReportName;
     obj.UserId = this.state.UserId;
     arr.push(obj)
    
        }
      });
      this.setState({...this.state,postData:arr})
    }
    }
    render(){
      // const tableData =
      let rowData; 
      let tableData = this.state.dashboardWidgets.length>0?this.state.dashboardWidgets:[]
      if(tableData.length>0){
        rowData = tableData.map((widget,index)=>{
          console.log('equals',this.state.UserId === widget.UserId)
          return(
<>
<tr>
                            <td className="pl-5">{widget.Dashboardwidgetname}</td>
                            <td className="td-wth text-center">
                              {/* <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio1" name="domain1"/>
                                <label class="custom-control-label" for="radio1"></label>
                              </div> */}
                            </td>
                            <td className="td-wth text-center">
                              {/* <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio1a" name="domain1"/>
                                <label class="custom-control-label" for="radio1a"></label>
                              </div> */}
                            </td>
                            <td className="td-wth text-center">
                              <div className="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" onChange={(e)=>{
                                  this.onAccessChange(widget,e.target.checked)
                                }} checked={widget.ViewAccess === "1" || 
                                widget.ViewAccess===1} className="custom-control-input" id={"Access"+index} name="domain1"/>
                                <label className="custom-control-label" for={"Access"+index}></label>
                              </div>
                            </td>
                          </tr>
</>
          )
        })
      }
        return(
            <>
            <DashboardHeader/>
            <DashboardAccessWrapper id="wrapper">
                <DashboardSidebar/>
                <div id="content-wrapper" class="d-flex flex-column">

     
      <div id="content">

       
        <ol class="breadcrumb dashbread">
          <li class="breadcrumb-item active">Home</li>
          <li class="breadcrumb-item">Manage</li>
          <li class="breadcrumb-item">CxO Dashboards</li>
          <li class="breadcrumb-menu d-md-down-none ml-auto">
            <img src={require('../../common/images/AmploFooter.svg')} class="logo-img" alt="Logo"/>
            <a class="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
          </li>
        </ol>

        
        <div class="container-fluid container-dashboard">
          <div class="user-content">
            <h1 class="heading">Dashboard Widget Access Management</h1>


            <div class="card manage-access-section mb-5">
              <div class="card-header">
              Dashboard Widget Access Management
              </div>
              <div class="card-body">
                <p class="card-text">Assign access to users for the respective CxO Dashboard widgets. By default, user access will be denied to all dashboard widgets until specifically assigned by a client's super-user.</p>
                <div class="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                  <div class="form-group row">
                    {/* <div class="col-sm-12 col-md-6 col-lg-6 mb-1">
                      <label>Dashboard Widget Name <span class="text-danger">*</span></label>
                      <select class="form-control">
                        <option>Dashboard Widget 1</option>
                        <option>BDashboard Widget 2</option>
                      </select>
                    </div> */}
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label>User <span class="text-danger">*</span></label>
                      <select class="form-control" onChange={this.onUserSelect} value={this.state.UserId}>
                        {/* <option selected>Nitin</option>
                        <option>All User</option> */}
                      <option selected>Select User</option>
                        {this.state.allUsers.length>0?this.state.allUsers.map((item,index)=>{

return(
  <option key={item.UserID} value={item.UserID}>{item.FirstName+" "+item.LastName}</option>
)
                        }):""}
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="manage-table table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th class="pl-23">
                              <div class="custom-control custom-checkbox">
                                {/* <input type="checkbox" class="custom-control-input" id="check1"/> */}
                                <label className="" >Dashboard Widget Name</label>
                              </div>
                            </th>
                            <th>
                              {/* <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="check2"/>
                                <label class="custom-control-label" for="check2">No Access</label>
                              </div> */}
                            </th>
                            <th>
                              {/* <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="check3"/>
                                <label class="custom-control-label" for="check3">Read</label>
                              </div> */}
                            </th>
                            <th>
                              <div class="custom-control custom-checkbox">
                                <input onChange={this.selectAll} type="checkbox" class="custom-control-input" id="check4"/>
                                <label class="custom-control-label" for="check4">View Access</label>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.dashboardWidgets.length>0?rowData:""}
                          {/* <tr>
                            <td class="pl-5">Domain 2</td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio2" name="domain2"/>
                                <label class="custom-control-label" for="radio2"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio2a" name="domain2"/>
                                <label class="custom-control-label" for="radio2a"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio2b" name="domain2"/>
                                <label class="custom-control-label" for="radio2b"></label>
                              </div>
                            </td>
                          </tr> */}
                          {/* <tr>
                            <td class="pl-5">Domain 3</td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio3" name="domain3"/>
                                <label class="custom-control-label" for="radio3"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio3a" name="domain3"/>
                                <label class="custom-control-label" for="radio3a"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio3b" name="domain3"/>
                                <label class="custom-control-label" for="radio3b"></label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="pl-5">Domain 4</td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio4" name="domain4"/>
                                <label class="custom-control-label" for="radio4"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio4a" name="domain4"/>
                                <label class="custom-control-label" for="radio4a"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio4b" name="domain4"/>
                                <label class="custom-control-label" for="radio4b"></label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td class="pl-5">Domain 5</td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio5" name="domain5"/>
                                <label class="custom-control-label" for="radio5"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio5a" name="domain5"/>
                                <label class="custom-control-label" for="radio5a"></label>
                              </div>
                            </td>
                            <td class="td-wth text-center">
                              <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="radio5b" name="domain5"/>
                                <label class="custom-control-label" for="radio5b"></label>
                              </div>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="form-group row row-btn mt-4">
                    <div class="col-sm-6">
                      <button onClick={this.onSave} type="submit" class="btn btn-primary mr-3">SAVE</button>
                      <a href="#">Cancel</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
           

          </div>
        

        </div>
        </div>
        </div>
            </DashboardAccessWrapper>
            <FooterComponent/>
            </>
        )
    }
}
const mapStateToProps = state =>({
dashboardWidgets:state.dashboardData.dashboardWidgets,
// allUsers:state.team_array.teamData
allUsers:state.kpiData.kpiUsers
})
export default connect(mapStateToProps,{fetchKpiUserList,startLoader,stopLoader,fetchDashboardWidgets,fetchTeamUser,saveDashboardAccess})(DashboardAccess)