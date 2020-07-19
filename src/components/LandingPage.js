import React, { Component } from 'react'
import {
    Button, Form, FormGroup, Input, FormFeedback
} from 'reactstrap';
import anime from 'animejs/lib/anime.es.js';
import ReCAPTCHA from "react-google-recaptcha";


export default class Landing extends Component{

networkError = () => {
    console.log("Network Error:");
}

handleSubmit = (event) => {
    // console.log("Current state is " + JSON.stringify(this.state));
    // alert("Current state is " + JSON.stringify(this.state));
    event.preventDefault();

}

validate = (zipCode, date) => {
    const errors = {
        zipCode: '',
        date: ''

    }
    if (this.props.touched.zipCode && zipCode.length <= 3) {
        errors.zipCode = "Zip Code length should be more than 3"
    }
    else if (this.props.touched.zipCode && zipCode.length > 6) {
        errors.zipCode = "Zip Code length should be less than 6"
    }
    else if (zipCode === '') {
        errors.zipCode = "Please enter the zip code"
    }

    if (date === '') {
        errors.date = "Please select the date"
    }
    return errors;
}

componentDidMount() {
    let textWrapper = document.getElementById('title');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    let mobWrapper = document.getElementById('titleMob');
    mobWrapper.innerHTML = mobWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


    setTimeout(() => {
        anime.timeline({ loop: true })
            .add({
                targets: '.ml16 .letter',
                translateY: [-100, 0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            }).add({
                targets: '.ml16',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 10000
            });
    }, 24000);

    anime.timeline({ loop: true })
        .add({
            targets: '.ml16Mob .letter',
            translateY: [-100, 0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        }).add({
            targets: '.ml16Mob',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 10000
        });


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
render(){
    const errors = this.validate(this.props.zipCode, this.props.date);
        let isDisabled
        if (this.props.isVerified === false) {
            isDisabled = true;
            
        }
        else {
            isDisabled = Object.keys(errors).some(x => errors[x]);
        }
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');;; //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
    return (
        <>
            <div className="container-fluid main p-0 d-none d-sm-block">
                <div className="row row-content mx-0">
                    <div className="col-sm-6 wrappertxt">
                        <h1 className="ml16" id="title">Co-Working Office Space</h1>
                        <p className="ml3" id="para">With all the buzz around coworking spaces, we decided to provide you with a primer. We cover the coworking basics as well as implications for the traditional office and facility managers.</p>
                    </div>
                    <div className="col-sm-4 offset-sm-8 wrapper">
                        <h4>Where do you want to find workspace?</h4>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                {/* <Label htmlFor="zipCode" className="col-md-3 col-3">Zip Code</Label> */}
                                <div className="col-md-8 mt-2">
                                    <Input type="number" id="zipCode" name="zipCode"
                                        placeholder="Zip Code" value={this.props.zipCode}
                                        valid={errors.zipCode === ''}
                                        invalid={errors.zipCode !== ''}
                                        onBlur={this.props.handleBlur('zipCode')}
                                        onChange={this.props.handInputChange} />
                                    <FormFeedback>{errors.zipCode}</FormFeedback>
                                </div>
                            </FormGroup>
                            <h4>When do you want to move in?</h4>
                            <FormGroup row>
                                {/* <Label htmlFor="date" className="col-md-3 col-3">Date</Label> */}
                                <div className="col-sm-8 mt-2">
                                    <Input type="date" id="date" name="date" min={today}
                                        placeholder="Date" value={this.props.date}
                                        valid={errors.date === ''}
                                        invalid={errors.date !== ''}
                                        onBlur={this.props.handleBlur('date')}
                                        onChange={this.props.handInputChange} />
                                    <FormFeedback>{errors.date}</FormFeedback>
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <div className="col-sm-8">
                                    <ReCAPTCHA
                                        sitekey="6Lf4QrIZAAAAADu8cXAyrlUNdTlQ4wasosFATzmY"
                                        theme="dark"
                                        onChange={this.props.onChange}
                                        onErrored={this.networkError}

                                    />
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <div className="col-sm-12 col-12">
                                    <Button className="btn btn-block" disabled={isDisabled} type="submit" onClick={this.props.toggleWorkspace} color="btn btn-primary">
                                        Find Workspace</Button>

                                </div>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="container mainMob d-block d-sm-none">
                <div className="row row-content">
                    <div className="col-12">
                        <h2 id="titleMob" className="ml16Mob ml-3">Co-Working Space</h2>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 wrapperMob">
                        <h4>Where do you want to find workspace?</h4>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                {/* <Label htmlFor="zipCode" className="col-md-3 col-3">Zip Code</Label> */}
                                <div className="col-12 mt-2">
                                    <Input type="number" name="zipCode"
                                        placeholder="Zip Code" value={this.props.zipCode}
                                        valid={errors.zipCode === ''}
                                        invalid={errors.zipCode !== ''}
                                        onBlur={this.props.handleBlur('zipCode')}
                                        onChange={this.props.handInputChange} />
                                    <FormFeedback>{errors.zipCode}</FormFeedback>
                                </div>
                            </FormGroup>
                            <h4>When do you want to move in?</h4>
                            <FormGroup row>
                                {/* <Label htmlFor="date" className="col-md-3 col-3">Date</Label> */}
                                <div className="col-12 mt-2">
                                    <Input type="date"  name="date" min={today}
                                        placeholder="Date" value={this.props.date}
                                        valid={errors.date === ''}
                                        invalid={errors.date !== ''}
                                        onBlur={this.props.handleBlur('date')}
                                        onChange={this.props.handInputChange} />
                                    <FormFeedback>{errors.date}</FormFeedback>
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <div className="col-12">
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
                                        Find Workspace</Button>
                                </div>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
}