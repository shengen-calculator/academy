import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./EditorPage.style";
import RowOfTables from "../../component/RowOfTables";
import TableDialog from "../../component/TableDialog";
import {getTablesRequest} from "../../redux/actions/tableActions";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";


function EditorPage(props) {
    const { classes, inProgress, auth, getTablesRequest, tables } = props;
    const [open, setOpen] = React.useState(false);
    const vertical = [0,1,2,3,4,5,6,7,8,9];

    useEffect(() => {
        if(tables === null)
            getTablesRequest({uid: auth.userId});
    }, [auth.userId, getTablesRequest, tables]);

    const tableClickHandler = (x, y) => {
        setOpen(true);
        //alert(`x : ${x} - y : ${y}`);
    };
    const handleClose = () => {
        setOpen(false);
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
            <TableDialog isOpen={open} handleClose={handleClose}/>
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
    getTablesRequest
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(EditorPage));
