import React from 'react';

const DesignThinkingManageStakeholdersTeamsType = (props) => {
    return(
        <div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Name<span className="text-danger">*</span> </label>
                    <input type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-sm-6">
                    <label>Pupose  <span className="text-danger"></span></label>
                    <input type="text" className="form-control" placeholder="" />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Team Manager<span className="text-danger">*</span> </label>
                    <select type="text" className="form-control">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className="col-sm-6">
                    <label>Thumbnail  <span className="text-danger"></span></label>
                    <input type="file" className="form-control" placeholder="" />
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-sm-12 col-md-4 col-lg-4">
                    <h3 class="mb-3"> Enterprise Users(4)</h3>
                    <div class="select-all">
                        <input type="checkbox" name="" /> Select All
                    </div>
                    <div class="box-1 pd-0-box">
                        <ul class="list-group">
                            <li class="list-group-item" draggable="true"><input type="checkbox" class="left-check-box" id="user-select-1015" value="1015"/><label class="dragLabel" for="user-select-1015">Andrew J</label></li>
                            <li class="list-group-item" draggable="true"><input type="checkbox" class="left-check-box" id="user-select-1016" value="1016"/><label class="dragLabel" for="user-select-1016">David Johnson</label></li>
                            <li class="list-group-item" draggable="true"><input type="checkbox" class="left-check-box" id="user-select-1018" value="1018"/><label class="dragLabel" for="user-select-1018">Martin D</label></li>
                            <li class="list-group-item" draggable="true"><input type="checkbox" class="left-check-box" id="user-select-1082" value="1082"/><label class="dragLabel" for="user-select-1082">steven amplo</label></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-1 text-center user-pt">
                    <div class="box-2">
                        <button type="button" class="btn btn-light mb-3">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <button type="button" class="btn btn-light mb-3">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 user-pl">
                    <h3 class="mb-3">Selected Users( 0)</h3>
                    <div class="select-all">
                        <input type="checkbox" name=""/> Select All
                    </div>
                    <div class="box-1  pd-0-box">
                        <ul class="list-group fit-list"></ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesignThinkingManageStakeholdersTeamsType;