import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import styles from "./ReserveDialog.style";
import TextInput from "./TextInput";
import {withStyles} from "@material-ui/core/styles";
import {
    DatePicker,
} from '@material-ui/pickers';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import {timeSlots} from "../util/TimeSlots";


function ReserveDialog({
                           isOpen,
                           refNumber,
                           date,
                           customerName,
                           phoneNumber,
                           timeSlot,
                           errors,
                           handleSave,
                           handleChange,
                           reserveDateHandleChange,
                           handleClose,
                           handleDelete,

                           id,
                           ...props
                       }) {
    const {classes} = props;
    const isTimeSlotHasErrors = !!errors.timeSlot;
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form className={classes.form} onSubmit={handleSave}>
                <DialogTitle id="form-dialog-title">{`Table #${refNumber}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new table reserve (or update already existing one), please fill in the form below.
                    </DialogContentText>
                    <div className={classes.datetime}>
                        <DatePicker
                            label="Basic example"
                            name="date"
                            minDate={new Date()}
                            value={date}
                            onChange={reserveDateHandleChange}
                        />
                        <FormControl className={classes.timeSlot} error={isTimeSlotHasErrors}>
                            <InputLabel htmlFor="age-native-simple">Time slot</InputLabel>
                            <Select
                                native
                                value={timeSlot}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'timeSlot',
                                    id: 'timeSlot',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {
                                    Object.keys(timeSlots).map(x => {
                                        return (<option key={x} value={timeSlots[x].min}>{timeSlots[x].label}</option>)
                                    })
                                }
                            </Select>
                            {isTimeSlotHasErrors && <FormHelperText>{errors.timeSlot}</FormHelperText>}
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
