import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import Workspace from './Workspaces'
import Landing from './LandingPage'
import history from './history';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { WORKSPACEINFO } from '../shared/WorkspaceInfo'
import SecuredRoute from './SecuredRoute';
import { authentication } from './SecuredRoute';
import axios from 'axios';
import WorkspaceDetails from './WorkspaceDetails';
import PersonalInfo from './PersonalInfo';



export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            zipCode: '',
            date: '',
            agree: false,
            people: 0,
            touched: {
                zipCode: false,
                date: false,
                people: false,
                businessName: false,
                personEmail: false,
                personZipCode : false

            },
            workspaceinfo: WORKSPACEINFO,
            location: '',
            businessName: '',
            personEmail: '',
            personZipCode : ''
        }
    }

    handInputChange = async (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setState({
            [name]: value
        })

        if (this.state.zipCode.length === 5) {
            let zipCodeUs = this.state.zipCode;
            this.handleFetch(zipCodeUs);
        }
        else if (this.state.zipCode.length <= 5) {
            this.setState({
                location: ''
            })
        }
    }

    handleFetch = async (zipCodeUs) => {
        // const api = 'js-tBUE5ohdSBKXX9aeg6K9RYpb0uRCDB8TODbJSrHdwz6XNbAAtZuvnoByS6OfaElq';
        const api = 'LeptzmnMR76qtyukJQFsprY1Y4RTJkZ2F18ykBkp1RyxmWriWsa39F8K2fcs2ZVT';
        // let formatZip = this.state.zipCode.slice(0,5);
        let url = `https://www.zipcodeapi.com/rest/${api}/info.json/${zipCodeUs}/degrees`
        const res = await axios.get(url);
        const city = res.data.city;
        const locState = res.data.state
        if (city && locState !== undefined) {
            this.setState({
                location: `${city}, ${locState}, U.S`
            })
            // setValue(`${city}, ${state}, U.S`);
            // console.log(JSON.stringify(res.data));
        }
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
        authentication.isLoggedIn = true;
        console.log(authentication.isLoggedIn)
        // alert(`Pincode is ${this.state.zipCode}`)
        history.push('/workspaces');

    }
    increase = () => {
        this.setState({
            people: parseInt(this.state.people) + 1
        })
        if(this.state.people === ''){
            this.setState({
                people : 0
            })
        }
    }
    decrease = () => {
        if (this.state.people > 0) {
            this.setState({
                people: parseInt(this.state.people) - 1
            })
        }
        if(this.state.people === ''){
            this.setState({
                people : 0
            })
        }
    }

    updatePersonDetails = () =>{
        this.setState({
            businessName : 'Spotlight',
            personZipCode : '12345',
            personEmail : 'business@spotlight.com'
        })
    }
    
    deletePersonDetails = () =>{
        this.setState({
            businessName : '',
            personZipCode : '',
            personEmail : ''
        })
    }

    render() {
        const WorkspaceWithId = ({ match }) => {
            return (
                <WorkspaceDetails workspace={this.state.workspaceinfo.filter((workspace) => workspace.id === parseInt(match.params.workspaceId, 10))[0]} />
            )
        }

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
                            onChange={this.onChange}
                            people={this.state.people}
                            increase={this.increase}
                            decrease={this.decrease}
                            location={this.state.location} />} />
                        <SecuredRoute exact path='/workspaces' component={() => <Workspace
                            zipCode={this.state.zipCode}
                            workspaceinfo={this.state.workspaceinfo}
                            date={this.state.date}
                            people={this.state.people}
                            location={this.state.location} />} />
                        <SecuredRoute path="/workspaces/:workspaceId" component={WorkspaceWithId} />
                        <Route exact path="/personalinfo" render={() => <PersonalInfo
                            handInputChange={this.handInputChange}
                            handleBlur={this.handleBlur}
                            onChange={this.onChange}
                            personZipCode={this.state.personZipCode}
                            businessName={this.state.businessName}
                            personEmail={this.state.personEmail}
                            updatePersonDetails = {this.updatePersonDetails}
                            deletePersonDetails = {this.deletePersonDetails} />} />
                        <Redirect to='/' />
                    </Switch>


                </Router>
                <Footer />
            </>
        )
    }
}