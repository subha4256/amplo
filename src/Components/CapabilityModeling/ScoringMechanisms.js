import React, {Component} from 'react';
import _ from 'underscore';
import { Input } from 'reactstrap';
import DoubleScrollbar from 'react-double-scrollbar';

class ScoringMechanisms extends Component{
    constructor (props){
        super (props)
        this.state = {
            processes:[],
            mechanisms: [],
            modelingMode:0
        }
    }

    componentDidMount() {
        document.body.addEventListener('click', this.myHandler.bind(this));
        window.addEventListener('scroll', this.myFunction, true);
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.myHandler.bind(this));
        window.removeEventListener('scroll', this.myFunction);
    }
    myFunction=()=>{
        var header =
        document.getElementById("theadId");
        var header1 = document.getElementById("table-containerhead");
        if(header1 != null){
        var sticky = header1.offsetTop;}
        //alert("x");
        if(header != null){
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        }
        else{
            header.classList.remove("sticky");
        }
    }
    }
    myHandler(e) {
        if(e.target.className !== 'scoreTd') {
            const processes = this.state.processes;
            for(let i in processes) {
                for(let j in processes[i].child) {
                    this.setState({
                        ['enterScoreLabel'+processes[i].child[j].id]: 'flex',
                        ['enterScore'+processes[i].child[j].id]: 'none'
                    })
                    for(let k in processes[i].child[j].child) {
                        this.setState({
                            ['enterScoreLabel'+processes[i].child[j].child[k].id]: 'flex',
                            ['enterScore'+processes[i].child[j].child[k].id]: 'none'
                        })
                        for(let l in processes[i].child[j].child[k].child) {
                            this.setState({
                                ['enterScoreLabel'+processes[i].child[j].child[k].child[l].id]: 'flex',
                                ['enterScore'+processes[i].child[j].child[k].child[l].id]: 'none'
                            })
                            for(let m in processes[i].child[j].child[k].child[l].child) {
                                this.setState({
                                    ['enterScoreLabel'+processes[i].child[j].child[k].child[l].child[m].id]: 'flex',
                                    ['enterScore'+processes[i].child[j].child[k].child[l].child[m].id]: 'none'
                                })
                            }
                        }
                    }
                }
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        let leafNodeCount = 0;
        if(nextProps.processes.length > 0) {
            //console.log(this.props.processes);
            const {processes} = nextProps;
            for(let i in processes) { // L1
                if(processes[i].child && processes[i].child.length > 0) {
                    for(let j in processes[i].child) { // L2
                        if(processes[i].child[j].child && processes[i].child[j].child.length > 0) {
                            for(let k in processes[i].child[j].child) { // L3
                                if(processes[i].child[j].child[k].child && processes[i].child[j].child[k].child.length > 0) {
                                    for(let l in processes[i].child[j].child[k].child) { // L4
                                        if(processes[i].child[j].child[k].child[l].child && processes[i].child[j].child[k].child[l].child.length > 0) {
                                            for(let m in processes[i].child[j].child[k].child[l].child) { // L5
                                                if(!processes[i].child[j].child[k].child[l].child[m].child || processes[i].child[j].child[k].child[l].child[m].child.length === 0) {
                                                    leafNodeCount++;
                                                }
                                            }
                                        }else{
                                            leafNodeCount++;
                                        }
                                    }
                                }else{
                                    leafNodeCount++;
                                }
                            }
                        }else{
                            leafNodeCount++;
                        }
                    }
                }else{
                    leafNodeCount++;
                }
            }
            //console.log(leafNodeCount)
            this.setState({
                processes: nextProps.processes,
                mechanisms: nextProps.mechanisms,
                modelingMode:nextProps.modelingMode
            })
            this.props.handleLeafCount(leafNodeCount);
        }
    };

    enterScore(e, index, id) {
        const processes = this.state.processes;
        for(let i in processes) {
            for(let j in processes[i].child) {
                this.setState({
                    ['enterScoreLabel'+processes[i].child[j].id]: 'flex',
                    ['enterScore'+processes[i].child[j].id]: 'none'
                })
                for(let k in processes[i].child[j].child) {
                    this.setState({
                        ['enterScoreLabel'+processes[i].child[j].child[k].id]: 'flex',
                        ['enterScore'+processes[i].child[j].child[k].id]: 'none'
                    })
                    for(let l in processes[i].child[j].child[k].child) {
                        this.setState({
                            ['enterScoreLabel'+processes[i].child[j].child[k].child[l].id]: 'flex',
                            ['enterScore'+processes[i].child[j].child[k].child[l].id]: 'none'
                        })
                        for(let m in processes[i].child[j].child[k].child[l].child) {
                            this.setState({
                                ['enterScoreLabel'+processes[i].child[j].child[k].child[l].child[m].id]: 'flex',
                                ['enterScore'+processes[i].child[j].child[k].child[l].child[m].id]: 'none'
                            })
                        }
                    }
                }
            }
        }
        this.setState({
            ['enterScoreLabel'+id]: 'none',
            ['enterScore'+id]: 'flex'
        })
    }

    handleScoreOnBlur(e, index, id, processLevel) {
        /*this.setState({
            ['enterScoreLabel'+id]: 'block',
            ['enterScore'+id]: 'none'
        })*/
        console.log(processLevel);
        this.props.handleScoreOnBlur(e, index, id, processLevel);

        console.log(this.props.scores);
        
    }
    
    
    render(){

        console.log("Score Props =>", this.props)
        console.log("Score State =>", this.state)
        
        const { processes, modelingMode, loading } = this.state;
        console.log(processes);
        let scoreGrid = [];
       
        //console.log();
        for(let i in processes) { // L1  
            let scoreTds = [];
            for(let n in this.state.mechanisms) {
                if(this.state.mechanisms[n].UsedFlag === "1") {
                   scoreTds.push (<td className="td-lheight" key={"mechanisms"+n}><small></small></td>)
                }
            }
            if(processes[i].action != "delete"){
                scoreGrid.push(<tr key={'scoreTextRow-'+i+'-'+processes[i].id}  >{scoreTds}</tr>)  
            }
            for(let j in processes[i].child) {
                            let scoreTds = [];
                            for(let n in this.state.mechanisms) {
                                if(this.state.mechanisms[n].UsedFlag === "1") {
                                    let findScoreIndex = _.findIndex(this.props.scores, {id: processes[i].child[j].id});
                                    
                                    let bgClassScore = 'scoreTd';
                                    if(this.props.scores[findScoreIndex] && modelingMode==1){
                                        
                                        if(this.props.scores[findScoreIndex].scoreArr[n] >=1 &&  this.props.scores[findScoreIndex].scoreArr[n] <= 2 ){
                                            bgClassScore = ' bg-orange';
                                        }
                                        else if(this.props.scores[findScoreIndex].scoreArr[n] > 2 && this.props.scores[findScoreIndex].scoreArr[n] <= 3) {
                                            bgClassScore = ' bg-yellow';
                                        }else if(this.props.scores[findScoreIndex].scoreArr[n] > 3 && this.props.scores[findScoreIndex].scoreArr[n] <= 4) {
                                            bgClassScore = ' bg-light-green';
                                        }else if(this.props.scores[findScoreIndex].scoreArr[n] > 4 && this.props.scores[findScoreIndex].scoreArr[n] <= 5) {
                                            bgClassScore = ' bg-green';
                                        }
                                    }  
                                    scoreTds.push(<td className={bgClassScore} key={'scoreTextCol'+n+"-"+processes[i].child[j].id} onClick={!processes[i].TotalAvgScore ? (e) => this.enterScore(e, n, processes[i].child[j].id) : () => {}}><span className="ScoreLabels" style={{display: this.state['enterScoreLabel'+processes[i].child[j].id]}}>{this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''}</span><Input type="text" className="ScoreText" name={"score"+n+"-"+processes[i].child[j].id} onBlur={(e) => this.handleScoreOnBlur(e, n, processes[i].child[j].id,'2')} style={{display: this.state['enterScore'+processes[i].child[j].id]}} defaultValue={this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''} autoFocus /></td>);
                                }
                            }
                            if(processes[i].child[j].action != "delete"){
                                scoreGrid.push(<tr rel={processes[i].child[j].number} key={'scoreTextRow-'+i+'-'+j+'-'+processes[i].child[j].id}>{scoreTds}</tr>)
                            }
             
                for(let k in processes[i].child[j].child) {  // l3
                    let scoreTds = [];
                    for(let n in this.state.mechanisms) {  
                        if(this.state.mechanisms[n].UsedFlag === "1") {
                            let findScoreIndex = _.findIndex(this.props.scores, {id: processes[i].child[j].child[k].id});
                            let bgClassScore = 'scoreTd';
                            if(this.props.scores[findScoreIndex] && modelingMode==1){
                                
                                if(this.props.scores[findScoreIndex].scoreArr[n] >=1 &&  this.props.scores[findScoreIndex].scoreArr[n] <= 2 ){
                                    bgClassScore = ' bg-orange';
                                }
                                else if(this.props.scores[findScoreIndex].scoreArr[n] > 2 && this.props.scores[findScoreIndex].scoreArr[n] <= 3) {
                                    bgClassScore = ' bg-yellow';
                                }else if(this.props.scores[findScoreIndex].scoreArr[n] > 3 && this.props.scores[findScoreIndex].scoreArr[n] <= 4) {
                                    bgClassScore = ' bg-light-green';
                                }else if(this.props.scores[findScoreIndex].scoreArr[n] > 4 && this.props.scores[findScoreIndex].scoreArr[n] <= 5) {
                                    bgClassScore = ' bg-green';
                                }
                            }  
                            scoreTds.push(<td className={bgClassScore} key={'scoreTextCol'+n+"-"+processes[i].child[j].child[k].id} onClick={!processes[i].TotalAvgScore ? (e) => this.enterScore(e, n, processes[i].child[j].child[k].id) : () => {}}><span className="ScoreLabels" style={{display: this.state['enterScoreLabel'+processes[i].child[j].child[k].id]}}>{this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''}</span><Input type="text" className="ScoreText" name={"score"+n+"-"+processes[i].child[j].child[k].id} onBlur={(e) => this.handleScoreOnBlur(e, n, processes[i].child[j].child[k].id,'3')} style={{display: this.state['enterScore'+processes[i].child[j].child[k].id]}} defaultValue={this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''} autoFocus /></td>)
                        }
                    }
                    if(processes[i].child[j].child[k].action!= "delete"){
                        scoreGrid.push(<tr rel={processes[i].child[j].child[k].number} key={'scoreTextRow-'+i+'-'+j+'-'+k+processes[i].child[j].child[k].id}>{scoreTds}</tr>)
                    }

                    for(let l in processes[i].child[j].child[k].child) { // l4
                        let scoreTds = [];
                        for(let n in this.state.mechanisms) {
                            if(this.state.mechanisms[n].UsedFlag === "1") {
                                let findScoreIndex = _.findIndex(this.props.scores, {id: processes[i].child[j].child[k].child[l].id});
                                let bgClassScore = 'scoreTd';
                                if(this.props.scores[findScoreIndex] && modelingMode==1){
                                    
                                    if(this.props.scores[findScoreIndex].scoreArr[n] >=1 &&  this.props.scores[findScoreIndex].scoreArr[n] <= 2 ){
                                        bgClassScore = ' bg-orange';
                                    }
                                    else if(this.props.scores[findScoreIndex].scoreArr[n] > 2 && this.props.scores[findScoreIndex].scoreArr[n] <= 3) {
                                        bgClassScore = ' bg-yellow';
                                    }else if(this.props.scores[findScoreIndex].scoreArr[n] > 3 && this.props.scores[findScoreIndex].scoreArr[n] <= 4) {
                                        bgClassScore = ' bg-light-green';
                                    }else if(this.props.scores[findScoreIndex].scoreArr[n] > 4 && this.props.scores[findScoreIndex].scoreArr[n] <= 5) {
                                        bgClassScore = ' bg-green';
                                    }
                                }  
                                scoreTds.push(<td className={ bgClassScore } key={'scoreTextCol'+n+"-"+processes[i].child[j].child[k].child[l].id} onClick={!processes[i].TotalAvgScore ? (e) => this.enterScore(e, n, processes[i].child[j].child[k].child[l].id) : () => {}}>
                                    <span className="ScoreLabels" style={{display: this.state['enterScoreLabel'+processes[i].child[j].child[k].child[l].id]}}>{this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''}</span>
                                    <Input type="text" className="ScoreText" name={"score"+n+"-"+processes[i].child[j].child[k].child[l].id} onBlur={(e) => this.handleScoreOnBlur(e, n, processes[i].child[j].child[k].child[l].id,'4')} style={{display: this.state['enterScore'+processes[i].child[j].child[k].child[l].id]}} defaultValue={this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''} autoFocus />
                                </td>);
                            }
                        }
                        if(processes[i].child[j].child[k].child[l].action != "delete"){
                            scoreGrid.push(<tr rel={processes[i].child[j].child[k].child[l].number} key={'scoreTextRow-'+i+'-'+j+'-'+k+'-'+l+processes[i].child[j].child[k].child[l].id}>{scoreTds}</tr>);
                        }
                        for(let m in processes[i].child[j].child[k].child[l].child) {  // l5
                                                                let scoreTds = [];
                                                                for(let n in this.state.mechanisms) {
                                                                    if(this.state.mechanisms[n].UsedFlag === "1") {
                                                                        let findScoreIndex = _.findIndex(this.props.scores, {id: processes[i].child[j].child[k].child[l].child[m].id});
                                                                        let bgClassScore = 'scoreTd';
                                                                        if(this.props.scores[findScoreIndex] && modelingMode==1){
                                                                           
                                                                            if(this.props.scores[findScoreIndex].scoreArr[n] >=1 &&  this.props.scores[findScoreIndex].scoreArr[n] <= 2 ){
                                                                                bgClassScore = ' bg-orange';
                                                                            }
                                                                            else if(this.props.scores[findScoreIndex].scoreArr[n] > 2 && this.props.scores[findScoreIndex].scoreArr[n] <= 3) {
                                                                                bgClassScore = ' bg-yellow';
                                                                            }else if(this.props.scores[findScoreIndex].scoreArr[n] > 3 && this.props.scores[findScoreIndex].scoreArr[n] <= 4) {
                                                                                bgClassScore = ' bg-light-green';
                                                                            }else if(this.props.scores[findScoreIndex].scoreArr[n] > 4 && this.props.scores[findScoreIndex].scoreArr[n] <= 5) {
                                                                                bgClassScore = ' bg-green';
                                                                            }
                                                                        }
                                                                            scoreTds.push(<td className={ bgClassScore } key={'scoreTextCol'+n+"-"+processes[i].child[j].child[k].child[l].child[m].id} onClick={!processes[i].TotalAvgScore ? (e) => this.enterScore(e, n, processes[i].child[j].child[k].child[l].child[m].id) : () => {}}>
                                                                            <span className="ScoreLabels" style={{display: this.state['enterScoreLabel'+processes[i].child[j].child[k].child[l].child[m].id]}}>{this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''}</span>
                                                                            <Input type="text" className="ScoreText" name={"score"+n+"-"+processes[i].child[j].child[k].child[l].child[m].id} onBlur={(e) => this.handleScoreOnBlur(e, n, processes[i].child[j].child[k].child[l].child[m].id,'5')} style={{display: this.state['enterScore'+processes[i].child[j].child[k].child[l].child[m].id]}} defaultValue={this.props.scores[findScoreIndex] ? this.props.scores[findScoreIndex].scoreArr[n] : ''} autoFocus />
                                                                            </td>);
                                                                    }
                                                                }
                                                                if(processes[i].child[j].child[k].child[l].child[m].action != "delete"){
                                                                    scoreGrid.push(<tr rel={processes[i].child[j].child[k].child[l].child[m].number} id={'scoreTextRow-'+i+'-'+j+'-'+k+'-'+l+'-'+m+processes[i].child[j].child[k].child[l].child[m].id} key={'scoreTextRow-'+i+'-'+j+'-'+k+'-'+l+'-'+m+processes[i].child[j].child[k].child[l].child[m].id}>{scoreTds}</tr>)
                                                                }
                        }
                    
                    }
                
                
                }
             
                
            
            }
        }
        
        let mechanismCols = this.props.mechanisms.map((mechanism, i) => {
            if(mechanism.UsedFlag === "1") {
                return(
                    <th key={'mechanismCol-'+i}><p title={mechanism.ScoreCriteriaTitle}>{mechanism.ScoreCriteriaTitle}</p></th>
                )
            }
        })
       
        return (
            
            <div className="processes-tree-sec2" id="table-containerhead">
                {/* <div className="processes-tree-sec2-scrl-1">
                   <div className="score-scroll"></div>
                </div> */}
                <div className="processes-tree-sec2-scrl-2 scroll-child posrel-class" >
                {/* <h3 className="scoring-text">Scoring Mechanisms</h3>
                <p className="blank-p-style">&nbsp;</p>
                    */}
                <table className="table table-bordered bg-white">
                    <caption>Scoring Mechanisms</caption>
                    <thead>
                    <tr id="theadId">
                        { mechanismCols }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        scoreGrid
                    }
                     
                       
                    </tbody>
                </table>
                
                </div>
                
            </div>                
            
        )
    }
}
export default ScoringMechanisms