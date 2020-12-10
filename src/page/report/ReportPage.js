import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./ReportPage.style";
import {DatePicker} from "@material-ui/pickers";
import TableOfReserves from "../../component/TableOfReserves";
import {getReservesRequest} from "../../redux/actions/reserveActions";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";


function ReportPage(props) {
    const {classes, getReservesRequest, auth, reserves} = props;
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        getReservesRequest({date: date, uid: auth.userId,});
    }, [date, getReservesRequest, auth]);

    const reserveDateHandleChange = (value) => {
        setDate(value);
    };

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Typography color="textPrimary">
                                Reservation report for a given date
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.pickerWrapper}>
                <DatePicker
                    label="Reservation date"
                    name="date"
                    value={date}
                    onChange={reserveDateHandleChange}
                />
            </div>
            {
                reserves.report != null ?
                    (
                        reserves.report.length > 0 ? <div className={classes.tableWrapper}>
                                <TableOfReserves
                                    rows={reserves.report}
                                    isEditable={false}
                                />
                            </div> :
                            <Typography className={classes.label}>No records found</Typography>
                    ) :
                    <div className={classes.progress}><CircularProgress/></div>
            }
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
    getReservesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReportPage));
