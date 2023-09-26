import React from 'react';

const decompositionCopyProject = props => {
    let projectName = props.selectedProject?props.selectedProject.ProjectName:"";
    return(
        <div className="modal modeling-modal" id="copyPopup">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header pb-0">
                        <h5>Configure Copy</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body pt-0">
                        <div className="project-tag">
                            <span>{projectName}</span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Select a Version<span className="text-danger"></span></label>
                            <select className="form-control">
                                <option>1.0</option>
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <p className="mb-3">Enable the Copy with information you will be using:</p>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="check1" onChange={()=>props.copyOptionsChangeHandler("All")} checked={(props.copyOptions.All === true)?true:false} />
                                <label className="custom-control-label" htmlFor="check1">All</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="check2" onChange={()=>props.copyOptionsChangeHandler("FunctionPhaseMatrix")} checked={(props.copyOptions.FunctionPhaseMatrix === true)?true:false} />
                                <label className="custom-control-label" htmlFor="check2">Function Phase Matrix</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="check3" onChange={()=>props.copyOptionsChangeHandler("DecompositionProcess")} checked={(props.copyOptions.DecompositionProcess === true)?true:false} />
                                <label className="custom-control-label" htmlFor="check3">Decomposition Process</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="check4" onChange={()=>props.copyOptionsChangeHandler("ProcessScoring")} checked={(props.copyOptions.ProcessScoring === true)?true:false} />
                                <label className="custom-control-label" htmlFor="check4">Process Scoring</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="check5" onChange={()=>props.copyOptionsChangeHandler("Painpoints")} checked={(props.copyOptions.Painpoints === true)?true:false} />
                                <label className="custom-control-label" htmlFor="check5">Painpoints </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer pt-0">
                        <a href="#" data-dismiss="modal">Cancel</a>
                        <a href="#" className="btn btn-primary ml-3" onClick={()=>props.copyProjectSaveHandler()}>Copy</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default decompositionCopyProject;