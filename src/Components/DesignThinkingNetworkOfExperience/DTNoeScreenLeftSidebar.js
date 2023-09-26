import React,{Fragment, useState} from 'react';
 const DTNoeScreenTopbar = props => {
     return(
         <>
            <div className="dt-left-nav-bar" id="leftaccordpanel">
                                <ul className="dt-left-list">
                                    <li className="border-bottom">
                                        <a href="#" data-toggle="collapse" data-target="#benchmarking">
                                            <i className="fas fa-chevron-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="">
                                            <img src={require("../../common/images/icon-1.png")} alt=""/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="">
                                            <img src={require("../../common/images/icon-2.png")} alt=""/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="">
                                            <img src={require("../../common/images/icon-3.png")} alt=""/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" data-toggle="collapse" data-target="#draw">
                                            <img src={require("../../common/images/icon-6.png")} alt=""/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="">
                                            <img src={require("../../common/images/icon-7.png")} alt=""/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="">
                                            <img src={require("../../common/images/icon-4.png")} alt=""/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" data-toggle="collapse" data-target="#help">
                                            <img src={require("../../common/images/icon-5.png")} alt=""/>
                                        </a>
                                    </li>


                                </ul>
                                <div className="active-left-panel collapse" id="benchmarking" data-parent="#leftaccordpanel">
                                    <div className="search-area">
                                        <div className="form-group has-search">
                                            <input type="text" className="form-control" placeholder=""/>
                                            <span className="fa fa-search form-control-feedback"></span>
                                        </div>
                                    </div>
                                    <h2>Benchmarking Projects</h2>

                                    <div id="benchmarkingaccord" className="benchmarking-list w-267">
                                        <div className="card">
                                            <div className="d-flex">
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="check1"/>
                                                    <label className="custom-control-label" for="check1"></label>
                                                </div>
                                                <a data-toggle="collapse" href="#benchmarking1">Benchmarking Project 1</a>
                                            </div>
                                            <div id="benchmarking1" className="collapse show" data-parent="#benchmarkingaccord">
                                                <ul className="domain-list">
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain1"/>
                                                            <label className="custom-control-label" for="domain1">Domain 1</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain2"/>
                                                            <label className="custom-control-label" for="domain2">Domain 2</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain3"/>
                                                            <label className="custom-control-label" for="domain3">Domain 3</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain4"/>
                                                            <label className="custom-control-label" for="domain4">Domain 4</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain5"/>
                                                            <label className="custom-control-label" for="domain5">Domain 5</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain6"/>
                                                            <label className="custom-control-label" for="domain6">Domain 6</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="d-flex">
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="check2" />
                                                    <label className="custom-control-label" for="check2"></label>
                                                </div>
                                                <a data-toggle="collapse" href="#benchmarking2">Benchmarking Project 2</a>
                                            </div>
                                            <div id="benchmarking2" className="collapse" data-parent="#benchmarkingaccord">
                                                <ul className="domain-list">
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain1-a" />
                                                            <label className="custom-control-label" for="domain1-a">Domain 1</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain2-a" />
                                                            <label className="custom-control-label" for="domain2">Domain 2-a</label>
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="d-flex">
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="check3" />
                                                    <label className="custom-control-label" for="check3"></label>
                                                </div>
                                                <a data-toggle="collapse" href="#benchmarking3">Benchmarking Project 3</a>
                                            </div>
                                            <div id="benchmarking3" className="collapse" data-parent="#benchmarkingaccord">
                                                <ul className="domain-list">
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain1-b" />
                                                            <label className="custom-control-label" for="domain1-b">Domain 1</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="domain2-b" />
                                                            <label className="custom-control-label" for="domain2-b">Domain 2</label>
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="active-left-panel collapse" id="help" data-parent="#leftaccordpanel">
                                    <div className="search-area">
                                        <div className="form-group has-search">
                                            <input type="text" className="form-control" placeholder=""/>
                                            <span className="fa fa-search form-control-feedback"></span>
                                        </div>
                                    </div>
                                    <h2>Help</h2>
                                    <div className="w-267">
                                        <p>1. A structured approach to planning design-led strategy and innovation. You can use this to set up a Design Thinking Project from planning to prototype.</p>
                                        <p> 2. Create EPIC and associate Benchmarking, Capability Modeling, KPIs scenarios. Or create new. You can add multiple EPICs</p>
                                        <p> 3. Add Sub Epics and associate Benchmarking, Capability Modeling, KPIs scenarios.</p>
                                        <p> 4. Associate or Create new Network of Influence template.</p>
                                        <p> 5. Click on BUILD to get started with Design Thinking process.</p>
                                    </div>
                                </div>
                                <div className="active-left-panel collapse" id="draw" data-parent="#leftaccordpanel">
                                    <div className="search-area">
                                        <div className="form-group has-search">
                                            <input type="text" className="form-control" placeholder=""/>
                                            <span className="fa fa-search form-control-feedback"></span>
                                        </div>
                                    </div>
                                    <h2>Draw</h2>
                                    <div className="w-267 px-3 draw-list">
                                        <a className="draw-link" data-toggle="collapse" href="#standard">
                      Standard
                    </a>
                                        <div className="collapse show" id="standard">
                                            <ul className="list-inline">
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon1.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon2.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon3.png")} alt=""/></li>
                                            </ul>
                                        </div>

                                        <a className="draw-link" data-toggle="collapse" href="#shapes">
                      Shapes
                    </a>
                                        <div className="collapse show" id="shapes">
                                            <ul className="list-inline">
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon4.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon5.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon6.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon7.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon8.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon9.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon10.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon11.png")} alt=""/></li>
                                            </ul>
                                        </div>

                                        <a className="draw-link" data-toggle="collapse" href="#postid">
                      Post ids
                    </a>
                                        <div className="collapse show" id="postid">
                                            <ul className="list-inline">
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon12.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon13.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon14.png")} alt=""/></li>
                                                <li className="list-inline-item"><img src={require("../../common/images/epic-icon15.png")} alt=""/></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
         </>
     )
 }
 export default DTNoeScreenTopbar;