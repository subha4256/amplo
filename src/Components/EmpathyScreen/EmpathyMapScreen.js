import React,{useEffect} from 'react';
import ContentEditable from 'react-contenteditable';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const config = require('../../config.js');




const EmpathyMapScreen = props => {


    // console.log("Empthy Props ==>", props)


    const { StackHolderEmpathyMap,selectedStackHolderForEmpathyMap } = props;
    const id = selectedStackHolderForEmpathyMap;
    useEffect(() => {
        props.empathyMapSaveBtn()
    }, []);
    const Linkedstakeholders =  Object.keys(props.currentSelectedEmpathyMap).length > 0 ? props.currentSelectedEmpathyMap.Links.map(link=>link.StakeholderId) : []


    props.StkDescOnEmpathyMap.length = 4

    return(<>
            {/* <!-- Start Body Content --> */}
            <div className="row">
                <div className="tab-content dt-tab-content w-100">
                    <div className="tab-pane fade show active" id="empathymap">
                        <div className="row">

                            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 pr-lg-0">

                                <div className="interview-left empathymap-left d-flex">
                                    
                                    {/* First Panel */}
                                    <div className="empathymap-tab">
                                        <ul className="nav">
                                            {
                                                props.selectedStakeholdersForInterview.map((item,i) => (
                                                    
                                                    // item.image == null ?
                                                    <li className="nav-item  active">
                                                        <a className="nav-link" href="#" onClick={() => props.doToggleStackHolders(item.StakeholderId,item.StakeHolderName)}>
                                                        {
                                                            item.name?
                                                            item.name.split(" ").map(word => word[0]).slice(0, 2).join("").toUpperCase()
                                                            :
                                                            item.StakeHolderName.split(" ").map(word => word[0]).slice(0, 2).join("").toUpperCase()
                                                        }
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    {/* Second Panel */}
                                    <div className="empathymap-content">
                                        <h2>{props.SelectedStkName}</h2>
                                        {/* <textarea disabled className="empathyMapTextarea" onselect={(e) => props.selectText(e)}>{StackHolderEmpathyMap[id].desc}</textarea> */}
                                        <div>
                                            {
                                                props.StkDescOnEmpathyMap.map((item,i) => (
                                                    <>
                                                    <h6 onDragStart={(e) => props.dragSelectedText(e)} onMouseUp={props.selectedText} >{item.SectionCategoryTitle}</h6>
                                                    <ContentEditable
                                                        html={item.SectionDescription }
                                                        disabled={true}
                                                        onDragStart={(e) => props.dragSelectedText(e)} onMouseUp={props.selectedText}
                                                        tagName='p'
                                                    />
                                                    {/* <p contenteditable="false" onDragStart={(e) => props.dragSelectedText(e)} onMouseUp={props.selectedText}>'{item.SectionDescription}'</p> */}
                                                    </>
                                                ))
                                            }
                                        </div>

                                        {/* <div className="stikynote-box mt-4">
                                            <div className="stikynote bg-blue">
                                                <p>Do pesona research to come up with better
                                                    product</p>
                                            </div>
                                            <div className="stikynote bg-orange">
                                                <p>Do pesona research to come up with better
                                                    product</p>
                                            </div>
                                            <div className="stikynote bg-green">
                                                <p>Do pesona research to come up with better
                                                    product</p>
                                            </div>

                                        </div> */}
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 interview-user-info-sec pb-4 pr-5">
                                <div className="interview-heading d-flex justify-content-between py-3">
                                    <h2>Empathy Maps</h2>
                                    <div>
                                        <a href="#"><i className="fas fa-cloud-download-alt"></i> Download</a>
                                        <a href="#" onClick={props.addNewEmpathyMap} className="ml-3"><i className="fas fa-plus"></i></a>
                                    </div>
                                </div>
                                {
                                StackHolderEmpathyMap.map((item,ind) => (
                                <div className="wholemapsection mb-4">
                                    <div className="interview-heading border-0 d-flex justify-content-between">
                                        <div className="dropdown version-drop pt-2">
                                            <a className="btn-drop dropdown-toggle" data-toggle="dropdown">
                                                1.1 {item.MapName}
                                            </a>
                                            <div className="dropdown-menu">
                                                <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.3 Empathy Map 1 </span><span className="text-success">Active</span> <span
                                                    className="date">06/03/20</span></p>
                                                <p className="d-flex revised-txt justify-content-between"><span>Revised by: Dave Denis</span> <span
                                                    className="selected">Selected</span></p>
                                                </div>
                                                <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.2 Empathy Map 1</span> <span
                                                    className="date">06/03/20</span></p>
                                                <p className="d-flex revised-txt justify-content-between"><span>Revised by: James Denis</span> </p>
                                                </div>
                                                <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.1 Empathy Map 1 </span> <span
                                                    className="date">06/03/20</span></p>
                                                <p className="d-flex revised-txt justify-content-between"><span>Revised by: Steve</span> </p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="pt-3">
                                            <a href="#" className="ml-1"><i className="fas fa-plus"></i> Add a version </a>
                                        </div>
                                        <div className="pt-3">
                                            <a href="#" className="ml-1" data-toggle="modal" onClick={()=> props.currentSelectedEmpathyMapHandler(item,ind)} data-target={`#linkStakeholderEmpathyMapModal`}>Link Stakeholders </a> | 
                                            <a href="#" onClick={() => props.duplicateEmpathyMap(item)}> Duplicate </a> |
                                            {
                                                item.EmpathyMapId == 0 ?
                                                <a href="#" onClick={() => props.removeEmpathyMap(ind)} className="mx-1">Delete</a>
                                                :
                                                <a href="#" onClick={() => props.deleteEmpathyMap(item.EmpathyMapId)} className="mx-1"> Delete</a>
                                            }
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="empathy-map-block mt-4">
                                        <div className="map-responsive">
                                            <div className="empathy-map-sec">
                                                <div 
                                                    className="empathy-map-box border-right bg-lightblue"
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Do")}
                                                >
                                                    <h3><a href={`#DoModal${ind}`}>Do</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Do" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#DoModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>
                                                                ))
                                                                        
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                                <div 
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Sight")}
                                                    className="empathy-map-box bg-blue">
                                                    <h3><a href={`#SightModal${ind}`}>Sight</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Sight" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#SightModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>        
                                                                ))   
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div 
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Say")}
                                                    className="empathy-map-box border-right bg-blue">
                                                    <h3><a href={`#SayModal${ind}`}>Say</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Say" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#SayModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>        
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div 
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Thoughts & Feelings")}
                                                    className="empathy-map-box bg-lightblue">
                                                    <h3><a href={`#thoughtsAndFeelingsModal${ind}`}>Thoughts & Feelings</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Thoughts & Feelings" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#thoughtsAndFeelingsModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>
                                                                ))    
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div 
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Pains")}
                                                    className="empathy-map-box empathy-map-box-bottom border-right bg-orange">
                                                    <h3><a href={`#PainsModal${ind}`}>Pains</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Pains" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#PainsModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>        
                                                                ))
                                                            ))
                                                        }
                                                    </div>    
                                                </div>
                                                <div
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Triggers")} 
                                                    className="empathy-map-box empathy-map-box-bottom border-right bg-red">
                                                    <h3><a href={`#TriggersModal${ind}`}>Triggers</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Triggers" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#TriggersModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>        
                                                                ))   
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Barrier")} 
                                                    className="empathy-map-box empathy-map-box-bottom border-right bg-lightblue">
                                                    <h3><a href={`#BarrierModal${ind}`}>Barrier</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Barrier" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#BarrierModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>        
                                                                ))    
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div 
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Gains")}
                                                    className="empathy-map-box empathy-map-box-bottom border-right bg-orange">
                                                    <h3><a href={`#GainsModal${ind}`}>Gains</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Gains" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#GainsModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>
                                                                ))    
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                onDragOver={e => e.preventDefault() }
                                                onDrop={(e) => props.dropSelectedText(e,ind,"Hacks")} 
                                                    className="empathy-map-box empathy-map-box-bottom border-right bg-red">
                                                    <h3><a href={`#HacksModal${ind}`}>Hacks</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Hacks" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#HacksModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>        
                                                                ))    
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div 
                                                    onDragOver={e => e.preventDefault() }
                                                    onDrop={(e) => props.dropSelectedText(e,ind,"Delights")}
                                                    className="empathy-map-box empathy-map-box-bottom bg-lightblue">
                                                    <h3><a href={`#DelightsModal${ind}`}>Delights</a></h3>
                                                    <div className="note-container">
                                                        {
                                                            props.StackHolderEmpathyMap[ind].Sections.map((section,i) => (
                                                                section.SectionCategoryTitle == "Delights" &&
                                                                section.Mapping.map((item,j) => (
                                                                    item.MappingDetailsText !== null &&
                                                                    <span className="notes bg-orange note-tooltip">
                                                                        <a href={`#DelightsModal${ind}`} onClick={() => props.getText(j,item.MappingDetailsText)}>{item.MappingText}</a>
                                                                        <span className="tooltiptext">{item.MappingDetailsText}</span>
                                                                    </span>        
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                                ))    
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="modal personamodal" id={`linkStakeholderEmpathyMapModal`} tabindex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered"  role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4">
                            <h5 className="modal-title">Link Stakeholders</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body px-4 pt-0 pb-4">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3>
                                        <span>Stakeholders </span>
                                        <div className="custom-control custom-checkbox mb-1 float-right">
                                            <input type="checkbox" className="custom-control-input" id="selectall" onClick={(e)=>props.onSelectStkForLinkEmpMap(e, 0, true)} />
                                            <label className="custom-control-label pt-1" htmlFor="selectall">Select All</label>
                                        </div>
                                    </h3>
                                    <div className="card p-3 w-100 stkbox">
                                        {
                                            props.StkHolderForLinkEmpathyMap.map((item,i) => (
                                                <div className="custom-control custom-checkbox mb-1">
                                                    <input 
                                                        type="checkbox" 
                                                        className="custom-control-input" 
                                                        name="stk" 
                                                        // checked={data.Links.some(d => d.StakeholderId == item.stakeholderId)}
                                                        checked={Object.keys(props.currentSelectedEmpathyMap).length > 0 ? Linkedstakeholders.includes(item.stakeholderId) : false}
                                                        value={item.stakeholderId} 
                                                        onChange={(e) => props.onSelectStkForLinkEmpMap(e, item.stakeholderId, false)}
                                                        id={`stkradio${i}`}
                                                    />
                                                    <label className="custom-control-label" for={`stkradio${i}`}>{item.name}</label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer border-0 px-4 pt-0 pb-4">
                            <a className="text-primary" data-dismiss="modal">Cancel</a>
                            <button 
                                type="button" data-dismiss="modal" className="btn btn-primary ml-3" 
                                onClick={() => props.onSaveSelectStkForLinkEmpMap()} //ind
                            >Save</button>
                        </div>
                    </div>
                </div>
            </div>
                       
        </>)
}
export default EmpathyMapScreen;
