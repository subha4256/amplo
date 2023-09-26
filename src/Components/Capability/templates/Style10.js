import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Style10Css from './Style10.css';
class Style10 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleEditProcess(index) {
        this.setState({
            ['showLabel'+index]: false
        })
    }
    handleTitleBlur(index) {
        this.setState({
            ['showLabel'+index]: true
        })
    }
    render() {
        let borderBlue = 'transparent';
        let filteredCount = 0;
        if(this.props.processData.ProcessLevel1Name ){
            filteredCount =this.props.getValueByKey(this.props.processData.ProcessLevel1Name,this.props.fname1,this.props.pname1)
        }
        if(filteredCount > 0){
            borderBlue = 'Blue';
        }
        let AggrScore = "";
        let Rank = "";
        if(this.props.processData.AggrScore && this.props.processData.Status === "3"){
         AggrScore =parseFloat(this.props.processData.AggrScore).toFixed(2)+" -"
         Rank = "Rank- #" + this.props.processData.Rank
        }
        let ratingClass = this.props.ratingClass;
        let processClass=this.props.processClass;
        //console.log(this.props.processData);
        let fname = 'function'+this.props.functionId;
        let pname = 'phase'+this.props.phaseId;
        return(
            <>
                <div className={"box " + processClass + "  sm-txt w-100 mb10 h-32-ten"+ratingClass} style={{display:(this.props.i === 0)? 'block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 1) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel0'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                </div>}
                 </div>
                <div className={"box " + processClass + "  sm-txt w-100 mb10 h-32-ten"+ratingClass} style={{display:(this.props.i === 1)? 'block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 2) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel1'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                </div>}
                 </div>
                <div className={"box " + processClass + "  sm-txt w-100 h-76-ten"+ratingClass} style={{display:(this.props.i === 2)? 'block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 3) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel2'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                </div>}
                </div>
                <div className={"box " + processClass + "  sm-txt w-100 h-61-ten"+ratingClass} style={{display:(this.props.i === 3)? 'block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 4) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel3'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                </div>}
                 </div>
            </>
        )
    }
}

export default Style10;