import React from 'react';
const GenerateIdeas = (props) => {
    let ideaBox = props.ideas.map((idea, key) => {
        return (
            <div key={idea.DtIdeateSessionIdeaId} className={props.selectedIdea.DtIdeateSessionIdeaId == idea.DtIdeateSessionIdeaId ? "ideas-box active":"ideas-box"} onClick={()=>props.selectIdeaForSwot(idea)}>
                {props.markComplete ? null : props.votingEnabled ? <div className="check" style={idea.HasVoted == 1 ? {}:{backgroundColor:"#c5c9cc"}}><i className="fas fa-check"></i></div> : null}
                <h3>{idea.IdeaTitle}</h3>
                <p>{idea.IdeaNotePlainText}</p>
                {props.markComplete ? <div className="votebtn"><a href="#">{idea.NoOfVotes} Votes</a></div> : null}
            </div>
        )
    });
    let actionBtn = <a href="#" className="btn btn-outline-primary" onClick={(e) => props.enableVoting(e)}>Enable Voting</a>
    if(props.markComplete) {
        actionBtn = null;
    }else if(props.votingEnabled) {
        actionBtn = <a href="#" className="btn btn-outline-primary mark-complete" onClick={(e) => props.markCompleteHandler(e)}>Mark As Complete</a>
    }else{
        actionBtn = <a href="#" className="btn btn-outline-primary" onClick={(e) => props.enableVoting(e)}>Enable Voting</a>
    }
    return (
        <>
            <div className="card-header d-md-flex justify-content-between align-items-center">
                <h3>Generate Ideas</h3>
                <div className="submit-idea">
                    {actionBtn}
                     <i className="fas fa-plus ml-2"></i>
                    <i className="fas fa-minus ml-1"></i>
                    <a className="pl-2" href="#" onClick={(e) => props.toggleFullView(e)}>
                        {props.fullView ? 
                            <img src={require('../../common/images/close-icon.png')} alt="" /> : 
                            <img src={require('../../common/images/save-icon.PNG')} alt="" />
                        }
                    </a>
                </div>
            </div>
            <div className="card-body ideas-card">
                {!props.fullView ?
                    !props.expandView ? 
                <a href="#" className="expandIdeas" onClick={(e) => props.toggleExpandView(e)}><img src={require('../../common/images/slider-left-arrow.png')} /></a> :
                <a href="#" className="collapseIdeas" onClick={(e) => props.toggleExpandView(e)}><img src={require('../../common/images/slider-right-arrow.png')} /></a> : null }
                <div className={props.fullView ? "idea-box-wrapper mh-700" : "idea-box-wrapper"}>
                    {ideaBox}
                </div>
            </div>
        </>
    )
}

export default GenerateIdeas;