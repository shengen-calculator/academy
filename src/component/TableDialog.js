import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import styles from "./TableDialog.style";
import TextInput from "./TextInput";
import {withStyles} from "@material-ui/core/styles";

function TableDialog({
                         isOpen,
                         handleClose,
                         handleChange,
                         handleSave,
                         handleDelete,
                         errors,
                         seats,
                         refNumber,
                         id,
                         ...props
                     }) {
    const {classes} = props;
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form className={classes.form} onSubmit={handleSave}>
                <DialogTitle id="form-dialog-title">{`Table #${refNumber}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new table in you restaurant (or update already existing one),
                        please enter number of seats in form bellow.
                    </DialogContentText>
                    <TextInput
                        className={classes.formItem}
                        name="seats"
                        label="Number of seats"
                        onChange={handleChange}
                        value={seats}
                        error={errors.seats}
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

export default withStyles(styles)(TableDialog);
