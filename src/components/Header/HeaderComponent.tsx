import React from 'react';
import { Container, Form, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Heart, Person } from 'react-bootstrap-icons';
import { Header } from 'antd/es/layout/layout';
export const HeaderComponent: React.FC = () => {
    const headerStyle: React.CSSProperties = {
        backgroundColor: '#fff',
        justifyContent: 'center'
    };

    return (
        <Header style={headerStyle}>
            <Navbar expand="xl">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src="/public/asset/logo.svg"
                            width="30"
                            height="30"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="w-full">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon="search" />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="What are you looking for"
                                    className=" mr-sm-2"
                                />
                            </InputGroup>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Item className="d-flex">
                            <Nav.Link href="#home" className="mr-5">
                                <Person size={22} color="#000" />
                            </Nav.Link>
                            <Nav.Link href="#home">
                                <Heart size={20} />
                            </Nav.Link>
                        </Nav.Item>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Header>
    );
};
