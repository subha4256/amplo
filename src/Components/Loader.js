import React, {Component } from 'react';

// First way to import
import { PulseLoader } from 'react-spinners';

const override = {
  position: 'fixed',
  top:'0',
  left:'0',
  bottom:'0',
  right:'0',
  zIndex:'9999',
  display: 'inline-flex',
  justifyContent:'center',
  alignItems:'center',
  background: 'rgba(0,0,0,0.5)'
  
};

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false
        }
        
    }
    render() {
      const sweetLoader={
        position: 'fixed',
        top:'0',
        left:'0',
        bottom:'0',
        right:'0',
        zIndex:'9999',
        display: 'inline-flex',
        justifyContent:'center',
        alignItems:'center',
        background: 'rgba(0,0,0,0.5)'
      }
        return (
          // <div style={this.props.loading ? sweetLoader : null}>
          //   <PulseLoader
          //     style={override}
          //     sizeUnit={"px"}
          //     size={15}
          //     margin="5px"
          //     color={'#083ac8'}
          //     loading={this.props.loading}
          //   />
          // </div>
          <>
          </>
        )
      }
}
export default Loader;