import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, colSpan, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { TableWrapper } from './Styling/ManageTableStyling';
import { TopWrapper } from './Styling/ManageTopStyling';
import { Link } from "react-router-dom";
import moment from 'moment'
import AddTeamUser from './AddTeamUser';
import EditTeamUser from './EditTeamUser';

import { fetchTeamUser, saveTeamUser, getAccessType, updateTeamUser, getIndividualUser } from '../../actions/teamActions';
import { Global } from '../../utils/Env';
import { nextTick } from 'q';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ManageTeam extends Component {
    constructor( props ){
        super( props )
        this.state= {
            successMsg:"",
            errorMsg:"",
            currentPage: 1,
            recordPerPage: 5,
            upperPageBound:3,
            lowerPageBound: 0,
            currentTeamResults: this.props.teamData,
            resetData : false
        }

        this.handleClickPagination = this.handleClickPagination.bind(this);
        this.handleCurrentChange = this.handleCurrentChange.bind(this);
        this.searchHandle = this.searchHandle.bind(this);

        Global.callback.updateTeamUser_onComplete = () => {
            this.props.fetchTeamUser();
            this.setState({
                resetData : true
            })
        }

        Global.callback.fetchTeamUser_onComplete = (res) => {
            this.setState({
                currentTeamResults : res.data
            })
        }
        
    }
    componentDidMount(){
        const {fetchTeamUser, getAccessType,getIndividualUser } = this.props;
        if(this.props.match.params.id !=undefined){
            let jsonObj = {
                "DIVAUserID":this.props.match.params.id
            }
            const {getIndividualUser } = this.props;
            getIndividualUser( jsonObj )
        }
       
        fetchTeamUser();
        getAccessType();
    }
    componentWillReceiveProps = (nextProps) => {
        const {fetchTeamUser, getAccessType, getIndividualUser } = this.props;
        if(nextProps.match.params.id !=undefined && nextProps.match.params.id != this.props.match.params.id){
            console.log("in1st")
            let jsonObj = {
                "DIVAUserID":nextProps.match.params.id
            }
            getIndividualUser( jsonObj )
            fetchTeamUser();
            getAccessType();
        }else if(nextProps.match.params.id != this.props.match.params.id && nextProps.match.params.id ==null){
            console.log("in2nd")
            let jsonObj = {
                "DIVAUserID":0
            }
            getIndividualUser( jsonObj )
            fetchTeamUser();
            getAccessType();
        }
    }
    componentWillMount() {
        //this.props.fetchTeamUser();
    }
    // componentWillReceiveProps( props ){
    //     const {fetchTeamUser, getAccessType,getIndividualUser,teamData,updateUser } = this.props;
       
    //     if( props.updateUser!= updateUser){
    //         fetchTeamUser();
    //     }
    // }
    handleSaveClick = ( stateData )=>{
            const {saveTeamUser, fetchTeamUser } = this.props;
            const userObj ={
                user_team_id:0,
                first_name: stateData.first_name,
                last_name:stateData.last_name,
                email:stateData.email,
                user_type:stateData.user_type
            }
            
            if(stateData.DisableDate!=undefined){
                userObj.disable_date = stateData.DisableDate
            }
            else{
                userObj.disable_date = "";
            }
            //console.log(JSON.stringify(userObj,null,4));
            //return false;
            this.props.updateTeamUser( userObj );
            //setTimeout(function(){ fetchTeamUser(); }, 3000);
            //fetchTeamUser();
    }
    handleClickPagination(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }
    handleCurrentChange(event){
        this.setState({
            recordPerPage:event.target.value
          });
      
    }


    handleUpdateClick = ( stateData, UserDIVATeamID )=>{
        //const {updateTeamUser, fetchTeamUser } = this.props;
      
        const userObj ={
            user_team_id:UserDIVATeamID,
            first_name: stateData.FirstName,
            last_name:stateData.LastName,
            email:stateData.Email,
            user_type:stateData.UserTypeID
        }
        if(stateData.DisableDate!=undefined){
            userObj.disable_date = stateData.DisableDate
        }
        else{
            userObj.disable_date = "";
        }
        this.props.updateTeamUser( userObj );
        //setTimeout(function(){ fetchTeamUser(); }, 3000);
        //fetchTeamUser();
    }

    searchHandle = e => {
        const { teamData } = this.props
        const { value } = e.target;
        const lowercasedValue = value.toLowerCase();
        this.setState(prevState => {
            const currentTeamResults = teamData.filter(el =>
              el.FirstName.toLowerCase().includes(lowercasedValue)
            );
      
            return { currentTeamResults };        
            
        });
        
        //console.log(currentTeamResults);
        
    }
    resetDataChangeHandler = () => {
        this.setState({
            resetData: !this.state.resetData
        })
    }
    render() {
        const tableConfig = {
            defaultPageSize: 10
        }
// columns of table starts
// let tableData = [];
//         if(this.state.currentTeamResults) {
//             tableData = this.state.currentTeamResults;
//         }
        let columns = [{
            Header: 'User Name',
            // accessor: row=>row.FirstName+' '+row.LastName ,// String-based value accessors!,
            Cell:row=>{
                
                return(<>{row.row._original.FirstName+' '+row.row._original.LastName}</>)}
          }, {
            
            Header: 'Access Type',
            // sortable: false,
            accessor:'UserTypeName'
            // Cell: props => <div className="custom-control custom-radio text-center">
            //     <input type="radio" className="custom-control-input" id={"domainRadio"+props.original.DomainID} name={"domain"+props.original.DomainID} onChange={this.handlePermissionChange.bind(this, props.original.DomainID, 'noAccess')} checked={this.state['selectAllnoAccess'+props.original.DomainID] ? true : false} />
            //     <Label className="custom-control-label" for={"domainRadio"+props.original.DomainID}></Label>
            // </div>
        }, {
           
            Header:'Status',
            accessor:'Status',
            // sortable: false,
            Cell: props => {
                console.log('The proops',props)
                return(<span class="badge badge-success"> {  ( props.original.DisableDate == null ? props.original.Status : 'Inactive' ) }</span>)}
        }, {
           
            Header: 'Disable Date',
            // sortable: false,
            Cell: props => <>{  ( props.original.DisableDate !==null ? props.original.DisableDate : 'N/A' ) }</>
        },
        {
            Header:'Created Date',
            accessor:'CreatedDate',
            Cell: props => { 
                return(
                    <>{props.original.CreatedDate!==null?moment(props.original.CreatedDate).format("YYYY-MM-DD"):""}</>
                )
            }
        },
    {
        Header:'Action',
        Cell:props=>{
            var linkurl ="/edit-team/"+props.original.UserDIVATeamID;	
            return(
                <Link className="btn btn-info" to={ linkurl }><i className="fa fa-edit"></i></Link>
            )
        }
    }];
// columns of table ends

        const { teamData, accessType, teamUser, updateUser, getUserData } = this.props
        const { currentTeamResults } = this.state;
        const pathname =this.props.location.pathname.replace(/\//g, '')
        console.log(currentTeamResults,"inManageTeam")

       
        const { currentPage, recordPerPage } = this.state;
        const indexOfLastTodo = currentPage * recordPerPage;
        const indexOfFirstTodo = indexOfLastTodo - recordPerPage;
        
        if(teamData.length > 0 ){
            var currentTeamData = teamData.slice(indexOfFirstTodo, indexOfLastTodo);

        }else{
            var currentTeamData = [];
        }
                
        // this.state.currentTeamResults = currentTeamData

        if(teamData.length > recordPerPage ){
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(teamData.length / recordPerPage); i++) {
                pageNumbers.push(i);
            }

            var renderPage = pageNumbers.map(number => {
                if(number === currentPage ){
                    var activeClass = "active"
                }else{
                    var activeClass = ""
                }
                return (
                    <li key={number} className={"page-item "+activeClass}><a className="page-link" href="#" id={number} onClick={this.handleClickPagination}>{number}</a></li>
                );
            });
        }
        else{
            var renderPage ="";
        }
        const renderPageNumbers = renderPage

        return(
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            // Add Dashboard Sidebar Here
            <div id="wrapper" key="body-wrapper">
                 <DashboardSidebar></DashboardSidebar>
               
                 <TopWrapper id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li key={0} className="breadcrumb-item">Home</li>
                            <li key={1} className="breadcrumb-item">Manage</li>
                            <li key={2} className="breadcrumb-item">Manage AmploFly 4.0 Team</li>
                            <li key={3} className="breadcrumb-menu d-md-down-none ml-auto">
                            {<img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                                <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <div className="user-content">
                                <h1 className="heading mt-3">Manage AmploFly 4.0 Team</h1>
                                <div className="card edit-user-section">
                                    <div className="card-header d-flex justify-content-between">
                                        <span>Add & Edit User</span>
                                        <span className="position-relative helpwrap">
                                            <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                            <div className="dropdown-menu" aria-labelledby="helpBtn">
                                                <p>Lorem Ipsum Dolor</p>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        {
                                            !this.props.match.params.id ?
                                            <AddTeamUser data={ this.props }  onClickhandleSaveClick = { this.handleSaveClick } resetData={this.state.resetData} resetDataChangeHandler={this.resetDataChangeHandler}/>
                                            : <EditTeamUser data={ this.props } onClickhandleUpdateClick = { this.handleUpdateClick } resetData={this.state.resetData} resetDataChangeHandler={this.resetDataChangeHandler}/>
                                        }
                                    </div>
                                </div>
                                <TableWrapper>
                                <div className="card table-section mt-4 mb-5">
                                    <div className="card-header d-flex justify-content-between">
                                        <span>Manage AmploFly 4.0 Team</span>
                                        <span className="position-relative helpwrap">
                                            <a href="#" className="helpicon dropdown-toggle" id="helpBtn2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                            <div className="dropdown-menu" aria-labelledby="helpBtn2">
                                                <p>Lorem Ipsum Dolor</p>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <div className="data-length">
                                            <ul className="list-inline">
                                                <li key={0} className="list-inline-item"></li>
                                                <li key={1} className="list-inline-item">
                                                {/* <select className="form-control form-control-sm" name="recordPerPage" id="recordPerPage" onChange={this.handleCurrentChange}>
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                    <option value="20">20</option>
                                                </select> */}
                                                </li>
                                                <li key={2} className="list-inline-item"><label></label></li>

                                                <li key={3} className="list-inline-item float-right">
                                                <div className="search-container">
                                                    <form>
                                                        <input type="text" placeholder="Search" onChange={this.searchHandle}/>
                                                        <button type="submit"><i className="fa fa-search"></i></button>
                                                    </form>
                                                </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="manage-table table-responsive">
                                        <ReactTable
                                        className="table table-striped"
                        data={this.state.currentTeamResults}
                        columns={columns}
                        {...tableConfig}
                    />
                                            {/* <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>User Name</th>
                                                        <th>Access Type</th>
                                                        <th>Status</th>
                                                        <th>Disable Date</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentTeamResults.length == 0 ? 
                                                        <tr><td colSpan='5' className="text-center" > No Record Found</td></tr>
                                                        : 
                                                        currentTeamResults.map((user, index) => {
                                                            var linkurl ="/edit-team/"+user.UserDIVATeamID;	
                                                           

                                                            return(
                                                            <tr key={ index }>
                                                                <td>{ user.FirstName+' '+user.LastName }</td>
                                                                <td>{ user.UserTypeName } </td>
                                                                <td><span className="badge badge-success"> {  ( user.DisableDate == null ? 'Active' : 'Inactive' ) }</span></td>
                                                                <td>{  ( user.DisableDate !=null ? user.DisableDate : 'N/A' ) }</td>
                                                                <td><Link className="btn btn-info" to={ linkurl }><i className="fa fa-edit"></i></Link></td>
                                                            </tr>
                                                            )
                                                        })
                                                    }
                            
                                                </tbody>    
                                            </table> */}
                                        </div>
                                        {/* <div className="row text-center mt-4"> */}
                                        {/* <ul className="pagination m-auto"> */}
                                            {/*<Pagination aria-label="Page navigation example">*/}
                                            {/* {renderPageNumbers} */}
                                            {/*</Pagination>*/}
                                        {/* </ul> */}
                                            {/*<ul className="pagination m-auto">
                                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>*/}
                                        {/* </div> */}



                                    </div>
                                </div>
                                </TableWrapper>
                            </div>
                        </div>
                    </div>
                 </TopWrapper>
                                              
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
        ]
        )
    }
}
ManageTeam.propTypes = {
    fetchTeamUser: PropTypes.func.isRequired,
    saveTeamUser: PropTypes.func.isRequired,
    getAccessType:PropTypes.func.isRequired,   
    teamData: PropTypes.array.isRequired,
    updateTeamUser: PropTypes.func.isRequired,
    getIndividualUser:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
    teamData:state.team_array.teamData,
    teamUser:state.team_array.saveTeamUser,
    accessType:state.team_array.accessType,
    updateUser:state.team_array.updateUser,
    getUserData:state.team_array.getUserData,
    errors: state.errors
});
export default connect(mapStateToProps,{fetchTeamUser, saveTeamUser,getAccessType, updateTeamUser,getIndividualUser } )(ManageTeam);