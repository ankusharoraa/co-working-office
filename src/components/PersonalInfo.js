import React, { Component } from 'react'
import { CardHeader, CardBody, Form, FormGroup, Input, Label, Progress, Button, Card, CardTitle } from 'reactstrap';

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    populateDetails = () => {

        this.props.updatePersonDetails();
        let business = document.getElementById('businessName')
        let personEmail = document.getElementById('personEmail')
        let personZip = document.getElementById('personZipCode')
        let scan = document.getElementById('scan')
        let or = document.getElementById('or')
        let edit = document.getElementById('edit');
        let clear = document.getElementById('clear');
        business.disabled = true;
        console.log(business.disabled)
        personEmail.disabled = true;
        personZip.disabled = true;
        scan.style.display = 'none';
        or.style.display = 'none';
        edit.style.display = 'block';
        clear.style.display = 'block';

        edit.addEventListener('click', () => {
            business.disabled = false;
            personEmail.disabled = false;
            personZip.disabled = false;

        })

        clear.addEventListener('click', () => {
            this.props.deletePersonDetails();
            edit.style.display = 'none';
            clear.style.display = 'none';
            scan.style.display = 'block';
            or.style.display = 'block';
            business.disabled = false;
            personEmail.disabled = false;
            personZip.disabled = false;
        })

    }
    handleSubmit = (event) => {
        event.preventDefault();

    }
    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row mt-2">
                        <div className="col-sm-12">
                            <div className="text-center"></div>
                            <Progress animated={true} striped color="primary" value="38">38%</Progress>
                        </div>
                    </div>
                </div>
                <div className="jumbotron py-3 mt-2">
                    <div className="container personalDetails py-3">
                        <div className="row">
                            <div className="mx-auto col-sm-5">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="lead">Let us get to know you...</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                            <FormGroup row>


                                                <Label htmlFor="businessName" className="col-sm-4 col-form-label form-control-label required">Business Name</Label>
                                                <div className="col-sm-8">
                                                    <Input type="text" name="businessName" id="businessName"
                                                        onBlur={this.props.handleBlur('businessName')}
                                                        onChange={this.props.handInputChange}
                                                        value={this.props.businessName} />
                                                </div>
                                                {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                            </FormGroup>
                                            <FormGroup row>


                                                <Label htmlFor="personEmail" className="col-sm-4 col-form-label form-control-label required">Email</Label>
                                                <div className="col-sm-8">
                                                    <Input type="email" name="personEmail" id="personEmail"
                                                        onChange={this.props.handInputChange}
                                                        onBlur={this.props.handleBlur('personEmail')}
                                                        value={this.props.personEmail} />
                                                </div>
                                                {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                            </FormGroup>
                                            <FormGroup row>


                                                <Label htmlFor="personZipCode" className="col-sm-4 col-form-label form-control-label required">Zip Code</Label>
                                                <div className="col-sm-8">
                                                    <Input id="personZipCode" type="text" name="personZipCode"
                                                        onBlur={this.props.handleBlur('personZipCode')}
                                                        onChange={this.props.handInputChange}
                                                        value={this.props.personZipCode} />
                                                </div>

                                                {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                            </FormGroup>
                                            {/* <FormGroup row>
                                                
                                            </FormGroup> */}
                                        </Form>
                                        <div className = "row">
                                        <div className="col-sm-4 mt-2" id="edit" style={{ display: 'none' }}>
                                                    <button className="btn btn-dark">Edit Scanned Details</button>
                                                </div>
                                                <div className="offset-sm-2 col-sm-4 mt-2" id="clear" style={{ display: 'none' }}>
                                                    <button className="btn btn-secondary">Delete Scanned Card</button>
                                                </div>
                                        </div>
                                        <h3 id="or" style={{ textAlign: 'center' }} className="mt-4">OR</h3>
                                        <div id="scan" style={{ cursor: 'pointer' }} onClick={this.populateDetails} className="card bg-warning mt-4">
                                            <div className="card-body text-center">
                                                <div className="card-text">Scan a business card</div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-3">
                                            <button className="btn btn-block btn-primary">Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}