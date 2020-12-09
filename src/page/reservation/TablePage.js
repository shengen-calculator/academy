import React, {useEffect, useState} from 'react';
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
import {
    addReserveRequest,
    updateReserveRequest,
    getFutureReservesRequest,
    getPastReservesRequest
} from "../../redux/actions/reserveActions";
import {connect} from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableOfReserves from "../../component/TableOfReserves";
import {compareItems, isFutureSlot, isPastSlot, getPossibleSlots} from "./ReserveFn";


function TablePage(props) {
    const {
        classes,
        addReserveRequest,
        updateReserveRequest,
        auth,
        getFutureReservesRequest,
        getPastReservesRequest,
        reserves
    } = props;
    const {number} = useParams();
    const history = useHistory();
    const [dialog, setDialog] = React.useState({
        isOpen: false,
        id: '',
        phoneNumber: '',
        customerName: '',
        date: new Date(),
        timeSlot: ''
    });

    const [filter, setFilter] = useState({isFuture: "true"});

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(filter.isFuture === "true" && reserves.future.tableRef !== Number(number)) {
            getFutureReservesRequest({uid: auth.userId, tableRef: Number(number)});
        } else if(filter.isFuture === "false" && reserves.past.tableRef !== Number(number)) {
            getPastReservesRequest({uid: auth.userId, tableRef: Number(number)});
        }
    }, [
        getFutureReservesRequest,
        getPastReservesRequest,
        reserves.future.tableRef,
        reserves.past.tableRef,
        filter.isFuture,
        auth.userId,
        number
    ]);

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

    const handleFilterChange = (event) => {
        const {name, value} = event.target;
        setFilter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const reserveDateHandleChange = (value) => {
        setDialog({...dialog, date: value});
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        if(dialog.id) {
            // update existing reserve
            updateReserveRequest({
                uid: auth.userId,
                reserveId: dialog.id,
                reserve: {
                    date: dialog.date,
                    name: dialog.customerName,
                    phone: dialog.phoneNumber,
                    tableRef: Number(number),
                    slot: Number(dialog.timeSlot)
                }
            });
        } else {
            // create new one
            addReserveRequest({
                uid: auth.userId,
                reserve: {
                    date: dialog.date,
                    name: dialog.customerName,
                    phone: dialog.phoneNumber,
                    tableRef: Number(number),
                    slot: Number(dialog.timeSlot)
                }
            });
        }

        setDialog({
            ...dialog,
            isOpen: false,
            id: '',
            phoneNumber: '',
            customerName: '',
            date: new Date(),
            timeSlot: ''
        });
    };


    const isFormValid = () => {

        const errors = {};
        const {phoneNumber, customerName, timeSlot} = dialog;

        if (!phoneNumber) {
            errors.phoneNumber = "The customer phone number is obligatory field";
        }

        if (!customerName) {
            errors.customerName = "The customer name field is obligatory field";
        }

        if (!timeSlot) {
            errors.timeSlot = "Please select time slot";
        }

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    };

    const handleDelete = () => {

    };

    const openReserveDialog = (e, reserve) => {
        setErrors({});

        if (reserve) {
            setDialog({
                ...dialog,
                id: reserve.id,
                phoneNumber: reserve.phone,
                customerName: reserve.name,
                date: reserve.date.toDate(),
                timeSlot: reserve.slot,
                isOpen: true
            });


        } else {
            setDialog({...dialog, isOpen: true});
        }
    };

    const handleClose = () => {
        setDialog({
            ...dialog,
            isOpen: false,
            id: '',
            phoneNumber: '',
            customerName: '',
            date: new Date(),
            timeSlot: ''
        });
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
                <div>
                    <Button
                        color="primary"
                        className={classes.button}
                        onClick={goBack}
                        startIcon={<ArrowBackIosIcon/>}
                    >
                        Go Back
                    </Button>
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={openReserveDialog}
                    startIcon={<LibraryAddIcon/>}
                >
                    New Reserve
                </Button>
            </div>
            <div className={classes.filterWrapper}>
                <FormControl className={classes.filter}>
                    <InputLabel htmlFor="age-native-simple">Show only</InputLabel>
                    <Select
                        native
                        value={filter.isFuture}
                        onChange={handleFilterChange}
                        inputProps={{
                            name: 'isFuture',
                            id: 'isFuture',
                        }}
                    >
                        <option value={true}>Future Reserves</option>
                        <option value={false}>Past Reserves</option>
                    </Select>
                </FormControl>
            </div>
            <div className={classes.contentWrapper}>
                {filter.isFuture === "true" ?
                    (reserves.future.tableRef === Number(number) ?
                        <TableOfReserves
                            rows={reserves.future.items.filter(x => isFutureSlot(x)).sort(compareItems)}
                            onEditClick={openReserveDialog}
                            isEditable={true}
                        /> :
                        <div className={classes.progress}><CircularProgress/></div>)
                    :
                    (reserves.past.tableRef === Number(number) ?
                        <TableOfReserves
                            rows={reserves.past.items.filter(x => isPastSlot(x)).sort(compareItems)}
                            onEditClick={openReserveDialog}
                            isEditable={false}
                        /> :
                        <div className={classes.progress}><CircularProgress/></div>)
                }
            </div>
            <ReserveDialog
                id={dialog.id}
                isOpen={dialog.isOpen}
                refNumber={number}
                date={dialog.date}
                customerName={dialog.customerName}
                phoneNumber={dialog.phoneNumber}
                timeSlot={dialog.timeSlot}
                errors={errors}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleChange={handleChange}
                reserveDateHandleChange={reserveDateHandleChange}
                getPossibleSlots={() => getPossibleSlots(reserves.future, dialog.date, dialog.id ? dialog.timeSlot : null)}
                handleClose={handleClose}/>
        </Paper>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.authentication,
        reserves: state.reserves
    }
}

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    addReserveRequest,
    updateReserveRequest,
    getFutureReservesRequest,
    getPastReservesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TablePage));