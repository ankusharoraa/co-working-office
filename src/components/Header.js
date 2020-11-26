import React, { Component } from 'react'
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Popover, PopoverHeader
} from 'reactstrap';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModelOpen: false,
            popState: false
        }
    }
    togglePopup = () => {
        this.setState({
            popState: !this.state.popState
        })
    }
    toggleModal = () => {
        this.setState({ isModelOpen: !this.state.isModelOpen })
    }
    toggleNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen })
    }
    handleLogin = (event) => {
        this.toggleModal();
        alert(`
        Username : ${this.username.value} 
        Password : ${this.password.value} 
        Remember : ${this.remember.checked}
        `);

        event.preventDefault();


    }
    render() {
        return (
            <>
                <Navbar key={'navbarKey'} className="navbar-light bg-light p-0" expand="sm">
                    <div className="container-fluid">
                        <NavbarToggler onClick={() => this.toggleNav()} />
                        <NavbarBrand className="mr-auto ml-sm-0" href="/">
                            <img src="/assets/images/logo.jpg" height="50" width="100" style={{ borderRadius: "80px" }} alt="logo" />
                            <span className="navbar-brand mb-0 lead ml-sm-2 ml-2">Co-Office Space ({this.props.toggleButton ?
                                <b id="check123" onMouseOver={this.togglePopup} onMouseLeave={this.togglePopup}>Mulesoft</b> :
                                <b id="check123" onMouseOver={this.togglePopup} onMouseLeave={this.togglePopup}>OPIN</b>})
                                </span>
                            <Popover placement="bottom" isOpen={this.state.popState} toggle={this.togglePopup} target="check123">
                                <PopoverHeader className="bg-dark text-white">Please use the switch button to change the server.</PopoverHeader>
                            </Popover>
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>

                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <div className='col-sm-12'>
                                        <label className="switch">
                                            <input type="checkbox" name='toggleButton' onChange={(e) => this.props.handInputChange(e)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className='col-sm-12'>
                                        <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span>Login</Button>
                                    </div>
                                </NavItem>



                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <div>
                    <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                        <ModalHeader>
                            Login
                    </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input} />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"
                                            innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </>
        )
    }
}