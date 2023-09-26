import React,{Component} from 'react';
import DashboardHeader from '../includes/dashboardHeader/DashboardHeader';
import { SupportWrapper } from './styling/Support';
import support1 from '../../common/images/support1.png';
import support2 from '../../common/images/support2.png';
import support3 from '../../common/images/support3.png';
import support4 from '../../common/images/support4.png';
import support5 from '../../common/images/support5.png';
import support6 from '../../common/images/support6.png'
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import SupportSidebar from './SupportSidebar';
import {getSupportDetails} from '../../actions/supportAction'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
class Support extends Component{

    constructor(){
        super()
        this.state = {
            supportDetails:[],
            loaded:false
        };
        this.classItems = ["gradient-bg-blue","gradient-bg-lightblue","gradient-bg-green","gradient-bg-orange",
    "gradient-bg-red","gradient-bg-skyblue"]
    }
    componentDidMount(){
this.props.getSupportDetails();
    }
    static getDerivedStateFromProps = (nextProps,prevState) => {
        let returnObj = {...prevState}
        
        if(nextProps.SupportDetails.length > 0){
            
                
                    returnObj = {
                        ...returnObj,
                        supportDetails: nextProps.SupportDetails,
                        loaded:true
                    }
               
            
        }
        return returnObj;
    }
    render(){
        let {loaded,supportDetails} = this.state
        return(
            <>
            <DashboardHeader/>
            <SupportWrapper id="wrapper">
<SupportSidebar/>
<div id="content-wrapper" className="d-flex flex-column">

            
            <div id="content">
            <ol className="breadcrumb dashbread">
                    <li className="breadcrumb-menu ml-auto">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search"/>
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </li>
                </ol>
                <div className="container-fluid container-dashboard">

                    <div className="row mt-4 support-row">
                    <div className="col-md-12 col-lg-12 col-xl-12">
                            {loaded === true && supportDetails.length>0?
                            supportDetails.map((item,index)=>{
                                const href = "/support/"+item.CategoryName;

                                return(<div key={index}  className={"bg-light "+ this.classItems[index]} id={item.CategoryId}>
                                <div className="content-wrapper">
                                <div className="headtitle mb-4 d-md-flex justify-content-between align-items-center">
                                        <h1>{item.CategoryName}</h1>
                                        <button type="button" className="btn btn-support">New Updates</button>
                                    </div>
                                    <div className="row support-content-row">
                                        <div className="col-md-12 col-lg-8 order-1 order-lg-2">
                                            <img src={support1} alt="Support"/>
                                        </div>
                                        <div className="col-md-12 col-lg-4 order-2 order-lg-1">
                                            {item.SubCategory.length>0?
                                                item.SubCategory.map(subCat=>{
                                                    return(
                                                        <div key = {subCat.SubCategoryId} className="support-info">
                                                <h2>{subCat.SubCategoryName}</h2>
                                                <p>{subCat.DisplayText}.</p>
                                                {/*  */}
                                                <Link to={`/support/AmpMarking/${item.CategoryId}/${subCat.SubCategoryId}`}>View Tutorial <i className="fas fa-arrow-right"></i></Link>
                                            </div>
                                                    )
                                                })
                                                :""}
                                           
                                        </div>

                                    </div>
                                    </div>
                                            {/* <NavLink href={href} class="btn-tutorial">View Tutorial <i class="fas fa-arrow-right"></i></NavLink> */}
                                    <Link to={`/support/AmpMarking/${item.CategoryId}/0`} className="btn-tutorial">View Tutorial <i className="fas fa-arrow-right"></i></Link>
                                    </div>)
                            })
                            
                                    :""}
                                   
                                    </div>
                    </div>
                    </div>
            </div>
            </div>
            </SupportWrapper>
            <FooterComponent/>
            </>
        )
    }
}
const mapStateToProps = state => ({
    SupportDetails: state.supportItems.SupportDetails,
    
});
export default connect(mapStateToProps,{getSupportDetails})(Support)