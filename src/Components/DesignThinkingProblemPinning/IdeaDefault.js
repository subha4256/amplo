import React from 'react';
const IdeaDefault = (props) => {
    let pins = props.prioritizedSubEpics.map((priority, key) => {
        return(<div className="pindot dot1" key={'pin-'+key} style={{position: 'absolute', left: priority.LocationX+'px', top: priority.LocationY+'px'}}>{priority.SequenceNumber}</div>);
    })
    return (
        <>
            <div className="card-header d-md-flex justify-content-between align-items-center">
                <h3>Prioritized SUB EPICS</h3>

                </div>
                <div className="card-body ideas-card">

                <div className="pinning-area">
                    <div className="pinning-left">
                    <p className="pintext txt1 text-uppercase">Easy</p>
                    <p className="pintext txt2">Ease of Implementation</p>
                    <p className="pintext txt3 text-uppercase">DIFFICULT</p>
                    </div>
                    <div className="pinning-bg">
                    <div className="pinning-box">

                    </div>
                    <div className="pinning-box">
                        <div className="pintext txt1">{props.lookups[0] ? props.lookups[0].LookUpName : ''}</div>
                        <div className="pintext txt2">{props.lookups[1] ? props.lookups[1].LookUpName : ''}</div>
                        <ul className="list-inline vote-client mb-0">
                        <li className="list-inline-item">
                            <a href="#"><img src={require('../../common/images/login_image.png')} alt=""/>
                                <i className="fas fa-thumbs-up"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#"><img src={require('../../common/images/login_image.png')} alt=""/>
                            <i className="fas fa-thumbs-up"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#"><img src={require('../../common/images/login_image.png')} alt=""/>
                            <i className="fas fa-thumbs-up"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#"><img src={require('../../common/images/login_image.png')} alt=""/>
                            <i className="fas fa-thumbs-up"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#"><img src={require('../../common/images/login_image.png')} alt=""/>
                            <i className="fas fa-thumbs-up"></i>
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="pinning-box curve4" rel={props.lookups[3] ? props.lookups[3].DtIdeatePriorityLookUpId : ''} onDragOver={(e) => e.preventDefault()} onDrop={(e) => props.onDrop(e)} droppable>
                        <div className="pintext txt1">{props.lookups[2] ? props.lookups[2].LookUpName : ''}</div>
                        <div className="pintext txt2">{props.lookups[3] ? props.lookups[3].LookUpName : ''}</div>
                    </div>
                    {pins}
                    <div className="curve1" rel={props.lookups[0] ? props.lookups[0].DtIdeatePriorityLookUpId : ''} onDragOver={(e) => e.preventDefault()} onDrop={(e) => props.onDrop(e)} droppable></div>
                    <div className="curve2" rel={props.lookups[1] ? props.lookups[1].DtIdeatePriorityLookUpId : ''} onDragOver={(e) => e.preventDefault()} onDrop={(e) => props.onDrop(e)} droppable></div>
                    <div className="curve3" rel={props.lookups[2] ? props.lookups[2].DtIdeatePriorityLookUpId : ''} onDragOver={(e) => e.preventDefault()} onDrop={(e) => props.onDrop(e)} droppable></div>
                    </div>
                    <div className="pinning-bottom">
                    <p className="pintext txt1 text-uppercase">Low</p>
                    <p className="pintext txt2">Anticipated Benefit</p>
                    <p className="pintext txt3 text-uppercase">HIGH</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IdeaDefault;