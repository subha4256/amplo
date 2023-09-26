import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
const EmpathyModalPopup = props => {   
    return(
        <>
            <div className="modal modeling-modal" id="EmpathyModalPopup">                
                <div className="modal-dialog modal-dialog-centered">                    
                    <div className="modal-content">
                        <div className="modal-header pb-0">
                            <h5>Upload Video</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body pt-0">
                                <div class="form-group">
                                    <label>Upload video <span class="text-danger">*</span></label>
                                    <Input readOnly onChange={props.getVideo} className="form-control" type="file" name="uploadVideo"  />  
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
export default EmpathyModalPopup;