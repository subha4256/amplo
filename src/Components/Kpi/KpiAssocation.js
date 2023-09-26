import React, { Component } from "react";
import { connect } from "react-redux"
import { getKpiAssociation,fetchKpiSetList, saveKpiAssocation,fetchBenchmarkProjectsWithDomains, fetchDecompositionProjects,fetchDesignThinkingProjects } from '../../actions/kpiActions';
import {startLoader,stopLoader} from '../../actions/loaderActions'
import axios from 'axios';
import Loader from "../Loader";
const config = require('../../config');



class KpiAssocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            benchmacklist: [],
            capabilitylist: [],
            designthinkinglist: [],
            kpiSetId:'',
            collapse:'',
            message:'',
            loaded:true,
            projectData:[]
        }
        this.keyNum = 0;
    }

    getKey(){

        return this.keyNum++
    }

    componentDidMount() {
       
        this.props.fetchBenchmarkProjectsWithDomains();
        this.props.fetchDecompositionProjects();
        this.props.fetchDesignThinkingProjects();
// this.props.getKpiAssociation();

        
    }

    /* processData(dataArr) {
        let designAttr = ["Benchmark-design-bootstrap", "Capability-design-bootstrap", "DT-design-bootstrap"];
        dataArr.map((item, id) => {
            this.loopThru(item.projects, designAttr[id]);
        })
    } */

    //.. check if its iterable
    isPropertyArray(value) {
        return (value instanceof Array && value.constructor === Array)
    }

    hasObjectProperty(obj, prop){
        
       return obj.hasOwnProperty(prop)
    }

    //toggleing the view
    toggleView(obj) {
        //console.log(obj);
        this.setState({
            ["view" + obj.id]: (this.state["view" + obj.id] === 'undefined') ? true : !this.state["view" + obj.id]
        })
    }

    trimID(list){
        return list.map((item) => {
            return item.id
        })
    }

    //for saving data
    saveHandler=()=> {

        if(this.state.kpiSetId !== ''){

            //..this.trimID([...this.state.benchmacklist, ...this.state.capabilitylist, ...this.state.designthinkinglist])
            let saveobj = {
                'kpiSetId': this.state.kpiSetId,
                'kpi_association_list': {
                    benchmacklist: this.state.benchmacklist,
                    capabilitylist:this.state.capabilitylist,
                    designthinkinglist:this.state.designthinkinglist
                }
            }
            console.log(saveobj)
            this.props.saveKpiAssocation(saveobj);
        }
    }

    listHandling(listname, obj, operation){
        //console.log(listname, '(', obj.name,', ', operation, ')->', this.state[listname]);
        switch (operation) {
            case true:                       
                this.setState({ 
                    [listname]: [...this.state[listname], {id:obj.id, name:obj.name}] 
                })
                break;
            case false:
                this.setState({
                    [listname]: [...this.state[listname]].filter(val => val.id !== obj.id)
                })
                break;
            default:
                break;
        }
    }

    //...
    checkboxhandler(e, obj, designAttributes) {
        this.setState({
            ["checked" + obj.id]: e.target.checked
        },()=>console.log('After changed',this.state))
    //    obj['isSelected'] = 1
        //.. TODO :: Ashim
        switch (designAttributes) {
            case "Benchmarking Projects":
                this.listHandling("benchmacklist", obj, e.target.checked);
                break;

            case "Capability Modelling Projects":
                    this.listHandling("capabilitylist", obj, e.target.checked);
                break; 
                
            case "Design Thinking Projects":
                this.listHandling("designthinkinglist", obj, e.target.checked);
                break;    
                    
            default:
                break;
        }  
    }



    //.. this is where you should design the elements ::treeview::
    formatObjValue(obj, attr) {
        let arr = []
        for (var i in obj) {
            if (this.isPropertyArray(obj[i])) {
                //.. next iterable structure
                arr.push(this.loopThru(obj[i], attr))
            }
        }
        return arr
    }

    //.. looping mechanism
    loopThru(arr, designAttributes) {
        console.log('looping',arr);
           
        this.keyNum++;

        let _arr = []
        
        for (let i = 0; i < arr.length; i++) {
            let color = ''
            if(arr[i].projectId != undefined){
              let count = arr[i].FunctionCount ?  arr[i].FunctionCount:  '';
               color = count > 0  ?  '#000': 'blue';
            }
            
            let jsxT =
                (<ul id="myUL" key={'k'+this.getKey()}>
                    <li className="myULbench-lineheight" key={'k'+this.getKey()}  >
                        <div className="custom-control custom-checkbox" 
                             key={'k'+this.getKey()} id={'view'+arr[i].id}  onClick={e => this.getProcessData(arr,arr[i])}  >
                                
                            <input 
                                key={'k'+this.getKey()}
                                type="checkbox"
                                onChange={(e) => this.checkboxhandler(e, arr[i], designAttributes)}
                                disabled={!this.hasObjectProperty(arr[i], "isSelected")}
                                className="custom-control-input" 
                                style={{ opacity: "1", zIndex: "0" }} 
                                id={arr[i].id} 
                                name={arr[i].name} 
                                // checked = {(this.hasObjectProperty(arr[i], "isSelected")) ? this.state["checked" + arr[i].id] : this.state["checked" + arr[i].id] }
                                checked = {(this.hasObjectProperty(arr[i], "isSelected")) ? this.state["checked" + arr[i].id] : false}
                                />
                                
                            <label
                                key={'k'+this.getKey()}
                                onClick={(e) => this.toggleView(arr[i])}
                                style={{ cursor: "pointer" }}  style={{color:color}}  >
                                        {arr[i].name}
                            </label>
                             {(this.state["view" + arr[i].id]) ? this.formatObjValue(arr[i], designAttributes) : ""}
                        </div>
                    </li>
                </ul>)
            _arr.push(jsxT)
        }

      
        return _arr
    }

    handleKPISetListChange = (e) => {
        console.log(e.target.value);
        if(e.target.value == ''){
            this.setState({
                'kpiSetId':'',
                'collapse':'',
             })
        }else{
        this.setState({
            'kpiSetId':e.target.value,
            'collapse':'collapse',
            message:''
        })
     }
    }

    showAssociationMenuList(list){
        return (list.map(e => {
            return (<li key={'k'+this.getKey()}  className="card-text-mange-create mb-2 line-height20px pwidthparagraph list-style-disc">{e.name}</li>)
        }))
    }

    showKPISetList() {
        return (this.props.kpiSetList.map(set => {
            return (
                <option key={set.KPISetID} value={set.KPISetID}>{set.KPISetName}</option>
            )
        }))
    }
    async getProcessData(arr,a){
     // console.log('---->');
     // console.log(arr);
     let _this = this
     let token = await sessionStorage.getItem('userToken');
      let obj = this;
      if(a.projectId !== undefined){
 this.props.startLoader() 
              axios.get(config.laravelBaseUrl+'getDecompositionProjectsFunctionPhaseLevel/' + a.projectId,{
               headers: {
                   "authorization": "Bearer " + token
                }
              }).then(function(response){
                for(let i =0;i<arr.length;i++){
                   
                    if(arr[i].projectId === a.projectId){                       
                        arr[i].functions = response.data.data;  
                      //  obj.loopThru(arr, 'Capability Modelling Projects');                    
                    }                                        
                }
                console.log('Outside')
                let comObject = {
                    "association_data":[{
                    "name":"Benchmarking Projects",
                    "projects":obj.props.benchmarkingProjects
                    },
                    {
                    "name":"Capability Modelling Projects",
                    "projects":obj.props.decompositionProjects
                    },
                    {
                        "name":"Design Thinking Projects",
                        "projects":obj.props.designthinkingProjects
                    }]
                }
                _this.setState({..._this.state,loaded:true})  
                obj.create_treeView(comObject);   
                          _this.props.stopLoader() 
            });
        }
           
    }    
     
    checkKpiset(e){
        if(this.state.kpiSetId == ''){
         this.setState({message:'Please select Business Initiative'});   
        }
    }
   
    create_treeView(data){  

        return ((Object.keys(data).length > 0) ? data.association_data.map((a, i) => {
           
            return (
                <div key={a + i} className="accordion" id="accordionExample"> 
                    <div className="card-header" id="headingOne" onClick= {(e) => this.checkKpiset(e)}>
                        <button type="button" 
                                className="btn btn-link" 
                                data-toggle={this.state.collapse} 
                                data-target={"#collapseOne" + i}>
                            <i className="fa fa-plus"></i>{a.name.toUpperCase() === "BENCHMARKING PROJECTS" ? "AmpMarking Projects" : a.name}
                        </button>
                    </div>
                    <div id={"collapseOne" + i} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" >
                        <div className="card-body tree-cardbody">
                            {this.loopThru(a.projects, a.name)}
                        </div>
                    </div>
                </div>
            )
        }) : "")
    }

    render() {
      //  console.log(this.props.benchmarkingProjects);
      //  console.log(this.props.decompositionProjects);
        let comObject = {
                "association_data":[{
                "name":"Benchmarking Projects",
                "projects":this.props.benchmarkingProjects
                },
                {
                "name":"Capability Modelling Projects",
                "projects":this.props.decompositionProjects
                },
                {
                    "name":"Design Thinking Projects",
                    "projects":this.props.designthinkingProjects
                }]
            }
        console.log(comObject);
        
       
        return (
            <div className="row">
            <div className="col-lg-12">
            <div className="card table-section table-section-new mt-4">
                <div className="card-header"> Manage Business Initiative Association </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="left-sidesearch-pannel">
                                <div className="search-container">
                                    <form>
                                        <input type="text" className="input-search-mange-create" placeholder="Search" />
                                        <button type="submit"><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="bs-example">
                                {this.create_treeView(comObject)}
                            </div>
                        </div>
                        <div className="col-md-6">
                             <div className="form-group drop-form-control">
                                <label>Business Initiative</label>
                                <select className="form-control" onChange={this.handleKPISetListChange}>
                                    <option></option>
                                    {this.showKPISetList()}
                                </select>
                                { this.state.message ? <span style={{color: "red", width:"100%"}}> { this.state.message } </span> : null }
                            </div>

                            {/* Requires refactor */}
<Loader loading={this.state.loaded} />
                            <div className="mt-3">
                                <label>AmpMarking Project:</label>
                                {/* <!--<p class="card-text-mange-create mb-4 line-height20px pwidthparagraph">Domain 4</p>--> */}
                                <ul>
                                    {this.showAssociationMenuList(this.state.benchmacklist)}
                                </ul>
                            </div>
                            <div className="mt-3">
                                <label>Capability Modeling Project:</label>
                                <ul>
                                    {this.showAssociationMenuList(this.state.capabilitylist)}
                                </ul>
                            </div>
                            <div className="mt-3">
                                <label>Design Thinking Project:</label>
                                <ul>
                                    {this.showAssociationMenuList(this.state.designthinkinglist)}
                                </ul>
                            </div>

                            {/* Requires refactor ends */}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-right mang-kpibtn">
                            <button type="button" className="btn btn-link mr-3">
                                Cancel
                            </button>
                            <button type="submit" 
                                    onClick={this.saveHandler} 
                                    className="btn btn-primary">
                                SAVE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
}
const mapStateToProps = state => ({
    errors: state.errors,
    kpiSetList: state.kpiData.kpiSets,
   // kpiAssociatonData: state.kpiData.kpiAssociatonData,
    decompositionProjects:state.kpiData.decompositionProjects,
    benchmarkingProjects:state.kpiData.benchmarkingProjects,
    designthinkingProjects:state.kpiData.designthinkingProjects

});
export default connect(mapStateToProps, { startLoader,stopLoader,getKpiAssociation,fetchKpiSetList, saveKpiAssocation,fetchBenchmarkProjectsWithDomains, fetchDecompositionProjects,fetchDesignThinkingProjects})(KpiAssocation);