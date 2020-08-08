import React from 'react'
import { CardHeader, CardBody, Form, FormGroup, Input, Label, Progress, Button, Card, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';


let handleSubmit = (event) => {
    event.preventDefault();

}

export default function ConfirmPerson(props) {
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="50">50%</Progress>
                    </div>
                </div>
            </div>

            <div className="jumbotron py-3 mt-2">
                <div className="container personalDetails py-3">
                    <div className="row">
                        <div className="mx-auto col-sm-6 col-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="lead">Is this you?</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup row>


                                            <Label htmlFor="businessName" className="col-sm-4 col-form-label form-control-label required">Business Name</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="businessName" id="businessName"
                                                value = {props.businessName}
                                                />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="ownerName" className="col-sm-4 col-form-label form-control-label required">Owner's Name</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="ownerName" id="ownerName"
                                                value = {props.personName}
                                                />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="address" className="col-sm-4 col-form-label form-control-label required">Address</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="address" id="address"
                                                value = {props.personAddress}
                                                />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="city" className="col-sm-4 col-form-label form-control-label required">City</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="city" id="city"
                                                value = {props.personCity} />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="state" className="col-sm-4 col-form-label form-control-label required">State</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="state" id="state"
                                                 value = {props.personState}/>
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="personEmail" className="col-sm-4 col-form-label form-control-label required">Email</Label>
                                            <div className="col-sm-8">
                                                <Input key="personEmail" type="email" name="personEmail" id="personEmail"
                                                 value={props.personEmail}/>
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="phoneNumber" className="col-sm-4 col-form-label form-control-label required">Phone Number</Label>
                                            <div className="col-sm-8">
                                                <Input id="phoneNumber" type="text" name="phoneNumber"
                                                value = {props.personPhone}
                                                />
                                            </div>

                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>
                                            <div className="col-sm-12 col-12 mt-3">
                                                <Link style={{ textDecoration: 'none' }} to='confirmPerson'><button className="btn btn-block btn-primary">Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button></Link>
                                            </div>
                                        </FormGroup>
                                    </Form>




                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}