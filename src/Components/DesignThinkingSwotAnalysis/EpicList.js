import React from 'react';

const EpicList = (props) => {
    return (
        <>
            <div className="card-header d-md-flex justify-content-between align-items-center">
                <h3>Prioritized EPIC & SUB EPICS</h3>
                <select class="custom-select">
                    <option selected>Priority</option>
                    <option>Priority</option>
                    <option>Priority</option>
                </select>
            </div>
            <div className="card-body">
            {Object.keys(props.epics).length > 0?props.epics.EPic[0].SubEpic.map(subEpic => {
                    return(
                        <div className={subEpic.id === props.selectedSubEpic ? "card mb-3 active": "card mb-3" } onClick={props.handleSubEpicClick.bind(this, subEpic.id)}>
                            <div className="card-body">
                            <h5 className="card-title">
                                {subEpic.name}
                                <div className="dropdown float-right dropleft">
                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="fas fa-ellipsis-h"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Add Benchmarking Info</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Add CM Info</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Add KPI(s)</a>
                                </div>
                                </div>
                            </h5>
                            <div className="d-flex justify-content-between added-box">
                                <p>Added: <span>{subEpic.Association.length} Scenarios</span></p>
                                <p>Updated 1 day ago</p>
                            </div>

                            </div>
                        </div>
                    )
                }):null}
            </div>
        </>
    )
}

export default EpicList;