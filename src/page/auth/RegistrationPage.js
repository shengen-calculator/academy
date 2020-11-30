import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import styles from "./RegistrationPage.style";
import Button from "@material-ui/core/Button";
import {regEmail, regPassword} from "../../util/Regs";
import TextInput from "../../component/TextInput";
import {registrationRequest} from "../../redux/actions/authenticationActions";

function RegistrationPage({auth, registrationRequest, ...props}) {
    const {classes} = props;
    const [authentication, setAuthentication] = useState({
        name: '',
        email: '',
        password: '',
        repeat: '',
        requestInProcess: false
    });
    const [errors, setErrors] = useState({});

    const handleRegistration = (event) => {
        event.preventDefault();
        if (!isFormValid()) return;
        const { email, password, name } = authentication;
        registrationRequest({email: email, password: password, name: name});
    };


    const isFormValid = () => {
        const { email, password, name, repeat } = authentication;

        const errors = {};

        if (!name) {
            errors.name = "The field is obligatory";
        }

        if (!email) {
            errors.email = "The field is obligatory";
        } else if (!regEmail.test(String(email).toLowerCase())) {
            errors.email = "Email format is not correct";
        }

        if (!password) {
            errors.password = "The field is obligatory";
        } else if (!regPassword.test(String(password).toLowerCase())) {
            errors.password = "Password must contain at least 8 characters";
        }

        if (!repeat) {
            errors.repeat = "The field is obligatory";
        } else if (password !== repeat) {
            errors.repeat = "Password and confirm password not matched"
        }

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setAuthentication(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Typography color="textPrimary">
                                For registration please fill out the form below
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={3}>
                        <form className={classes.form} onSubmit={handleRegistration}>
                            <TextInput
                                className={classes.formItem}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                value={authentication.name}
                                error={errors.name}
                            />
                            <TextInput
                                className={classes.formItem}
                                name="email"
                                label="Email"
                                onChange={handleChange}
                                value={authentication.email}
                                error={errors.email}
                            />
                            <TextInput
                                className={classes.formItem}
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleChange}
                                value={authentication.password}
                                error={errors.password}
                            />
                            <TextInput
                                className={classes.formItem}
                                name="repeat"
                                label="Repeat Password"
                                type="password"
                                onChange={handleChange}
                                value={authentication.repeat}
                                error={errors.repeat}
                            />
                            <Button
                                className={classes.formItem}
                                type="submit"
                                disabled={auth.registering}
                                variant="contained"
                                onChange={handleChange}>
                                Registration
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
}


function mapStateToProps(state) {
    return {
        auth: state.authentication
    }
}

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    registrationRequest
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(RegistrationPage));