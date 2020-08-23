import React, { useEffect } from 'react'
import { CardHeader, CardBody, Form, FormGroup, Input, Label, Progress, Card, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Loader from 'react-loader-spinner'
// import history from './history';

let handleSubmit = (event) => {
    event.preventDefault();

}

// let loadingScreen = () =>{
//     return(<Loader
//          type="Puff"
//          color="#00BFFF"
//          height={100}
//          width={100}
//          timeout={3000} //3 secs
 
//       />)

// }
const Payment = (props) => {
   
    useEffect(()=>{
        window.onpopstate = e =>{
            props.updateClickCount();
        }
    })
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="text-center"></div>
                        <Progress animated={true} striped color="primary" value="75">75%</Progress>
                    </div>
                </div>
            </div>

            <div className="jumbotron py-3 mt-2">
                <div className="container personalDetails py-3">
                    <div className="row">
                        <div className="mx-auto col-sm-6 col-12">
                            <Card>
                                <CardHeader className="bg-primary text-white">
                                    <CardTitle className="text-center">Pay Invoice</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup row>


                                            <Label htmlFor="cardHolder" className="col-sm-4 col-form-label form-control-label required">Card Holder Name</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="cardHolder" id="cardHolder"




                                                />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="cardNumber" className="col-sm-4 col-form-label form-control-label required">Card Number</Label>
                                            <div className="col-sm-8">
                                                <Input type="number" name="cardNumber" id="cardNumber" pattern="[0-9.]+"



                                                />

                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>

                                        <FormGroup row>


                                            <Label htmlFor="validTill" className="col-sm-4 col-form-label form-control-label required">Valid till</Label>
                                            <div className="col-sm-8">
                                                <Input type="text" name="validTill" id="validTill"
                                                />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>
                                            <div className="col-sm-8 offset-sm-4 mt-2">
                                                <b className="lead"><b>Final Price is ${props.yesSelected === true ? props.selectedRadioValueYes : props.selectedLeasePrice}</b><sup>*</sup></b>
                                                <p>* <small className="text-muted">This is inclusive of workspace lease and insurance for a period of 1 month</small></p>

                                            </div>
                                        </FormGroup>
                                        <FormGroup row>
                                            <div className="col-sm-12 col-12">
                                                <Link style={{ textDecoration: 'none' }}><button className="SubmitButton">Pay <i className="fa fa-lock" aria-hidden="true"></i></button></Link>
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
export default Payment;