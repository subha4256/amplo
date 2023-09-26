import React from 'react';

const EpicBreakDown = (props) => {
    let benchmarkProjectRows = [];
    let cmProjectRows = [];
    let kpiProjectRows = [];
    if(Object.keys(props.epics).length) {
        for(let i in props.epics.EPic[0].Association) {
            if(props.epics.EPic[0].Association[i].type === 'BenchmarkingProjects') {
                benchmarkProjectRows.push(<tr>
                    <td>{props.epics.EPic[0].Association[i].name}</td>
                    <td class="text-right">
                        <button type="button" class="btn btn-green">{props.epics.EPic[0].Association[i].score}</button>
                    </td>
                </tr>)
            }else if(props.epics.EPic[0].Association[i].type === 'CapabilityModellingProjects') {
                cmProjectRows.push(<tr>
                    <td>{props.epics.EPic[0].Association[i].name}</td>
                    <td class="text-right">
                        <button type="button" class="btn btn-green">{props.epics.EPic[0].Association[i].score}</button>
                    </td>
                </tr>)
            }else if(props.epics.EPic[0].Association[i].type === 'Kpis') {
                kpiProjectRows.push(<tr>
                    <td>{props.epics.EPic[0].Association[i].name}</td>
                    <td class="text-right">
                        <button type="button" class="btn btn-green">{props.epics.EPic[0].Association[i].score}</button>
                    </td>
                </tr>)
            }
        }
    }
    return (
        <div className="row generate-ideas-row">
            <div className="col-sm-12 col-md-12">

            <div className="card idealeft ideascard mt-2">
                <div className="card-header epic-header">
                <a href="#">Problem Pinning</a> <a href="#">Customer Journey Map</a> <a href="#">Persona</a>
                </div>
                <div className="card-body">
                <div className="bg-white epic-details-row mt-2 mb-4">
                    <div className="epic-col-wraper">
                    <div className="row mb-2">
                        <div className="col-sm-12 pl-0">
                        <h1>Epic Details</h1>
                        </div>
                    </div>
                    <div className="row border-top">
                        <div className="col-sm-12 col-md-2 bg-yellow align-items-center py-3">
                        <h2>EPIC</h2>
                        </div>
                        <div className="col-sm-12 col-md-10 align-items-center py-3">
                        <p>{Object.keys(props.epics).length ? props.epics.EPic[0].EpicOrSubEpic : ''}</p>
                        </div>
                    </div>
                    <div className="row border-top">
                        <div className="col-sm-12 col-md-2 bg-green align-items-center py-3">
                        <h2>Goal</h2>
                        </div>
                        <div className="col-sm-12 col-md-10 align-items-center py-3 bg-gray">
                        <p>{Object.keys(props.epics).length ? props.epics.EPic[0].Goal : ''}</p>
                        </div>
                    </div>
                    <div className="row border-top">
                        <div className="col-sm-12 col-md-2 bg-orange align-items-center py-3">
                        <h2>Description</h2>
                        </div>
                        <div className="col-sm-12 col-md-10 align-items-center py-3">
                        <p>{Object.keys(props.epics).length ? props.epics.EPic[0].Description : ''}</p>
                        </div>
                    </div>
                    <div className="row border-top border-bottom">
                        <div className="col-sm-12 col-md-2 bg-lightblue align-items-center py-3">
                        <h2>NOI</h2>
                        </div>
                        <div className="col-sm-12 col-md-10 align-items-center py-3 bg-gray">
                        <p><a href="#">{Object.keys(props.epics).length ? props.epics.EPic[0].NOI ? props.epics.EPic[0].NOI.TemplateNoiName : '' : ''}</a></p>
                        </div>
                    </div>
                    </div>
                    <div className="benchmarking-col-wraper">
                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                        <h3>Benchmarking Projects

                            <div className="dropdown float-right dropleft">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                <i className="fas fa-ellipsis-h"></i>
                            </a>
                            <div className="dropdown-menu">
                                
                                <a className="dropdown-item" href="#">Benchmarking Project 2</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Benchmarking Project 3</a>
                            </div>
                            </div>
                        </h3>
                        <div className="table-responsive">
                            <table className="table table-bordered bench-mark-table">
                            <tbody>
                                {benchmarkProjectRows}
                            </tbody>
                            </table>
                        </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                        <h3>Capability Modeling Projects

                            <div className="dropdown float-right dropleft">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                <i className="fas fa-ellipsis-h"></i>
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Capability Modeling 1</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Capability Modeling 2</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Capability Modeling 3</a>
                            </div>
                            </div>
                        </h3>
                        <div className="table-responsive">
                            <table className="table table-bordered bench-mark-table">
                            <tbody>
                                {cmProjectRows}
                            </tbody>
                            </table>
                        </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                        <h3>KPIs

                            <div className="dropdown float-right dropleft">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                <i className="fas fa-ellipsis-h"></i>
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Add KPI(s)</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">New KPI(s)</a>
                            </div>
                            </div>
                        </h3>
                        <div className="table-responsive">
                            <table className="table table-bordered bench-mark-table">
                            <tbody>
                                {kpiProjectRows}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                </div>
            </div>

            </div>
        </div>
    )
}

export default EpicBreakDown;