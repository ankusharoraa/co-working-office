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
import LeaseTimePeriod from './LeaseTimePeriod';
import Payment from './PaymentComponent';


class MainComponent extends Component {
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
            personAddress: '',
            selectedWorkspaceId: '',
            selectedLeaseDuration: '',
            selectedLeasePrice: '',
            selectedRadioValue: '',
            selectedRadioValueYes: 0,
            selectedRadioValueNo: 0,
            clickCount: 0,
            yesSelected: false
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
        // this.guideWireApi();
        const api = 'js-tBUE5ohdSBKXX9aeg6K9RYpb0uRCDB8TODbJSrHdwz6XNbAAtZuvnoByS6OfaElq';
        // const proxyurl = "https://corsaccess.herokuapp.com/";
        // const api = 'xz6u6low8T4BsIegH3tYY08CiN7Fa6NIdXd7UPi7ABJVBCLuLgeNpdOqqtNLXrcv';
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

    // guideWireApi = async () => {
        // const proxyurl = "https://corsaccess.herokuapp.com/";
        // const url = 'http://direct-digital-gw.uk-e1.cloudhub.io/GWire';
        // const url = 'http://ec2-54-88-57-4.compute-1.amazonaws.com:8080/pc/service/foreService/microServicePolicy/createMicroServicePolicy'
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Credentials': 'true',
        //     'userName': 'su',
        //     'password': 'gw',
        //     'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            // 'Access-Control-Allow-Credentials': 'true',
            // "Access-Control-Allow-Methods" : "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        //     "X-Requested-With": "XMLHttpRequest"
        // }
        // const reqBody = {

        //     "input": {
        //         "orderKeys": ["policy"],
        //         "policy": {
        //             "yearBusinessStarted": "2020",
        //             "BaseState": "IL",
        //             "accountHolderName": "John May",
        //             "accountHolderEmailAddress": "john.may@gmail.com",
        //             "accountHolderContactFirstName": "John",
        //             "accountHolderContactLastName": "May",
        //             "primaryAddressLine1": "444",
        //             "primaryAddressLine2": "MayBash",
        //             "primaryAddressCity": "Chicago",
        //             "primaryAddressState": "IL",
        //             "primaryAddressCountry": "US",
        //             "primaryAddressPostalCode": "60604",
        //             "primaryAddressType": "business",
        //             "coverageTermValue": "2000000",
        //             "exposureBasisAmount": "300",
        //             "generalInfoWebsite": "aa@aa.com",
        //             "generalInfoDBANames": "DBA",
        //             "generalInfoLegalStatus": "Open",
        //             "financialRiskAnnualRevenue": "5000",
        //             "financialRiskD_B": "1",
        //             "industryRiskSICDescription": "Low Risk",
        //             "industryRiskNAICSDescription": "NAICS",
        //             "industryRiskIndustryInfo": "Low",
        //             "industryRiskCompanyDesc": "Low Risk",
        //             "industryRiskTypeOfCargo": "Low",
        //             "locationRiskFloodRiskScore": "78",
        //             "locationRiskCrimeScore": "34",
        //             "locationRiskTextCrimeScore": "47",
        //             "locationRiskFireProtectScore": "89",
        //             "locationRiskNearestFireStation": "Alberta",
        //             "locationRiskNearFireStionType": "Low",
        //             "locationRiskFireProtectClass": "01",
        //             "locationRiskDistanceInMiles": "23",
        //             "locationRiskDistanceInMin": "12",
        //             "locationRiskNo_of_Locations": "1",
        //             "locationalRiskFIPSCode": "023",
        //             "locationalRiskLatitude": "12",
        //             "locationalRiskLongitude": "26",
        //             "locationalRiskWildfireRisk": "36",
        //             "locationalRiskEarthquake": "Medium",
        //             "locationalRiskWind": "87",
        //             "locationalRiskHail": "High",
        //             "locationalRiskDistanceToShore": "42",
        //             "locationalRiskTornado": "High",
        //             "locationalRiskLightning": "High",
        //             "locationalRiskToxicRelFltyDis": "Low",
        //             "locationalRiskForcibleRobbery": "Low",
        //             "locationalRiskMtrVehicleTheft": "High",
        //             "locationalRiskMurder": "High",
        //             "mgmtRiskBBBRating": "87",
        //             "mgmtRiskAny_ProductRecalls": "6",
        //             "mgmtRiskSocialMediaScore": "45",
        //             "mgmtRiskAny_CodeViolations": "1",
        //             "mgmtRiskPFR": "65",
        //             "operationRiskIsAllTime": "false",
        //             "propertyRiskOperateFromHome": "true",
        //             "propertyRiskDoPlaceOfBusiness": "true",
        //             "propertyRiskExactSqFootage": "2000",
        //             "propertyRiskNoOfFloors": "4",
        //             "propertyRiskYearBuilt": "2000",
        //             "propertyRiskConstructionType": "1A",
        //             "operationRiskHrsOfOperation": "2",
        //             "operationRiskFPCCodes": "112",
        //             "personnelRiskFullTimeEmployees": "3",
        //             "lineLeveDetailsTranpNumber": "1"
        //         }
        //     }
        // }
        // try {
    //  let res = await fetch(url,{
    //     method : 'POST',
    //     mode: 'cors', 
    //     credentials: 'same-origin',
    //     headers,
    //     body : JSON.stringify(reqBody)
    // })
    //     let res = await new XMLHttpRequest();
    //    await res.open('POST',url);
    //     await res.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //     await res.setRequestHeader('userName','su')
    //     await res.setRequestHeader('password','gw')
    //     await res.setRequestHeader('Access-Control-Allow-Origin','http://localhost:3000')
    //     await res.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    //     await res.send(JSON.stringify(reqBody))
    //         let res = await axios.post(proxyurl + url, reqBody, { headers })
    //         console.log(`response from guidewire ----> ${JSON.stringify(res)}`)
    //     }
    //     catch (e) {
    //         console.error("error in GuideWire---->" + e)
    //     }

