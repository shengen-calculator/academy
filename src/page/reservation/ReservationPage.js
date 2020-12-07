import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./ReservationPage.style";
import {
    getTablesRequest
} from "../../redux/actions/tableActions";
import {vertical} from "../../util/Tables";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import RowOfTables from "../../component/RowOfTables";
import CircularProgress from "@material-ui/core/CircularProgress";


function ReservationPage(props) {
    const {
        classes,
        tables,
        auth,
        getTablesRequest
    } = props;

    useEffect(() => {
        if (tables === null)
            getTablesRequest({uid: auth.userId});
    }, [auth.userId, getTablesRequest, tables]);

    const history = useHistory();

    const openTableReserves = (x, y) => {
        const table = tables.find(t => t.x === x && t.y === y);
        if(table) {
            history.push(`reservation/table/${table.refNumber}`);
        }
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
                                <RowOfTables onTableClick={(x) => openTableReserves(x, y)}
                                             isDraggable={false}
                                             data={tables.filter(table => table.y === y)}
                                             key={y}/>
                            )
                        }
                    </div> : <div className={classes.progress}><CircularProgress/></div>
            }
        </Paper>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.authentication,
        tables: state.tables
    }
}

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    getTablesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReservationPage));
