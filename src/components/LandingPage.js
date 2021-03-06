import React, { Component } from 'react'
import {
    Button, Form, FormGroup, Input, FormFeedback, Card, CardBody, CardTitle
} from 'reactstrap';
import anime from 'animejs/lib/anime.es.js';
import ReCAPTCHA from "react-google-recaptcha";


export default class Landing extends Component {

    networkError = () => {
        console.log("Network Error:");
    }

    handleSubmit = (event) => {
        // console.log("Current state is " + JSON.stringify(this.state));
        // alert("Current state is " + JSON.stringify(this.state));
        event.preventDefault();

    }

    validate = (zipCode, setDate, people, location,yyyy) => {

        const errors = {
            zipCode: '',
            setDate: '',
            people: '',
            location: ''

        }
        // if (this.props.touched.zipCode && zipCode.length <= 3) {
        //     errors.zipCode = "Zip Code length should be more than 3"
        // }
        // else if (this.props.touched.zipCode && zipCode.length > 6) {
        //     errors.zipCode = "Zip Code length should be less than 6"
        // }
        const reg = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
        if (this.props.touched.zipCode && !reg.test(zipCode)) {
            errors.zipCode = "Please enter the zip code in the US zip code format"
        }
        else if (zipCode === '') {
            errors.zipCode = "Please enter the zip code"
        }

        if (setDate === '') {
            errors.setDate = "Please select the setDate"
        }
        else if(setDate){
            let verifyYear = setDate.split('-');
            if(verifyYear[0]<yyyy || verifyYear[0]>(yyyy+1)){
                errors.setDate = "Please check the year entered, it must be the present or next year."
            }
        }

        if (people === '0' || people === 0 || people === '') {

            errors.people = "There must be atleast 1 person to find workspace"

        }
        if (people > '50' || people > 50) {

            errors.people = "Maximum number of people can be 50 only"

        }
        if (location === '') {
            errors.location = 'Enter the zipCode to get the location'
        }
        if (zipCode.length >= 5 && location === '') {
            errors.location = 'Incorrect ZipCode or This ZipCode does not exists in our database'
        }
        return errors;
    }

     setYear = (year)=>{
        this.props.setYear(year);
    }

