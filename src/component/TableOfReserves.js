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

function TableOfReserves(props) {
    const {
        rows,
        onEditClick,
        classes
    } = props;
    const dateFns = new DateFnsAdapter();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Time&nbsp;slot</TableCell>
                        <TableCell align="right">Customer&nbsp;name</TableCell>
                        <TableCell align="right">Customer&nbsp;phone</TableCell>
                        <TableCell align="right"></TableCell>
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
                            <TableCell align="right">
                                <Button
                                    color="primary"
                                    className={classes.button}
                                    onClick={onEditClick}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default (withStyles(styles)(TableOfReserves));