import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import styles from "./TableOfReserves.style";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import DateFnsAdapter from "@date-io/date-fns";
import {timeSlots} from "../util/TimeSlots";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function TableOfReserves(props) {
    const {
        rows,
        onEditClick,
        isEditable,
        classes
    } = props;
    const dateFns = new DateFnsAdapter();
    return (
        <React.Fragment>
            {rows.length > 0 ?
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Time&nbsp;slot</TableCell>
                                <TableCell align="right">Customer&nbsp;name</TableCell>
                                <TableCell align="right">Customer&nbsp;phone</TableCell>
                                {isEditable && <TableCell align="right"/>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {dateFns.format(row.date.toDate(), 'dd MMM yyyy')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {timeSlots.find(x => x.min === Number(row.slot)).label}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    {isEditable && <TableCell align="right">
                                        <Button
                                            color="primary"
                                            className={classes.button}
                                            onClick={(e) => onEditClick(e, row)}>
                                            Edit
                                        </Button>
                                    </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : <Typography className={classes.label}>No records found</Typography>}
        </React.Fragment>
    );
}

export default (withStyles(styles)(TableOfReserves));