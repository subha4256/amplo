import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import { responseMessage } from '../../utils/alert';
import Search from '../common/Search/Search';
class Processes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            processes: [],
            parent : {}
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            processes: nextProps.processes,
        })
        if(nextProps.viewLock == 1){
            this.viewChangeHandler();
            nextProps.viewLockHandle()
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.myFunction, true);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.myFunction);
    }
    myFunction = () => {
        var header =
            document.getElementById("table-container");
        var header1 = document.getElementById("table-containerhead");
        if (header1 != null) {
            var sticky = header1.offsetTop;
        }

        //alert("x");
        if (header != null) {
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
            }
            else {
                header.classList.remove("sticky");
            }
        }
    }
    handleAddProcess = (column) => {
        // console.log(this.state.parentId)
        //console.log( refs )
        //refs 
        this.props.onClickhandleAddProcess(column)
    };
    handleCustomerOrder = (parent, processLevel) => {
        this.setState({
            parentId: parent.id,
            parent: parent
        })
        this.props.onClickhandleCustomerOrders(parent.id, processLevel, parent)
    };
    getKeyByValue(object, value) { 
        let x=[];
        for (let prop in object) { 
            if (object.hasOwnProperty(prop)) { 
                if (object[prop] === value) 
                x.push(prop); 
            } 
        } 
        return x;
    }
    viewChangeHandler(){
        let ans = this.getKeyByValue(this.state, '-webkit-box'); 
        for (let i in ans){
            if(ans[i].includes('displayTitleText')){
                let title = ans[i].replace('Text', '');
                this.setState({ 
                    [ans[i]] : 'none',
                    [title] : '-webkit-box'
                });
            }
        }
    }
    editTitle(processLevel, index) {
        this.viewChangeHandler();
        
        this.setState({
            ['displayTitle' + processLevel + index]: 'none',
            ['displayTitleText' + processLevel + index]: '-webkit-box',
        })
        //console.log('displayTitleText'+processLevel+index);
        //setTimeout(document.getElementById('processTextL2'+index).focus(), 1000);
        //setTimeout(function(){ document.getElementById('processText'+processLevel+index).focus(); }, 1000)
        //console.log('a');

    }
    saveTitle(e, processLevel, index, gridId) {
        this.setState({
            ['displayTitle' + processLevel + index]: '-webkit-box',
            ['displayTitleText' + processLevel + index]: 'none'
        });
        //this.props.saveTitle(e, gridId, processLevel);
        if (/^[a-zA-Z0-9.,# %$!/&()_-]*$/.test(e.target.value)) {
            this.props.saveTitle(e, gridId, processLevel);
        } else {
            responseMessage("warning", "No special character allowed except . , # % $ ! / & () _ and -", "");
        }
    }
    render() {
        const { processes } = this.state;
        // console.log(this.props.processes,"props")
        // console.log(processes,"state")
        // console.log(processes)
        //console.log(this.props.srchArray);
        //console.log(JSON.stringify( processes,null,4 ))
        //console.log(this.state.processes);
        //const { refs } = this.props

        return (
            <div className="processes-tree-sec1" id="table-containerhead">
                <h2 className="l1tol2processlabel">L1 to L5 Processes</h2>

                <div className="processes-box top-level-box" id="table-container" style={{ zIndex: "999" }}>
                    <div className="box box-col-1">
                        <div className="top-head">
                            <h3 className="bg-color">L1</h3>
                            <p>Click on box for L2 -L5 & enter process name, drag & drop to reorder</p>
                        </div>
                    </div>
                    <div className="box box-col-2">
                        <div className="top-head">
                            <h3 className="bg-color">L2</h3>
                            <p className="p-icon text-center"><i className={this.props.selectedCol === 'L1' ? 'fas fa-plus' : 'fas fa-plus disableIcon'} onClick={processes.length > 0 && !processes[0].TotalAvgScore ? () => this.handleAddProcess("L2") : () => { }}></i> <i className={this.props.selectedCol === 'L2' ? 'fas fa-minus' : 'fas fa-minus disableIcon'} onClick={this.props.handleDeleteProcess}></i></p>
                        </div>
                    </div>
                    <div className="box box-col-3">
                        <div className="top-head">
                            <h3 className="bg-color">L3</h3>
                            <p className="p-icon text-center"><i className={this.props.selectedCol === 'L2' ? 'fas fa-plus' : 'fas fa-plus disableIcon'} onClick={processes.length > 0 && !processes[0].TotalAvgScore ? () => this.handleAddProcess("L3") : () => { }}></i> <i className={this.props.selectedCol === 'L3' ? 'fas fa-minus' : 'fas fa-minus disableIcon'} onClick={this.props.handleDeleteProcess}></i></p>
                        </div>
                    </div>
                    <div className="box box-col-4">
                        <div className="top-head">
                            <h3 className="bg-color">L4</h3>
                            <p className="p-icon text-center"><i className={this.props.selectedCol === 'L3' ? 'fas fa-plus' : 'fas fa-plus disableIcon'} onClick={processes.length > 0 && !processes[0].TotalAvgScore ? () => this.handleAddProcess("L4") : () => { }} ></i> <i className={this.props.selectedCol === 'L4' ? 'fas fa-minus' : 'fas fa-minus disableIcon'} onClick={this.props.handleDeleteProcess}></i></p>
                        </div>

                    </div>
                    <div className="box box-col-5">
                        <div className="top-head border-right-0">
                            <h3 className="bg-color">L5</h3>
                            <p className="p-icon text-center"><i className={this.props.selectedCol === 'L4' ? 'fas fa-plus' : 'fas fa-plus disableIcon'} onClick={processes.length > 0 && !processes[0].TotalAvgScore ? () => this.handleAddProcess("L5") : () => { }} ></i> <i className={this.props.selectedCol === 'L5' ? 'fas fa-minus' : 'fas fa-minus disableIcon'} onClick={this.props.handleDeleteProcess}></i></p>
                        </div>
                    </div>
                </div>

                <div className="processes-box processes-box-b">

                    <ul className="processes-tree-list">
                        {
                            processes ?
                                processes.map(function (item, i) {
                                    // console.log(item.TotalAvgScore)
                                    let bgClass = '';
                                    if (item.TotalAvgScore != null) {
                                        bgClass = ' bg-red';
                                        if (item.TotalAvgScore > 1 && item.TotalAvgScore <= 2) {
                                            bgClass = ' bg-orange';
                                        } else if (item.TotalAvgScore > 2 && item.TotalAvgScore <= 3) {
                                            bgClass = ' bg-yellow';
                                        } else if (item.TotalAvgScore > 3 && item.TotalAvgScore <= 4) {
                                            bgClass = ' bg-light-green';
                                        } else if (item.TotalAvgScore > 4 && item.TotalAvgScore <= 5) {
                                            bgClass = ' bg-green';
                                        }
                                    }
                                    let srchBorder = '';
                                    if (this.props.srchArray.includes(item.id)) {
                                        srchBorder = "2px solid blue";
                                    }
                                    let realNodeIndexL2 = 0;
                                    let realNodeIndexL3 = 0;
                                    let realNodeIndexL4 = 0;
                                    let realNodeIndexL5 = 0;
                                    let nodeIndexL3 = null;
                                    let nodeIndexL4 = null;
                                    let nodeIndexL5 = null;
                                    return (
                                        <li key={i}  >
                                            <div className={"order-block borderL1" + bgClass} style={{ border: srchBorder }} onClick={item.TotalAvgScore == null ? () => this.handleCustomerOrder(item, 'L1') : () => { }} >
                                                {(this.props.modelingMode==0)?<a href="#" className="popup-icon" data-toggle="modal" data-target="#modelingPopup" onClick={()=>this.props.selectedProcessChange(item)}>
                                                    <i className="fas fa-ellipsis-h" style={{pointerEvents:"none"}}></i>
                                                </a>:""}
                                                <p className="order-number">1  {item.TotalAvgScore != null ? <span className="float-right">{item.TotalAvgScore}</span> : <></>}</p>
                                                <p className="l1-itemtext" title={item.text}>{item.text}</p>

                                            </div>
                                            <ul>
                                                {
                                                    item.child ? item.child.map(function (itemL2, indexL2) {
                                                        if (itemL2.action !== "delete") {
                                                            realNodeIndexL2++;
                                                            let bgClass2 = '';
                                                            if (itemL2.TotalAvgScore != null) {
                                                                bgClass2 = ' bg-red';
                                                                if (itemL2.TotalAvgScore > 1 && itemL2.TotalAvgScore <= 2) {
                                                                    bgClass2 = ' bg-orange';
                                                                } else if (itemL2.TotalAvgScore > 2 && itemL2.TotalAvgScore <= 3) {
                                                                    bgClass2 = ' bg-yellow';
                                                                } else if (itemL2.TotalAvgScore > 3 && itemL2.TotalAvgScore <= 4) {
                                                                    bgClass2 = ' bg-light-green';
                                                                } else if (itemL2.TotalAvgScore > 4 && itemL2.TotalAvgScore <= 5) {
                                                                    bgClass2 = ' bg-green';
                                                                }
                                                            }
                                                            let srchBorder2 = '';
                                                            if (this.props.srchArray.includes(itemL2.id)) {
                                                                srchBorder2 = "2px solid blue";
                                                            }
                                                            return (
                                                                <li className="child first-child" key={indexL2}  >
                                                                    <div className={"order-block borderL2" + bgClass2} style={{ border: srchBorder2 }} onClick={itemL2.TotalAvgScore == null ? () => this.handleCustomerOrder(itemL2, 'L2') : () => { }} >
                                                                    {this.props.modelingMode==0?<a href="#" className="popup-icon" data-toggle="modal" data-target="#modelingPopup" onClick={()=>this.props.selectedProcessChange(itemL2)}>
                                                                        <i className="fas fa-ellipsis-h" style={{pointerEvents:"none"}}></i>
                                                                    </a>:""}
                                                                        <p className="order-number">{'1.' + realNodeIndexL2}</p>
                                                                        <p className="grid-title" onClick={itemL2.TotalAvgScore == null ? this.editTitle.bind(this, 'L2', itemL2.id) : () => { }} style={{ display: this.state['displayTitleL2' + itemL2.id] }} title={itemL2.text}>{itemL2.text}{itemL2.TotalAvgScore != null ? <span className="float-right spanscore">{itemL2.TotalAvgScore}</span> : <></>}</p>
                                                                        {itemL2.TotalAvgScore == null ? <p style={{ display: this.state['displayTitleTextL2' + itemL2.id] }} className="displayText"><input type="text" id={'processTextL2' + itemL2.id} name={'processTextL2-' + indexL2} defaultValue={itemL2.text} onBlur={(e) => this.saveTitle(e, 'L2', itemL2.id, itemL2.id)} /></p> : <></>}
                                                                    </div>
                                                                    <ul className="processes-step1">
                                                                        {
                                                                            itemL2.child ?
                                                                                itemL2.child.map(function (itemL3, indexL3) {
                                                                                    if (indexL3 === 0) {
                                                                                        nodeIndexL3 = 0;
                                                                                    }
                                                                                    if (itemL3.action !== "delete") {
                                                                                        realNodeIndexL3++;
                                                                                        nodeIndexL3++;
                                                                                        let bgClass3 = '';
                                                                                        if (itemL3.TotalAvgScore != null) {
                                                                                            bgClass3 = ' bg-red';
                                                                                            if (itemL3.TotalAvgScore > 1 && itemL3.TotalAvgScore <= 2) {
                                                                                                bgClass3 = ' bg-orange';
                                                                                            } else if (itemL3.TotalAvgScore > 2 && itemL3.TotalAvgScore <= 3) {
                                                                                                bgClass3 = ' bg-yellow';
                                                                                            } else if (itemL3.TotalAvgScore > 3 && itemL3.TotalAvgScore <= 4) {
                                                                                                bgClass3 = ' bg-light-green';
                                                                                            } else if (itemL3.TotalAvgScore > 4 && itemL3.TotalAvgScore <= 5) {
                                                                                                bgClass3 = ' bg-green';
                                                                                            }
                                                                                        }
                                                                                        let srchBorder3 = '';
                                                                                        if (this.props.srchArray.includes(itemL3.id)) {
                                                                                            srchBorder3 = "2px solid blue";
                                                                                        }
                                                                                        return (
                                                                                            <li className="child" key={indexL3}  >
                                                                                                <div className={"order-block borderL3" + bgClass3} style={{ border: srchBorder3 }} onClick={itemL3.TotalAvgScore == null ? () => this.handleCustomerOrder(itemL3, 'L3') : () => { }} >
                                                                                                {this.props.modelingMode==0?<a href="#" className="popup-icon" data-toggle="modal" data-target="#modelingPopup" onClick={()=>this.props.selectedProcessChange(itemL3)}>
                                                                                                        <i className="fas fa-ellipsis-h" style={{pointerEvents:"none"}}></i>
                                                                                                    </a>:""}
                                                                                                    <p className="order-number">{'1.' + realNodeIndexL2 + '.' + nodeIndexL3}</p>
                                                                                                    <p className="grid-title" onClick={itemL3.TotalAvgScore == null ? this.editTitle.bind(this, 'L3', itemL3.id) : () => { }} style={{ display: this.state['displayTitleL3' + itemL3.id] }} title={itemL3.text}>{itemL3.text}
                                                                                                        {itemL3.TotalAvgScore != null ? <span className="float-right spanscore">{itemL3.TotalAvgScore}</span> : <></>}</p>
                                                                                                    {itemL3.TotalAvgScore == null ? <p style={{ display: this.state['displayTitleTextL3' + itemL3.id] }} className="displayText"><input type="text" id={'processTextL3' + itemL3.id} name={'processTextL3-' + indexL3} defaultValue={itemL3.text} onBlur={(e) => this.saveTitle(e, 'L3', itemL3.id, itemL3.id)} /></p> : <></>}
                                                                                                </div>
                                                                                                <ul className="processes-step2">
                                                                                                    {
                                                                                                        itemL3.child ?
                                                                                                            itemL3.child.map(function (itemL4, indexL4) {
                                                                                                                if (indexL4 === 0) {
                                                                                                                    nodeIndexL4 = 0;
                                                                                                                }
                                                                                                                if (itemL4.action !== "delete") {
                                                                                                                    nodeIndexL4++;

                                                                                                                    realNodeIndexL4++;
                                                                                                                    let bgClass4 = '';
                                                                                                                    if (itemL4.TotalAvgScore != null) {
                                                                                                                        bgClass4 = ' bg-red';
                                                                                                                        if (itemL4.TotalAvgScore > 1 && itemL4.TotalAvgScore <= 2) {
                                                                                                                            bgClass4 = ' bg-orange';
                                                                                                                        } else if (itemL4.TotalAvgScore > 2 && itemL4.TotalAvgScore <= 3) {
                                                                                                                            bgClass4 = ' bg-yellow';
                                                                                                                        } else if (itemL4.TotalAvgScore > 3 && itemL4.TotalAvgScore <= 4) {
                                                                                                                            bgClass4 = ' bg-light-green';
                                                                                                                        } else if (itemL4.TotalAvgScore > 4 && itemL4.TotalAvgScore <= 5) {
                                                                                                                            bgClass4 = ' bg-green';
                                                                                                                        }
                                                                                                                    }
                                                                                                                    let srchBorder4 = '';
                                                                                                                    if (this.props.srchArray.includes(itemL4.id)) {
                                                                                                                        srchBorder4 = "2px solid blue";
                                                                                                                    }
                                                                                                                    return (
                                                                                                                        <li className="child" key={indexL4}   >
                                                                                                                            <div className={"order-block borderL4" + bgClass4} style={{ border: srchBorder4 }} onClick={itemL4.TotalAvgScore == null  ? () => this.handleCustomerOrder(itemL4, 'L4') : () => { }} >
                                                                                                                            {this.props.modelingMode==0?<a href="#" className="popup-icon" data-toggle="modal" data-target="#modelingPopup" onClick={()=>this.props.selectedProcessChange(itemL4)}>
                                                                                                                                <i className="fas fa-ellipsis-h" style={{pointerEvents:"none"}}></i>
                                                                                                                            </a>:""}
                                                                                                                                <p className="order-number">{'1.' + realNodeIndexL2 + '.' + nodeIndexL3 + '.' + nodeIndexL4}</p>
                                                                                                                                <p className="grid-title" onClick={itemL4.TotalAvgScore == null ? this.editTitle.bind(this, 'L4', itemL4.id) : () => { }} style={{ display: this.state['displayTitleL4' + itemL4.id] }} title={itemL4.text}>{itemL4.text}{itemL4.TotalAvgScore != null ? <span className="float-right spanscore">{itemL4.TotalAvgScore}</span> : <></>}</p>
                                                                                                                                {itemL4.TotalAvgScore == null ? <p style={{ display: this.state['displayTitleTextL4' + itemL4.id] }} className="displayText"><input type="text" id={'processTextL4' + itemL4.id} name={'processTextL4-' + indexL4} defaultValue={itemL4.text} onBlur={(e) => this.saveTitle(e, 'L4', itemL4.id, itemL4.id)} /></p> : <></>}
                                                                                                                            </div>
                                                                                                                            <ul className="processes-step3">
                                                                                                                                {
                                                                                                                                    itemL4.child ?
                                                                                                                                        itemL4.child.map(function (itemL5, indexL5) {
                                                                                                                                            if (indexL5 === 0) {
                                                                                                                                                nodeIndexL5 = 0;
                                                                                                                                            }
                                                                                                                                            if (itemL5.action !== "delete") {
                                                                                                                                                realNodeIndexL5++;
                                                                                                                                                nodeIndexL5++;
                                                                                                                                                let bgClass5 = '';
                                                                                                                                                if (itemL5.TotalAvgScore != null) {
                                                                                                                                                    bgClass5 = ' bg-red';
                                                                                                                                                    if (itemL5.TotalAvgScore > 1 && itemL5.TotalAvgScore <= 2) {
                                                                                                                                                        bgClass5 = ' bg-orange';
                                                                                                                                                    } else if (itemL5.TotalAvgScore > 2 && itemL5.TotalAvgScore <= 3) {
                                                                                                                                                        bgClass5 = ' bg-yellow';
                                                                                                                                                    } else if (itemL5.TotalAvgScore > 3 && itemL5.TotalAvgScore <= 4) {
                                                                                                                                                        bgClass5 = ' bg-light-green';
                                                                                                                                                    } else if (itemL5.TotalAvgScore > 4 && itemL5.TotalAvgScore <= 5) {
                                                                                                                                                        bgClass5 = ' bg-green';
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                                let srchBorder5 = '';
                                                                                                                                                if (this.props.srchArray.includes(itemL5.id)) {
                                                                                                                                                    srchBorder5 = "2px solid blue";
                                                                                                                                                }
                                                                                                                                                return (
                                                                                                                                                    <li className="child" key={indexL5}  >
                                                                                                                                                        <div className={"order-block borderL5" + bgClass5} style={{ border: srchBorder5 }} onClick={itemL5.TotalAvgScore == null ? () => this.handleCustomerOrder(itemL5, 'L5') : () => { }} >
                                                                                                                                                        {this.props.modelingMode==0?<a href="#" className="popup-icon" data-toggle="modal" data-target="#modelingPopup" onClick={()=>this.props.selectedProcessChange(itemL5)}>
                                                                                                                                                                <i className="fas fa-ellipsis-h" style={{pointerEvents:"none"}}></i>
                                                                                                                                                            </a>:""}
                                                                                                                                                            <p className="order-number">{'1.' + realNodeIndexL2 + '.' + nodeIndexL3 + '.' + nodeIndexL4 + '.' + nodeIndexL5}</p>
                                                                                                                                                            <p className="grid-title" onClick={itemL5.TotalAvgScore == null ? this.editTitle.bind(this, 'L5', itemL5.id) : () => { }} style={{ display: this.state['displayTitleL5' + itemL5.id] }} title={itemL5.text}>{itemL5.text}{itemL5.TotalAvgScore != null ? <span className="float-right spanscore">{itemL5.TotalAvgScore}</span> : <></>}</p>
                                                                                                                                                            {itemL5.TotalAvgScore == null ? <p style={{ display: this.state['displayTitleTextL5' + itemL5.id] }} className="displayText"><input type="text" id={'processTextL5' + itemL5.id} name={'processTextL5-' + indexL5} defaultValue={itemL5.text} onBlur={(e) => this.saveTitle(e, 'L5', itemL5.id, itemL5.id)} /></p> : <></>}
                                                                                                                                                        </div>
                                                                                                                                                    </li>
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        }, this)
                                                                                                                                        : null
                                                                                                                                }
                                                                                                                            </ul>
                                                                                                                        </li>
                                                                                                                    )
                                                                                                                }
                                                                                                            }, this)
                                                                                                            : null
                                                                                                    }

                                                                                                </ul>
                                                                                            </li>
                                                                                        )
                                                                                    }
                                                                                }, this)
                                                                                : null
                                                                        }

                                                                    </ul>
                                                                </li>
                                                            )
                                                        }
                                                    }, this) : null
                                                }

                                            </ul>
                                        </li>
                                    )
                                }, this)
                                : null
                        }
                    </ul>

                </div>

            </div>

        )
    }
}
const mapStateToProps = state => ({
    srchArray: state.Search.srchArray
})
export default connect(mapStateToProps, null)(Processes);