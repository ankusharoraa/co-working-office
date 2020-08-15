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
import CRC32 from 'crc-32/crc32.js';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';

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
                personZipCode: false

            },
            workspaceinfo: WORKSPACEINFO,
            location: '',
            businessName: '',
            personEmail: '',
            personZipCode: '',
            personLocation: '',
            personCity: '',
            personState: '',
            selectedFile: '',
            businessCard: false,
            imageChkSum: '',
            personName: '',
            personPhone: '',
            personAddress: ''
        }
    }


    handInputChange = async (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setState({
            [name]: value
        })

        if (this.state.zipCode.length === 5 && this.state.location === '') {

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
        // const proxyurl = "https://corsaccess.herokuapp.com/";
        // const api = 'D7tjLiQJPsT79URUYdaTXxG8MpvqZMUers7pbB2zfjz0s8AzLo8XxK4LibTT7NYT';
        let formatZip = zipCodeUs.slice(0, 5);
        let url = `https://www.zipcodeapi.com/rest/${api}/info.json/${formatZip}/degrees`
        const res = await axios.get(url);
        // const res = await axios.get(`${proxyurl}${url}`);
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
                personCity: city,
                personState: locState
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
        if (this.state.people === '') {
            this.setState({
                people: 0
            })
        }
    }
    decrease = () => {
        if (this.state.people > 0) {
            this.setState({
                people: parseInt(this.state.people) - 1
            })
        }
        if (this.state.people === '') {
            this.setState({
                people: 0
            })
        }
    }
    onFileChange = async (event) => {

        // Update the state 
        if (this.state.businessName !== '' || this.state.personAddress !== '' || this.state.personEmail !== '' || this.state.personPhone !== '') {
            this.setState({
                businessName: '',
                personAddress: '',
                personEmail: '',
                personName: '',
                personPhone: '',
                personZipCode: '',
                personLocation: ''
            })
        }
        await this.setState({ selectedFile: event.target.files[0] });
        console.log("Name--->..." + this.state.selectedFile.name)
        const reader = new FileReader();
        let pattern = /image-*/;
        if (!this.state.selectedFile.type.match(pattern)) {
            await this.setState({
                selectedFile: null,
                imageChkSum: ''
            });
            alert('invalid format');
            return;
        }
        reader.addEventListener('load', (event) => {
            this._handleReaderLoaded(event);
        });
        reader.readAsBinaryString(this.state.selectedFile);
    };
    _handleReaderLoaded(event) {
        this.setState({
            businessCard: true
        })
        // this.pg1Next = true;
        const data = event.target.result;
        this.setState({
            imageChkSum: this.getCheckSumValue(data)
        })
        if (this.state.selectedFile !== '' && this.state.imageChkSum !== null) {
            this.scanCard(this.state.selectedFile, this.state.imageChkSum)
        }
    }
    getCheckSumValue(data) {
        const crcVal = CRC32.bstr(data);
        const hexVal = this.lpad((crcVal >>> 0).toString(16), 8, "0");
        return hexVal;
    }
    lpad(s, len, chr) {
        const L = len - s.length;
        const C = chr || " ";
        if (L <= 0) {
            return s;
        }
        return new Array(L + 1).join(C) + s;
    };

    scanCard = async (selectedFileState, imageChkSumState) => {
        let res = '';
        let taskId = '';
        const proxyurl = "https://corsaccess.herokuapp.com/";
        let url = 'https://cloud-westus.ocrsdk.com/v2/processBusinessCard?exportFormat=xml';
        let username = "53573204-976c-40f4-a22b-5f6bad540290"
        let pass = "W9zhas+CMMYurG3HOmnrqsig"
        const httpOptions = {

            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ":" + pass),
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*'

        }

        try {

            res = await trackPromise(axios.post(proxyurl + url, selectedFileState, { headers: httpOptions }))
            console.log(JSON.stringify(res.data))
        } catch (e) {
            console.error("error in scanCard---->" + e)
        }
        if (res.data.taskId !== '') {
            taskId = res.data.taskId
        }
        // alert(taskId);
        this.GetresultUrls(taskId);
    }

    // xml  response to JSON
    xmlToJson = (xml) => {
        // Create the return object
        let obj = {};

        if (xml.nodeType === 1) {
            // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    let attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) {
            // text
            obj = xml.nodeValue;
        }

        // do children
        // If all text nodes inside, get concatenated text from them.
        let textNodes = [].slice.call(xml.childNodes).filter(function (node) {
            return node.nodeType === 3;
        });
        if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
            obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
                return text + node.nodeValue;
            }, "");
        } else if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                let item = xml.childNodes.item(i);
                let nodeName = item.nodeName;
                if (typeof obj[nodeName] === "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof obj[nodeName].push === "undefined") {
                        let old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    }
    GetresultUrls = async (taskId) => {
        let hitCount = 0;
        let resultUrls = ''
        let getRes = ''
        let jsonResponse = ''
        const proxyurl = "https://corsaccess.herokuapp.com/";
        let url2 = 'https://cloud-westus.ocrsdk.com/v2/getTaskStatus';
        let username = "53573204-976c-40f4-a22b-5f6bad540290"
        let pass = "W9zhas+CMMYurG3HOmnrqsig"
        const httpOptions2 = {

            'Authorization': 'Basic ' + btoa(username + ":" + pass),
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*'
        }
        const paramsNew = { 'taskId': taskId }
        try {

            getRes = await trackPromise(axios.get(proxyurl + url2, { headers: httpOptions2, params: paramsNew }))
            console.log("url check --->" + JSON.stringify(getRes.data))
            // requestUrl will be empty if it is in other status than complete
            while (getRes.data.status !== 'Completed') {
                if (hitCount <= 10) {
                    console.log("Inside while")
                    getRes = ''
                    getRes = await trackPromise(axios.get(proxyurl + url2, { headers: httpOptions2, params: paramsNew }))
                    console.log("while---->" + JSON.stringify(getRes.data) + " count is " + hitCount)
                    hitCount++;
                }
                else {
                    break;
                }
            }
            resultUrls = await getRes.data.resultUrls[0];

            // alert(resultUrls)
            const response = await trackPromise(fetch(proxyurl + resultUrls));

            const xmlString = await trackPromise(response.text());
            let XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
            jsonResponse = this.xmlToJson(XmlNode);
            console.log("Response of xml ", jsonResponse)
            this.setDataforXmlResponse(jsonResponse)

        } catch (e) {
            console.error("error in taskId---->" + e)
        }

    }
    setDataforXmlResponse = (xmltojsonResponse) => {
        const Data = xmltojsonResponse
        //console.log(Data.document.businessCard.field) 
        const length = Data.document.businessCard.field
        for (let i of length) {
            // console.log(i);
            if (i["@attributes"].type === "Company") {
                this.setState({
                    businessName: i.value
                })
            }
            if (i["@attributes"].type === "Email") {
                // this.addressOnCard = i.value
                if (i.value !== '' && i.value !== null && i.value !== 0) {
                    this.setState({
                        personEmail: i.value
                    })
                }
            }
            if (i["@attributes"].type === "Phone") {
                // this.addressOnCard = i.value
                if (i.value !== '' && i.value !== null && i.value !== 0) {
                    this.setState({
                        personPhone: i.value
                    })
                }
            }
            if (i["@attributes"].type === "Name") {
                // this.addressOnCard = i.value
                if (i.value !== '' && i.value !== null && i.value !== 0) {
                    this.setState({
                        personName: i.value
                    })
                }
            }
            if (i["@attributes"].type === "Address") {
                // this.addressOnCard = i.value
                let newArr = []
                let checkZip = []
                newArr = i.value.split(' ')
                for (let j = 0; j < newArr.length; j++) {
                    checkZip[j] = parseInt(newArr[j]);
                    // if(isNaN(checkZip[j])){
                    //     checkZip.splice(j,1)
                    // }
                    // console.log(`${checkZip[j]} ${typeof(checkZip[j])} `)

                    // if(newArr[j].length>=5 && Number.isInteger(newArr[j])){
                    //     console.log(newArr[j])
                    // }
                }
                for (let j = checkZip.length; j >= 0; j--) {

                    if (isNaN(checkZip[j])) {
                        checkZip.splice(j, 1)
                    }
                    if (checkZip[j] >= 5) {
                        let locationZip = checkZip[j].toString()

                        this.setState({
                            personZipCode: checkZip[j]
                        })
                        this.handleFetch(locationZip);
                        break;
                    }

                }

                console.log(`Check Zip ---> ${[...checkZip]}`)
                console.log(`newArr ---> ${newArr.length}, ${newArr}`)
                if (i.value !== '' && i.value !== null && i.value !== 0) {
                    this.setState({
                        personAddress: i.value
                    })
                }
            }
        }
    }

    updatePersonDetails = () => {
        // this.setState({
        //     businessName : 'Spotlight',
        //     personZipCode : '12345',
        //     personEmail : 'business@spotlight.com',
        //     personLocation : 'Schenectady, NY, U.S',
        //     personCity : 'Schenectady',
        //     personState : 'NY'
        // })
    }

    deletePersonDetails = () => {
        this.setState({
            businessName: '',
            personZipCode: '',
            personEmail: '',
            personLocation: '',
            personCity: '',
            personState: ''
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
                <Loader promiseTracker={usePromiseTracker} color={'#3d5e61'} background={'rgba(255,255,255,.5)'} />
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route exact path='/' render={() => <Landing key={'landingComp'}
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
                        <Route exact path="/personalinfo" render={() => <PersonalInfo key={'personalIn'}
                            handInputChange={this.handInputChange}
                            handleBlur={this.handleBlur}
                            onChange={this.onChange}
                            personZipCode={this.state.personZipCode}
                            businessName={this.state.businessName}
                            personEmail={this.state.personEmail}
                            updatePersonDetails={this.updatePersonDetails}
                            deletePersonDetails={this.deletePersonDetails}
                            personLocation={this.state.personLocation}
                            onFileChange={this.onFileChange}
                            selectedFile={this.state.selectedFile}
                            personEmailTouched={this.state.touched.personEmail}
                            businessNameTouched={this.state.touched.businessName}
                            personZipCodeTouched={this.state.touched.personZipCode} />} />
                        <Route exact path="/confirmPerson" render={() => <ConfirmPerson
                            handInputChange={this.handInputChange}
                            handleBlur={this.handleBlur}
                            onChange={this.onChange}
                            personCity={this.state.personCity}
                            personState={this.state.personState}
                            personEmail={this.state.personEmail}
                            businessName={this.state.businessName}
                            personAddress={this.state.personAddress}
                            personName={this.state.personName}
                            personPhone={this.state.personPhone} />}
                        />
                        <Redirect to='/' />
                    </Switch>


                </Router>
                <Footer />
            </>
        )
    }
}