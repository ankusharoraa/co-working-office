import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import '../App.css';
import anime from 'animejs/lib/anime.es.js';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col, FormFeedback
} from 'reactstrap';



export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            zipCode: '',
            date: '',
            agree: false,

            touched: {
                zipCode: false,
                date: false

            }
        }
    }
    networkError = () => {
        console.log("Network Error:");
    }
    onChange = (value) => {

        this.setState({
            isVerified: true
        })
    }

    handleSubmit = (event) => {
        console.log("Current state is " + JSON.stringify(this.state));
        alert("Current state is " + JSON.stringify(this.state));
        event.preventDefault();

    }
    handInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }
    validate = (zipCode, date) => {
        const errors = {
            zipCode: '',
            date: ''

        }
        if (this.state.touched.zipCode && zipCode.length <= 3) {
            errors.zipCode = "Zip Code length should be more than 3"
        }
        else if (this.state.touched.zipCode && zipCode.length > 6) {
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
                delay: 12000
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

    render() {
        const errors = this.validate(this.state.zipCode, this.state.date);
        let isDisabled
        if (this.state.isVerified === false) {
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
                        <div className="col-sm-6 offset-sm-8 wrapper">
                            <h4>Where do you want to find workspace?</h4>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    {/* <Label htmlFor="zipCode" className="col-md-3 col-3">Zip Code</Label> */}
                                    <div className="col-md-8 mt-2">
                                        <Input type="number" id="zipCode" name="zipCode"
                                            placeholder="Zip Code" value={this.state.zipCode}
                                            valid={errors.zipCode === ''}
                                            invalid={errors.zipCode !== ''}
                                            onBlur={this.handleBlur('zipCode')}
                                            onChange={this.handInputChange} />
                                        <FormFeedback>{errors.zipCode}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <h4>When do you want to move in?</h4>
                                <FormGroup row>
                                    {/* <Label htmlFor="date" className="col-md-3 col-3">Date</Label> */}
                                    <div className="col-md-8 col-8 mt-2">
                                        <Input type="date" id="date" name="date" min={today}
                                            placeholder="Date" value={this.state.date}
                                            valid={errors.date === ''}
                                            invalid={errors.date !== ''}
                                            onBlur={this.handleBlur('date')}
                                            onChange={this.handInputChange} />
                                        <FormFeedback>{errors.date}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <FormGroup row>
                                    <div className="col-sm-8">
                                        <ReCAPTCHA
                                            sitekey="6Lf4QrIZAAAAADu8cXAyrlUNdTlQ4wasosFATzmY"
                                            theme="dark"
                                            onChange={this.onChange}
                                            onErrored={this.networkError}

                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup row>
                                    <div className="col-md-12 col-12">
                                        <Button className="btn btn-block" disabled={isDisabled} type="submit" color="btn btn-primary">
                                            Next</Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mainMob d-block d-sm-none">
                    <div className="row row-content">
                        <div className="col-12 wrapperMob">
                            <h4>Where do you want to find workspace?</h4>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    {/* <Label htmlFor="zipCode" className="col-md-3 col-3">Zip Code</Label> */}
                                    <div className="col-12 mt-2">
                                        <Input type="number" id="zipCode" name="zipCode"
                                            placeholder="Zip Code" value={this.state.zipCode}
                                            valid={errors.zipCode === ''}
                                            invalid={errors.zipCode !== ''}
                                            onBlur={this.handleBlur('zipCode')}
                                            onChange={this.handInputChange} />
                                        <FormFeedback>{errors.zipCode}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <h4>When do you want to move in?</h4>
                                <FormGroup row>
                                    {/* <Label htmlFor="date" className="col-md-3 col-3">Date</Label> */}
                                    <div className="col-12 mt-2">
                                        <Input type="date" id="date" name="date" min={today}
                                            placeholder="Date" value={this.state.date}
                                            valid={errors.date === ''}
                                            invalid={errors.date !== ''}
                                            onBlur={this.handleBlur('date')}
                                            onChange={this.handInputChange} />
                                        <FormFeedback>{errors.date}</FormFeedback>
                                    </div>
                                </FormGroup>
                                <FormGroup row>
                                    <div className="col-12">
                                        <ReCAPTCHA
                                            sitekey="6Lf4QrIZAAAAADu8cXAyrlUNdTlQ4wasosFATzmY"
                                            theme="dark"
                                            onChange={this.onChange}
                                            onErrored={this.networkError}

                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup row>
                                    <div className=" col-6">
                                        <Button className="btn btn-block" disabled={isDisabled} type="submit" color="btn btn-primary">
                                            Next</Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
                {/* <div className="container-fluid p-0">
                    <div className="row mx-0">
                        <div className="col-sm-8 col-12 px-0">
                            <h2>Co-Working Office Space</h2>
                            <p>Find coworking space that gives you the freedom to focus, collaborate and grow. Offering total flexibility at an affordable price, working in a shared office is ideal for your dynamic business needs.</p>
                        </div>
                    </div>
                </div>

                <div class="container-fluid p-0">
                    <div class="row mx-0">
                        <div className="col-md-12 col-12 px-0">
                            <img className="img-fluid w-100" src={coWork} alt = "cowork"></img>
                            </div>
                            <div className = "col-sm-12 col-12">
                            <ReCAPTCHA className="bottom-right"
                                sitekey="6Lf4QrIZAAAAADu8cXAyrlUNdTlQ4wasosFATzmY"
                                theme="light"
                                onChange={this.onChange}
                                onErrored={this.networkError}
                            />
                            </div>
                    </div>
                </div> */}
            </>
        )
    }
}