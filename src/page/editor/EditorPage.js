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
import {
    getTablesRequest,
    addTableRequest,
    updateTableRequest,
    deleteTableRequest,
    swapTablesRequest
} from "../../redux/actions/tableActions";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";


function EditorPage(props) {
    const {
        classes,
        inProgress,
        auth,
        getTablesRequest,
        addTableRequest,
        updateTableRequest,
        deleteTableRequest,
        swapTablesRequest,
        tables
    } = props;
    const [dialog, setDialog] = React.useState({isOpen: false, seats: ''});
    const [errors, setErrors] = useState({});
    const [draggedTable, setDraggedTable] = useState(null);
    const vertical = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(() => {
        if (tables === null)
            getTablesRequest({uid: auth.userId});
    }, [auth.userId, getTablesRequest, tables]);

    const tableClickHandler = (x, y) => {
        const table = tables.find(t => t.x === x && t.y === y);
        if (table) {
            setDialog({
                ...dialog,
                isOpen: true,
                id: table.id,
                x: x,
                y: y,
                seats: table.seats,
                refNumber: table.refNumber
            });
        } else {
            const max = Math.max.apply(Math, tables.map(o => {
                return o.refNumber
            }));
            setDialog({
                ...dialog,
                id: null,
                isOpen: true,
                x: x,
                y: y,
                seats: '',
                refNumber: max === -Infinity ? '1' : max + 1
            });
        }
    };

    const tableDragStartHandler = (e, x, y) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData('text/html', e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
        setDraggedTable({...draggedTable, source: {x: x, y: y}});
    };

    const tableDragEndHandler = () => {
        const source = tables.find(t => t.x === draggedTable.source.x && t.y === draggedTable.source.y);
        const dest = tables.find(t => t.x === draggedTable.dest.x && t.y === draggedTable.dest.y);

        swapTablesRequest({
            source: {
                uid: auth.userId,
                table: {
                    seats: source.seats,
                    refNumber: source.refNumber,
                    x: draggedTable.dest.x,
                    y: draggedTable.dest.y,
                },
                tableId: source.id
            }, dest: {
                uid: auth.userId,
                table: {
                    seats: dest.seats,
                    refNumber: dest.refNumber,
                    x: draggedTable.source.x,
                    y: draggedTable.source.y,
                },
                tableId: dest.id
            }
        });
    };

    const tableDragOverHandler = (e, x, y) => {
        e.preventDefault();
        if(draggedTable.dest) {
            if(draggedTable.dest.x !== x || draggedTable.dest.y !== y) {
                setDraggedTable({...draggedTable, dest: {x: x, y: y}});
            }
        } else {
            setDraggedTable({...draggedTable, dest: {x: x, y: y}});
        }
    };



    const handleDelete = (e) => {
        e.preventDefault();
        deleteTableRequest({uid: auth.userId, tableId: dialog.id});
        setDialog({...dialog, isOpen: false});
    };

    const handleClose = () => {
        setDialog({...dialog, isOpen: false});
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        if (!dialog.id) {
            addTableRequest({
                uid: auth.userId, table: {
                    x: dialog.x,
                    y: dialog.y,
                    refNumber: dialog.refNumber,
                    seats: dialog.seats
                }
            });
        } else {
            updateTableRequest({
                uid: auth.userId, table: {
                    x: dialog.x,
                    y: dialog.y,
                    refNumber: dialog.refNumber,
                    seats: dialog.seats,
                }, tableId: dialog.id
            });
        }
        setDialog({...dialog, isOpen: false});
    };


    const isFormValid = () => {
        const {seats} = dialog;
        const errors = {};

        if (!seats) {
            errors.seats = "The field is obligatory";
        }

        if (isNaN(Number(seats))) {
            errors.seats = "The number of seats must be a number";
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
                tables !== null ?
                    <div className={classes.contentWrapper}>
                        {
                            vertical.map(y =>
                                <RowOfTables onTableClick={(x) => tableClickHandler(x, y)}
                                             onTableDragOver={(e, x) => tableDragOverHandler(e, x, y)}
                                             onTableDragStart={(e, x) => tableDragStartHandler(e, x, y)}
                                             onTableDragEnd={tableDragEndHandler}
                                             data={tables.filter(table => table.y === y)}
                                             key={y}/>
                            )
                        }
                    </div> : <div className={classes.progress}><CircularProgress/></div>
            }
            <TableDialog
                isOpen={dialog.isOpen}
                x={dialog.x}
                y={dialog.y}
                id={dialog.id}
                refNumber={dialog.refNumber}
                errors={errors}
                handleSave={handleSave}
                handleDelete={handleDelete}
                inProgress={inProgress}
                seats={dialog.seats}
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
    addTableRequest,
    updateTableRequest,
    deleteTableRequest,
    swapTablesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditorPage));
