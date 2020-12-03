import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./EditorPage.style";
import RowOfTables from "../../component/RowOfTables";
import TableDialog from "../../component/TableDialog";
import {getTablesRequest, addTableRequest} from "../../redux/actions/tableActions";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";


function EditorPage(props) {
    const { classes, inProgress, auth, getTablesRequest, addTableRequest, tables } = props;
    const [dialog, setDialog] = React.useState({isOpen: false, numberOfSeats: ''});
    const [errors, setErrors] = useState({});
    const vertical = [0,1,2,3,4,5,6,7,8,9];

    useEffect(() => {
        if(tables === null)
            getTablesRequest({uid: auth.userId});
    }, [auth.userId, getTablesRequest, tables]);

    const tableClickHandler = (x, y) => {
        setDialog({...dialog, isOpen: true, x: x, y: y, numberOfSeats: ''});
    };
    const handleClose = () => {
        setDialog({...dialog, isOpen: false});
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        addTableRequest({
            uid: auth.userId, table: {
                x: dialog.x,
                y: dialog.y,
                refNumber: 1,
                seats: dialog.numberOfSeats
            }
        });
        setDialog({...dialog, isOpen: false});
    };


    const isFormValid = () => {
        const { numberOfSeats } = dialog;
        const errors = {};

        if (!numberOfSeats) {
            errors.numberOfSeats = "The field is obligatory";
        }

        if(isNaN(Number(numberOfSeats))) {
            errors.numberOfSeats = "The number of seats must be a number";
        }

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;

    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setDialog(prev => ({
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
                                Tables
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                inProgress === 0 && tables !== null ?
                <div className={classes.contentWrapper}>
                    {
                        vertical.map(y =>
                            <RowOfTables onTableClick={(x) => tableClickHandler(x, y)} key={y}/>
                            )
                    }
                </div> : <div className={classes.progress}><CircularProgress /></div>
            }
            <TableDialog
                isOpen={dialog.isOpen}
                x={dialog.x}
                y={dialog.y}
                errors={errors}
                handleSave={handleSave}
                inProgress={inProgress}
                numberOfSeats={dialog.numberOfSeats}
                handleChange={handleChange}
                handleClose={handleClose}/>
        </Paper>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.authentication,
        inProgress: state.apiCallsInProgress,
        tables: state.tables
    }
}

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    getTablesRequest,
    addTableRequest
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(EditorPage));
