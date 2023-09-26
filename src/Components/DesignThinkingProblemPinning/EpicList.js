import React from 'react';

const EpicList = (props) => {
    let subEpics = null;
    if(Object.keys(props.epics).length > 0) {
        subEpics = props.epics.EPic[0].SubEpic.map(subEpic => {
            return(
                <div className={props.generateIdeas && subEpic.id === props.selectedSubEpic.id ? "card mb-3 active": "card mb-3" } onDragStart={(e) => props.addDrag(e, subEpic)} draggable onClick={props.handleSubEpicClick.bind(this, subEpic)}>
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
        })
    }
    return (
        <>
            <div className="card-header d-md-flex justify-content-between align-items-center">
                <h3>EPIC & SUB EPICS</h3>
                </div>
                <div className="card-body">
                {Object.keys(props.epics).length && !props.generateIdeas ? 
                    <div className="card active mb-3">
                        <div className="card-body">
                        <h5 className="card-title">
                            {props.epics.EPic[0].name}
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
                            <p>Added: <span>{props.epics.EPic[0].Association.length} Scenarios</span></p>
                            <p>Updated 1 day ago</p>
                        </div>

                        </div>
                    </div>: null}
                <div className="subEpisWrapper">
                    {subEpics}
                </div>
                </div>
        </>
    )
}

export default EpicList;