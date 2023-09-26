import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {Form, FormGroup, Input, Label, Col} from 'reactstrap';
import { changePassword } from '../../actions/userActions';
const config = require('../../config');
class ProfileSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProfilePhotoPath: 'https://avatars.dicebear.com/v2/avataaars/example.svg',
            resetMode: false,
            old_password: "",
            password: "",
            confirm_password: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        if(this.props.profile.ProfilePhotoPath) {
            this.setState({ProfilePhotoPath: config.ApiBaseUrl+'images/'+this.props.profile.ProfilePhotoPath});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(Object.keys(nextProps.errors).length > 0 && nextProps.errors.data) {
            this.setState({
                errors: nextProps.errors.data
            })
        }
        if(nextProps.changePwdData){
            if(nextProps.changePwdData.status === "Success") {
                this.setState({
                    resetMode: false,
                    old_password: "",
                    password: "",
                    confirm_password: "",
                    errors: {}
                })
            }
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
        if(e.target.name === 'password') {
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!+%*_\-^:#?&])[A-Za-z\d@$!+%*_\-^:#?&]{8,16}$/.test(e.target.value)) {
                this.setState({
                    errors: {
                        password: ["Password must include at least 8 characters in length, with a maximum of 16 characters, at least one letter and one number, one lower case letter, one upper case letter at least one special characters (such as !, & and +)"]
                    }
                })
            }else{
                this.setState({
                    errors: {}
                })
            }
        }
    }

    onChangePwdSubmit(e) {
        e.preventDefault();
        if(this.state.password === this.state.confirm_password) {
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!+%*_\-^:#?&])[A-Za-z\d@$!+%*_\-^:#?&]{8,16}$/.test(this.state.password)) {
                this.setState({
                    errors: {
                        password: ["Password must include at least 8 characters in length, with a maximum of 16 characters, at least one letter and one number, one lower case letter, one upper case letter at least one special characters (such as !, & and +)"]
                    }
                })
            }else{
                const passObj = {
                    old_password: this.state.old_password,
                    password: this.state.password,
                    confirm_password: this.state.confirm_password
                }
                this.props.changePassword(passObj);
            }
        }else{
            this.setState({
                errors: {
                    confirm_password: ["Password and Confirm Password do not match."]
                }
            })
        }
    }

    render() {
        // let CreatedDate = this.props.profile.UserCreatedDate?this.props.profile.UserCreatedDate.split(" "):"";
        // let time = CreatedDate != ""?CreatedDate.splice(CreatedDate.length - 1,1):"";
        // CreatedDate = moment(CreatedDate[0]+"-"+CreatedDate[1]+"-"+CreatedDate[2]).format("DD-MM-YYYY");
        return (
            <div className="profile-top-sec">
                <div className="user-col profile-col">
                    <img src={this.props.filePreview ? this.props.filePreview : this.state.ProfilePhotoPath} alt="profile-photo" className="profile-img" />
                </div>
                <div className="user-col">
                    <p><span>Administrator | Last logged In:</span> 1 Oct 2019</p>
                    <h1>{[this.props.profile.FirstName, this.props.profile.MiddleName, this.props.profile.LastName].join(" ")}</h1>
                    <div className="user-col2">
                        <p><span>User Name (Email):</span> {this.props.profile.EmailAddress}</p>
                        <p><span>Phone:</span> {this.props.profile.PhoneNumber}</p>
                        <p><span>Created Date:</span> { this.props.profile.UserCreatedDate}</p>
                    </div>
                    <div className="reserPassWrapper" style={{display: this.state.resetMode ? 'block': 'none'}}>
                        <h4 className="my-4">Change Password</h4>
                        <Form onSubmit={this.onChangePwdSubmit.bind(this)}>
                            <FormGroup>
                                <Label>Old Password <span className="text-danger">*</span></Label>
                                <Input type="password" className="form-control" placeholder="Old Password" name="old_password" value={this.state.old_password} onChange={this.onChange} />
                                {Object.keys(this.state.errors).length > 0 && this.state.errors.old_password ? <p className="text-danger">{this.state.errors.old_password[0]}</p> : <></>}
                            </FormGroup>
                            <FormGroup>
                                <Label>Enter New Password <span className="text-danger">*</span></Label>
                                <Input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                {Object.keys(this.state.errors).length > 0 && this.state.errors.password ? <p className="text-danger">{this.state.errors.password[0]}</p> : <></> }
                            </FormGroup>
                            <FormGroup>
                                <Label>Re-enter New Password <span className="text-danger">*</span></Label>
                                <Input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" value={this.state.confirm_password} onChange={this.onChange} />
                                {Object.keys(this.state.errors).length > 0 && this.state.errors.confirm_password ? <p className="text-danger">{this.state.errors.confirm_password[0]}</p> : <></> }
                            </FormGroup>

                            <FormGroup className="mt-3">
                                    <Input type="submit" className="btn btn-primary mt-0" value="SAVE" />
                                    <a href="#" className="return-link ml-3" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({resetMode: false})}
                                    }>Cancel</a>
                            </FormGroup>
                        </Form>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => this.setState({resetMode: true, old_password: "", password: "", confirm_password: "", errors: {}})} style={{display: this.state.resetMode ? 'none': 'block'}}>RESET PASSWORD</button>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileSection.propTypes = {
    changePassword: PropTypes.func.isRequired,
    changePwdData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    changePwdData: state.user.changePwdData,
    errors: state.errors
});
export default connect(mapStateToProps, {changePassword})(ProfileSection);