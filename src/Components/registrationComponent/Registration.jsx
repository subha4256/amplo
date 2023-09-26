import React from 'react';
import './registration.css'
import RegisterHeader from '../includes/registerHeader/RegisterHeader';
import Footer from '../includes/footerComponent/Footer';
import {Link} from 'react-router-dom';
import ApiServer from './../../common/js/ApiServices.js';
import SimpleReactValidator from 'simple-react-validator';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import $ from 'jquery';


export default class Registration extends React.Component{
    constructor(props){
           super(props);
           this.apiServer=new ApiServer();
           this.restrictedDomains=[];
           this.userEmailValidationMessage='';
           this.state={
             revenueCollection:[],
             industryCollection:[],
            
             validationError:{
              organisation:false,
              division:false,
              Industry:false,
              organisationrevenue:false,
              fn:false,  
              ln:false,
              email1:false,
              password:false,
              rePassword:false,
              ph2:false,

             },
             registrationData:{
              rePassword:'',
              organisation:'',
              division:'',
              parentCompany:'',
              organisationrevenue:'',
              Industry:'',
              fn:'',
              mn:'',
              ln:'',
              email1:'',
              password:'',
              ph2:'',
              dt:new Date().toString()

             },
             showPasswordInstruction:false,
             termCheck:false
           }
           this.validator = new SimpleReactValidator({
              element:(message)=>{
              return <p className="text-danger" >{message}</p>
            },
             autoForceUpdate:this
           });
    }
    componentDidMount(){
      this.fetchRevenueCollection();
      this.fetchIndustryCollection();
      this.fetchRestrictedDomain();
      $('.legendF').focus((event)=>{
        $(event.target).prev().css('visibility','visible');
        this.forceUpdate();
      });
      $('.legendF').blur((event)=>{
        $(event.target).prev().css('visibility','hidden');
        this.forceUpdate();
      });
    }
    
