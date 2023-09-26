import React from "react";

const QuestionsBankEditDomain = props => {
    return(
        <div className="modal" id="editDomains" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header pb-0">
                        <h5 className="modal-title">Edit Domain</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Domain 1<span className="text-danger">*</span></label>
                            <div className="dropdown copydropdown">
                                <div className="dropfield dropleft">
                                    <span><i className="fas fa-times"></i>Strategy</span>
                                    <a href="#" className="dropdown-toggle float-right" data-toggle="dropdown"><i
                                            className="fas fa-bars"></i></a>
                                    <div className="dropdown-menu p-0">
                                        <div className="form-group border-bottom mb-2"><input type="text"
                                                className="form-control searchbox" placeholder="Search" /></div>
                                        <div className="disabled-date"><span>Project Name</span> <span>Disable Date</span>
                                        </div>
                                        <div className="dropheight">
                                            <div className="custom-control custom-radio ml-2 mb-2">
                                                <input type="radio" className="custom-control-input" id="project0"
                                                    name="list" />
                                                <label className="custom-control-label" htmlFor="project0">Strategy</label>
                                                <div className="d-date">2020-02-19</div>
                                            </div>
                                            <div className="custom-control custom-radio ml-2 mb-2">
                                                <input type="radio" className="custom-control-input" id="project1"
                                                    name="list" />
                                                <label className="custom-control-label" htmlFor="project1">Culture</label>
                                                <div className="d-date">2020-02-19</div>
                                            </div>
                                            <div className="custom-control custom-radio ml-2 mb-2">
                                                <input type="radio" className="custom-control-input" id="project2"
                                                    name="list" />
                                                <label className="custom-control-label" htmlFor="project2">Technology</label>
                                                <div className="d-date">2020-02-19</div>
                                            </div>
                                            <div className="custom-control custom-radio ml-2 mb-2">
                                                <input type="radio" className="custom-control-input" id="project3"
                                                    name="list" />
                                                <label className="custom-control-label" htmlFor="project3">Knowledge
                                                    Curation</label>
                                                <div className="d-date">2020-02-19</div>
                                            </div>
                                            <div className="custom-control custom-radio ml-2 mb-2">
                                                <input type="radio" className="custom-control-input" id="project4"
                                                    name="list" />
                                                <label className="custom-control-label" htmlFor="project4">Process</label>
                                                <div className="d-date">2020-02-19</div>
                                            </div>
                                            <div className="custom-control custom-radio ml-2 mb-2">
                                                <input type="radio" className="custom-control-input" id="project5"
                                                    name="list" />
                                                <label className="custom-control-label" htmlFor="project5">Performance
                                                    Measurement</label>
                                                <div className="d-date">2020-02-19</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Domain 2<span className="text-danger">*</span></label>
                            <div className="dropdown copydropdown">
                                <div className="dropfield dropleft">
                                    <span><i className="fas fa-times"></i>Culture</span>
                                    <a href="#" className="dropdown-toggle float-right" data-toggle="dropdown"><i
                                            className="fas fa-bars"></i></a>

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Domain 3<span className="text-danger">*</span></label>
                            <div className="dropdown copydropdown">
                                <div className="dropfield dropleft">
                                    <span><i className="fas fa-times"></i>Technology</span>
                                    <a href="#" className="dropdown-toggle float-right" data-toggle="dropdown"><i
                                            className="fas fa-bars"></i></a>

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Domain 3<span className="text-danger">*</span></label>
                            <div className="dropdown copydropdown">
                                <div className="dropfield dropleft">
                                    <span><i className="fas fa-times"></i>Knowledge Curation</span>
                                    <a href="#" className="dropdown-toggle float-right" data-toggle="dropdown"><i
                                            className="fas fa-bars"></i></a>

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Domain 5<span className="text-danger">*</span></label>
                            <div className="dropdown copydropdown">
                                <div className="dropfield dropleft">
                                    <span><i className="fas fa-times"></i>Process</span>
                                    <a href="#" className="dropdown-toggle float-right" data-toggle="dropdown"><i
                                            className="fas fa-bars"></i></a>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="javascript:void(0)" data-dismiss="modal">Cancel</a>
                            <button type="button" className="btn btn-primary ml-3">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionsBankEditDomain;