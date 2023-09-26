import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

const EmpathyMapModellingPopup = props => {   
    const { selectedStackHolderForEmpathyMap, isUpdateing, newlyAddedFixedSectionItems } = props;
    const id = selectedStackHolderForEmpathyMap;
    return(
        <>
        {
            props.StackHolderEmpathyMap.map((data,ind) => (
                data.Sections.map((key,value)=>(
                    <div className="modal-overlay" 
                        id={ key.SectionCategoryTitle == "Thoughts & Feelings" ? `thoughtsAndFeelingsModal${ind}`:`${key.SectionCategoryTitle}Modal${ind}`}>
                        <div className="popup">
                            <div className="float-left">
                                <a className="close" href="#">&times;</a>
                            </div>
                            <div className="content">
                                <div className="text-left">
                                    <h2>{key.SectionCategoryTitle}</h2>
                                </div>
                                <form className="form">
                                    <div className="formscroll">
                                    {
                                        newlyAddedFixedSectionItems.length > 0 &&
                                        <div className="accordion" id="accordionExample">
                                            <div className="card">
                                                {
                                                    newlyAddedFixedSectionItems.map((item,i) =>(
                                                        <>
                                                        <div className="card-header" id="headingOne">
                                                            <h2 className="mb-0">
                                                                <a 
                                                                    className="btn btn-link" 
                                                                    type="button" 
                                                                    data-toggle="collapse" 
                                                                    href={"#collapseOne"+i}
                                                                    aria-expanded="true" 
                                                                    aria-controls="collapseOne"
                                                                >
                                                                    {item.MappingText}
                                                                </a>
                                                            </h2>
                                                        </div>
        
                                                        <div 
                                                            id={"collapseOne"+i} 
                                                            className="collapse" 
                                                            aria-labelledby="headingOne" 
                                                            data-parent="#accordionExample"
                                                        >
                                                            <div className="card-body">
                                                                <textarea 
                                                                    className="form-control" 
                                                                    placeholder=""
                                                                    value={item.MappingDetailsText}
                                                                    onChange={(e) => props.onFixedSectionStateChange(e)}
                                                                >
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                        </>
                                                    ))
                                                }
    
                                            </div>
                                        </div>
                                    }
                                    
                                    <textarea   
                                        className="form-control" 
                                        placeholder=""
                                        value={props.fixedSectionState}
                                        onChange={(e) => props.onFixedSectionStateChange(e)}
                                    ></textarea>
                                    
                                    {/* <Editor
                                        editorState={props.fixedSectionState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={() => props.onFixedSectionStateChange()}
                                    /> */}
    
                                    {
                                        !isUpdateing &&
                                        <div className="form-group text-left">
                                            <a onClick={() => props.addAnother(ind,value)}>+ Add Another</a>
                                        </div>
                                    }
                                    
                                </div>
                                    <div className="form-group mb-0 text-right">
                                        <a href="#" onClick={() => props.clearAllText()}>Cancel</a> | 
                                        {
                                            isUpdateing ?
                                            <a href="#" onClick={() => props.doUpdateText(ind,value)}>Update</a>
                                            :
                                            <a href="#" onClick={() => props.doSaveText(ind,value)}>Save</a>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ))
            ))
                
            
        }
    </>
    );
}

export default EmpathyMapModellingPopup;