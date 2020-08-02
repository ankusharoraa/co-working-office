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
import PersonalInfo from './PersonalInfo'
import ConfirmPerson from './ConfirmPerson';



export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            zipCode: '',
            setDate: '',
            agree: false,
            people: 0,
            touched: {
                zipCode: false,
                setDate: false,
                people: false,
                businessName: false,
                personEmail: false,
                personZipCode : false

            },
            workspaceinfo: WORKSPACEINFO,
            location: '',
            businessName: '',
            personEmail: '',
            personZipCode : '',
            personLocation : '',
            personCity : '',
            personState : ''
        }
    }

    handInputChange = async (event) => {
    
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setState({
            [name]: value
        })

        if (this.state.zipCode.length === 5 && this.state.location==='') {

            let zipCodeUs = this.state.zipCode;
            this.handleFetch(zipCodeUs);
        }
        else if (this.state.zipCode.length < 5) {
            this.setState({
                location: ''
            })
        }

        if (this.state.personZipCode.length === 5 && this.state.personLocation === '') {
            
            let zipCodeUs = this.state.personZipCode;
            this.handleFetch(zipCodeUs);
        }
        else if (this.state.personZipCode.length < 5) {
            this.setState({
                personLocation: ''
            })
        }
    }

    handleFetch = async (zipCodeUs) => {
        const api = 'js-tBUE5ohdSBKXX9aeg6K9RYpb0uRCDB8TODbJSrHdwz6XNbAAtZuvnoByS6OfaElq';
        // const api = 'GARVgdgRSwnEqoyd4SBmg3WGKtqu1lFgqDjPk8gCtjNDSz5oU5bVqGSkx5vJ8VWl';
        let formatZip = zipCodeUs.slice(0,5);
        let url = `https://www.zipcodeapi.com/rest/${api}/info.json/${formatZip}/degrees`
        const res = await axios.get(url);
        let city = res.data.city;
        let locState = res.data.state
        if (city && locState !== undefined && this.state.zipCode >= 5) {
            this.setState({
                location: `${city}, ${locState}, U.S`
            })
        }
         if (city && locState !== undefined && this.state.personZipCode >= 5) {
                this.setState({
                    personLocation: `${city}, ${locState}, U.S`,
                    personCity : city,
                    personState : locState 
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
            personEmail : 'business@spotlight.com',
            personLocation : 'Schenectady, NY, U.S',
            personCity : 'Schenectady',
            personState : 'NY'
        })
    }
    
    deletePersonDetails = () =>{
        this.setState({
            businessName : '',
            personZipCode : '',
            personEmail : '',
            personLocation : '',
            personCity : '',
            personState : ''
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
                    <Header/>
                    <Switch>
                        <Route exact path='/' render={() => <Landing key = {'landingComp'}
                            isVerified={this.state.isVerified}
                            zipCode={this.state.zipCode}
                            setDate={this.state.setDate} touched={this.state.touched}
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
                            setDate={this.state.setDate}
                            people={this.state.people}
                            location={this.state.location} />} />
                        <SecuredRoute path="/workspaces/:workspaceId" component={WorkspaceWithId} />
                        <Route exact path="/personalinfo" render={() => <PersonalInfo key = {'personalIn'}
                            handInputChange={this.handInputChange}
                            handleBlur={this.handleBlur}
                            onChange={this.onChange}
                            personZipCode={this.state.personZipCode}
                            businessName={this.state.businessName}
                            personEmail={this.state.personEmail}
                            updatePersonDetails = {this.updatePersonDetails}
                            deletePersonDetails = {this.deletePersonDetails}
                            personLocation = {this.state.personLocation} />} />
                        <Route exact path = "/confirmPerson" render = {()=><ConfirmPerson
                        personCity = {this.state.personCity}
                        personState = {this.state.personState}
                        personEmail = {this.state.personEmail}
                        businessName = {this.state.businessName}/>}/>
                        <Redirect to='/' />
                    </Switch>


                </Router>
                <Footer />
            </>
        )
    }
}