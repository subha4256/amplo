import React from 'react';
import { connect } from 'react-redux';
const config = require('../../config.js');


const EmpathyScreenLeftSidebar =  (props) => {
 const {benchmarkingProject, decompositionProject, kpisControl,addDrag,getChild,decompositionchildData,filterProject,filterVal,ptype,StackHolderLeftSidebar} = props;
 if(decompositionchildData.data){
    decompositionProject.map((projects) =>{
      if(parseInt(projects.projectId) == parseInt(decompositionchildData.projectId)){                             
        projects.functions = decompositionchildData.data; 
      } 
    })   
  } 
  if(filterVal != '' && ptype == 'benchmarking'){
    benchmarkingProject = benchmarkingProject.filter(function (e) {
        return  e.name.includes(filterVal);
    });
  }
  if(filterVal != '' && ptype == 'decomposition'){
    decompositionProject = decompositionProject.filter(function (e) {
        return  e.name.includes(filterVal);
    });
  }
  if(filterVal != '' && ptype == 'kpis'){
    kpisControl = kpisControl.filter(function (e) {
        return  e.name.includes(filterVal);
    });
  }

  let StackHolderLists = StackHolderLeftSidebar.map((item,index) =>{
    return(
        <div key={index} className="media mb-2 px-3" onDragStart={(e) => {e.stopPropagation();props.dragStakeholder(e,item)}} draggable>
            <img className="mr-3 img-fluid" style={{height: '50px', width: '50px'}} src={(item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:require('../../common/images/login_image.png')} alt=""/>
            <div className="media-body">
                <h6 className="mt-0">{item.StakeHolderName}</h6>
                <p>{item.StakeHolderType}</p>
            </div>
        </div>
    )
})
 
  let projects = benchmarkingProject.map((project)=>{
    let domains = project.domains.map((domain)=>{
      return(<li key={domain.id} onDragStart={(e) => addDrag(e,domain)} draggable>
        <div className="custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="domain1-a"/>
          <label className="custom-control-label" htmlFor="domain1-a" onDragStart={(e) => addDrag(e,domain)} draggable>{domain.name}</label>
        </div>
      </li>);
    })
    return(<div key={project.id} className="card">
        <div className="d-flex">
          <div className="custom-checkbox">
            <input type="checkbox" className="custom-control-input" id={"check"+project.id}/>
            <label className="custom-control-label" htmlFor={"check"+project.id}></label>
          </div>
          <a data-toggle="collapse" href={"#benchmarking"+project.id} aria-expanded="false" className="collapsed test">{project.name}</a>
        </div>
        <div id={"benchmarking"+project.id} className="collapse" data-parent="#benchmarkingaccord">
          <ul className="domain-list">
          {domains}
        </ul>
      </div>
    </div>);
  })
let decomposeProjects = decompositionProject.map((compose)=>{
    let functions;
    if(compose.functions){
   functions = compose.functions.map((func)=>{
   let phases = func.phases.map((phase)=>{
      let processes = phase.processes.map((process)=>{
        return(<li key={process.id} onDragStart={(e) => addDrag(e,process)} draggable>
        <div className="custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={"check"+process.id}/>
          <label className="custom-control-label" htmlFor={"check"+process.id}>{process.name}</label>
        </div>
      </li>)
      })
      return(<li key={phase.id} onDragStart={(e) => addDrag(e,phase)} draggable >
        <div className="card">
            <div className="d-flex">
              <div className="custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={"check"+phase.id}/>
                <label className="custom-control-label" htmlFor={"check"+phase.id}></label>
              </div>
            <a data-toggle="collapse" aria-expanded="false" className="collapsed" href={"#decompose"+phase.id}>{phase.name}</a>
            </div>
            <div id={"decompose"+phase.id} className="collapse" data-parent={"#decompose"+phase.id}>
              <ul className="domain-list">
              {processes}
              </ul>
          </div>
        </div>  
      </li>);
    })

      return(<li key={func.id} onDragStart={(e) => addDrag(e,func)} draggable>
        <div className="card">
          <div className="d-flex">
            <div className="custom-checkbox">
              <input type="checkbox" className="custom-control-input" id={"check"+func.id}/>
              <label className="custom-control-label" htmlFor={"check"+func.id}></label>
            </div>
            <a data-toggle="collapse" aria-expanded="false" className="collapsed" href={"#decompose"+func.id}>{func.name}</a> 
          </div>
          <div id={"decompose"+func.id} className="collapse"  data-parent={"#decompose"+func.id}>
            <ul className="domain-list">
            {phases}
            </ul>
          </div>
        </div>
      </li>);
    })
  
  }
  return(<div key={compose.id} className="card">
    <div className="d-flex">
      <div className="custom-checkbox">
        <input type="checkbox" className="custom-control-input" id={"check"+compose.id}/>
        <label className="custom-control-label" htmlFor={"check"+compose.id}></label>
      </div>
      <a data-toggle="collapse" aria-expanded="false" className="collapsed" href={"#decompose"+compose.id} onClick={(e)=>getChild(compose) }>{compose.name}</a>
      </div>
      <div id={"decompose"+compose.id} className="collapse" data-parent="#decomposeaccord">
        <ul className="domain-list">
          {functions}
      </ul>
    </div>
  </div>
  )
  
  
})

let kpis = kpisControl.map((kp)=>{
  let kpi = kp.kpi.map((kpi)=>{
    let controllers = kpi.controllevers.map((controls)=>{
      return(<li key={controls.id} onDragStart={(e) => addDrag(e,controls)} draggable>    
        <div className="custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={"check"+controls.id}/>
          <label className="custom-control-label" htmlFor={"check"+controls.id}>{controls.name}</label>
        </div> 
      </li>);
    })
    return(<li key={kpi.id} onDragStart={(e) => addDrag(e,kpi)} draggable>
      <div className="card">
        <div className="d-flex">
          <div className="custom-checkbox">
            <input type="checkbox" className="custom-control-input" id={"check"+kpi.id}/>
            <label className="custom-control-label" htmlFor={"check"+kpi.id}></label>
          </div>
          <a data-toggle="collapse" aria-expanded="false" className="collapsed" href={"#kpis"+kpi.id}>{kpi.name}</a>
        </div>
          <div id={"kpis"+kpi.id} className="collapse" data-parent={"#kpis"+kpi.id}>
              <ul className="domain-list">
              {controllers}
            </ul>
          </div>
      </div>
    </li>);
  })
  return(<div key={kp.id} className="card" onDragStart={(e) => addDrag(e,kp)} draggable>
        <div className="d-flex">
          <div className="custom-checkbox">
            <input type="checkbox" className="custom-control-input" id={"check"+kp.id}/>
            <label className="custom-control-label" htmlFor={"check"+kp.id}></label>
          </div>
          <a data-toggle="collapse" aria-expanded="false" className="collapsed" href={"#kpis"+kp.id}>{kp.name}</a>
        </div>
        <div id={"kpis"+kp.id} className="collapse" data-parent="#kpisaccord">
          <ul className="domain-list">
          {kpi}
        </ul>
      </div>
    </div>);
  })
  
    
    return(
        <>
            {/* <!-- Start Left Content --> */}
            <div className="dt-left-nav-bar" id="leftaccordpanel">
                <ul className="dt-left-list">
                  <li className="border-bottom">
                    <a href="#">
                      <i className="fas fa-chevron-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" data-toggle="collapse" onClick={() => props.toggleClass()} data-target="#benchmarking">
                      <img src={ require('../../common/images/icon-1.png') } alt=""/>
                    </a></li>
                  <li>
                    <a href="#" data-toggle="collapse" onClick={() => props.toggleClass()} data-target="#decomposition">
                      <img src={ require('../../common/images/icon-2.png') }alt=""/>
                    </a>
                  </li>
                  <li>
                    <a href="#" data-toggle="collapse" onClick={() => props.toggleClass()} data-target="#kpiscontrolsWrap">
                      <img src={ require('../../common/images/icon-3.png') } alt=""/>
                    </a>
                  </li>
                  
                  <li>
                    <a href="#" data-toggle="collapse" onClick={() => props.toggleClass()} data-target="#help">
                      <img src={ require('../../common/images/icon-5.png') } alt=""/>
                    </a>
                  </li>
                  <li>
                    <a href="#" data-toggle="collapse" onClick={() => props.toggleClass()} data-target="#stakeholders">
                      <img src={ require('../../common/images/icon-7.png')} alt=""/>
                    </a>
                  </li>
                  

                </ul>
                <div className="active-left-panel collapse" id="benchmarking" data-parent="#leftaccordpanel">
                  <div className="mb-4 pr-2">
                    <button type="button" className="close" onClick={() => props.closePanel()} data-target="#benchmarking" data-toggle="collapse">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="search-area">
                    <div className="form-group has-search">
                    <input type="text" className="form-control" placeholder="" name="benchmarking" onChange={(e) => filterProject(e,'benchmarking')} />
                      <span className="fa fa-search form-control-feedback"></span>
                    </div>
                  </div>
                  <h2>Benchmarking Projects</h2>

                  <div id="benchmarkingaccord" className="benchmarking-list w-267" >
                     {projects}
                  </div>

                </div>
                <div className="active-left-panel collapse" id="decomposition" data-parent="#leftaccordpanel">
                  <div className="mb-4 pr-2">
                    <button type="button" className="close" onClick={() => props.closePanel()} data-target="#decomposition" data-toggle="collapse">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="search-area">
                    <div className="form-group has-search">
                    <input type="text" className="form-control" placeholder="" name="decomposition" onChange={(e) => filterProject(e,'decomposition')} />
                      <span className="fa fa-search form-control-feedback"></span>
                    </div>
                  </div>
                  <h2>Decomposition Projects</h2>

                  <div id="decomposeaccord" className="benchmarking-list w-267">
                     {decomposeProjects}
                  </div>

                </div>
                <div className="active-left-panel collapse" id="kpiscontrolsWrap" data-parent="#leftaccordpanel">
                  <div className="mb-4 pr-2">
                    <button type="button" className="close" onClick={() => props.closePanel()} data-target="#kpiscontrolsWrap" data-toggle="collapse">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="search-area">
                    <div className="form-group has-search">
                    <input type="text" className="form-control" placeholder="" name="kpiscontrolsWrap" onChange={(e) => filterProject(e,'kpis')}/>
                      <span className="fa fa-search form-control-feedback"></span>
                    </div>
                  </div>
                  <h2>KPI Control Levers</h2>

                  <div id="kpisaccord" className="benchmarking-list w-267">
                     {kpis}
                  </div>

                </div>
                <div className="active-left-panel collapse" id="help" data-parent="#leftaccordpanel">
                  <div className="mb-4 pr-2">
                    <button type="button" className="close" onClick={() => props.closePanel()} data-target="#help" data-toggle="collapse">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  
                  <div className="search-area">
                    <div className="form-group has-search">
                      <input type="text" className="form-control" placeholder=""/>
                      <span className="fa fa-search form-control-feedback"></span>
                    </div>
                  </div>
                  <h2>Help</h2>
                  <div className="w-267">
                    <p>1. A structured approach to planning design-led strategy and innovation. You can use this to
                      set
                      up
                      a Design Thinking Project from planning to prototype.</p>
                    <p> 2. Create EPIC and associate Benchmarking, Capability Modeling, KPIs scenarios. Or create new.
                      You can add multiple EPICs</p>
                    <p> 3. Add Sub Epics and associate Benchmarking, Capability Modeling, KPIs scenarios.</p>
                    <p> 4. Associate or Create new Network of Influence template.</p>
                    <p> 5. Click on BUILD to get started with Design Thinking process.</p>
                  </div>
                </div>

                <div className="active-left-panel collapse" id="stakeholders" data-parent="#leftaccordpanel">
                  <div className="mb-4 pr-2">
                    <button type="button" className="close" onClick={() => props.closePanel()} data-target="#stakeholders" data-toggle="collapse">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="search-box">
                    <div className="search-area">
                      <div className="form-group has-search m-0">
                          <input type="text" className="form-control" value={props.searchTerm} onChange={(e) => props.searchStakeholdersLeftSidebar(e)} placeholder=""/>
                          <span className="fa fa-search form-control-feedback"></span>
                      </div>
                    </div>
                    <div className="scrollmedia">
                      {StackHolderLists}
                    </div>
                  </div>

                  {/* <h2>Select Stakeholder</h2>
                  <div className="w-267">

                  </div> */}
                </div>

              </div>
              {/* <!-- End Left Content --> */}
        </>
    );
}

const mapStateToProps = state => ({
  benchmarkingProject : state.epicScreenData.benchmarkingProjects,
  decompositionProject: state.epicScreenData.decompositionProjects, 
  kpisControl: state.epicScreenData.kpiscontrols,

})

export default connect(mapStateToProps)(EmpathyScreenLeftSidebar);