    componentDidMount() {
        let textWrapper = document.getElementById('title');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        // let mobWrapper = document.getElementById('titleMob');
        // mobWrapper.innerHTML = mobWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


        // setTimeout(() => {
        //     anime.timeline({ loop: true })
        //         .add({
        //             targets: '.ml16 .letter',
        //             translateY: [-100, 0],
        //             easing: "easeOutExpo",
        //             duration: 1400,
        //             delay: (el, i) => 30 * i
        //         }).add({
        //             targets: '.ml16',
        //             opacity: 0,
        //             duration: 1000,
        //             easing: "easeOutExpo",
        //             delay: 10000
        //         });
        // }, 24000);

        // anime.timeline({ loop: true })
        //     .add({
        //         targets: '.ml16Mob .letter',
        //         translateY: [-100, 0],
        //         easing: "easeOutExpo",
        //         duration: 1400,
        //         delay: (el, i) => 30 * i
        //     }).add({
        //         targets: '.ml16Mob',
        //         opacity: 0,
        //         duration: 1000,
        //         easing: "easeOutExpo",
        //         delay: 10000
        //     });


        let paraWrapper = document.getElementById('para');
        paraWrapper.innerHTML = paraWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: true })
            .add({
                targets: '.ml3 .letter',
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 1500,
                delay: (el, i) => 150 * (i + 1)
            }).add({
                targets: '.ml3',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 20000000000
            });
    }
    render() {
        
    
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');;; //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        const errors = this.validate(this.props.zipCode, this.props.setDate, this.props.people, this.props.location,yyyy);
        let isDisabled
        if (this.props.isVerified === false) {
            isDisabled = true;

        }
        else {
            isDisabled = Object.keys(errors).some(x => errors[x]);
        }
        return (
            <>

                <div className="container-fluid main p-0">
                    <div className="row row-content mx-0">
                        <div className="col-lg-6 wrappertxt d-none d-lg-block">
                            <h1 className="ml16" id="title">Co-Working Office Space</h1>
                            <p className="ml3" id="para">With all the buzz around coworking spaces, we decided to provide you with a primer. We cover the coworking basics as well as implications for the traditional office and facility managers.</p>
                        </div>
                        <div className = "col-12 d-lg-none d-block">
                        <h2 id="titleMob" className="ml16Mob col-12 ml-2 d-lg-none">Co-Working Space</h2>
                        </div>
                        <div className="col-lg-4 offset-lg-1 py-5 mt-4 mr-5 wrapper col-12">
                            <Card>

                                <CardBody>
                                    <CardTitle>Where do you want to find workspace?</CardTitle>
                                    <Form onSubmit={this.handleSubmit} key={'landing'}>
                                        <FormGroup row>

                                            <div className="col-lg-5 col-12 mt-2">
                                                <Input type="text" name="zipCode"
                                                    placeholder="Zip Code" value={this.props.zipCode}
                                                    valid={errors.zipCode === ''}
                                                    invalid={errors.zipCode !== ''}
                                                    onBlur={this.props.handleBlur('zipCode')}
                                                    onChange={this.props.handInputChange} />

                                                <FormFeedback>{errors.zipCode}</FormFeedback>
                                            </div>
                                            <div className="col-lg-7 col-12 mt-2">
                                                <Input name="location"
                                                    placeholder="Enter 5 or 9-digit Zip Code"
                                                    valid={errors.location === ''}
                                                    invalid={errors.location !== ''}
                                                    disabled={true}
                                                    value={this.props.location} />
                                                <FormFeedback>{errors.location}</FormFeedback>
                                            </div>
                                        </FormGroup>
                                        <CardTitle>When do you want to move in?</CardTitle>
                                        <FormGroup row>

                                            <div className="col-lg-9 col-12 mt-2">
                                                <Input type="date" id="setDate" name="setDate" min={today} max="2021-12-31"
                                                    value={this.props.setDate}
                                                    valid={errors.setDate === ''}
                                                    invalid={errors.setDate !== ''}
                                                    onBlur={this.props.handleBlur('setDate')}
                                                    onChange={this.props.handInputChange} />
                                                <FormFeedback>{errors.setDate}</FormFeedback>
                                            </div>
                                        </FormGroup>
                                        <CardTitle>How many people do you want to accommodate?</CardTitle>
                                        <div className="form-inline  d-lg-block d-none">
                                            <FormGroup row>
                                                <div className="col-lg-12 mt-2">

                                                    <button style={{ height: '40px', width: '40px', borderRadius: '50px' }} className="btn btn-primary" onClick={this.props.decrease}><i className="fa fa-minus" aria-hidden="true"></i></button>


                                                    <Input name="people" id="people" style={{ width: '70px', textAlign: 'center' }}
                                                        className="ml-1 mr-1" type="number"
                                                        value={this.props.people}
                                                        valid={errors.people === ''}
                                                        invalid={errors.people !== ''}
                                                        onChange={this.props.handInputChange}
                                                        onBlur={this.props.handleBlur('people')}
                                                    />

                                                    <Button style={{ height: '40px', width: '40px', borderRadius: '50px' }} className="btn btn-dark" onClick={this.props.increase}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                                                    <FormFeedback>{errors.people}</FormFeedback>
                                                </div>


                                            </FormGroup>
                                        </div>

                                        <div className="row form-inline col-12 mt-2 d-lg-none">

                                            <button style={{ height: '40px', width: '40px', borderRadius: '50px' }} className="btn btn-danger" onClick={this.props.decrease}><i className="fa fa-minus" aria-hidden="true"></i></button>


                                            <Input name="people" id="peopleMob" style={{ width: '50px', textAlign: 'center' }}
                                                className="ml-1 mr-1" type="number"
                                                value={this.props.people}
                                                valid={errors.people === ''}
                                                invalid={errors.people !== ''}
                                                onChange={this.props.handInputChange}
                                                onBlur={this.props.handleBlur('people')}
                                            />

                                            <Button style={{ height: '40px', width: '40px', borderRadius: '50px' }} className="btn btn-primary" onClick={this.props.increase}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                                            <FormFeedback>{errors.people}</FormFeedback>
                                        </div>
                                        <FormGroup row>
                                            <div className="col-lg-12 col-12 mt-3">
                                                <ReCAPTCHA style = {{overflow : 'hidden'}}
                                                    sitekey="6Lf4QrIZAAAAADu8cXAyrlUNdTlQ4wasosFATzmY"
                                                    theme="dark"
                                                    onChange={this.props.onChange}
                                                    onErrored={this.networkError}
                                                />
                                            </div>
                                        </FormGroup>

                                        <FormGroup row>
                                            <div className="col-lg-12 col-12">
                                                <Button className="btn btn-block" disabled={isDisabled} type="submit" onClick={this.props.toggleWorkspace} color="btn btn-primary">
                                                    Find Workspace <i className="fa fa-arrow-right" aria-hidden="true"></i></Button>

                                            </div>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>

                    </div>

                </div>

                {/* <div className="container mainMob d-block d-sm-none p-0">
                    <div className="row mx-0">
                        <div className="col-12">
                            <h2 id="titleMob" className="ml16Mob ml-2">Co-Working Space</h2>
                        </div>
                    </div>
                    <div className="row mx-0">
                        <div className="col-11 wrapperMob">
                            <h4>Where do you want to find workspace?</h4>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    
                                    <div className="col-12 mt-2">
                                        <Input type="text" name="zipCode"
                                            placeholder="Zip Code" value={this.props.zipCode}
                                            valid={errors.zipCode === ''}
                                            invalid={errors.zipCode !== ''}
                                            onBlur={this.props.handleBlur('zipCode')}
                                            onChange={this.props.handInputChange} />
                                        <FormFeedback>{errors.zipCode}</FormFeedback>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <Input name="location"
                                            placeholder="Enter 5 or 9-digit Zip Code"
                                            valid={errors.location === ''}
                                            invalid={errors.location !== ''}
                                            disabled={true}
                                            value={this.props.location} />
                                        <FormFeedback>{errors.location}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <h4>When do you want to move in?</h4>
                                <FormGroup row>
                                    
                                    <div className="col-12 mt-2">
                                        <Input type="date" name="setDate" min={today}
                                            placeholder="Date" value={this.props.setDate}
                                            valid={errors.setDate === ''}
                                            invalid={errors.setDate !== ''}
                                            onBlur={this.props.handleBlur('setDate')}
                                            onChange={this.props.handInputChange} />
                                        <FormFeedback>{errors.setDate}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <h4>How many people do you want to accommodate?</h4>

                                <div className="row form-inline col-12 mt-2">

                                    <button style={{ height: '40px', width: '40px', borderRadius: '50px' }} className="btn btn-danger" onClick={this.props.decrease}><i className="fa fa-minus" aria-hidden="true"></i></button>


                                    <Input name="people" id="peopleMob" style={{ width: '50px', textAlign: 'center' }}
                                        className="ml-1 mr-1" type="number"
                                        value={this.props.people}
                                        valid={errors.people === ''}
                                        invalid={errors.people !== ''}
                                        onChange={this.props.handInputChange}
                                        onBlur={this.props.handleBlur('people')}
                                    />

                                    <Button style={{ height: '40px', width: '40px', borderRadius: '50px' }} className="btn btn-primary" onClick={this.props.increase}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                                    <FormFeedback>{errors.people}</FormFeedback>
                                </div>
                                <FormGroup row>
                                    <div className="col-12 mt-3">
                                        <ReCAPTCHA
                                            sitekey="6Lf4QrIZAAAAADu8cXAyrlUNdTlQ4wasosFATzmY"
                                            theme="dark"
                                            onChange={this.props.onChange}
                                            onErrored={this.networkError}

                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup row>
                                    <div className=" col-12">
                                        <Button className="btn btn-block" disabled={isDisabled} type="submit" onClick={this.props.toggleWorkspace} color="btn btn-primary">
                                            Find Workspace <i className="fa fa-arrow-right" aria-hidden="true"></i></Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <div className="push"></div>
                </div> */}
            </>
        )
    }
}