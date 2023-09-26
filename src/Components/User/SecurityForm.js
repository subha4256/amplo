import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Label, FormGroup, Form, Button, Input} from 'reactstrap';

const SecurityForm = (props) => { 
    
    console.log(props.customErrors)
   
    let questions = props.questions.map((question, index) => {
        return (
            <FormGroup key={'questionWrap-'+question.QuestionID}>
                <Label>Q{index+1}. {question.QuestionTitle}* <span className="text-danger">*</span></Label>
                <Input name={"question-"+index} onChange={(e) => props.handleInputChange(e, question.QuestionID)}  />
            </FormGroup>
        )
    })
    let errors = props.customErrors;


    return (      
       
       <Form onSubmit={props.handleSecuritySubmit}>
            <Row>
                <Col sm="12" md="7" lg="7">
                { errors ? <span style={{color: "red", width:"100%"}}> { errors } </span> : null }
                    {questions}
                    <FormGroup className="mt-3">
                        <Button color="primary" className="mr-4">SAVE</Button>
                        <Link to="/dashboard">Cancel</Link>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}
 export default SecurityForm;