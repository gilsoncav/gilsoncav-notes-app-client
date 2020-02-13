import React, {useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import {LinkContainer} from "react-router-bootstrap";
import {Auth} from "aws-amplify";


function App(props) {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }

    async function handleLogout() {
        await Auth.signOut();

        userHasAuthenticated(false);

        props.history.push('/login');
    }

    return (
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Scratch</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated
                            ?
                            <>
                                <LinkContainer to='/settings'>
                                    <NavItem>Settings</NavItem>
                                </LinkContainer>
                                <NavItem onClick={handleLogout}>Logout</NavItem>
                            </>
                            // this is a Fragment component - it tells React that the internal components should
                            // be inside the existing component but without rendering another <div> component just
                            // for this reason.
                            : <>
                                <LinkContainer to={"/signup"}>
                                    <NavItem href="/signup">Signup </NavItem>
                                </LinkContainer>
                                <LinkContainer to={"/login"}>
                                    <NavItem href="/login">Login</NavItem>
                                </LinkContainer>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes appProps={{isAuthenticated, userHasAuthenticated}}/>
        </div>
    );
}

export default withRouter(App);