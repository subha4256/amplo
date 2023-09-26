import React from 'react';
const GenerateIdeas = (props) => {

    console.log("IdeaProps=>>", props)

    let ideaBox = [];
    if(props.ideas.length) {
        ideaBox = props.ideas.map((idea, key) => {
            if(props.fullView) {
                if(!idea.Merged) {
                    return (
                        <div key={'idea-grid-'+key} className="ideas-box" onDragStart={(e) => props.addIdeaDrag(e, key)} draggable onDragOver={(e) => e.preventDefault()} onDrop={(e) => props.onIdeaDrop(e, key)} droppable={1}>
                            <h3>{idea.IdeaTitle}</h3>
                            <p>{idea.IdeaNotePlainText}</p>
                        </div>
                    )
                }
            }else{
                return (
                    <div key={'idea-grid-'+key} className="ideas-box" onClick={(e) => props.handleIdeaClick(e, key)}>
                        <h3>{idea.IdeaTitle}</h3>
                        <textarea className="ideas-description" value={idea.IdeaNotePlainText} onChange={(e) => props.handleIdeaChange(e, key)}></textarea>
                    </div>
                )
            }
        });
    }else{
        ideaBox = <p className="text-danger">No idea found</p>
    }
    return (
        <>
            <div className="card-header d-md-flex justify-content-between align-items-center">
                <h3>Generate Ideas</h3>
                <div className="submit-idea">
                    {props.fullView || props.expandView ? 
                    <a href="#" className="btn btn-outline-primary mark-complete" onClick={(e) => props.handleSubmitIdeas(e)}>Mark As Complete</a> :
                    <a href="#" className="btn btn-outline-primary" onClick={(e) => props.handleSubmitIdeas(e)}>Submit Ideas</a>}
                    <a href="#" onClick={props.handleIdeaAdd}><i className="fas fa-plus ml-2"></i></a>
                    <a href="#" onClick={(e) => props.handleIdeaDelete(e)}><i className="fas fa-minus ml-1"></i></a>
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
                <a href="#" className="collapseIdeas" onClick={(e) => props.toggleExpandView(e)}><img src={require('../../common/images/slider-right-arrow.png')} /></a> : <p className="text-center full-width">Drag & drop ideas to combine Ideas</p> }
                <div className={props.fullView ? "idea-box-wrapper mh-700" : "idea-box-wrapper"}>
                    {ideaBox}
                </div>
            </div>
        </>
    )
}

export default GenerateIdeas;