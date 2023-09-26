import React from 'react';
import {Input} from "reactstrap";

const balancedScorecardLeftbar = props => {
    let kpiCounter = 1;
    let kpiLeftData = "";
    let categoriesLeftData = "";
    if(props.categoriesData){
        categoriesLeftData = props.categoriesData.map(category=>{
            return(
                <li key={"cat_li_"+category.Id}>
                    <div className="custom-checkbox">
                        <Input type="checkbox" checked={(category.CheckStatus==0?false:true)} className="custom-control-input" id={"cat_"+category.Id} name="categories" onClick={(e)=>props.addRowsHandler(e,category.Id)} />
                        <label htmlFor={"cat_"+category.Id} className="custom-control-label" style={{backgroundColor : "white"}} >{category.Name}</label>
                    </div>
                </li>
            )
        })
    }
    if(props.kpiData){
        kpiLeftData = props.kpiData.map((kpiSet)=>{
            let set = kpiSet.KPI.map((kpi,key)=>{
                // let controlLever = "";
                // if(kpi.ControlLevers[0].KPIControlLeversID != null){
                //     controlLever = kpi.ControlLevers.map((cL)=>{
                        
                //     })
                // }
                console.log("kpi.ControlLevers[0].CheckStatus",kpi.ControlLevers[0].CheckStatus);
                return(
                    <li key={key} disabled={true}>
                        <div style={{pointerEvents:"none"}}>
                            <Input type="checkbox" checked={(kpi.ControlLevers[0].CheckStatus==0?false:true)}/>
                            <label id={kpi.KPIID} style={{backgroundColor : "white"}}  onDragEnd={(e)=>props.kpiDropHandler(e,kpi.Target)} onDragStart={()=>props.kpiDragStartHandler()} draggable={true}  >{kpi.KPITitle}</label>
                        </div>
                    </li>
                )
            })
            kpiCounter++;
            let curr_count = ""+kpiCounter-1;
            let href = "#benchmarking"+curr_count;
            let id = "benchmarking"+curr_count;
            return(
                <div className="card" key={kpiSet.KPISetID}>
                    <div className="d-flex">
                        <div >
                            <label></label>
                        </div>
                        <a data-toggle="collapse" href={href}  style={{backgroundColor : "white"}}>{kpiSet.KPISetTitle}</a>
                    </div>
                    <div id={id} className="collapse show" data-parent="#benchmarkingaccord">
                        <ul className="domain-list" id={kpiSet.KPISetID}>
                            {set}
                        </ul>
                    </div>
                </div>
            )
        })
    }
    
    return(
        <>
            {/* <!-- Start Left Content --> */}
            <div className="dt-left-nav-bar" id="leftaccordpanel">
                <ul className="dt-left-list">
                <li className="border-bottom" style={{pointerEvents:"none"}}>
                        <a href="#" data-toggle="collapse" data-target="#categories">
                            <img src={ require('../../common/images/icon-4.png') } alt="" />
                        </a>
                    </li>
                    <li className="border-bottom">
                        <a href="#" data-toggle="collapse" data-target="#benchmarking">
                            <img src={ require('../../common/images/icon-3.png') } alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="#" data-toggle="collapse" data-target="#draw">
                            <img src={ require('../../common/images/icon-6.png') } alt="" />
                        </a>
                    </li>
                </ul>
                <div className="active-left-panel collapse" id="benchmarking" data-parent="#leftaccordpanel">
                <div className="">
                    <button type="button" className="close" data-target="#benchmarking" data-toggle="collapse">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div className="search-area mt-4">
                    <div className="form-group has-search" >
                      <input type="text" className="form-control searchKpi" placeholder="" name="searchKpi" onChange={(e) => props.handleKpiSearch(e)} style={{marginLeft : 0}} />
                      <span className="fa fa-search form-control-feedback"></span>
                    </div>
                </div>
                </div>
                    <h2 style={{backgroundColor : "white"}}>KPI</h2>
                    <div id="benchmarkingaccord" className="benchmarking-list w-267">
                        {kpiLeftData}
                    </div>
                </div>
                <div className="active-left-panel collapse" id="categories" data-parent="#leftaccordpanel">
                <div className="mb-4">
                    <button type="button" className="close" data-target="#categories" data-toggle="collapse">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                    <h2 style={{backgroundColor : "white"}}>Categories</h2>
                    <div id="categoriesaccord" className="benchmarking-list w-267">
                    <div className="card">
                        <div className="d-flex">
                            <div>
                                <label></label>
                            </div>
                            <a data-toggle="collapse" href="#categories1" style={{backgroundColor : "white"}}>Global Business Initiative Categories</a>
                        </div>
                        <div id="categories1" className="collapse show" data-parent="#benchmarkingaccord">
                            <ul className="domain-list">
                                {categoriesLeftData}
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="active-left-panel collapse" id="draw" data-parent="#leftaccordpanel">
                <div className="mb-4">
                    <button type="button" className="close" data-target="#draw" data-toggle="collapse">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <h2 style={{backgroundColor : "white"}}>Draw</h2>
                <div className="w-267 px-3 draw-list">
                    <a className="draw-link" data-toggle="collapse" href="#postid" style={{backgroundColor : "white"}}>
                      Strategic Objectives
                    </a>
                    <div className="collapse show" id="postid">
                        <ul className="list-inline">
                            <li id="yellow" className="list-inline-item" onClick={e=>props.ovalColorChangeHandler(e)} draggable={true} onDragEnd={e=>props.createOvalOnDrop(e)}>
                                <span className={(props.color === "yellow")?"active sm-oval bg-yellow":"sm-oval bg-yellow"} style={{pointerEvents:"none"}}></span>
                            </li>
                            <li id="blue" className="list-inline-item" onClick={e=>props.ovalColorChangeHandler(e)} draggable={true} onDragEnd={e=>props.createOvalOnDrop(e)}>
                                <span className={(props.color === "blue")?"active sm-oval bg-blue":"sm-oval bg-blue"} style={{pointerEvents:"none"}}></span>
                            </li>
                            <li id="green" className="list-inline-item" onClick={e=>props.ovalColorChangeHandler(e)} draggable={true} onDragEnd={e=>props.createOvalOnDrop(e)}>
                                <span className={(props.color === "green")?"active sm-oval bg-green":"sm-oval bg-green"} style={{pointerEvents:"none"}}></span>
                            </li>
                            <li id="orange" className="list-inline-item" onClick={e=>props.ovalColorChangeHandler(e)} draggable={true} onDragEnd={e=>props.createOvalOnDrop(e)}>
                                <span className={(props.color === "orange")?"active sm-oval bg-orange":"sm-oval bg-orange"} style={{pointerEvents:"none"}}></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            {/* <!-- End Left Content --> */}
        </>
    )
}

export default balancedScorecardLeftbar;