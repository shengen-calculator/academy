import React from 'react';
import 'fontsource-roboto';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import styles, {theme, drawerWidth} from './App.style';
import {ThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from '../src/component/Navigator';
import Content from '../src/component/Content';
import AboutPage from "./page/about/AboutPage";
import Header from '../src/component/Header';
import ReservationPage from "./page/reservation/ReservationPage";
import ReportPage from "./page/report/ReportPage";
import TablePage from "./page/reservation/TablePage";
import EditorPage from "./page/editor/EditorPage";
import RegistrationPage from "./page/auth/RegistrationPage";
import LoginPage from "./page/auth/LoginPage";
import RestaurantNamePage from "./page/auth/RestaurantNamePage";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function Paperbase(props) {
    const {classes} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className={classes.root}>
                    <CssBaseline/>
                    <nav className={classes.drawer}>
                        <Hidden smUp implementation="js">
                            <Navigator
                                PaperProps={{style: {width: drawerWidth}}}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                            />
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Navigator PaperProps={{style: {width: drawerWidth}}}/>
                        </Hidden>
                    </nav>
                    <div className={classes.app}>
                            <Switch>
                                <Route exact path="/">
                                    <Header text="About Page" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <Content/>
                                    </main>
                                </Route>
                                <Route exact path="/about">
                                    <Header text="About Page" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <AboutPage/>
                                    </main>
                                </Route>
                                <Route exact path="/editor">
                                    <Header text="Editor Page" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <EditorPage/>
                                    </main>
                                </Route>
                                <Route exact path="/reservation">
                                    <Header text="Reservation Page" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <ReservationPage/>
                                    </main>
                                </Route>
                                <Route exact path="/report">
                                    <Header text="Report Page" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <ReportPage/>
                                    </main>
                                </Route>
                                <Route exact path="/reservation/table/:number">
                                    <Header text="Table Reservations" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <TablePage/>
                                    </main>
                                </Route>
                                <Route exact path="/login">
                                    <Header text="Login Page" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <LoginPage/>
                                    </main>
                                </Route>
                                <Route exact path="/registration">
                                    <Header text="Registration Page" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <RegistrationPage/>
                                    </main>
                                </Route>
                                <Route exact path="/name">
                                    <Header text="Restaurant name" onDrawerToggle={handleDrawerToggle}/>
                                    <main className={classes.main}>
                                        <RestaurantNamePage/>
                                    </main>
                                </Route>
                            </Switch>

                        <footer className={classes.footer}>
                            <Copyright/>
                        </footer>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default withStyles(styles)(Paperbase);