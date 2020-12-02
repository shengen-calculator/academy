import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./RestaurantNamePage.style";
import Button from "@material-ui/core/Button";
import TextInput from "../../component/TextInput";
import {updateDetailsRequest} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";


function RestaurantNamePage(props) {
    const {classes, inProgress, updateDetailsRequest, auth} = props;
    const [errors, setErrors] = useState({});
    const [restaurant, setRestaurant] = useState({name: ''});
    const history = useHistory();

    useEffect(() => {
        if (auth.restaurant) {
            if(history.location.state) {
                history.push(history.location.state.from.pathname);
            } else {
                history.push('/reservation');
            }
        }
    }, [auth.restaurant, history]);

    const handleSetRestaurantName = (event) => {
        event.preventDefault();
        if (!isFormValid()) return;
        const {name} = restaurant;
        updateDetailsRequest({uid: auth.userId, data: {restaurant: name}});
    };


    const handleChange = (event) => {
        const {name, value} = event.target;
        setRestaurant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isFormValid = () => {
        const { name } = restaurant;
        const errors = {};

        if (!name) {
            errors.name = "The field is obligatory";
        }

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    };
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
            <div className={classes.contentWrapper}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={3}>
                        <form className={classes.form} onSubmit={handleSetRestaurantName}>
                            <TextInput
                                className={classes.formItem}
                                name="name"
                                label="Restaurant Name"
                                onChange={handleChange}
                                value={restaurant.name}
                                error={errors.name}
                            />
                            <Button
                                className={classes.formItem}
                                type="submit"
                                disabled={inProgress > 0}
                                variant="contained"
                                onChange={handleChange}>
                                {inProgress > 0 ? 'Saving...' : 'Save'}
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
    updateDetailsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RestaurantNamePage));