    // }


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

    getSelectedWorkspaceId = async () => {
        let url = window.location.href
        console.log(url)
        let findId = url.split('/')
        let id
        id = findId[4]
        console.log("ID is --->" + id)
        await this.setState({
            selectedWorkspaceId: id
        })
    }

    updateLeaseDuration = async (duration, price) => {
        if (duration === '1') {
            this.setState({
                selectedLeaseDuration: duration,
                selectedLeasePrice: price
            })
        }
        else if (duration === '6') {
            price = parseInt(price) * parseInt(duration);
            this.setState({
                selectedLeaseDuration: duration,
                selectedLeasePrice: price
            })
        }
        else if (duration === '12') {
            price = parseInt(price) * parseInt(duration);
            this.setState({
                selectedLeaseDuration: duration,
                selectedLeasePrice: price
            })
        }
    }

    updateRadioState = async (radioValue) => {

        let orignalValue = this.state.selectedLeasePrice
        console.log(`type of orignalValue is ${typeof (orignalValue)} and type of previousValue is ${typeof (previousValue)}`)
        this.setState({
            clickCount: this.state.clickCount + 1
        })

        await this.setState({
            selectedRadioValue: parseInt(radioValue),

        })

        if (radioValue === '10') {
            if (this.state.selectedRadioValueYes === 0) {
                let totalAmount = parseInt(this.state.selectedLeasePrice) + parseInt(radioValue)
                await this.setState({
                    selectedRadioValueYes: totalAmount
                })
            }
            await this.setState({
                yesSelected: true
            })
        }
        if (radioValue === '0') {
            await this.setState({
                selectedRadioValueNo: this.state.selectedLeasePrice,
                yesSelected: false
            })
        }

        //   await this.setState({
        //         selectedLeasePrice: this.state.selectedLeasePrice + this.state.radioValue
        //     })

    }

    updateClickCount = () => {

        this.setState({
            clickCount: 0,
            // selectedLeaseDuration: 0,
            // selectedLeasePrice: 0,
            yesSelected: false,
            selectedRadioValueNo: 0,
            selectedRadioValueYes: 0
        })

    }


    PersonInformation = () => {
        return (
            <>
                <PersonalInfo key={'personalIn'}
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
                    personZipCodeTouched={this.state.touched.personZipCode} />
            </>
        )
    }

    WorkspaceWithId = ({ match }) => {

        return (
            <>
                <WorkspaceDetails workspace={this.state.workspaceinfo.filter((workspace) => workspace.id === parseInt(match.params.workspaceId, 10))[0]}
                    getSelectedWorkspaceId={this.getSelectedWorkspaceId} />
            </>
        )
    }

    Workspaces = () => {
        return (
            <>
                <Workspace
                    zipCode={this.state.zipCode}
                    workspaceinfo={this.state.workspaceinfo}
                    setDate={this.state.setDate}
                    people={this.state.people}
                    location={this.state.location} />
            </>
        )
    }

    ConfirmPersonDetails = () => {
        return (
            <>
                <ConfirmPerson
                    handInputChange={this.handInputChange}
                    handleBlur={this.handleBlur}
                    onChange={this.onChange}
                    personCity={this.state.personCity}
                    personState={this.state.personState}
                    personEmail={this.state.personEmail}
                    businessName={this.state.businessName}
                    personAddress={this.state.personAddress}
                    personName={this.state.personName}
                    personPhone={this.state.personPhone} />
            </>
        )
    }

    LeaseWorkspaceTimeDuration = () => {
        return (
            <>
                <LeaseTimePeriod
                    workspace={this.state.workspaceinfo}
                    selectedWorkspaceId={this.state.selectedWorkspaceId}
                    selectedLeaseDuration={this.state.selectedLeaseDuration}
                    updateLeaseDuration={(duration, price) => this.updateLeaseDuration(duration, price)}
                    updateRadioState={(radioValue) => this.updateRadioState(radioValue)}
                    updateClickCount = {this.updateClickCount} />
            </>
        )
    }

    PaymentComp = () => {
        return (
            <>
                <Payment
                    selectedLeasePrice={this.state.selectedLeasePrice}
                    selectedRadioValueYes={this.state.selectedRadioValueYes}
                    selectedRadioValueNo={this.state.selectedRadioValueNo}
                    updateClickCount={this.updateClickCount}
                    yesSelected={this.state.yesSelected}
                />
            </>
        )
    }



    render() {


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
                        <SecuredRoute exact path='/workspaces' component={this.Workspaces} />
                        <SecuredRoute path="/workspaces/:workspaceId" component={this.WorkspaceWithId} />
                        <SecuredRoute exact path="/personalinfo" component={this.PersonInformation} />
                        <SecuredRoute exact path="/confirmPerson" component={this.ConfirmPersonDetails} />
                        <SecuredRoute exact path="/leaseDuration" component={this.LeaseWorkspaceTimeDuration} />
                        <SecuredRoute exact path="/payment" component={this.PaymentComp} />
                        <Redirect to='/' />
                    </Switch>

                </Router>
                <Footer />
            </>
        )
    }
}
export default MainComponent