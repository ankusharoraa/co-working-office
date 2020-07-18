import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import Workspace from './Workspaces'
import Landing from './LandingPage'
import history from './history';
import { Switch, Route, Router } from 'react-router-dom';




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

    onChange = (value) => {

        this.setState({
            isVerified: true
        })

    }


    toggleWorkspace = () => {
        alert(`Pincode is ${this.state.zipCode}`)
        history.push('/workspaces');

    }
    render() {


        return (
            <>
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route exact path='/' render={() => <Landing
                            isVerified={this.state.isVerified}
                            zipCode={this.state.zipCode}
                            date={this.state.date} touched={this.state.touched}
                            handInputChange={this.handInputChange}
                            handleBlur={this.handleBlur}
                            toggleWorkspace={this.toggleWorkspace}
                            onChange={this.onChange} />} />
                        <Route exact path='/workspaces' render={() => <Workspace zipCode={this.state.zipCode} />} />
                    </Switch>

                    <Footer />
                </Router>
            </>
        )
    }
}