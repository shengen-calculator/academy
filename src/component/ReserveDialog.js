import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useState} from "react";
import styles from "./ReserveDialog.style";
import TextInput from "./TextInput";
import {withStyles} from "@material-ui/core/styles";
import {
    DatePicker,
} from '@material-ui/pickers';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";


function ReserveDialog({
                           isOpen,
                           handleClose,
                           handleChange,
                           handleSave,
                           handleDelete,
                           errors,
                           date,
                           customerName,
                           refNumber,
                           phoneNumber,
                           id,
                           ...props
                       }) {
    const {classes} = props;
    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form className={classes.form} onSubmit={handleSave}>
                <DialogTitle id="form-dialog-title">{`Table #${refNumber}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new table reserve (or update already existing one), please fill in the form below.
                    </DialogContentText>
                    <div className={classes.datetime}>
                        <DatePicker label="Basic example" value={selectedDate} onChange={handleDateChange} />
                        <FormControl className={classes.timeSlot}>
                            <InputLabel htmlFor="age-native-simple">Time slot</InputLabel>
                            <Select
                                native
                                value={customerName}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </Select>
                        </FormControl>
                    </div>
                    <TextInput
                        className={classes.formItem}
                        name="phoneNumber"
                        label="Phone number"
                        onChange={handleChange}
                        value={phoneNumber}
                        error={errors.phoneNumber}
                    />
                    <TextInput
                        className={classes.formItem}
                        name="customerName"
                        label="Customer name"
                        onChange={handleChange}
                        value={customerName}
                        error={errors.customerName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary">
                        Cancel
                    </Button>
                    {id && <Button
                        onClick={handleDelete}
                        color="secondary">
                        Delete
                    </Button>}
                    <Button
                        type="submit"
                        color="primary">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default withStyles(styles)(ReserveDialog);
