import React from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./EditorPage.style";
import RowOfTables from "../../component/RowOfTables";


function EditorPage(props) {
    const { classes } = props;
    const vertical = [0,1,2,3,4,5,6,7,8,9];

    const tableClickHandler = (x, y) => {
        alert(`x : ${x} - y : ${y}`);
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
            <div className={classes.contentWrapper}>
                {
                    vertical.map(y =>
                        <RowOfTables onTableClick={(x) => tableClickHandler(x, y)} key={y}/>
                        )
                }
            </div>
        </Paper>
    );
}

export default withStyles(styles)(EditorPage);