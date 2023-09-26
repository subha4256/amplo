import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toastify extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false
        }
    }
    render() {
        return (
          <div>
            <ClipLoader
              style={sweetLoader}
              sizeUnit={"px"}
              size={150}
              color={'#123abc'}
              loading={this.props.loading}
            />
          </div>
        )
      }
}
export default Toastify;