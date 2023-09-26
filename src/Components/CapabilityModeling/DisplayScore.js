import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Label} from 'reactstrap';

class DisplayScore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            processes: [],
            parent : {}
        }
    }

    
    render() {
        console.log("data_displayscore",this.props.data);
        let dependent=this.props.data?this.props.data.filter((item)=>item.IsDependent=='1'):[];
        let independent=this.props.data?this.props.data.filter((item)=>item.IsDependent=='0'):[];
        return (
            <div style={{marginLeft:'5px'}}>
                {dependent.length>0?
                <React.Fragment>
                <Label><b>Dependent Capabilities</b></Label>
                {dependent.map((item)=>{
                    return(
                        <React.Fragment>
                        <div>
                        Name-{item.CausalName}
                        </div>
                        <div>
                        Final Score-{item.FinalScore}
                        </div>
                        <br/>
                        </React.Fragment>
                    )
                })}
                </React.Fragment>:''}
                {independent.length>0?
                <React.Fragment>
                <Label><b>Independent Capabilities</b></Label>
                {independent.map((item)=>{
                    return(
                        <React.Fragment>
                        <div>
                        Name-{item.CausalName}
                        </div>
                        <div>
                        Value-{item.Value}
                        </div>
                        <br/>
                        </React.Fragment>
                    )
                })}
                </React.Fragment>:''}

            </div>

        )
    }
}
const mapStateToProps = state => ({
    srchArray: state.Search.srchArray
})
export default connect(mapStateToProps, null)(DisplayScore);