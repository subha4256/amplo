import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BalancedScorecardObjectivesTarget = props => {
    let showactual = false;
    let tableRows = props.categoryRows.map((row, rowInd)=>{
        let kpis = row.Kpi.map((kpi,ind)=>{
            return(
            <div className="d-flex flex-row justify-content-between" style={props.kpiDragging ? {pointerEvents:"none"} : null}>
                <p id={kpi.KpiId} key={`kpi_${kpi.KpiId}`} className="child-kpi-drop-area">{kpi.KpiName} 
                </p>
                {(props.report==="report")?"":<div className="d-flex flex-row justify-content-between">
                    <i class="fas fa-arrow-up" style={{color : "gray"}} onClick={()=>props.moveCategoryKpi('up',ind, rowInd)}></i>
                    &nbsp;&nbsp;
                    <i class="fas fa-arrow-down" style={{color : "gray"}} onClick={()=>props.moveCategoryKpi('down',ind, rowInd)}></i>
                </div> }
            </div>);
        })
        let target = row.Kpi.map((kpi)=>{
            return(<div className="d-flex flex-row justify-content-between">
                <p key={`target_${kpi.KpiId}`} style={{pointerEvents:"none"}}>{kpi.Target}</p>
                {(props.report==="report")?"":<div className="d-flex flex-row justify-content-between">
                    <i class="fas fa-times" onClick={()=>props.kpiDeleteClickHandler(row.CategoryId,kpi.KpiId,kpi.KpiName)}></i>
                </div> }
            </div>);
        })
        let Actual = null;
        let NetResults = null;
        if(props.withActuals===true){
            if(props.withActuals===true){
                showactual = true;
                Actual = row.Kpi.map((kpi)=>{
                    return(<p key={kpi.KpiId} style={{pointerEvents:"none"}}>{kpi.Actual}</p>);
                })
                NetResults = row.Kpi.map((kpi)=>{
                    return(<p key={kpi.KpiId} className={kpi.Net.includes('Fall')?'text-danger':kpi.Net.includes('Gain')?'text-success':""} style={{pointerEvents:"none"}}>{kpi.Net}{kpi.Net.includes('Fall')?<i class="fa fa-arrow-down" aria-hidden="true"></i>:kpi.Net.includes('Gain')?<i style={{color:"#28a745"}} class="fa fa-arrow-up" aria-hidden="true"></i>:""}</p>);
                })
            }
        }
        return(
            <tr id={row.CategoryId} key={row.CategoryId} style={{height:"500px"}}>
                <td>
                    {/*{(props.report==="report")?"":<a  onClick={()=>props.deleteTableRow(row.CategoryId,row.title)} ><i className="fas fa-times"></i></a>}*/}
                    <h3 className="rowName">{row.title}</h3>
                </td>
                <td>
                <div className="oval-shape-row" id={row.CategoryId}></div>
                </td>
                {/*<td className="kpi-drop-area">{kpis}</td>
                <td>
                    {target}
                </td>*/}
                {(props.withActuals===true)?<td>
                    {Actual}
                </td>:null}
                {(props.withActuals===true)?<td>
                    {NetResults}
                </td>:null}
            </tr>
        )
    })
    return(
        <>
            <div className="bg-white balanced-details-row mt-3 mb-4">
                <div className="balanced-col-wraper">
                    <div className="row mb-2">
                        {/*<div className="col-sm-12 d-flex flex-row justify-content-between">
                            <h1 className="head-title" >Objectives, KPIs & Target</h1>
                            {(props.report==="report")?"":<a href="#!" onClick={()=>props.reArrangePopUpClick()}>Re-Arrange Strategic Objectives</a>}
                        </div>*/}
                        {props.withActuals===true?<>
                        <div className="col-sm-7 d-flex align-items-center date-col">
                            <label className="pr-3"><b>From</b></label>
                            <DatePicker
                                onKeyDown={event => {
                                    event.preventDefault();
                                    return false;
                                }}
                                className="form-control border-secondary dis-date pl-3"
                                id="fromDate"
                                // minDate={new Date()}
                                onChange={props.fromDateChangeHandler}
                                dateFormat="dd/MM/yyyy"
                                selected={props.selectedFromDate}
                            />
                            <label className="px-2"><b>To</b></label>
                            <DatePicker
                                onKeyDown={event => {
                                    event.preventDefault();
                                    return false;
                                }}
                                className="form-control border-secondary dis-date pl-3"
                                id="toDate"
                                // minDate={new Date(this.state.fromDate?this.state.fromDate:'')}
                                onChange={props.toDateChangeHandler}
                                dateFormat="dd/MM/yyyy"
                                selected={props.selectedToDate}
                            /> <button type="button" className={"btn btn-primary ml-3"} onClick={()=>props.runReportHandler()}>RUN REPORT</button>
                        </div></>:""}
                    </div>
                    <div className="row" >
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped objectives-tbl">
                                <thead className="thead-dark">
                                    <tr>
                                        <th style={(props.withActuals === true)?{width : "10%"}:{width:"20%"}}>Category</th>
                                        <th style={(props.withActuals === true)?{width : "50%"}:{textAlign:"center",width:"80%"}}>Control Levers/Sub KPIs</th>
                                        {/*<th style={(props.withActuals === true)?{width : "10%"}:{}}>KPIs</th>
                                        <th style={(props.withActuals === true)?{width : "10%"}:{}}>Targets </th>*/}
                                        {(props.withActuals === true)?<th style={(props.withActuals === true)?{width : "10%"}:{}}>Actuals</th>:null}
                                        {(props.withActuals === true)?<th style={(props.withActuals === true)?{width : "10%"}:{}}>Net Results</th>:null}
                                    </tr>
                                </thead>
                                <tbody id="strategicObjectivesRows">
                                    {tableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default BalancedScorecardObjectivesTarget;