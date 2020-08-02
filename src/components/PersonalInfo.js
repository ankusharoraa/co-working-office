import React from 'react'
import { CardHeader, CardBody, Form, FormGroup, Input, Label, Progress, Button, Card, CardTitle } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';



const PopulateDetails = (updatePersonDetails, deletePersonDetails) => {
    updatePersonDetails();
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
        deletePersonDetails();
        edit.style.display = 'none';
        clear.style.display = 'none';
        scan.style.display = 'block';
        or.style.display = 'block';
        business.disabled = false;
        personEmail.disabled = false;
        personZip.disabled = false;
    })



}
let handleSubmit = (event) => {
    event.preventDefault();

}
const PersonalInfo = (props) => {
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
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup row>


                                            <Label htmlFor="businessName" className="col-sm-4 col-form-label form-control-label required">Business Name</Label>
                                            <div className="col-sm-8">
                                                <Input key="business" type="text" name="businessName" id="businessName"
                                                    onBlur={props.handleBlur('businessName')}
                                                    onChange={props.handInputChange}
                                                    value={props.businessName} />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="personEmail" className="col-sm-4 col-form-label form-control-label required">Email</Label>
                                            <div className="col-sm-8">
                                                <Input key="personEmail" type="email" name="personEmail" id="personEmail"
                                                    onChange={props.handInputChange}
                                                    onBlur={props.handleBlur('personEmail')}
                                                    value={props.personEmail} />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="personZipCode" className="col-sm-4 col-form-label form-control-label required">Zip Code</Label>
                                            <div className="col-sm-8">
                                                <Input id="personZipCode" type="text" name="personZipCode"
                                                    onBlur={props.handleBlur('personZipCode')}
                                                    onChange={props.handInputChange}
                                                    value={props.personZipCode} />
                                            </div>

                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="personLocation" className="col-sm-4 col-form-label form-control-label required">Location</Label>
                                            <div className="col-sm-8">
                                                <Input disabled={true} id="personLocation" type="text" name="personLocation"

                                                    value={props.personLocation} />
                                            </div>

                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>
                                            <div className="col-sm-4 mt-2" id="edit" style={{ display: 'none' }}>
                                                <button className="btn btn-dark">Edit Scanned Details</button>
                                            </div>
                                            <div className="offset-sm-2 col-sm-4 mt-2" id="clear" style={{ display: 'none' }}>
                                                <button className="btn btn-secondary">Delete Scanned Card</button>
                                            </div>
                                        </FormGroup>
                                        <h3 id="or" style={{ textAlign: 'center' }} className="mt-4">OR</h3>
                                        
                                        <div id="scan" style={{ cursor: 'pointer' }} onClick={() => PopulateDetails(props.updatePersonDetails, props.deletePersonDetails)} className="card bg-warning mt-4">
                                        <div className="card-body text-center">
                                            <div className="card-text">Scan a business card</div>
                                        </div>
                                    </div>
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

export default withRouter(PersonalInfo)
