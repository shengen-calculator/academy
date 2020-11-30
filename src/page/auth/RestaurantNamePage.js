import React from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./RestaurantNamePage.style";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


function RestaurantNamePage(props) {
    const { classes } = props;
    const handleSetRestaurantName = () => {};
    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Typography color="textPrimary">
                                Please enter name of the restaurant
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
                        <form className={classes.form} onSubmit={handleSetRestaurantName} >
                            <TextField className={classes.formItem} id="restaurantName" label="Restaurant Name" />
                            <Button className={classes.formItem} type="submit" variant="contained">Save</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
}

export default withStyles(styles)(RestaurantNamePage);