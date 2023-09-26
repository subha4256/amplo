import React from 'react';
import './login.css';
import {Link} from 'react-router-dom';
import login_image from '../../common/images/login_image.png';
import Header from '../includes/headerComponent/Header';
import Footer from '../includes/footerComponent/Footer';
import SimpleReactValidator from 'simple-react-validator';
import ApiServer from './../../common/js/ApiServices.js';

export default class Login extends React.Component{
    constructor(props){
           super(props);
           this.state={
            uname:'',
            psw:'',
            validationError:{
              uname:false,
              psw:false
            }
           }
           this.validator = new SimpleReactValidator({
            element:(message)=>{
              return <p className="text-danger" >{message}</p>
            },
            autoForceUpdate:this
          });
          this.apiServer=new ApiServer();

    }
    showValidationMessage(event){
      if(this.validator.fieldValid(event.target.name)){
        this.validator.hideMessageFor(event.target.name);
        this.setState({
          validationError:{...this.state.validationError,[event.target.name]:false}
        });
      }
      else{
        this.validator.showMessageFor(event.target.name);
        this.setState({
          validationError:{...this.state.validationError,[event.target.name]:true}
        });
      }
    }
    handleInputChange(event){
      this.setState({
        [event.target.name]:event.target.value
      });
    }
    submitForm(event){
      if(this.validator.allValid())
      {
      this.apiServer.SendRequest({
        method: 'POST',
        url: '/login_validiate.php',
        data: {uname:this.state.uname,psw:this.state.psw}
      })
        .then(result => {
          if (result) {
            alert(result.message);
            //this.setState({ industryCollection: result });
          } else {
            alert('Sorry login attempt failed');
          }
        })
        .catch(error => {
          alert('Sorry login attempt failed');

        });
      }
      else{
        this.validator.showMessages();
        if(this.state.validationError.uname==false && this.state.uname==''){
          this.setState({
            validationError:{...this.state.validationError,uname:true}
          });
        }
        if(this.state.validationError.psw==false && this.state.psw==''){
          this.setState({
            validationError:{...this.state.validationError,psw:true}
          });
        }
       
      }
    }
    render(){
        return([
    <Header></Header>,
    <div className="container_body">
  <div className="row">
    <div className="col-md-6 cust-section">
      <div className="img-head">
      <h1  className="title">AI-POWERED ASSESSMENTS</h1>
        <p  className="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus sed erat ac posuere. Sed
        et tristique nibh, consectetur sodales odio.</p>
      </div>
        <img src={login_image} className="img-responsive" alt="LogIn_image"/>

    </div>
    <div className="col-md-6 cust-section from_area">
      
            <div className="divition_diva"></div>
        
                    
            <div className="col-login-diva">
                    <h1  className="title_log">Log in to AmploFly 4.0</h1>
                 <form>
                    <label>Username*</label>
                    <input type="text" className="form-control"
                     placeholder="Company Email" name="uname" id="uname"
                     onChange={this.handleInputChange.bind(this)}
                     onBlur={this.showValidationMessage.bind(this)}
                     onKeyUp={this.showValidationMessage.bind(this)}
                     style={this.state.validationError.uname?{borderColor:'red'}:{}}
                     />
                      {this.validator.message('uname', this.state.uname, 
                      'required|email',{messages:
                        {
                          required:'Username is required',
                          email:'Invalid email'
                      }})}

                    <label>Password*</label>
                    <input type="password" className="form-control" 
                    placeholder="Password" name="psw" id="psw"
                    onChange={this.handleInputChange.bind(this)}
                    onKeyUp={this.showValidationMessage.bind(this)}
                    onBlur={this.showValidationMessage.bind(this)}
                    style={this.state.validationError.psw?{borderColor:'red'}:{}}

                     />
                    {this.validator.message('psw', this.state.psw, 'required',{
                      messages:{
                        required:'Password is required',
                      }

                    })}

                    <label>
                      <input className="remember_input" type="checkbox" checked="checked" name="remember"/> Remember me
                    </label>
                    <p id="message"></p>
                    <button type="button" className="form-control submit-login-diva" 
                        name="submit"
                     onClick={this.submitForm.bind(this)}>
                     Log in
                     </button>
                </form>
                  <div>
                          <p className="psw"><a href="#"><u>I forgot my password</u></a></p>


                            <p className="tarm">By clicking Sign In, you agree to the
                        Amplo(AmploFly 4.0) <a href="#">Terms of Service</a>, Amplo(AmploFly 4.0) <a href="#">Terms of Use</a>
                        and have read and acknowledge our <a href="#">Privacy Statement.</a></p>
                </div>
                <div className="queary" >
                    <p className="reg-now">New User?<Link to="/registration"> Register Now</Link></p>
                    <p className="sign-here">Amplo Employees?  <a href="#"> <u>Sign Up here</u></a></p>

                    <p>Invisible reCAPTCHA by Google<a href="#"> Privacy Policy</a> and <a href="#"> Terms of Use</a>.</p>
                </div>
            </div>

        </div>
    </div>
</div>,
<Footer></Footer>
    ]);
    }

}
