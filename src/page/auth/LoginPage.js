import React from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./LoginPage.style";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


function LoginPage(props) {
    const { classes } = props;
    const handleLogin = () => {};

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
                            <TextField className={classes.formItem} id="login" label="Login" />
                            <TextField className={classes.formItem} id="password" label="Password" type="password" />
                            <Button className={classes.formItem} type="submit" variant="contained">LogIn</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
}

export default withStyles(styles)(LoginPage);