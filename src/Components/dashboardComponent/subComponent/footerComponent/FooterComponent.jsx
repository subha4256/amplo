import React from "react";
//import login_image from '../../../../common/images/LogIn_image.png';
import "./footer.css";

export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="bg-white py-4">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>
              <i>Powered by Amploglobal</i>
            </span>
          </div>
        </div>
      </footer>
    );
  }
}
