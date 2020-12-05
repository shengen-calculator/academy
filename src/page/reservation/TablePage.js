import React from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import styles from "./TablePage.style";
import Button from "@material-ui/core/Button";


function TablePage(props) {
    const { classes } = props;
    let { number } = useParams();
    const history = useHistory();

    const goBack = () => {
        history.push(`/reservation`);
    };

    const openReserveDialog = () => {

    };

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Typography color="textPrimary">
                                Table # {number}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                <Button
                    color="primary"
                    className={classes.button}
                    onClick={goBack}
                    startIcon={<ArrowBackIosIcon />}
                >
                    Go Back
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={openReserveDialog}
                    startIcon={<LibraryAddIcon />}
                >
                    Reserve
                </Button>
            </div>
        </Paper>
    );
}

export default withStyles(styles)(TablePage);