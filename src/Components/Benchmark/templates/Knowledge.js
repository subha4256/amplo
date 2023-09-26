import React, {Component} from 'react';
import { Col, Button,Label } from 'reactstrap';
import InputRange from 'react-input-range';
import { KnowledgeWrapper } from '../Styling/Questionaire';
class Knowledge extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        sliderValue:this.props.question.HasDropDown==1 && this.props.question.DropdownOptions.length?this.props.question.DropdownOptions.filter((item)=>item.IsSelected==1).length>0?this.props.question.DropdownOptions.filter((item)=>item.IsSelected==1)[0].OptionValue:Number(this.props.question.DropdownOptions[0].OptionValue):0,
        //answer: this.props.question.options[0].BenchmarkQuestionOptionID
        answer: this.props.question.options[0].OptionName,
        answerDesc: this.props.question.options[0].OptionDescription,
        question : this.props.question
    }
    handleNext(back) {   
        if(back) {

          this.props.onNext(parseFloat(this.state.sliderValue), back,null,null,this.props.question);
      }else {
          this.props.onNext(parseFloat(this.state.sliderValue),null,null,null,this.props.question);

      }
      }
    componentWillReceiveProps(nextProps){
        // console.log(this.state.question,nextProps.question,"knowledge")
        if(this.state.question != nextProps.question){
            let allTrue = true;
            nextProps.question.options.map((opt)=>{
                if(opt.Response!=null){
                    allTrue = false;
                    this.setState({
                        sliderValue: parseFloat(opt.Response),
                        answerDesc: opt.OptionDescription,
                        question : nextProps.question
                    }, function() {
                        nextProps.handleSelectedOption.bind(this,opt.OptionDescription,this.state.sliderValue)
                    });
                }
            })  
            if(allTrue === true){
                this.setState({
                    sliderValue: 0,
                    question : nextProps.question
                }, function() {
                    nextProps.handleSelectedOption.bind(this,"",this.state.sliderValue)
                }); 
            } 
        }
    }
    componentDidMount() {     
        this.props.question.options.map((opt)=>{
            if(opt.Response!=null){
                this.setState({
                    sliderValue: parseFloat(opt.Response),//opt.Response
                    answerDesc: opt.OptionDescription,
                }, function() {
                    this.props.handleSelectedOption(opt.OptionDescription,this.state.sliderValue)
                });
            }
        })        
    }

    handleOptionClick = (index, option, optDesc) => {
        console.log("handleOtionClick");
        if(this.props.access !== 'read'){
            this.setState({
                sliderValue: index,
                answer: option,
                answerDesc: optDesc
            }, function() {
                this.props.handleSelectedOption(optDesc,this.state.sliderValue);
            });}
            else{
                this.setState({
                    sliderValue: 0,
                    answer: option,
                    answerDesc: optDesc
                }, function() {
                    this.props.handleSelectedOption(optDesc,this.state.sliderValue);
                });
            }
    }

    handleSliderChange() {
        let sliderVal = this.state.sliderValue;
        var sliderValActive = Math.round( sliderVal );
        const options = this.props.question.options;
        let answerDescVal = (sliderValActive-1 < 0) ?  options[0].OptionDescription : options[sliderValActive-1].OptionDescription;
        this.setState({
            answerDesc: answerDescVal
        }, function() {
            this.props.handleSelectedOption(this.state.answerDesc,this.state.sliderValue);
        })
    }
    onChangeHandler =(value) => {
        if(this.props.access !== 'read'){
            this.setState({ sliderValue: value });
        }
        else{
            this.setState({ sliderValue: 0 });
        }
    }
    render() {
        console.log("Slider Knowledge => ", this.state)
        
        const { lock } = this.props
        // var sliderVal=Number.isInteger(this.state.sliderValue) ? this.state.sliderValue : `${this.state.sliderValue.toFixed(2)}`
        var sliderVal=this.state.sliderValue ;
        var sliderValActive = Math.round( sliderVal );
        let options = this.props.question.options;
        let answerd = false;
        options.map((optVal, i) => {
            if(answerd == false){
                if(optVal.Response != null){
                    answerd = true;
                }
            }
        })
        //console.log(sliderValActive);
        //console.log(answerd);
        let optLi = <></>;
        if(options) {
            optLi = options.map((opt, i) => {
                let selectdClass = '';
                if((i+1 == sliderValActive && sliderValActive > 0) || (answerd == false && sliderValActive == 0)){
                    selectdClass = ' selected';
                }
                let bgClass = ' bg-primary';
                if(i === 1 || i === 2 || i === 3) {
                    bgClass = ' bg-danger';
                }
                if(i === 4) {
                    bgClass = ' bg-info';
                }
                return (
                    <li key={ 'qOpt-'+i } className={"list-inline-item " + selectdClass } onClick={() => this.props.question.HasDropDown=='1' && this.props.question.DropdownOptions.length?console.log("hasDropdown"):this.handleOptionClick(i + 1, opt.OptionName, opt.OptionDescription)}>
                        <div className={'slider-img'+bgClass}>
                            <p>
                            { opt.OptionDescription }
                            </p>
                        </div>
                        <div className="slider-text">
                        { opt.OptionName }
                        </div>
                    </li>
                )
            });
        }
        return (
            <>
                <Col md="12" lg="12" xl="8">
                    <KnowledgeWrapper className="bg-light">
                        <p className="que mb-4">Q{ this.props.currentQuesIndex + 1 }. { this.props.question.Question }<span
                            className="float-right"><i className="fas fa-ellipsis-h"></i></span></p>
                        {this.props.question.HasDropDown==1 && this.props.question.DropdownOptions.length?
                         <form className="p-3">
                         <div className="form-group">
                         <Label>Select Value:</Label>
                       <div className="d-flex">
                           <select className="form-control col-sm-10 mx2" 
                           value={this.state.sliderValue}
                           onChange={(e) => this.setState({sliderValue:e.target.value})}
                           >
                           <option selected>Choose...</option>
                           {this.props.question.DropdownOptions.map((item)=>{
                            return (
                                <option name={item.OptionId} value={Number(item.OptionValue)} key={'projectOpt-'+item.OptionId}>{item.OptionText}</option>
                            )
                           })}
                           </select>
                       </div>
                         </div>
                         </form>:<p><small>Drag to select a value:</small></p>}
                        <div className="domain-map">
                            <InputRange
                                maxValue={5}
                                minValue={0}
                                step={0.1}
                                formatLabel={value => Number.isInteger(value) ? value : `${Number(value).toFixed(2)}`}
                                value={this.state.sliderValue}
                                //onChange={value => this.setState({ sliderValue: value })}
                                onChange={value => this.onChangeHandler(value)}
                                onChangeComplete={this.handleSliderChange.bind(this)} 
                                disabled={ ((Object.keys(lock).length > 0 && lock.flag==1) || (this.props.question.HasDropDown==1 && this.props.question.DropdownOptions.length))  ? true : false }
                                />
                                <ul className="list-inline">
                                    <li className="list-inline-item">|<br />0</li>
                                    <li className="list-inline-item">|<br />1</li>
                                    <li className="list-inline-item">|<br />2</li>
                                    <li className="list-inline-item">|<br />3</li>
                                    <li className="list-inline-item">|<br />4</li>
                                    <li className="list-inline-item">|<br />5</li>
                                </ul>
                        </div>
                        <div className="domain-pa-knowledge mt-5">
                        { this.props.currentQuesIndex != 0 && <img className="img-slide-back" src={ require('../../../common/images/Back.png') } alt="" onClick={() =>this.handleNext("back")} />}
                            <img className="img-slide-next" src={ require('../../../common/images/arrow-next.png') } alt="" onClick={this.handleNext.bind(this)} />
                            <ul className="list-inline active">
                                { optLi }
                            </ul>
                        </div>
                    </KnowledgeWrapper>
                </Col>
                <Col md="12" lg="12" xl="8" className="text-center mt-4">
                    <Button color="info" onClick={this.handleNext.bind(this)} disabled={ Object.keys(lock).length > 0 && lock.flag==1 ? true : false } >SAVE PROGRESS</Button>   
                </Col>
            </>
        )
    }
}
export default Knowledge;