import React, { useEffect, useState } from 'react'
import { CardHeader, CardBody, Form, FormGroup, Input, Label, Progress, Card, CardTitle } from 'reactstrap';
import history from './history';
import Loader from 'react-promise-loader';



let handleSubmit = (event) => {
    event.preventDefault();

}



const Payment = (props) => {
    const [loaderStatus, setLoaderStatus] = useState(false);
    


    useEffect(() => {
        window.onpopstate = e => {
            props.updateClickCount();
            let insurancePart = document.getElementById('insurance');
            if(insurancePart!==null){
            insurancePart.style.display = 'none'
            }
            let jumbo = document.getElementById('jumbo');
            if(jumbo!==null){
            jumbo.style.marginBottom = '7%'
            }
        }

    })

    let showLoader = () => {
        setLoaderStatus(true)
        setTimeout(() => {
            setLoaderStatus(false)
            history.push('/congratulations')
        }, 4000);
    }

    return (
        <>
            <Loader loading={loaderStatus} color={'#3d5e61'} background={'rgba(255,255,255,.5)'} />
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
                                    <CardTitle className="text-center">Pay Invoice ({props.businessName})</CardTitle>
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
                                                <Input type="month" min="2020-09" max="2036-08" name="validTill" id="validTill"
                                                />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>


                                            <Label htmlFor="cvv" className="col-sm-4 col-form-label form-control-label required">CVV</Label>
                                            <div className="col-sm-8">
                                                <Input className="cvvPass" type="number" pattern="[0-9]*" inputmode="numeric" name="cvv" id="cvv"
                                                />
                                            </div>
                                            {/* <FormFeedback>{errors.zipCode}</FormFeedback> */}

                                        </FormGroup>
                                        <FormGroup row>
                                            <div className="col-sm-8 offset-sm-4 mt-2">
                                                <b className="lead"><b>Final Price is ${props.yesSelected === true ? props.selectedRadioValueYes : props.selectedLeasePrice}</b><sup>*</sup></b>
                                                <p>* <small className="text-muted">This is inclusive of workspace lease and insurance for a period of {props.selectedLeaseDuration} {props.selectedLeaseDuration==='1'?'month':'months'}</small></p>

                                            </div>
                                        </FormGroup>
                                        <FormGroup row>
                                            <div className="col-sm-12 col-12">

                                                <button onClick={showLoader} className="SubmitButton">Pay <i className="fa fa-lock" aria-hidden="true"></i></button>

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