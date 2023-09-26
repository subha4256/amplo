import React from 'react';

class Service extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render () {
        let services = this.props.state.services;
        console.log(services);
        return (
         <div>
             <select className="form-control">
                
             </select>
         </div>
        )
    }
}

export default Service;
