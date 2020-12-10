import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from "./Header.style";
import {connect} from "react-redux";
import {logoutRequest} from "../redux/actions/authenticationActions";
import LinearProgress from "@material-ui/core/LinearProgress";

function Header(props) {
    const { classes, onDrawerToggle, text, auth, logoutRequest, calls } = props;
    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs />
                        <Grid item>
                            <Typography>{auth.name}</Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={logoutRequest}
                                className={classes.menuButton}
                            >
                                {auth.name && <ExitToAppIcon/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                {text}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
                {calls > 0 ? <LinearProgress color="secondary" /> : <div className={classes.line}/>}
            </AppBar>
        </React.Fragment>
    );
}


function mapStateToProps(state) {
    return {
        auth: state.authentication,
        calls: state.apiCallsInProgress
    }
}

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Header));
