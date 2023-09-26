import React from 'react';
import { connect } from "react-redux";
import "./App.css";
import loading_img from "../common/images/loading.gif";

class DivaLoader extends React.Component {

  constructor(props) {
    super(props);

    this.loaderStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:'rgba(240,240,240, 0.5)',
        zIndex: 999999,  /* Soumen to remove the zIndex */

        top:document.querySelector('#root').offsetTop,
        left:document.querySelector('#root').offsetLeft,

        bottom: '0%',
        right: '0%',

        height:'100%',
        width:'100%', 

        position: 'fixed', 
    }
  }

  handleScrolling(loadingStatus){
    let action = loadingStatus ? 'add':'remove';
    document.querySelector('body').classList[action]('stop-scrolling');
  }

  render() {

    //disable scrolling
    this.handleScrolling(this.props.loadStatus)
    
      
    //.. TO-DO: Soumen to change the css so that z-index need not to apply
   

    return (
        (this.props.loadStatus) ?
        <div style={this.loaderStyle}>
            <img src={loading_img} width='40px' height='40px' alt="loading" />
        </div>
        : null
    );
  }
}


const mapStateToProps = state => ({
    loadStatus: state.api.isLoadingData
});

export default connect(
  mapStateToProps,
  null
)(DivaLoader);