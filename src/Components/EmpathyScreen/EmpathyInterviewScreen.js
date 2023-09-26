import React,{useEffect} from 'react';
import ContentEditable from 'react-contenteditable';

const EmpathyInterviewScreen = props => {     


// console.log("Notes_Props ==>",props)


    useEffect(() => {
        props.empathyNotesSaveBtn()
    }, []);
    let noteInd = props.selectedStakeholdersNotesForInterview.map(note=>note.stakeholderId).indexOf(props.currentStakeholderSelectedForInterview.stakeholderId)

    props.selectedStakeholdersNotesForInterview.forEach(note => note.detailInfo.length = 4
    )

// console.log("After Notes_Props ==>",props)
    

    return(
        <>
            {/* <!-- Start Body Content --> */}
            <div className="tab-pane fade show active" id="interviews">
                <div className="row">
                    <div className="col-sm-12 col-md-4 pr-0">
                        <div className="interview-left">
                            <div className="interview-row">
                                <h3>Stakeholders</h3>
                                <div className="d-flex justify-content-between epic-icon mt-4"><span>{props.selectedStakeholdersForInterview.length} Stakeholders</span>
                                    <span>
                                        <a href="#" data-toggle="modal" data-target="#addStakeholderModal"><i className="fas fa-plus" ></i></a>
                                        {/* <i className="fas fa-minus ml-1" ></i> */}
                                        {/* <i className="fas fa-plus" onClick={e => addStakeHolders(e,props)}></i>
                                        <i className="fas fa-minus ml-1" onClick={e =>removeStakeHolders(e,props)}></i> */}
                                    </span>
                                </div>
                            </div>
                            { 
                                props.selectedStakeholdersForInterview.map((item, i) => {
                                    return(<div className={item.stakeholderId == props.currentStakeholderSelectedForInterview.stakeholderId ? "interview-row interview-info active" : "interview-row interview-info"} key={"selectedStakeholder_"+item.stakeholderId} onClick={(e) => props.getEmpathyNotes(e,item)} style={{position: "relative"}}>
                                        <a onClick={()=>props.deleteStakeholderInterviewStakeholderHandler(item)} id="deleteStakeholder"><i id="deleteStakeholder" className="fas fa-minus ml-1" style={{position : "absolute",right : "6%", top: "20%"}} ></i></a>
                                        <h4>{item.name}</h4>
                                        <p>{item.type}</p>
                                        <div className="d-flex justify-content-between epic-icon">
                                            <span>{item.lastUpdated}</span>
                                            <span>
                                                <i className="fas fa-user"></i>
                                                <i className="fas fa-video ml-1"></i>
                                                <i className="fas fa-volume-up ml-1"></i>
                                            </span>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 interview-user-info-sec pb-4 pr-5">
                        <div className="interview-heading d-flex justify-content-between py-3">
                            <h2 className="pt-2">Notes</h2>
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                    Actions
                                </button>
                                <div className="dropdown-menu">
                                    <a href="javascript:void(0)" className="popup-icon" data-toggle="modal" data-target="#EmpathyModalPopup">
                                    Upload Video </a>
                                    <a href="javascript:void(0)" className="popup-icon" data-toggle="modal" data-target="#EmpathyModalPopupAudio">
                                    Upload Audio </a>
                                    <a href="javascript:void(0)" className="popup-icon" data-toggle="modal" data-target="#EmpathyModalImagePopup">
                                    Add Image </a>
                                    <a href="javascript:void(0)" onClick={() => props.addNewSection(noteInd)} className="popup-icon" data-toggle="modal" data-target="#modelingPopup12e">
                                    Add New Section </a>
                                </div>
                            </div>
                        </div>                       
                        <h2 className="mt-3">{Object.keys(props.currentStakeholderSelectedForInterview).length > 0 ? props.currentStakeholderSelectedForInterview.name : ""}</h2>
                        {
                            noteInd != -1 ? props.selectedStakeholdersNotesForInterview[noteInd].detailInfo.map((detail,i) =>(
                                <div style={{position : "relative"}}>
                                <h3 className="mt-3">
                                    <ContentEditable
                                        html={detail.title} // innerHTML of the editable div
                                        disabled={detail.title.toLowerCase() == "describe current position" || detail.title.toLowerCase() == "day in a life" || detail.title.toLowerCase() == "painpoints" || detail.title.toLowerCase() == "challenges"? true :false} // use true to disable editing
                                        onChange={(e) => props.handleEmpathyDescriptionChange(e,noteInd,i,"title")} // handle innerHTML change
                                        tagName='div' // Use a custom HTML tag (uses a div by default)
                                    />
                                </h3>
                                {detail.title.toLowerCase() == "describe current position" || detail.title.toLowerCase() == "day in a life" || detail.title.toLowerCase() == "painpoints" || detail.title.toLowerCase() == "challenges"?null:<a onClick={()=>props.deleteInterviewSection()} id="deleteStakeholder"><i id="deleteStakeholder" className="fas fa-minus ml-1" style={{position : "absolute",right : "1%", top: "0%"}} ></i></a>}
                                <div className="border-box">
                                    <ContentEditable
                                        html={detail.desc} // innerHTML of the editable div
                                        onChange={(e) => props.handleEmpathyDescriptionChange(e,noteInd,i,"desc")} // handle innerHTML change
                                        tagName='p' // Use a custom HTML tag (uses a div by default)
                                    />                                        
                                </div>
                                </div>
                            )):""
                        }
                    </div>
                </div>
                    
            </div>
        </>
    )
  
}
export default EmpathyInterviewScreen;
