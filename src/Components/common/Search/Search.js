import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSrchAray } from '../../../actions/SearchAction';

//Component for search process in decomposition page

class Search extends Component {

    constructor(props) {
        super(props);
        this.typingDelay = null;
        this.state = {
            srchValue: '',
            srchArray: []
        }
        this.props.setSrchAray([]);
    }

    handleSearchChange = (e) => {
        this.valueModifyHandle(e.target.value);
        clearInterval(this.typingDelay);
        //.. delay calls 
        this.typingDelay = setInterval(() => {
            this.setState({ srchArray: [] });
            clearInterval(this.typingDelay);
            this.srchInObject();
            this.props.setSrchAray(this.state.srchArray);
        }, 1000);
    }
    valueModifyHandle = (val) => {
        this.setState({ srchValue: val.trim().toLowerCase() });
    }
    srchInObject = () => {
        //let srchArray = this.state.srchArray;
        console.log(this.props.processes);
        console.log(this.props.Aprocesses)
        const keyword = this.state.srchValue;
        if(this.props.processes.processes){
            if (this.props.processes.processes.length > 0 && keyword !== "") {
                const processes = this.props.processes.processes;
                for (let i in processes) {
                    if (processes[i].text.toLowerCase().includes(keyword)) {
                        this.addToSearchResult(processes[i].id);
                    }
                    if (processes[i].child && processes[i].child.length > 0) {
                        this.deepSearchInChild(processes[i]);
                    } 
                }
            }
         }
        else {
                if (this.props.Aprocesses.processes.length > 0 && keyword !== "") {
                const processes = this.props.Aprocesses.processes;
                for (let i in processes) {
                    if (processes[i].text.toLowerCase().includes(keyword)) {
                        this.addToSearchResult(processes[i].id);
                    }
                    if (processes[i].child && processes[i].child.length > 0) {
                        this.deepSearchInChild(processes[i]);
                    } 
                }
            }
        }
        
    }
    deepSearchInChild(obj) {
        if (obj.text.toLowerCase().includes(this.state.srchValue)) {
            this.addToSearchResult(obj.id);
        }

        if (obj.child !== undefined) {
            let children = obj.child;
            if (children.length > 0) {
                //.. loop thru them
                for (let i = 0; i < children.length; i++) {
                    const objval = obj.child[i];
                    this.deepSearchInChild(objval); // recursive search
                }
            }
        }
    }
    addToSearchResult(id) {
        let srchArray =  this.state.srchArray;
        srchArray.push(id)
        return this.setState({ srchArray });
    }
    // srchInChild = (processes, keyword, srchArray) => {
    //     for(let i in processes){
    //         if(processes[i].text.toLowerCase().includes(keyword)){
    //             srchArray.push(processes[i].id);
    //         }
    //         if(processes[i].child && processes[i].child.length > 0){
    //             this.srchInChild(processes[i].child, keyword, srchArray);
    //         }
    //         else{
    //             this.props.setSrchAray(srchArray);
    //             //break;
    //         }
    //     }
    // }

    render() {

        return (
            <div className="form-group has-search ml-auto">
                <input type="text" className="form-control" placeholder="Search" onChange={this.handleSearchChange.bind(this)} />
                <span className="fa fa-search form-control-search "></span>
            </div>)
    }
}
Search.propTypes = {
    setSrchAray: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    processes: state.capabilityModeling.processes,
    Aprocesses: state.adminCapabilityModeling.processes,
});

export default connect(mapStateToProps, { setSrchAray })(Search);