import React from 'react'
import { CardHeader, CardBody, Form, FormGroup, Input, Label, Progress, Card, CardTitle, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


let handleSubmit = (event) => {
    event.preventDefault();

}

const Validate = (personName, personAddress, personPhone, businessName) => {

    const errors = {
        personName: '',
        personAddress: '',
        personPhone: '',
        businessName: ''
    }
    if (personName.length < 3) {
        errors.personName = "Person name length should be more than 3"
    }

    if (personAddress.length < 5) {
        errors.personAddress = "Address length should be more than 5"
    }
    if (personPhone.length === 0) {
        errors.personPhone = "Please enter your phone number"
    }

    if (businessName.length < 3) {
        errors.businessName = "Business name length should be more than 3"
    }

    return errors;
}


function ConfirmPerson(props) {
    const errors = Validate(props.personName, props.personAddress, props.personPhone, props.businessName);
    let isDisabled
    isDisabled = true;
    isDisabled = Object.keys(errors).some(x => errors[x]);

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
                                                    valid={errors.businessName === ''}
                                                    invalid={errors.businessName !== ''}
                                                    onBlur={props.handleBlur('businessName')}
                                                    onChange={props.handInputChange}
                                                    value={props.businessName}

                                                />
                                                 <FormFeedback>{errors.businessName}</FormFeedback>
                                            </div>
                                           

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="personName" className="col-sm-4 col-form-label form-control-label required">Owner's Name</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="personName" id="personName"
                                                    valid={errors.personName === ''}
                                                    invalid={errors.personName !== ''}
                                                    value={props.personName}
                                                    onChange={props.handInputChange}
                                                    onBlur={props.handleBlur('personName')}
                                                />
                                                <FormFeedback>{errors.personName}</FormFeedback>
                                            </div>


                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="personAddress" className="col-sm-4 col-form-label form-control-label required">Address</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="personAddress" id="personAddress"
                                                    valid={errors.personAddress === ''}
                                                    invalid={errors.personAddress !== ''}
                                                    value={props.personAddress}
                                                    onChange={props.handInputChange}
                                                    onBlur={props.handleBlur('personAddress')}
                                                />
                                                <FormFeedback>{errors.personAddress}</FormFeedback>
                                            </div>


                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="personCity" className="col-sm-4 col-form-label form-control-label required">City</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="personCity" id="personCity"
                                                    value={props.personCity}
                                                    onChange={props.handInputChange}
                                                    onBlur={props.handleBlur('personCity')} />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="personState" className="col-sm-4 col-form-label form-control-label required">State</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="personState" id="personState"
                                                    value={props.personState}
                                                    onChange={props.handInputChange}
                                                    onBlur={props.handleBlur('personState')} />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="personEmail" className="col-sm-4 col-form-label form-control-label required">Email</Label>
                                            <div className="col-sm-8">
                                                <Input key="personEmail" type="email" name="personEmail" id="personEmail"
                                                    value={props.personEmail}
                                                    onChange={props.handInputChange}
                                                    onBlur={props.handleBlur('personEmail')} />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="personPhone" className="col-sm-4 col-form-label form-control-label required">Phone Number</Label>
                                            <div className="col-sm-8">
                                                <Input id="personPhone" type="text" name="personPhone"
                                                    valid={errors.personPhone === ''}
                                                    invalid={errors.personPhone !== ''}
                                                    value={props.personPhone}
                                                    onChange={props.handInputChange}
                                                    onBlur={props.handleBlur('personPhone')}
                                                />
                                                <FormFeedback>{errors.personPhone}</FormFeedback>
                                            </div>



                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="industry" className="col-sm-4 col-form-label form-control-label required">Industry</Label>
                                            <div className="col-sm-8">
                                                <select className="form-control" name="industry" id="industry">
                                                    <option value="7311">Advertising agencies</option>
                                                    <option value="7372">Prepackaged Software</option>
                                                    <option value="8742">Management Consulting Services</option>
                                                    <option value="8743">Public Relations Services</option>
                                                    <option value="7363">Help Supply Services</option>
                                                </select>
                                            </div>

                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>
                                            <div className="col-sm-12 col-12 mt-3">
                                                <Link style={{ textDecoration: 'none' }} to={isDisabled ? '#' : 'leaseDuration'}><button className="btn btn-block btn-primary" disabled={isDisabled}>Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button></Link>
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
export default React.memo(ConfirmPerson)