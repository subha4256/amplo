import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Style3Css from './Style3.css';
import withImportantStyle from 'react-with-important-style';

class Style3 extends Component {
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
        var Div = withImportantStyle('div');
        let borderBlue = 'transparent';
        let filteredCount = 0;
        if(this.props.processData.ProcessLevel1Name){
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
                {/* <div className="">
                    <div className="mr-2">
                        <div className="d-flex">
                         <div className="disblock" style={{display:"inline-block"}}> */}
                            <div className={"box " + processClass + "  sm-txt vl-top w-100 mr-1 h-49-three cuswidth70px"+ratingClass} style={{display:(this.props.i === 0)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 0) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel0'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span> 
                            {this.props.isEditableProcess &&<div style={{ marginTop: "15px",display:"block",position:"relative",zIndex:'9999'}}>
                            <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                            </div> }
                            </div>
                            <div className={"box " + processClass + "  sm-txt vl-top w-100 ml-1 h-49-three cuswidth70px"+ratingClass} style={{display:(this.props.i === 1)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 1) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel1'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span> 
                            
                            {this.props.isEditableProcess &&<div style={{ marginTop: "15px",display:"block",position:"relative",zIndex:'9999'}}>
                            <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                            </div> }
                            </div>
                        {/* </div>
                         </div> */}
                        <div className={"box " + processClass + "  sm-txt w-100 vl-top h003 h-41-three cuswidth146px"+ratingClass} style={{display:(this.props.i === 2)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 2) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel2'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span> 
                        {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                        <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                        </div>}
                   </div>
                        <div className={"box " + processClass + "  sm-txt w-100 vl-top h-64-three cuswidth146px"+ratingClass} style={{display:(this.props.i === 3)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 3) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel3'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                        {this.props.isEditableProcess &&<div style={{display:"block",position:"relative",zIndex:'9999'}}>
                        <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                        </div>} 
                        </div>
                        <div className={"box " + processClass + "  sm-txt w-100 vl-top h003 h-41-three cuswidth146px"+ratingClass} style={{display:(this.props.i === 4)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 4) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span style={{display: this.state['showLabel4'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="lineclamp2" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                       {this.props.isEditableProcess && <div style={{display:"block",position:"relative",zIndex:'9999'}}>
                        <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer'}} ></span>
                        </div>} 
                   </div>
                    {/* </div>*/}
                    {/* <div>  */}
                        <div className={"vrt-box vl-top "+ratingClass} style={{display:(this.props.i === 5 || this.props.i === 6)?"inline-block" : 'none'}}>
                            <div className={"box absolute1class3 " + processClass + " sm-txt vl-top mr-2"+ratingClass} style={{display:(this.props.i === 5)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 5) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span className="vtext vtext-temp3" style={{display: this.state['showLabel5'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="mt01" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                            {this.props.isEditableProcess &&<div style={{position: 'relative',display:"block",position:"relative",zIndex:'9999'}}>
                            <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer',  position: "absolute" , top: "212px" , right: "12px"}} ></span>
                            </div>} 
                             </div>
                            <div className={"box absolute2class3 " + processClass + " vl-top sm-txt"+ratingClass} style={{display:(this.props.i === 6)? 'inline-block' : 'none', border:`1px solid ${borderBlue}`}} onDragStart={!this.props.modelingMode ? (e) => this.props.handleGridDragStart(e, fname, pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID, 6) : () => {}} draggable onDragOver={(e) => this.props.handleDragOver(e)} onDrop={(e) => this.props.handleDrop(e, fname,pname, this.props.fname1,this.props.pname1, this.props.processData.ProcessLevel1Name, this.props.processData.DecompositionProcessLevel1ID)}><span className="vtext vtext-temp3" style={{display: this.state['showLabel6'] === false ? 'none' : 'inline-block'}}>{this.props.processData ? <Link className="mt01" to={"/capability-modeling/"+this.props.templateId+"/"+this.props.processData.DecompositionProcessLevel1ID+"/"+this.props.functionId+"/"+this.props.phaseId+"/"+this.props.modelingMode+"/"+this.props.defaultVersion} title={this.props.processData.ProcessLevel1Name + '\n' + Rank}>{AggrScore+" "+this.props.processData.ProcessLevel1Name}</Link> : 'Add Process'}</span>
                            {this.props.isEditableProcess &&<div style={{position: 'relative',display:"block",position:"relative",zIndex:'9999'}}>
                            <span className="fa fa-edit float-left" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'edit')} style={{ cursor: 'pointer'}} ></span><span className="fa fa-times text-danger float-right" onClick={()=>this.props.selectProcessLevelBox(this.props.processData.DecompositionProcessLevel1ID,'delete')} style={{ cursor: 'pointer', position: "absolute" , top: "212px" , right: "12px"}} ></span>
                            </div>}    
                             </div>
                         </div>
                    {/* </div> */}
                {/*</div> */}
            </>
        )
    }
}

export default Style3;