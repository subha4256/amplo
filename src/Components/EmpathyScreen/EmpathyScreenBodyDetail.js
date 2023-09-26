import React, { forwardRef, useRef, useImperativeHandle } from 'react';
//import {Tabs, Tab} from 'react-bootstrap-tabs';
import {Tabs,TabLink,TabContent} from 'react-tabs-redux';
import EmpathyInterviewScreen from './EmpathyInterviewScreen';
import EmpathyMapScreen from './EmpathyMapScreen';
import EmpathyProcessBodyDetail from './EmpathyProcessBodyDetail';
import EmpathyPersonasBodyDetail from './EmpathyPersonasBodyDetail';

const EmpathyScreenBodyDetail = forwardRef((props,ref) => {    
    const childRef = useRef();

    useImperativeHandle(ref, () => ({
        savePersona (data){
            childRef.current.savePersona(data)
        }
    }))

    let { selectedEpicId,epicList} = props;
    return(
        <>
            {/* <!-- Start Body Content --> */}
            <div className={`dt-content-wrapper ${props.showClass ? 'right-toggle' : ''}`}>
                <div className="content-wraper">
                    <div className="container-fluid">
                    <Tabs renderActiveTabContentOnly={true}>
                        <div className="row pt-3 interviews-tabs">
                            <div className="col-sm-12 col-md-4 pl-0 pt-2 d-flex justify-content-between">
                                <h1>Empathize</h1>
                                <select class="custom-select" value={selectedEpicId} onChange={(e) => props.getEpic(e)}> 
                                { 
                                    epicList ? 
                                    epicList.map((epic, epicIndex) =>  ( 
                                        <><option value={epic.DTEPICHeaderID}>{epic.Title}</option></>                                    
                                        )) 
                                    :null 
                                }
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 p-0">
                            
                                <ul className="nav nav-pills" role="tablist">
                                    <li className="nav-item">
                                    <TabLink to="tab1" className="nav-link" default>
                                    Notes
                                    </TabLink>
                                    </li>
                                    <li className="nav-item">
                                    <TabLink to="tab2" className="nav-link">Empathy Map</TabLink>
                                    </li>
                                    <li className="nav-item">
                                    <TabLink to="tab3" className="nav-link">Lifecycle</TabLink>
                                    </li>
                                    <li className="nav-item">
                                    <TabLink to="tab4" className="nav-link">Personas</TabLink>
                                    </li>
                                </ul>                                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="tab-content dt-tab-content w-100">
                                <TabContent for="tab1">
                                    <EmpathyInterviewScreen 
                                        deleteStakeholderInterviewStakeholderHandler = {props.deleteStakeholderInterviewStakeholderHandler}
                                        handleEmpathyDescriptionChange = {props.handleEmpathyDescriptionChange}
                                        currentStakeholderSelectedForInterview = {props.currentStakeholderSelectedForInterview}
                                        selectedStakeholdersForInterview = {props.selectedStakeholdersForInterview}
                                        selectedStakeholdersNotesForInterview = {props.selectedStakeholdersNotesForInterview}
                                        addVideo={props.addVideo} 
                                        removeStakeHolders={props.removeStakeHolders} 
                                        stakeHolders={props.stakeHolders}
                                        addStakeHolders={props.addStakeHolders}
                                        stakeHoldersInterviewData={props.stakeHoldersInterviewData}
                                        addNewSection={(i) => props.addNewSection(i)}
                                        selectedStackHolderForInterview={props.selectedStackHolderForInterview}
                                        getEmpathyNotes={(e,id) => {props.getEmpathyNotes(e,id); console.log(e,id)}}
                                        EmpathyNotesAllCategory={props.EmpathyNotesAllCategory}
                                        empathyNotesSaveBtn={() => props.empathyNotesSaveBtn()}
                                    ></EmpathyInterviewScreen></TabContent>
                                <TabContent for="tab2">
                                    <EmpathyMapScreen
                                        currentSelectedEmpathyMap={props.currentSelectedEmpathyMap}
                                        currentSelectedEmpathyMapHandler={(item,ind) => props.currentSelectedEmpathyMapHandler(item,ind)}
                                        removeEmpathyMap={(ind) => props.removeEmpathyMap(ind)}
                                        onSaveSelectStkForLinkEmpMap={(ind) => props.onSaveSelectStkForLinkEmpMap(ind)}
                                        onSelectStkForLinkEmpMap={(e, ind, selectAll) => props.onSelectStkForLinkEmpMap(e, ind, selectAll)}
                                        StkHolderForLinkEmpathyMap={props.StkHolderForLinkEmpathyMap}
                                        SelectedStkName={props.SelectedStkName}
                                        StkDescOnEmpathyMap={props.StkDescOnEmpathyMap} 
                                        selectedStakeholdersForInterview = {props.selectedStakeholdersForInterview}
                                        duplicateEmpathyMap={(item) => props.duplicateEmpathyMap(item)}
                                        addNewEmpathyMap={props.addNewEmpathyMap}
                                        deleteEmpathyMap={(EmpathyMapId) => props.deleteEmpathyMap(EmpathyMapId)}
                                        dropSelectedText={(e,ind,key) => props.dropSelectedText(e,ind,key)}
                                        dragSelectedText={(e) => props.dragSelectedText(e)}
                                        selectedText={props.selectedText}
                                        empathyMap={props.empathyMap}
                                        stakeHolders={props.stakeHolders}
                                        StackHolderEmpathyMap={props.StackHolderEmpathyMap}
                                        selectedStackHolderForEmpathyMap={props.selectedStackHolderForEmpathyMap}
                                        doSaveText={(key) => props.doSaveText(key)}
                                        onFixedSectionStateChange={(e) => props.onFixedSectionStateChange(e)}
                                        fixedSectionState={props.fixedSectionState}
                                        doToggleStackHolders={(id,name) => props.doToggleStackHolders(id,name)}
                                        getText={(index,text) => props.getText(index,text)}
                                        selectText={(e) => props.selectText(e)}
                                        empathyMapSaveBtn={() => props.empathyMapSaveBtn()}
                                        >
                                        </EmpathyMapScreen> </TabContent>
                                <TabContent for="tab3">
                                    <EmpathyProcessBodyDetail
                                        removeLine = {(e,stgInd, subStgInd, catInd, outerId,catTxtInd) => props.removeLine(e,stgInd, subStgInd, catInd, outerId,catTxtInd)}
                                        removeLifecycleStakeholder = {(e,Id,stgInd,subStgInd,impactorInd,catTextInd,outerId,type) => props.removeLifecycleStakeholder(e,Id,stgInd,subStgInd,impactorInd,catTextInd,outerId,type)}
                                        removeLifecycle={(outerId) => props.removeLifecycle(outerId)}
                                        createDuplicateLifecycle={(d) => props.createDuplicateLifecycle(d)}
                                        addNewLifecycle={() => props.addNewLifecycle()}
                                        deleteLifecycle={(id) => props.deleteLifecycle(id)}
                                        fetchDtNoiStkhldrDetail={(id) => props.fetchDtNoiStkhldrDetail(id)}
                                        fetchEmpathyLifeCycle={(id) => props.fetchEmpathyLifeCycle(id)} 
                                        allempathyLifecycle={props.allempathyLifecycle}
                                        addStages={(outerId) => props.addStages(outerId)}
                                        updateStageName={(event,id,outerId) => props.updateStageName(event,id,outerId)}
                                        selectStage={(i) => props.selectStage(i)}
                                        selectedStage={props.selectedStage}
                                        removeStages={(outerId) => props.removeStages(outerId)}
                                        removeSubStages={(outerId) => props.removeSubStages(outerId)}
                                        addSubStages={(outerId) => props.addSubStages(outerId)}
                                        data={props.lifecycleData}
                                        addNewLine = {(stageInd,subStageInd,activityIndex,outerId) => props.addNewLine(stageInd,subStageInd,activityIndex,outerId)}
                                        selectSubstage={(substageInd, stageInd) => props.selectSubstage(substageInd, stageInd)}
                                        selectedSubstage={props.selectedSubstage}
                                        updateSubStageName={(event,stageInd, substageInd, outerId) => props.updateSubStageName(event,stageInd, substageInd, outerId)}
                                        updateActivities = {(event,stageInd,subStageInd,activityIndex,outerId,catTxtInd) => props.updateActivities(event,stageInd,subStageInd,activityIndex, outerId,catTxtInd)}
                                        updateTouchpoints = {(event,stageInd,subStageInd,touchpointIndex,outerId,catTxtInd) => props.updateTouchpoints(event,stageInd,subStageInd,touchpointIndex,outerId,catTxtInd)}
                                        updatePainpoints = {(event,stageInd,subStageInd,painpointIndex,outerId,catTxtInd)=> props.updatePainpoints(event,stageInd,subStageInd,painpointIndex,outerId,catTxtInd)}
                                        updateOpportunities = {(event,stageInd,subStageInd,oppertunityIndex,outerId,catTxtInd) => props.updateOpportunities(event,stageInd,subStageInd,oppertunityIndex,outerId,catTxtInd)}
                                        lifecycleSaveBtn={() => props.lifecycleSaveBtn()}
                                        addCommentCol={(index,outerId) => props.addCommentCol(index,outerId)}
                                        dropStakeholder={(e,stageInd,subStageInd,outerId) => props.dropStakeholder(e, stageInd,subStageInd,outerId)}
                                        dropStakeholderInimpactee={(e,stageInd,subStageInd,outerId) => props.dropStakeholderInimpactee(e,stageInd,subStageInd,outerId)}
                                        selectedDtNoiStk={props.selectedDtNoiStk}
                                        dtnoiStakeholder={props.dtnoiStakeholder}
                                        StakeHolder={props.StakeHolder}
                                ></EmpathyProcessBodyDetail> 
                                </TabContent>
                                <TabContent for="tab4">
                                    <EmpathyPersonasBodyDetail
                                        showcjmbtn={props.showcjmbtn}
                                        cjmId={props.cjmId}
                                        StkHolderForLinkEmpathyMap={props.StkHolderForLinkEmpathyMap}
                                        createCjm={(id) => props.createCjm(id)}
                                        viewCjm={(id) => props.viewCjm(id)}
                                        StkDescOnEmpathyMap={props.StkDescOnEmpathyMap}
                                        SelectedStkName={props.SelectedStkName}
                                        doToggleStackHolders={(id,name) => props.doToggleStackHolders(id,name)}
                                        selectedStakeholdersForInterview = {props.selectedStakeholdersForInterview}
                                        ProjectId = {props.ProjectId}
                                        ProjectVersionId = {props.ProjectVersionId}
                                        EpicId = {props.EpicId}
                                        EpicVersionId = {props.EpicVersionId}
                                        personaSaveBtn={() => props.personaSaveBtn()}
                                        ref={childRef}
                                    >
                                    </EmpathyPersonasBodyDetail>
                                </TabContent>
                            </div>
                        </div>
                    </Tabs>
                    </div>
                </div>
            </div>
            </>
    )
  
})
export default EmpathyScreenBodyDetail;
