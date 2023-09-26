import React from 'react';

const DesignThinkingPrototypeLeftBar = props => {
    return(
        <div className="dt-left-nav-bar" id="leftaccordpanel">
            <ul className="dt-left-list">
                <li className="border-bottom">
                    <a href="#" data-toggle="collapse" data-target="#draw">
                        <i className="fas fa-chevron-right"></i>
                    </a>
                </li>
                <li>
                    <a href="#" className="">
                        <img src={require('../../common/images/icon-1.png')} alt="" />
                    </a>
                </li>
                <li>
                    <a href="#" className="">
                        <img src={require('../../common/images/icon-2.png')} alt="" />
                    </a>
                </li>
                <li>
                    <a href="#" className="">
                        <img src={require('../../common/images/icon-3.png')} alt="" />
                    </a>
                </li>
                <li>
                    <a href="#" data-toggle="collapse" data-target="#draw">
                        <img src={require('../../common/images/icon-6.png')} alt="" />
                    </a>
                </li>
                <li>
                    <a href="#" className="">
                        <img src={require('../../common/images/icon-7.png')} alt="" />
                    </a>
                </li>
                <li>
                    <a href="#" className="">
                        <img src={require('../../common/images/icon-4.png')} alt="" />
                    </a>
                </li>
                <li>
                    <a href="#" data-toggle="collapse" data-target="#help">
                        <img src={require('../../common/images/icon-5.png')} alt="" />
                    </a>
                </li>
            </ul>
            <div className="active-left-panel collapse" id="help" data-parent="#leftaccordpanel">
                <div className="search-area">
                    <div className="form-group has-search">
                        <input type="text" className="form-control" placeholder="" />
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
            <div className="active-left-panel collapse" id="draw" data-parent="#leftaccordpanel">
                <div className="search-area">
                </div>
                <h2>Draw</h2>
                <div className="w-267 px-3 draw-list">
                    <a className="draw-link mb-3" data-toggle="collapse" href="#standard">
                        Standard
                    </a>
                    <div className="collapse show" id="standard">
                        <ul className="list-inline">
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'arrow')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon1.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'line')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon2.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'text')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon3.png')} alt="" /></li>
                        </ul>
                    </div>
                    <a className="draw-link mb-3" data-toggle="collapse" href="#shapes">
                        Shapes
                    </a>
                    <div className="collapse show" id="shapes">
                        <ul className="list-inline">
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'rectangle')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon4.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'square')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon5.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'circle')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon6.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'pentagon')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon7.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'hexagon')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon8.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'star')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon9.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'diamond')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon10.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'triangle')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon11.png')} alt="" /></li>
                        </ul>
                    </div>
                    <a className="draw-link mb-3" data-toggle="collapse" href="#postid">
                        Post ids
                    </a>
                    <div className="collapse show" id="postid">
                        <ul className="list-inline">
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'postIds', 'boxyellow')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon12.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'postIds', 'boxblue')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon13.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'postIds', 'boxgreen')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon14.png')} alt="" /></li>
                            <li className="list-inline-item" draggable onDragStart={(e)=>props.shapeDragStartHandler(e, 'postIds', 'boxorange')}><img style={{pointerEvents : "none"}} src={require('../../common/images/epic-icon15.png')} alt="" /></li>
                        </ul>
                    </div>
                    <a className="draw-link mb-3" data-toggle="collapse" href="#imgvdo">
                        Images & Videos
                    </a>
                    <div className="collapse show" id="imgvdo">
                        <ul className="list-inline">
                            <li className="list-item" style={{width : "125px"}}><a href="#!" data-toggle="modal" data-target="#addImage">Add Image</a></li>
                            <li className="list-item" style={{width : "125px"}}><a href="#!" data-toggle="modal" data-target="#addVideo">Add Video</a></li>
                            <li className="list-item" style={{width : "125px"}}><a href="#!" data-toggle="modal" data-target="#addAudio">Add Audio</a></li>                           
                        </ul>
                    </div>
                    <a className="draw-link mb-3" data-toggle="collapse" href="#devices">
                        Devices
                    </a>
                    <a className="draw-link mb-3" data-toggle="collapse" href="#research">
                        Research 
                    </a>
                    <a className="draw-link mb-3" data-toggle="collapse" href="#diagrams">
                        Diagrams & Flowcharts 
                    </a>
                    <a className="draw-link" data-toggle="collapse" href="#symbols">
                        Symbols
                    </a>
                </div>
            </div>
        </div>
    )
}

export default DesignThinkingPrototypeLeftBar;