import React, {useState} from "react";
import "./Login.css";
import {Auth} from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {useFormFields} from "../libs/hooksLib";

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });


    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
            props.history.push('/');
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={ handleFieldChange }
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={ fields.password }
                        onChange={ handleFieldChange }
                        type="password"
                    />
                </FormGroup>
                <LoaderButton block bsSize="large" type="submit" isLoading={isLoading} disabled={!validateForm()}>
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}