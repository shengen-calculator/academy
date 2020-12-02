import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./LoginPage.style";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import TextInput from "../../component/TextInput";
import {authenticationRequest} from "../../redux/actions/authenticationActions";
import {useHistory} from "react-router-dom";

function LoginPage({authenticationRequest, inProgress, auth, ...props}) {
    const { classes } = props;
    const [authentication, setAuthentication] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        if (auth.name) {
            if(history.location.state) {
                history.push(history.location.state.from.pathname);
            } else {
                history.push('/reservation');
            }
        }
    }, [auth.name, history]);

    const handleLogin = (event) => {
        event.preventDefault();
        if (!isFormValid()) return;
        const { email, password } = authentication;
        authenticationRequest({email: email, password: password});
    };

    const isFormValid = () => {
        const { email, password } = authentication;
        const errors = {};

        if (!email) {
            errors.email = "The field is obligatory";
        }

        if (!password) {
            errors.password = "The field is obligatory";
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
                                Please enter your credential in form bellow
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper} >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={3}>
                        <form className={classes.form} onSubmit={handleLogin} >
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
                            <Button
                                className={classes.formItem}
                                type="submit"
                                disabled={inProgress > 0}
                                variant="contained"
                                onChange={handleChange}>
                                {inProgress > 0 ? 'Logging...' : 'LogIn'}
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
        auth: state.authentication,
        inProgress: state.apiCallsInProgress
    }
}

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    authenticationRequest
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(LoginPage));
