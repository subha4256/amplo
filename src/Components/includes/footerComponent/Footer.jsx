import React from 'react';
import './footer.css';
export default class Footer extends React.Component{
    constructor(props){
           super(props);
    }
    render(){
        return(
            
<footer className="background-color">
     <div className="container-fluid py-3">
    <div className="container">
      <div className="row">
        <div className="col-md-6">

          <div className="d-inline-block">
            <div className=" d-inline-block twitter"><a href="#"><i className="fa fa-twitter"></i></a>
            </div>
            <div className=" d-inline-block facebook"><a href="#"><i className="fa fa-facebook-square" ></i></a>
            </div>
            <div className="d-inline-block linkedin"><a href="#"><i className="fa fa-linkedin-square" ></i></a>
            </div>
        
            <p className="footer-text"><a href="#"> TERMS OF SERVICE</a> | <a href="#"> PRIVACY POLICY</a></p>

          </div>

            
        </div>
        <div className="col-md-6" id="footer-div">

            <div className="col-sm-11 text-white">
                <div><h4><img className="diva-logo" src={ require('../../../common/images/amplofly-white.png') }
                      alt="AmploFly 4.0" /></h4>
                    <p> &copy; 2019 Amplo (AmploFly 4.0). All rights reserved.</p>
                </div>
            </div>
            

        </div>
      </div>
    </div>
    </div>
</footer>
    );
    }

}
