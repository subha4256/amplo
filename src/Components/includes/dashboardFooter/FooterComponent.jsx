import React from "react";
//import login_image from '../../../../common/images/LogIn_image.png';
import "./footer.css";

export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="bg-white dashfooter">
        <div className="container my-auto">
          {/* <div className="copyright text-center my-auto"> */}
          <div className="copyright text-center my-auto d-flex justify-content-center align-items-center">
            <span>Powered by</span> {<img src={ require('../../../common/images/AmploFooter.svg') } className="footer-logo" alt="Logo" /> }
          </div>
          {/* {<img src={ require('../../../common/images/AmploFooter.svg') } className="logo-img" alt="Logo" /> }
            <span>
              <i>Powered by Amploglobal</i> */}
            {/* </span> */}
          {/* </div> */}
        </div>
      </footer>
    );
  }
}
