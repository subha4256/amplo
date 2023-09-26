import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
const EmpathyModalPopupAudio = props => {   
    return(
        <>
            <div className="modal modeling-modal" id="EmpathyModalPopupAudio">                
                <div className="modal-dialog modal-dialog-centered">                    
                    <div className="modal-content">
                        <div className="modal-header pb-0">
                            <h5>Upload Audio</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body pt-0">
                                <div class="form-group">
                                    <label>Upload audio <span class="text-danger">*</span></label>
                                    <Input readOnly onChange={props.getAudio} className="form-control"  type="file" name="uploadAudio"  />  
                                </div>                               
                       </div>
                    <div className="modal-footer pt-0">                       
                        <button type="button" class="btn btn-primary ml-3"  data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary ml-3"  data-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default EmpathyModalPopupAudio;