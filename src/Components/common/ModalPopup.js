import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

const ModalPopup = (props) => {
  return (
    <div>
      <Modal style={props.style?props.style:{}} isOpen={props.isOpen} toggle={props.toggle} className={props.className} backdrop={props.backdrop}>
        <ModalHeader toggle={props.toggle} className={props.styleClass}>{props.title}</ModalHeader>
        <ModalBody style={props.bodyHeight == true?{height:props.bodyHeightValue?props.bodyHeightValue:"430px",overflowY:"auto"}:{}}>
          {props.children}
        </ModalBody>
        { props.footer ? (<ModalFooter>
          <Button color="primary" disabled={(props.disabled !== undefined) ? props.disabled : false} onClick={props.onSave}>{props.saveBtnTitle}</Button>{' '}
          <Button color="primary" style={{display: props.cancelButton ? "inline-block" : "none"}}disabled={(props.disabled !== undefined) ? props.disabled : false} onClick={props.onDelete}>DELETE</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>CANCEL</Button>
        </ModalFooter>) : <></>}
        {props.bscModal ? <ModalFooter><Link to={"/balanced-scorecard/"} style={{verticalAlign:"middle",marginRight:"5px"}}><i style={{fontSize:"30px"}} className="fa fa-plus-circle" aria-hidden="true"></i>Add New</Link></ModalFooter>:<></>}
      </Modal>
    </div>
  );
}

export default ModalPopup;