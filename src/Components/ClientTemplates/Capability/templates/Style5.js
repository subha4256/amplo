import React, {Component} from 'react';
import {Link} from  'react-router-dom';
import withImportantStyle from 'react-with-important-style';
class Style5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
             processTitle0:"Add Process",
            processTitle1:"Add Process",
            processTitle2:"Add Process",
            processTitle3:"Add Process",
            processTitle4:"Add Process",
            processTitle5:"Add Process",

        }
    }
    handleTitleChange(e,index){
        this.setState({
            ['processTitle'+index]: e.target.value
        })
        this.props.handleTitleChange(e, 'style5', index, this.props.functionId, this.props.phaseId);
    }
    handleEditProcess(index) {
        this.setState({
            ['showLabel'+index]: false
        })
    }
    handleTitleBlur(index, processId) {
        this.setState({
            ['showLabel'+index]: true
        })
        this.props.handleProcessTitleUpdate(processId, this.state['processTitle'+index]);
    }
    render() {
        var Div = withImportantStyle('div');
        let class0 = "box box-white sm-txt mr-1 h-64 fivwidthimp1";
        if(this.props.processData[0]) {
            if(this.props.processData[0].HasDecomposition === "1") {
                class0 = "box bg-average sm-txt mr-1 h-64 fivwidthimp1";
            }
        }
        let class1 = "box box-white sm-txt w-125 ml-1 h-64 fivwidthimp2";
        if(this.props.processData[1]) {
            if(this.props.processData[1].HasDecomposition === "1") {
                class1 = "box bg-average sm-txt w-125 ml-1 h-64 fivwidthimp2";
            }
        }
        let class2 = "box box-white sm-txt h-32five w-100";
        if(this.props.processData[2]) {
            if(this.props.processData[2].HasDecomposition === "1") {
                class2 = "box bg-average sm-txt h-32five w-100";
            }
        }
        let class3 = "box box-white sm-txt h-32five w-100";
        if(this.props.processData[3]) {
            if(this.props.processData[3].HasDecomposition === "1") {
                class3 = "box bg-average sm-txt h-32five w-100";
            }
        }
        let class4 = "box box-white sm-txt h-32five w-100";
        if(this.props.processData[4]) {
            if(this.props.processData[4].HasDecomposition === "1") {
                class4 = "box bg-average sm-txt h-32five w-100";
            }
        }
        let class5 = "box box-white sm-txt h-32five w-100";
        if(this.props.processData[5]) {
            if(this.props.processData[5].HasDecomposition === "1") {
                class5 = "box bg-average sm-txt h-32five w-100";
            }
        }
        return(
            <div className="style5">
                <div className="d-flex pstyle5">
                    <div className={class0} ><span className="spanforlink" title={this.state.processTitle0}  style={{display: this.state['showLabel0'] === false ? 'none' : 'block'}}>{this.props.processData[0] ? <Link className="lineclamp2" style={{paddingTop:"10px"}} to={"/client-capability-modeling/"+this.props.templateId+"/"+this.props.processData[0].processId+"/"+this.props.functionId+"/"+this.props.phaseId} title={this.props.processData[0].processTitle}>{this.props.processData[0].processTitle}</Link> : this.state.processTitle0}</span> <span className="fa fa-edit float-left" onClick={this.handleEditProcess.bind(this, 0)} style={{display: this.state['showLabel0'] === false ? 'none' : 'block'}}></span><span className="fa fa-times text-danger float-right" onClick={this.props.handleDeleteProcess.bind(this, this.props.processData[0])} style={{display: this.state['showLabel0'] === false ? 'none' : 'block'}}></span><input type="text" style={{display: this.state['showLabel0'] === false ? 'block' : 'none',width:"100%"}} onBlur={() => this.handleTitleBlur(0, this.props.processData[0].processId)} onChange={(e) => this.handleTitleChange(e,0)} value={this.props.processData[0] ? this.props.processData[0].processTitle : 'Add Process'} /></div>
                    <div className={class1} ><span className="spanforlink" title={this.state.processTitle1}  style={{display: this.state['showLabel1'] === false ? 'none' : 'block'}}>{this.props.processData[1] ? <Link className="lineclamp2" style={{paddingTop:"10px"}} to={"/client-capability-modeling/"+this.props.templateId+"/"+this.props.processData[1].processId+"/"+this.props.functionId+"/"+this.props.phaseId} title={this.props.processData[1].processTitle}>{this.props.processData[1].processTitle}</Link> : this.state.processTitle1}</span> <span className="fa fa-edit float-left" onClick={this.handleEditProcess.bind(this, 1)} style={{display: this.state['showLabel1'] === false ? 'none' : 'block'}}></span><span className="fa fa-times text-danger float-right" onClick={this.props.handleDeleteProcess.bind(this, this.props.processData[1])} style={{display: this.state['showLabel1'] === false ? 'none' : 'block'}}></span><input type="text" style={{display: this.state['showLabel1'] === false ? 'block' : 'none',width:"100%"}} onBlur={() => this.handleTitleBlur(1, this.props.processData[1].processId)} onChange={(e) => this.handleTitleChange(e,1)} value={this.props.processData[1] ? this.props.processData[1].processTitle : 'Add Process'} /></div>
                </div>
                <div className={class2}><span className="spanforlink" title={this.state.processTitle2}  style={{display: this.state['showLabel2'] === false ? 'none' : 'block'}}>{this.props.processData[2] ? <Link to={"/client-capability-modeling/"+this.props.templateId+"/"+this.props.processData[2].processId+"/"+this.props.functionId+"/"+this.props.phaseId} title={this.props.processData[2].processTitle}>{this.props.processData[2].processTitle}</Link> : this.state.processTitle2}</span> <span className="fa fa-edit float-left" onClick={this.handleEditProcess.bind(this, 2)} style={{display: this.state['showLabel2'] === false ? 'none' : 'block'}}></span><span className="fa fa-times text-danger float-right" onClick={this.props.handleDeleteProcess.bind(this, this.props.processData[2])} style={{display: this.state['showLabel2'] === false ? 'none' : 'block'}}></span><input type="text" style={{display: this.state['showLabel2'] === false ? 'block' : 'none',width:'100%'}} onBlur={() => this.handleTitleBlur(2, this.props.processData[2].processId)} onChange={(e) => this.handleTitleChange(e,2)} value={this.props.processData[2] ? this.props.processData[2].processTitle : 'Add Process'} /></div>
                <div className={class3}><span className="spanforlink" title={this.state.processTitle3}  style={{display: this.state['showLabel3'] === false ? 'none' : 'block'}}>{this.props.processData[3] ? <Link to={"/client-capability-modeling/"+this.props.templateId+"/"+this.props.processData[3].processId+"/"+this.props.functionId+"/"+this.props.phaseId} title={this.props.processData[3].processTitle}>{this.props.processData[3].processTitle}</Link> : this.state.processTitle3}</span> <span className="fa fa-edit float-left" onClick={this.handleEditProcess.bind(this, 3)} style={{display: this.state['showLabel3'] === false ? 'none' : 'block'}}></span><span className="fa fa-times text-danger float-right" onClick={this.props.handleDeleteProcess.bind(this, this.props.processData[3])} style={{display: this.state['showLabel3'] === false ? 'none' : 'block'}}></span><input type="text" style={{display: this.state['showLabel3'] === false ? 'block' : 'none',width:'100%'}} onBlur={() => this.handleTitleBlur(3, this.props.processData[3].processId)} onChange={(e) => this.handleTitleChange(e,3)} value={this.props.processData[3] ? this.props.processData[3].processTitle : 'Add Process'} /></div>
                <div className={class4}><span className="spanforlink" title={this.state.processTitle4}  style={{display: this.state['showLabel4'] === false ? 'none' : 'block'}}>{this.props.processData[4] ? <Link to={"/client-capability-modeling/"+this.props.templateId+"/"+this.props.processData[4].processId+"/"+this.props.functionId+"/"+this.props.phaseId} title={this.props.processData[4].processTitle}>{this.props.processData[4].processTitle}</Link> : this.state.processTitle4}</span> <span className="fa fa-edit float-left" onClick={this.handleEditProcess.bind(this, 4)} style={{display: this.state['showLabel4'] === false ? 'none' : 'block'}}></span><span className="fa fa-times text-danger float-right" onClick={this.props.handleDeleteProcess.bind(this, this.props.processData[4])} style={{display: this.state['showLabel4'] === false ? 'none' : 'block'}}></span><input type="text" style={{display: this.state['showLabel4'] === false ? 'block' : 'none',width:'100%'}} onBlur={() => this.handleTitleBlur(4, this.props.processData[4].processId)} onChange={(e) => this.handleTitleChange(e,4)} value={this.props.processData[4] ? this.props.processData[4].processTitle : 'Add Process'} /></div>
                <div className={class5}><span className="spanforlink" title={this.state.processTitle5}  style={{display: this.state['showLabel5'] === false ? 'none' : 'block'}}>{this.props.processData[5] ? <Link to={"/client-capability-modeling/"+this.props.templateId+"/"+this.props.processData[5].processId+"/"+this.props.functionId+"/"+this.props.phaseId} title={this.props.processData[5].processTitle}>{this.props.processData[5].processTitle}</Link> : this.state.processTitle5}</span> <span className="fa fa-edit float-left" onClick={this.handleEditProcess.bind(this, 5)} style={{display: this.state['showLabel5'] === false ? 'none' : 'block'}}></span><span className="fa fa-times text-danger float-right" onClick={this.props.handleDeleteProcess.bind(this, this.props.processData[5])} style={{display: this.state['showLabel5'] === false ? 'none' : 'block'}}></span><input type="text" style={{display: this.state['showLabel5'] === false ? 'block' : 'none',width:'100%'}} onBlur={() => this.handleTitleBlur(5, this.props.processData[5].processId)} onChange={(e) => this.handleTitleChange(e,5)} value={this.props.processData[5] ? this.props.processData[5].processTitle : 'Add Process'} /></div>
            </div>
        )
    }
}

export default Style5;