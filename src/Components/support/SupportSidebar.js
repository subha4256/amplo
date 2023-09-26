import React,{Component} from 'react';
import { SidebarWrapper } from './styling/SidebarWrapper';
import { connect } from 'react-redux';
import {getSupportMenu} from '../../actions/supportAction';
import {Link,NavLink} from 'react-router-dom'
class SupportSidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            sidebarHeadings : [],
            sidebarItems:[],
            modules:[],
            
        }
        
    }
    componentDidMount(){
        this.props.getSupportMenu();
        

    }
    static getDerivedStateFromProps = (nextProps,prevState) => {
        let returnObj = {...prevState}
        
        if(nextProps.sidebarItems.length > 0){
            
                let moduleArray = nextProps.sidebarItems.filter((item)=>{
                    return item.SupportName === "MODULES"
                })
                    returnObj = {
                        ...returnObj,
                        sidebarItems : nextProps.sidebarItems,
                        modules:moduleArray
                    }
               
            
        }
        return returnObj;
    }

    render(){
        let {modules} = this.state;
        return(
            <SidebarWrapper>
            
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-light accordion" id="accordionSidebar">

            <div class="sidebar-container-bg">
                <li class="nav-item active">
                    <a class="nav-link" href=""><span>Support</span> <span class="badge badge-info badge-counter beta-b">Featured</span></a>
                </li>
                <div class="sidebar-heading">
                    GETTING STARTED
                </div>
                <li class="nav-item">
                    <a class="nav-link" href="#registration">
                        <span>Registration</span>
                    </a>
                </li>
                <div class="sidebar-heading">
                    MODULES
                </div>
                {modules.length!== 0 ?modules
                .map((item)=>{
                    let href = "#"+item.CategoryId;
                    return(
<li class="nav-item"><a class="nav-link" href={href}><span>{item.CategoryName}</span></a></li>

                    )
                }):""}
                {/* <li class="nav-item"><a class="nav-link" href="support-ampmarking.html"><span>AmpMarking</span></a></li>
                <li class="nav-item"><a class="nav-link" href=""><span>Capability Modeling</span></a></li>
                <li class="nav-item"><a class="nav-link" href=""><span>Performance Measuring</span></a></li>
                <li class="nav-item"><a class="nav-link" href=""><span>Design Thinking</span></a></li>
                <li class="nav-item"><a class="nav-link" href=""><span>Roadmapping</span></a></li> */}

                <div class="text-right d-none d-md-block bottom-bg">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </div>
        </ul>
        

            </SidebarWrapper>
        )
    }
}
const mapStateToProps = state => ({
    sidebarItems : state.supportItems.MenuItems,
    
});
export default connect(mapStateToProps,{getSupportMenu})(SupportSidebar);