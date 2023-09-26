import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'reactstrap';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidUpdate(nextProps) {
        if (nextProps.viewLock == 1) {
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
    getKeyByValue(object, value) {
        let x = [];
        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (object[prop] === value)
                    x.push(prop);
            }
        }
        return x;
    }
    viewChangeHandler() {
        let ans = this.getKeyByValue(this.state, '-webkit-box');
        for (let i in ans) {
            if (ans[i].includes('displayTitleText')) {
                let title = ans[i].replace('Text', '');
                this.setState({
                    [ans[i]]: 'none',
                    [title]: '-webkit-box'
                });
            }
        }
    }
    editTitle(id, column) {
        this.viewChangeHandler();
        this.setState({
            ['displayTitle' + id + column]: 'none',
            ['displayTitleText' + id + column]: '-webkit-box'
        })
        this.props.DetailsChangeHandler()
    }
    saveDetail(e, column, id) {
        this.props.handleSaveDetail(id, e.target.value, column);
        this.setState({
            ['displayTitle' + id + column]: '-webkit-box',
            ['displayTitleText' + id + column]: 'none'
        })
    }

    handleSelectChange(e, id, column) {
        this.props.handleSaveDetail(id, e.target.value, column);
        this.setState({
            ['displayTitle' + id + column]: '-webkit-box',
            ['displayTitleText' + id + column]: 'none'
        })
    }
    myFunction = () => {
        var header =
            document.getElementById("theadId1");
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

    render() {
        const { processes } = this.props;
        let PriorityWeightage = [];
        if (this.props.priorityweightage.length > 0) {
            PriorityWeightage = this.props.priorityweightage.map((project, i )=> {
                return(
                <option value={project.Weightage} key={project.ID}>{project.Priority}</option>
            )
            });
        }
        let scoreGrid = []
        console.log("processes_deep",processes);
        console.log("processes_deep1",this.props.priorityweightage);
        for (let i in processes) { // L1
            let selectedid=this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].priority))[0].Weightage:0
            scoreGrid.push(<tr key={'scoreTextRow-' + i + '-' - processes[i].id}>
                <td><span className="detailsLabel" onClick={this.editTitle.bind(this, processes[i].id, 'owner')} style={{ display: this.state['displayTitle' + processes[i].id + 'owner'] }}>{processes[i].owner}</span><Input type="text" className="detailsText" name={'owner-' + processes[i].id} defaultValue={processes[i].owner} onBlur={(e) => this.saveDetail(e, 'owner', processes[i].id)} style={{ display: this.state['displayTitleText' + processes[i].id + 'owner'] }} /></td>
                <td><span className="detailsLabel" onClick={this.editTitle.bind(this, processes[i].id, 'country')} style={{ display: this.state['displayTitle' + processes[i].id + 'country'] }}>{processes[i].country}</span><Input type="text" className="detailsText" name={'country-' + processes[i].id} defaultValue={processes[i].country} onBlur={(e) => this.saveDetail(e, 'country', processes[i].id)} style={{ display: this.state['displayTitleText' + processes[i].id + 'country'] }} /></td>
                <td>
                    <span className="detailsLabel" onClick={this.editTitle.bind(this, processes[i].id, 'priority')} style={{ display: this.state['displayTitle' + processes[i].id + 'priority'] }}>
                            <span>{this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].priority))[0].Priority:'Medium'}</span>
                    </span>
                    <select className="detailsText" defaultValue={selectedid} name={'priority-' + processes[i].id} style={{ display: this.state['displayTitleText' + processes[i].id + 'priority'] }} onChange={(e) => this.handleSelectChange(e, processes[i].id, 'priority')}>
                    <option value="">Select</option>
                        {PriorityWeightage}
                    </select></td>

            </tr>)
            for (let j in processes[i].child) { // L2
                if (processes[i].child[j].action !== "delete") {
            let selectedid=this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].priority))[0].Weightage:0
                    scoreGrid.push(<tr key={'scoreTextRow-' + i + '-' + j + '-' + processes[i].child[j].id}>
                        <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].id, 'owner') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].id + 'owner'] }}>{processes[i].child[j].owner}</span><Input type="text" className="detailsText" name={'owner-' + processes[i].child[j].id} defaultValue={processes[i].child[j].owner} onBlur={(e) => this.saveDetail(e, 'owner', processes[i].child[j].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].id + 'owner'] }} /></td>
                        <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].id, 'country') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].id + 'country'] }}>{processes[i].child[j].country}</span><Input type="text" className="detailsText" name={'country-' + processes[i].child[j].id} defaultValue={processes[i].child[j].country} onBlur={(e) => this.saveDetail(e, 'country', processes[i].child[j].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].id + 'country'] }} /></td>
                        <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].id, 'priority') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].id + 'priority'] }}>
                        <span>{this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].priority))[0].Priority:'Medium'}</span>
                        </span>
                            <select className="detailsText" defaultValue={selectedid} name={'priority-' + processes[i].child[j].id} style={{ display: this.state['displayTitleText' + processes[i].child[j].id + 'priority'] }} onChange={(e) => this.handleSelectChange(e, processes[i].child[j].id, 'priority')}>
                            <option value="">Select</option>
                            {PriorityWeightage}
                            </select></td>
                    </tr>)
                    for (let k in processes[i].child[j].child) { // L3
                        if (processes[i].child[j].child[k].action !== "delete") {
                            let selectedid=this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].priority))[0].Weightage:0
                            scoreGrid.push(<tr key={'scoreTextRow-' + i + '-' + j + '-' + k + '-' + processes[i].child[j].child[k].id}>
                                <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].id, 'owner') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].id + 'owner'] }}>{processes[i].child[j].child[k].owner}</span><Input type="text" className="detailsText" name={'owner-' + processes[i].child[j].child[k].id} defaultValue={processes[i].child[j].child[k].owner} onBlur={(e) => this.saveDetail(e, 'owner', processes[i].child[j].child[k].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].id + 'owner'] }} /></td>
                                <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].id, 'country') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].id + 'country'] }}>{processes[i].child[j].child[k].country}</span><Input type="text" className="detailsText" name={'country-' + processes[i].child[j].child[k].id} defaultValue={processes[i].child[j].child[k].country} onBlur={(e) => this.saveDetail(e, 'country', processes[i].child[j].child[k].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].id + 'country'] }} /></td>
                                <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].id, 'priority') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].id + 'priority'] }}>
                                <span>{this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].priority))[0].Priority:'Medium'}</span>
                                </span>
                                    <select className="detailsText" name={'priority-' + processes[i].child[j].child[k].id} defaultValue={selectedid} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].id + 'priority'] }} onChange={(e) => this.handleSelectChange(e, processes[i].child[j].child[k].id, 'priority')}>
                                    <option value="">Select</option>
                                    {PriorityWeightage}
                                    </select></td>
                            </tr>)

                            for (let l in processes[i].child[j].child[k].child) { // L4
                                if (processes[i].child[j].child[k].child[l].action !== "delete") {
                            let selectedid=this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].priority))[0].Weightage:0
                                    scoreGrid.push(<tr key={'scoreTextRoww-' + i + '-' + j + '-' + k + '-' + l + '-' + processes[i].child[j].child[k].child[l].id}>
                                        <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].child[l].id, 'owner') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].child[l].id + 'owner'] }}>{processes[i].child[j].child[k].child[l].owner}</span><Input type="text" className="detailsText" name={'owner-' + processes[i].child[j].child[k].child[l].id} defaultValue={processes[i].child[j].child[k].child[l].owner} onBlur={(e) => this.saveDetail(e, 'owner', processes[i].child[j].child[k].child[l].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].child[l].id + 'owner'] }} /></td>
                                        <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].child[l].id, 'country') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].child[l].id + 'country'] }}>{processes[i].child[j].child[k].child[l].country}</span><Input type="text" className="detailsText" name={'country-' + processes[i].child[j].child[k].child[l].id} defaultValue={processes[i].child[j].child[k].child[l].country} onBlur={(e) => this.saveDetail(e, 'country', processes[i].child[j].child[k].child[l].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].child[l].id + 'country'] }} /></td>
                                        <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].child[l].id, 'priority') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].child[l].id + 'priority'] }}>
                                        <span>{this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].priority))[0].Priority:'Medium'}</span>
                                        </span>
                                            <select className="detailsText" name={'priority-' + processes[i].child[j].child[k].child[l].id} defaultValue={selectedid} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].child[l].id + 'priority'] }} onChange={(e) => this.handleSelectChange(e, processes[i].child[j].child[k].child[l].id, 'priority')}>
                                            <option value="">Select</option>
                                            {PriorityWeightage}
                                            </select></td>
                                    </tr>)

                                    for (let m in processes[i].child[j].child[k].child[l].child) { // L5
                                        if (processes[i].child[j].child[k].child[l].child[m].action !== "delete") {
                            let selectedid=this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].child[m].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].child[m].priority))[0].Weightage:0
                                            scoreGrid.push(<tr key={'scoreTextRow-' + i + '-' + j + '-' + k + '-' + l + '-' + m + '-' + processes[i].child[j].child[k].child[l].child[m].id}>
                                                <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].child[l].child[m].id, 'owner') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].child[l].child[m].id + 'owner'] }}>{processes[i].child[j].child[k].child[l].child[m].owner}</span>
                                                    <Input type="text" className="detailsText" name={'owner-' + processes[i].child[j].child[k].child[l].child[m].id} defaultValue={processes[i].child[j].child[k].child[l].child[m].owner} onBlur={(e) => this.saveDetail(e, 'owner', processes[i].child[j].child[k].child[l].child[m].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].child[l].child[m].id + 'owner'] }} />
                                                </td>
                                                <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].child[l].child[m].id, 'country') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].child[l].child[m].id + 'country'] }}>{processes[i].child[j].child[k].child[l].child[m].country}</span><Input type="text" className="detailsText" name={'country-' + processes[i].child[j].child[k].child[l].child[m].id} defaultValue={processes[i].child[j].child[k].child[l].child[m].country} onBlur={(e) => this.saveDetail(e, 'country', processes[i].child[j].child[k].child[l].child[m].id)} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].child[l].child[m].id + 'country'] }} /></td>
                                                <td><span className="detailsLabel" onClick={!processes[i].TotalAvgScore ? this.editTitle.bind(this, processes[i].child[j].child[k].child[l].child[m].id, 'priority') : () => { }} style={{ display: this.state['displayTitle' + processes[i].child[j].child[k].child[l].child[m].id + 'priority'] }}>
                                                <span>{this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].child[m].priority)).length>0?this.props.priorityweightage.filter((item)=>item.Weightage==parseFloat(processes[i].child[j].child[k].child[l].child[m].priority))[0].Priority:'Medium'}</span>
                                                </span>
                                                    <select className="detailsText" name={'priority-' + processes[i].child[j].child[k].child[l].child[m].id} defaultValue={selectedid} style={{ display: this.state['displayTitleText' + processes[i].child[j].child[k].child[l].child[m].id + 'priority'] }} onChange={(e) => this.handleSelectChange(e, processes[i].child[j].child[k].child[l].child[m].id, 'priority')}>
                                                    <option value="">Select</option>
                                                    {PriorityWeightage}
                                                    </select></td>
                                            </tr>)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return (
            <div className="processes-tree-sec3" id="table-containerhead">
                <table className="table table-bordered bg-white">
                    <caption>Details</caption>
                    <thead id="theadId1">
                        <tr>
                            <th>Owner <br /> <small>(Optional)</small></th>
                            <th>Country Specific <br /> <small>(Optional)</small></th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreGrid}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default Details