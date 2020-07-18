import React, { Component } from 'react'
import logo from '../images/logo.jpg';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, NavLink
} from 'reactstrap';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModelOpen: false
        }
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
                <Navbar className="navbar-light bg-light" expand="sm">
                    <div className="container-fluid">
                        <NavbarToggler onClick={() => this.toggleNav()} />
                        <NavbarBrand className="mr-auto ml-sm-0 ml-2" href="/">
                            <img src={logo} height="50" width="100" alt="logo" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>

                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span>Login</Button>
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