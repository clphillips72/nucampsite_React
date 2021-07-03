import React from 'react';
import { Breadcrumb, BreadcrumbItem, 
         Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length

// 1)  required "function" receives val as an argument
// 2)  and this will be a string value it receives.  We know that because all form inputs are received as strings,
//        even if they're numbers
// 3)  then inside the arrow function, it checks to make sure that there was a value that was received, like it was
//     undefined or null and all we have to do to check for that is just check for val to be truthy or falsey
//     because val would evaluate as falsey if it was undefined or null.
// 4)  then it makes sure that the length of val > 0  
// 5)  The entire statement basically makes sure that val has something in it, and it will return true if it does,
//     and false if it doesn't.  If it returns false, then it has failed the test and will create an error.


const maxLength = len => val => !val || (val.length <= len); 

// 1)  That whole maxLength function is wrapping a function inside a function
// 2)  inner function (val) where it evaluates !val returns true when the max length hasn't been exceeded. 
//     !val will return true because if there's no value then the max length clearly hasn't been exceeded.
// 3)  or return true if val.length <= max
// 4)  If both of the conditions evaluate as false, then this function will return false for max length meaning that 
//     it has failed the test for max length and that will create an error

const minLength = len => val => val && (val.length >= len);
// 1)  That whole minLength function is wrapping a function inside a function
// 2)  the inner function (val =>) will return true if there's a value (=> val &&) and the value is >= min 
//     (&& (val.length <= len)) and will return false if either of these conditions are false and that will mean that 
//     it has failed the test for min length and will create an error

const isNumber = val => !isNaN(+val);
// 1)  We want to check if the value is a number so we use the unary plus operator (+val) to turn the value into
//     a number if it can be, and if the value is not a valid number, the unary operator will turn the value into
//     a special value called NaN (not a number), so we'll check if the +val is the opposite of isNan  
// 2)  If the value is not a valid number, it will return false, otherwise true.  Basically checking if the value is
//     not (not a number).

const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

// 1)  makes sure that the email address begins with a-z, then contains only the valid characters in an email 
//     address, which are 0-9, ._%+-
// 2)  Then check for an @ sign in there
// 3)  then following the @ sign where the domain name would be, we'll permit a-z or 0-9 any number of times.
// 4)  then check for the . between the domain name and domain extension (.com) 
// 5)  then check for the domain extention to be between 2 and 4 letters
// 6)  then we'll use the built in method from javascript called test here.  This will test whatever value was
// 7)  passed in to ensure it matches the project's pattern

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName:      '',
            lastName:       '',
            phoneNum:       '',
            email:          '',
            agree:          false,
            contactType:    'By Phone',
            feedback:       '',
            touched: {
                firstName:  false,
                lastName:   false,
                phoneNum:   false,
                email:      false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                {/* The change above from FormGroup (in version "Intro to Redux") to Row is required because we're no longer 
                                    using the FormGroup Component from react-strap since that only works with the
                                    react-strap Form Component */}
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName"
                                        className="form-control"
                                        placeholder="First Name"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                     {/* 1)  the model=".firstName" attribute tells Redux that the value for this 
                                            field will be stored in the state under the property name of firstName.
                                        2)  for the className="form-control"...in "Intro to Redux" and possibly earlier, 
                                            the input component that we were using from react-strap took care of adding
                                            this form control class, but we're not using that anymore so we need to add the 
                                            class name manually  */}
                                    <Errors 
                                        className="text-danger"
                                        model=".firstName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required:   'Required',
                                            minLength:  'Must be at least 2 characters',
                                            maxLength:  'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        className="form-control"                                    
                                        placeholder="Last Name"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".lastName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required:   'Required',
                                            minLength:  'Must be at least 2 characters',
                                            maxLength:  'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        className="form-control"                                    
                                        placeholder="Phone number"    
                                        validators={{
                                            required, 
                                            minLength: minLength(10),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}                                    
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".phoneNum"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required:   'Required',
                                            minLength:  'Must be at least 10 numbers',
                                            maxLength:  'Must be 15 numbers or less',
                                            isNumber:   'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        className="form-control"                                    
                                        placeholder="Email"
                                        validators={{
                                            required, 
                                            validEmail
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required:   'Required',
                                            validEmail: 'Invalid email address'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agree"
                                                className="form-check-input"    
                                                name="agree"
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model=".contactType" name="contactType"
                                            className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;