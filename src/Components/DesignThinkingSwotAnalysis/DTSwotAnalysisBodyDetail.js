import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GenerateIdeas from './GenerateIdeas';
import EpicList from './EpicList';
import IdeaAnalysis from './IdeaAnalysis';
import {fetchSwotEpics, fetchSwotIdeas, fetchSwot, enableSwotVoting, getAllVoters, markComplete} from '../../actions/ideateActions';
import { Global } from '../../utils/Env';
class DTSwotAnalysisBodyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullView: false,
            expandView: false,
            selectedSubEpic : 0,
            votingEnabled: false,
            markComplete: false,
            selectedIdea : {},
            fetchedIdeas : []
        }

        this.child = React.createRef();

        Global.callback.fetchSwotEpics_onComplete = res => {
            const SubEpics = res.data.EPic?res.data.EPic[0].SubEpic?res.data.EPic[0].SubEpic:[]:[];
            if(SubEpics.length > 0){
                this.props.fetchSwotIdeas(SubEpics[0].id);
                this.setState({
                    selectedSubEpic : SubEpics[0].id
                })
            }
        }

        Global.callback.castVote_onComplete = () => {
            this.props.fetchSwotIdeas(this.state.selectedSubEpic);
        }

        Global.callback.enableSwotVoting_onComplete = () => {
            this.props.fetchSwotIdeas(this.state.selectedSubEpic);
        }

        Global.callback.markComplete_onComplete = () => {
            this.props.fetchSwotIdeas(this.state.selectedSubEpic);
        }

        Global.callback.fetchSwotIdeas_onComplete = res => {
            if(res.data.length > 0){
                if(res.data[0].DtIdeateSessionIdeaId && res.data[0].DtIdeateSessionIdeaId > 0){
                    if(Object.keys(this.state.selectedIdea).length <= 0){
                        this.setState({
                            selectedIdea : res.data[0]
                        });
                        this.props.fetchSwot(res.data[0].DtIdeateSessionIdeaId);
                        this.props.getAllVoters(res.data[0].DtIdeateSessionIdeaId);
                    }else{
                        let selIdeaInd = res.data.map(idea=>idea.DtIdeateSessionIdeaId).indexOf(this.state.selectedIdea.DtIdeateSessionIdeaId);
                        this.setState({
                            selectedIdea : res.data[selIdeaInd]
                        })
                        this.props.fetchSwot(this.state.selectedIdea.DtIdeateSessionIdeaId);
                        this.props.getAllVoters(this.state.selectedIdea.DtIdeateSessionIdeaId);
                    }
                }
            }else{
                this.setState({
                    selectedIdea : {}
                })
            }
        }

    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        let returnObj = {...prevState};
        if(prevState.fetchedIdeas != nextProps.ideas){
            returnObj = {
                ...returnObj,
                fetchedIdeas : nextProps.ideas
            }
            if(nextProps.ideas.length > 0 && nextProps.ideas[0].IsEnabledVoting == 1){
                returnObj = {
                    ...returnObj,
                    votingEnabled : true
                }
            }else{
                returnObj = {
                    ...returnObj,
                    votingEnabled : false
                }
            }

            if(nextProps.ideas.length > 0 && nextProps.ideas[0].IsCompleteVoting  == 1){
                returnObj = {
                    ...returnObj,
                    markComplete : true
                }
            }else{
                returnObj = {
                    ...returnObj,
                    markComplete : false
                }
            }
        }
        return returnObj;
    }

    componentDidMount() {
        this.props.fetchSwotEpics(this.props.projectId, this.props.epicId);
    }

    saveSwot = () => {
        this.child.current.saveSwot(this.state.selectedIdea);
    }

    toggleFullView = (e) => {
        e.preventDefault();
        this.setState({
            fullView: !this.state.fullView
        })
    }
    toggleExpandView = (e) => {
        e.preventDefault();
        this.setState({
            expandView: !this.state.expandView
        })
    }
    enableVoting = (e) => {
        e.preventDefault();
        this.props.enableSwotVoting({ 
            SubEpicId:this.state.selectedSubEpic,
            IsEnabledVoting:1, 
            VoteForYourOwnIdea:0
        })
    }
    markCompleteHandler = (e) => {
        e.preventDefault();
        this.props.markComplete({
            SubEpicId:this.state.selectedSubEpic,
            IsCompleted:1
        })
    }
    handleSubEpicClick = (subEpicId) => {
        this.props.fetchSwotIdeas(subEpicId);
        this.setState({
            selectedSubEpic: subEpicId,
            selectedIdea : {}
        })
    }

    selectIdeaForSwot = (idea) => {
        this.props.fetchSwot(idea.DtIdeateSessionIdeaId);
        this.props.getAllVoters(idea.DtIdeateSessionIdeaId);
        this.setState({
            selectedIdea : idea
        });
    }
    render() {
        return(
            <div className="dt-content-wrapper">
                <div className="content-wraper">
                <div className="container-fluid">

                <div className="row epic-version align-items-center">
                    <div className="col-sm-12 col-md-12 col-lg-8 pt-3">
                    <h2 className="d-flex align-items-center"><span>Ideate -  Ideas SWOT Analysis
                        </span> <Link to={`/dt-network-of-experience/${this.props.projectId}/${this.props.epicId}`} className="ml-3">Network of Experience</Link>
                    </h2>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                    <ul className="list-inline pager-list mb-0">
                        <li className="list-inline-item"><Link to={`/dt-problem-pinning/${this.props.projectId}/${this.props.epicId}`} className="ml-3">Previous</Link></li> |
                        <li className="list-inline-item" style={{marginLeft : 12}}>{this.state.markComplete ? <Link to={`/dt-dvf/${this.props.projectId}/${this.props.epicId}`}>Next</Link> : <a href="#">Next</a>}</li>
                    </ul>
                    </div>
                </div>
                <div className="row generate-ideas-row">
                    <div className="col-sm-12 col-md-12 col-lg-6 pr-lg-0" style={{display: this.state.fullView || this.state.expandView ? 'none' : ''}}>
                    <div className="card idealeft ideascard mt-3">
                        <EpicList epics={this.props.epics} handleSubEpicClick={(id)=>this.handleSubEpicClick(id)} selectedSubEpic={this.state.selectedSubEpic} />
                    </div>
                    </div>
                    <div className={this.state.fullView || this.state.expandView ? "col-sm-12 col-md-12 col-lg-12 pl-lg-0" : "col-sm-12 col-md-12 col-lg-6 pl-lg-0"}>
                    <div className="card ideascard mt-3">
                        <GenerateIdeas ideas={this.props.ideas} toggleExpandView={this.toggleExpandView} expandView={this.state.expandView} toggleFullView={this.toggleFullView} fullView={this.state.fullView} enableVoting={this.enableVoting} votingEnabled={this.state.votingEnabled} markCompleteHandler={this.markCompleteHandler} markComplete={this.state.markComplete} selectedIdea={this.state.selectedIdea} selectIdeaForSwot={this.selectIdeaForSwot} />
                    </div>
                    </div>
                </div>
                <IdeaAnalysis ref={this.child} votingEnabled={this.state.votingEnabled} selectedIdea={this.state.selectedIdea}
                 selectedSubEpic={this.state.selectedSubEpic}
                />
                </div>
            </div>
            </div>
        )
    }
}  

DTSwotAnalysisBodyDetail.propTypes = {
    epics: PropTypes.array.isRequired,
    ideas : PropTypes.array.isRequired,
    fetchSwotEpics: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    epics: state.ideate.epics,
    ideas : state.ideate.ideas
});
export default connect(mapStateToProps, { fetchSwotEpics, fetchSwotIdeas, fetchSwot, enableSwotVoting, getAllVoters, markComplete }, null, { forwardRef : true })(DTSwotAnalysisBodyDetail);