    fetchRestrictedDomain(){
      return this.apiServer.SendRequest({
        method: 'GET',
        url: '/restrictedDomain.php',
        data: ''
      })
        .then(result => {
          if (result) {
            this.restrictedDomains=result;
          }
            
            
          })
        .catch(error => {
         console.log(error)
        });
    }
    fetchRevenueCollection(){
      return this.apiServer.SendRequest({
        method: 'GET',
        url: '/dbPopulationRevenue.php',
        data:''
      })
        .then(result => {
          if (result) {
            
            this.setState({ revenueCollection: result });
          } else {
            //this.setState({ Redirect: true });
          }
        })
        .catch(error => {
         console.log(error)
        });
    }
    fetchIndustryCollection(){
      return this.apiServer.SendRequest({
        method: 'GET',
        url: '/dbPopulationIndustry.php',
        data: ''
      })
        .then(result => {
          if (result) {
            
            this.setState({ industryCollection: result });
          } else {
            //this.setState({ Redirect: true });
          }
        })
        .catch(error => {
         console.log(error)
        });
    }
    registerUser(event){
      if(this.validator.allValid())
      {
        if(this.state.validationError.ph2 &&  this.state.registrationData.ph2!='')
        {
          if(this.state.validationError.rePassword &&  this.state.registrationData.rePassword!='')
          {
            if(this.state.validationError.email1 &&  this.state.registrationData.email1!='')
            {
        
      this.apiServer.SendRequest({
        method: 'POST',
        url: '/registration_sep.php',
        data: this.state.registrationData
      })
        .then(result => {
          if (result) {
            alert(result.message)
            //this.setState({ industryCollection: result });
          } else {
            alert('Sorry Registration Failed');
          }
        })
        .catch(error => {
          alert('Sorry Registration Failed');

        });
      }
      else{
        this.setState({validationError:{...this.state.validationError,'email1':true}})

      }
    }
      else{
        this.setState({validationError:{...this.state.validationError,'rePassword':true}})
      
      }
    }
  
      else{
        this.setState({validationError:{...this.state.validationError,'ph2':true}})
      }
      }
      else{
        this.validator.showMessages();
        let validationArray={...this.state.validationError};
        for(let key in validationArray){
          if(validationArray[key]==false && this.state.registrationData[key]=='')
          validationArray[key]=true;
        }
        this.setState({
          validationError:validationArray
        });
        this.validator.hideMessageFor('termCheck')

        if(!this.validator.fieldValid('termCheck'))
        {
          alert("You must accept the terms and conditions")
        }
      }
    }
    showValidationMessage(event){
      if(this.validator.fieldValid(event.target.id)){
        this.validator.hideMessageFor(event.target.id);
        this.setState({
          validationError:{...this.state.validationError,[event.target.id]:false}
        });

      }
      else{
        this.validator.showMessageFor(event.target.id);
        this.setState({
          validationError:{...this.state.validationError,[event.target.id]:true}
        });
      }
    }
    showValidationPhone(validStatus){
      if(validStatus){
       
        this.setState({
          validationError:{...this.state.validationError,'ph2':false}
        });

      }
      else{
        this.setState({
          validationError:{...this.state.validationError,'ph2':true}
        });
      }
    }
    showEmailValidation(){
      if(this.state.registrationData.email1==''){
        this.setState({
          validationError:{...this.state.validationError,email1:true}
        });
        this.forceUpdate();
      }
    }
    handleUserEmailChange(event){
      
      this.setState({
        registrationData:{...this.state.registrationData,'email1':event.target.value}
      });
      let emailRegEx=new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm);
      if(emailRegEx.test(event.target.value)){

        let domainArray=event.target.value.split("@");
        let userDomain=domainArray[domainArray.length-1].split(".");
        console.log(userDomain);
        if(this.restrictedDomains.includes(userDomain[0])){
          this.userEmailValidationMessage='You are trying to register from restricted domains '+this.restrictedDomains.join(',');
          this.setState({
            validationError:{...this.state.validationError,email1:true}
          });
          this.forceUpdate();
        }
        else{
          this.userEmailValidationMessage='';
          this.setState({
            validationError:{...this.state.validationError,email1:false}
          });
          this.forceUpdate();
        }
      }
      else{
        this.userEmailValidationMessage='Invalid Email';
        this.setState({
          validationError:{...this.state.validationError,email1:true}
        });
        this.forceUpdate();



      }
    }
    showConfPasswordValidationMessage(){
      if(this.state.registrationData.rePassword==''){
        this.setState({
          validationError:{...this.state.validationError,'rePassword':true}
        });
        this.forceUpdate();
      }

    }
    handleConfPasswordChange(event){
      this.setState({
        registrationData:{...this.state.registrationData,'rePassword':event.target.value}
      });
  if(event.target.value==this.state.registrationData.password){
        this.setState({
          validationError:{...this.state.validationError,'rePassword':false}
        });
        this.forceUpdate();
      }
      else{
        this.setState({
          validationError:{...this.state.validationError,'rePassword':true}
        });
        this.forceUpdate();
      }
    }
    handleInputChange(event){
      this.setState({
        registrationData:{...this.state.registrationData,[event.target.id]:event.target.value}
      });
    }
    handlePhoneInputChange(validationStatus,phone,country){
      
      
        console.log("passing");
      this.setState({
        registrationData:{...this.state.registrationData,'ph2':phone,ph:country.dialCode}
      });
      if(/^[0-9]*$/.test(phone))
      {
      if(validationStatus){
        
        this.setState({
          validationError:{...this.state.validationError,'ph2':false}
        });
        

      }
      else{
        this.setState({
          validationError:{...this.state.validationError,'ph2':true}
        });
      }
    }
    else{
      this.setState({
        validationError:{...this.state.validationError,'ph2':true}
      });
    }
     
    }
    render(){
        return([
    <RegisterHeader></RegisterHeader>,
    <div className="container">


    <div className="main-header">
        <h1 className="hidden-xs hidden-sm">Register as Enterprise User</h1>
        <p><span id="p1"> Use your work email to create new account.</span> <b> Amplo Employees? <a href="#" > <u>Sign Up Here</u></a></b></p>
    </div>


    <h5 className="org"> Your Organization</h5>
    <form id="f1">
                        <div className="form-row">
                            <div className="col-md-6">
                                <legend className="legends">Organization<span className="star">*</span></legend>
                                <input type="text" className="form-control legendF compul"
                                 id="organisation" placeholder="Organization*" 
                                 value={this.state.registrationData.organisation}
                                 onChange={this.handleInputChange.bind(this)}
                                  onBlur={this.showValidationMessage.bind(this)}
                                  onKeyUp={this.showValidationMessage.bind(this)}
                                  style={this.state.validationError.organisation?{borderColor:'red'}:{}}
                                 />
                                  {
                                  this.validator.message('organisation', 
                                  this.state.registrationData.organisation, 
                                  'required|alpha_num',
                                  {messages:
                                  {
                                    required:'Organisation name is required',
                                    alpha_num:'Special characters are not allowed',
                                                                      

                          
                                  }
                                  })}
                            </div>                
                 
                            <div className="col-md-6">
                                <legend className="legends">Division<span className="star">*</span></legend>
                                <input type="text" className="form-control legendF" 
                                id="division" placeholder="division*"
                                value={this.state.registrationData.division}
                                onChange={this.handleInputChange.bind(this)}
                                onBlur={this.showValidationMessage.bind(this)}
                                onKeyUp={this.showValidationMessage.bind(this)}
                                style={this.state.validationError.division?{borderColor:'red'}:{}}

                               />
                               {
                                  this.validator.message('division', 
                                  this.state.registrationData.division, 
                                  'required|regex:^[a-zA-Z0-9\']+$',
                                  {messages:
                                  {
                                    required:'Division is required',
                                    regex:'Special characters are not allowed except single quotes'
                          
                                  }
                                  })}
                               
                            </div>
                        </div>

                        
                        <div className="form-row">
                            <div className="col-md-6">
                                <legend className="legends">Parent Company</legend>
                                <input type="text" className="form-control legendF" id="parentCompany"
                                 placeholder="Parent Company" 
                                 value={this.state.registrationData.parentCompany}
                                  onChange={this.handleInputChange.bind(this)}
                                />
                               
                            </div>

                            
                            <div className="col-md-6">
                                <legend className="legends">Industry<span className="star">*</span></legend>
                                <select id="Industry" className="form-control legendF compul"
                                 onChange={this.handleInputChange.bind(this)}
                                 onBlur={this.showValidationMessage.bind(this)}
                                 style={this.state.validationError.Industry?{borderColor:'red'}:{}}
                                 >
                                 
                                    <option selected disabled>Industry*</option>
                                    {this.state.industryCollection.map(industry=>(
                                      <option key={industry.ID} value={industry.ID}>{industry.valueToShow}</option>
                                    )
                                    )}
                                                                    

                                  </select>
                                  {
                                  this.validator.message('Industry', 
                                  this.state.registrationData.Industry, 
                                  'required',
                                  {messages:
                                  {
                                    required:'Industry type is required',
                          
                                  }
                                  })}
                            </div>
       
                     </div>
                       
                        <div className="form-row">
                            <div className="col-md-6">
                                <legend className="legends">Subscription</legend>
                             <input type="text" className="form-control legendF" id="perComp" placeholder="Subscription" name="parentCompany"/>
                            
                            </div>
                          
                            <div className="col-md-6" id="rev">
                                <legend className="legends">Organization Revenue<span className="star">*</span></legend>
                                 <select id="organisationrevenue" className="form-control legendF compul"
                                  onChange={this.handleInputChange.bind(this)}
                                  onBlur={this.showValidationMessage.bind(this)}
                                  style={this.state.validationError.organisationrevenue?{borderColor:'red'}:{}}
                                  >
                              <option selected disabled>Organization Revenue*</option>
                              {this.state.revenueCollection.map(revenue=>(
                                      <option value={revenue.ID}>{revenue.valueToShow}</option>
                                    )
                                    )}                       

                          </select>
                                {
                                  this.validator.message('organisationrevenue', 
                                  this.state.registrationData.organisationrevenue, 
                                  'required',
                                  {messages:
                                  {
                                    required:'Revenue of organization is required',
                          
                                  }
                                  })}
                   
                            </div>
                        </div>


                        <h5> Personal Information</h5>

                        
                            <div className="form-row">
                                <div className="col-md-6">
                                    <legend className="legends">First Name<span className="star">*</span></legend>
                                    <input type="text" className="form-control legendF compul" id="fn"
                                    onChange={this.handleInputChange.bind(this)}
                                    onBlur={this.showValidationMessage.bind(this)}
                                    onKeyUp={this.showValidationMessage.bind(this)} 
                                    placeholder="First Name*" 
                                    style={this.state.validationError.fn?{borderColor:'red'}:{}}
                
                                    />
                                    {
                                  this.validator.message('fn', 
                                  this.state.registrationData.fn, 
                                  'required|alpha_num_space',
                                  {messages:
                                  {
                                    required:'First name is required',
                                    alpha_num_space:'Special characters except spaces are not allowed'
                          
                                  }
                                  })}
                                   
                                </div>

                                <div className="col-md-6">
                                    <legend className="legends">Middle Name</legend>
                                    <input type="text" className="form-control legendF" 
                                    id="mn" placeholder="Middle Name" 
                                    onChange={this.handleInputChange.bind(this)}
                                    onKeyUp={this.showValidationMessage.bind(this)}
 
                                    />
                                   
                                </div>
                            </div>

                            
                            <div className="form-row">
                                <div className="col-md-6">
                                    <legend className="legends">Last Name<span className="star">*</span></legend>
                                    <input type="text" className="form-control legendF compul"
                                     id="ln" placeholder="Last Name*"
                                     onChange={this.handleInputChange.bind(this)} 
                                     onBlur={this.showValidationMessage.bind(this)} 
                                     onKeyUp={this.showValidationMessage.bind(this)}
                                     style={this.state.validationError.ln?{borderColor:'red'}:{}}
                                     />
                                       {
                                  this.validator.message('ln', 
                                  this.state.registrationData.ln, 
                                  'required|alpha_num_space',
                                  {messages:
                                  {
                                    required:'Last name is required',
                                    alpha_num_space:'Special characters except spaces are not allowed'

                          
                                  }
                                  })}
                                   
                                   
                                </div>


                                <div className="col-md-6">
                                    <legend className="legends">Phone Number<span className="star">*</span></legend>
                                    <span type="tel" id='telInput' className=" legendF" placeholder="Phone Number*" name="ph1" size=""></span> 
                                    <IntlTelInput
                                    inputClassName={this.state.validationError.ph2?
                                                  'form-control validation-border-color':'form-control'}
                                    fieldId="ph2"
                                    telInputProps={{type:'number'}}
                                    placeholder ='phone number'
                                    style={{width:"100%"}}
                                    onPhoneNumberChange={this.handlePhoneInputChange.bind(this)}
                                    onPhoneNumberBlur={this.showValidationPhone.bind(this)}
                                    ></IntlTelInput>
                                          <div className="clearfix"></div>
                                     {(
                                  
                                  this.state.validationError.ph2?
                                  <p className="phn-text-danger">{this.state.registrationData.ph2? 
                                    'Invalid Phone Number':'Phone number is required'}</p>
                                  :'' 
                                     )}
                              </div>
                            </div>

                            <h5 className="cl"> Create Login</h5>

                            <div className="form-row">
                                <input type="hidden" name="dt" id="dt"/> 
                                    <div className="col-sm-6 clogin">
                                            <legend className="legends">Username(Email)<span className="star">*</span></legend>
                                      <input type="email" className="form-control legendF compul" id="email1"  
                                      placeholder="Username(Email)*" 
                                      onChange={this.handleUserEmailChange.bind(this)} 
                                      onBlur={this.showEmailValidation.bind(this)}
                                      
                                      style={this.state.validationError.email1?{borderColor:'red'}:{}}

                                      />
                                      {
                                        this.state.validationError.email1?
                                        <p className="text-danger">{this.state.registrationData.email1===''?
                                        'Username is required':this.userEmailValidationMessage}
                                        </p>:''
                                      }
                                            <legend className="legends">Password<span className="star">*</span></legend>

                                      <input type="Password" id="password"  className="form-control legendF compul pass" 
                                       placeholder="Password*" value={this.state.registrationData.password}
                                       onChange={this.handleInputChange.bind(this)}
                                       onBlur={this.showValidationMessage.bind(this)}
                                       onKeyUp={this.showValidationMessage.bind(this)}
                                       style={this.state.validationError.password?{borderColor:'red'}:{}}
                                       onFocus={()=>this.setState({showPasswordInstruction:true})}   
                                       />
                                        {
                                  this.validator.message('password', 
                                  this.state.registrationData.password, 
                                  ['required',{regex:'(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16}))'}],
                                  {messages:
                                  {
                                    regex:'Invalid Password',
                                    required:'password is required',
                          
                                  }
                                  })}
                                            <legend className="legends">Confirm Password<span className="star">*</span></legend>
                                      <input type="Password" id="rePassword" 
                                       className="form-control legendF compul pass" 
                                        placeholder="Confirm Password*"  name="repassword"
                                        onChange={this.handleConfPasswordChange.bind(this)}
                                        onBlur={this.showConfPasswordValidationMessage.bind(this)}
                                       
                                        style={this.state.validationError.rePassword?{borderColor:'red'}:{}}
                                         />
                                         {
                                           this.state.validationError.rePassword?
                                           <p className="text-danger">{this.state.registrationData.rePassword?
                                          'Your confirm password does not match with password':'please re-type your password'}</p>:''
                                         }
                                        
                                    <div className="form-check">
                                      <input className="form-check-input" 
                                      type="checkbox" id="gridCheck"
                                      onClick={(event)=>this.setState({termCheck:event.target.checked})}
                                       />
                                      <label className="form-check-label tc"   for="gridCheck">
                                         I have read the <a href="javascript:void(0)"> <u>Terms and Conditions.</u></a>
                                      </label>
                                     
                                    </div>
                                    {
                                  this.validator.message('termCheck', 
                                  this.state.termCheck, 
                                  'accepted',
                                  {messages:
                                    {
                                      accepted:'as',
                                      
                            
                                    }
                                    }
                                  )}
                                    </div> 
                                    {this.state.showPasswordInstruction?
                                    <div className="col-sm-6" id="passSpecs">
                                        <h6 className="passwrd-req"><b>Password Requirements:</b></h6>
                                      <p className="para1"  id="para1">Must be at least 8 characters in length, with a
                                maximum of 16 characters.<br/>
                                Must include at least one letter and one number.<br/>
                                Must include one lower case letter.<br/>
                                Must include one upper case letter.<br/>
                                Must include at least one special characters (such
                                as "!" "&" and "+")<br/>
                                Password is case-sensitive.</p>
                        </div>
                       :''}

                </div>
                        
                        <div className="form-row">
                            <div className="col-md-6">
                                <button className="create-account" id="submit_button" type="button" onClick={this.registerUser.bind(this)}> CREATE ACCOUNT</button>
                            </div>
                            <div className="col-md-6">
                                <button className="login"> <Link to="/" className="login-anchor">Have an Account? LOG IN</Link></button>
                            </div>
                        </div>
                    

</form>
</div>
    ,
<Footer></Footer>
    ]);
    }

}
