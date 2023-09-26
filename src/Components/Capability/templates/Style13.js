import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Style13Css from './Style13.css';
import withImportantStyle from 'react-with-important-style';
class Style13 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processTitle0:"Add Process",
            processTitle1:"Add Process",
            processTitle2:"Add Process",
            processTitle3:"Add Process",
            processTitle4:"Add Process",
        }
    }
    handleTitleChange(e,index){
        this.setState({
            ['processTitle'+index]: e.target.value
        })
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
        this.props.handleSaveData();
    }
    render() {
        var Div = withImportantStyle('div');
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
        //console.log(this.props.processData);
        let fname = 'function'+this.props.functionId;
        let pname = 'phase'+this.props.phaseId;
        let ratingClass = this.props.ratingClass;
        let processClass=this.props.processClass;
        return(
            <>
                <div className={"box " + processClass + "  sm-txt class13-1 w-100 vl-top h-68s3 w-150px pstyle13 cuswidth146px"+ratingClass} style={{display:(this.props.i === 0)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 0) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel0'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                </div>}
                 </div>
                
                <div className={"box " + processClass + "  sm-txt class13-1 w-100 vl-top h-41s3 h-64-three w-150px cuswidth146px"+ratingClass} style={{display:(this.props.i === 1)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 1) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel1'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                </div>}
                </div>
                
                <div className={"box " + processClass + "  sm-txt class13-1 w-100 vl-top h-41s3 h-41-three w-150px cuswidth146px"+ratingClass} style={{display:(this.props.i === 2)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 2) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel2'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
               {this.props.isEditableProcess && <div style={{display:"block",position:"relative",zIndex:'9999'}}>
                <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                </div>}
                 </div>

                <div className={"vrt-box vl-top "+ratingClass} style={{display:(this.props.i === 3 || this.props.i === 4)?"inline-block" : 'none'}}>
                    
                    <div className={"box class13 " + processClass + " sm-txt vl-top mr-2"+ratingClass} style={{display:(this.props.i === 3)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 3) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span className="vtext vtext-temp3" style={{display: this.state['showLabel3'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="mt01" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                    {this.props.isEditableProcess &&<div style={{position: 'relative',display:"block",position:"relative",zIndex:'9999'}}>
                    <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer',position: "absolute" , top: "208px" , right: "12px"}} ></span>
                    </div>}
                     </div>
                    
                    <div className={"box class13-2 " + processClass + " vl-top sm-txt"+ratingClass} style={{display:(this.props.i === 4)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 4) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span className="vtext vtext-temp3" style={{display: this.state['showLabel4'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="mt01" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                    {this.props.isEditableProcess &&<div style={{position: 'relative',display:"block",position:"relative",zIndex:'9999'}}>
                    <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer',position: "absolute" , top: "208px" , right: "12px"}} ></span>
                    </div>}
                     </div>
                </div>
            </>
        )
    }
}

export default Style13;