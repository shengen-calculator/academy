import React, {useState} from 'react';
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
import ReserveDialog from "../../component/ReserveDialog";


function TablePage(props) {
    const { classes } = props;
    let { number } = useParams();
    const history = useHistory();
    const [dialog, setDialog] = React.useState({
        isOpen: false,
        phoneNumber: '',
        customerName: '',
        date:''
    });
    const [errors, setErrors] = useState({});

    const goBack = () => {
        history.push(`/reservation`);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setDialog(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {

    };

    const handleDelete = () => {

    };

    const openReserveDialog = () => {
        setDialog({...dialog, isOpen: true});

    };

    const handleClose = () => {
        setDialog({...dialog, isOpen: false});
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
            <ReserveDialog
                isOpen={dialog.isOpen}
                x={dialog.x}
                y={dialog.y}
                id={dialog.id}
                refNumber={dialog.refNumber}
                errors={errors}
                handleSave={handleSave}
                handleDelete={handleDelete}
                seats={dialog.seats}
                handleChange={handleChange}
                handleClose={handleClose}/>
        </Paper>
    );
}

export default withStyles(styles)(TablePage);