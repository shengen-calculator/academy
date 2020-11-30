import React from 'react';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./AboutPage.style";


function AboutPage(props) {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Typography color="textPrimary">
                                React Academy Project
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                <Typography color="textPrimary" align="left" variant="h4">
                    Restaurant reservations management system
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left">
                    You are required to build a table reservation system for restaurants. This application will be used only by the restaurant managers themselves to keep track of the reservations that they receive by phone or email.
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left" variant="h5">
                    Registration and Sign in
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left">
                    <ul>
                        <li>The app is multi-tenant and will be used by multiple restaurants.</li>
                        <li>Each restaurant manager is able to sign up and create an account for their restaurant</li>
                        <li>Information required on the sign up is</li>
                        <ul>
                            <li>Manager name</li>
                            <li>Email</li>
                            <li>Password</li>
                        </ul>
                        <li>Once signed up, the application should sign them in automatically and ask them to fill in the restaurant name before they're allowed to continue and "enter" the app. If they abandon the process, and come back later, they shouldn't be allowed to continue without providing the restaurant name.</li>
                    </ul>
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left" variant="h5">
                    Application features
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left" variant="h6" style={{ fontWeight: 600 }}>
                    Restaurant table layout editor
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left">
                    <ul>
                        <li>Layout is represented by a 15x10 grid of empty cells by default</li>
                        <li>Clicking on an empty cell opens up a modal dialog to create a new table in that cell</li>
                        <ul>
                            <li>Table has an auto-generated reference number (#1 #2 #3 etc.) and number of seats (required)</li>
                            <li>The number of seats should be visible on the table in the layout once created</li>
                        </ul>
                        <li>Tables created in the cells can be moved to other cells by using drag&drop</li>
                        <li>Clicking on a cell that contains a table should open up the edit modal dialog where the
                            number of seats can be edited. This dialog should also give the owner the ability to delete the table
                        </li>
                    </ul>
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left" variant="h6" style={{ fontWeight: 600 }}>
                    Table reservation management
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left">
                    <ul>
                        <li>Table reservation management needs to show the same table layout as the layout editor. However, the behavior here is different: tables cannot be moved or edited. New tables cannot be added from here.</li>
                        <li>Clicking on a table should open up a list of all the reservations for the given table</li>
                        <ul>
                            <li>The list can be filtered by past/future reservations.</li>
                            <li>The manager needs to have the ability to create/edit/delete reservations from here.</li>
                            <li>Every reservation has a date, time, customer name, and customer contact details. All fields are required.</li>
                            <li>Keep in mind that the same table cannot be reserved by two customers at the same time. Assume that every customer visit lasts an hour. Reservations can only start at the beginning of an hour (eg. 5:00PM, 6:00PM, but not 5:22PM, 5:30PM etc.)</li>
                        </ul>
                    </ul>
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left" variant="h6" style={{ fontWeight: 600 }}>
                    Reservations reporting
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left">
                    <ul>
                        <li>The restaurant manager needs to be able to see an overview report of all the reservations for a given date</li>
                        <li>Report should be grouped by table</li>
                        <li>It needs to show all the relevant reservation info (reservation time, customer name, customer contact details)</li>
                    </ul>
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left" variant="h5">
                    Implementation requirements
                </Typography>
                <br/>
                <Typography color="textPrimary" align="left">
                    <ul>
                        <li>This needs to be a Single-Page application developed in React. Refreshing the page at any point is not allowed (not even during authentication)</li>
                        <li>All the data needs to be saved on the backend. You are allowed to use any backend technology you want. You can implement your own REST or GraphQL API, or use Firebase or a similar service for the backend.</li>
                        <li>You are allowed (but not required) to use any state management mechanism: React Context / Redux / MobX etc.</li>
                        <li>Please treat this project as if you are delivering it to a client</li>
                        <li>Bonus: Use functional components with React Hooks to implement the application</li>
                        <li>You will not be marked on design skills. However, functional design and UI interactions will be taken into account</li>
                        <li>Create a private GitHub repository for the above and share it with <a href="mailto:igor.pantovic@toptal.com">igor.pantovic@toptal.com</a></li>
                        <li>Submit your repository link and video walkthrough ​<a href="https://toptalcommunity.typeform.com/to/Cy0WLM">here​</a> </li>
                    </ul>
                </Typography>
            </div>
        </Paper>
    );
}

export default withStyles(styles)(AboutPage);