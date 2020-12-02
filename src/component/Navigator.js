import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookIcon from '@material-ui/icons/Book';
import PublicIcon from '@material-ui/icons/Public';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import {NavLink} from 'react-router-dom';
import styles from './Navigator.style';

const categories = [
    {
        id: 'All Users',
        children: [
            { id: 'Registration', icon: <PeopleIcon />, path: '/registration', isAuth: true, active: true },
            { id: 'Login', icon: <AccountBoxIcon />, path: '/login', isAuth: true},
            { id: 'About', icon: <PublicIcon />, path: '/about' }
        ],
    },
    {
        id: 'Manager',
        children: [
            { id: 'Editor', icon: <SettingsIcon />, path: '/editor' },
            { id: 'Reservation', icon: <TimerIcon />, path: '/reservation' },
            { id: 'Report', icon: <BookIcon /> , path: '/report' },
        ],
    },
];

function Navigator(props) {
    const { classes, auth, ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                {auth.restaurant && <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    {auth.restaurant}
                </ListItem>}
                {categories.map(({ id, children }) => (
                    <React.Fragment key={id}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, path, isAuth}) => (
                            <React.Fragment key={childId}>
                                {((auth.name && !isAuth)||(!auth.name))&& <ListItem
                                    component={NavLink} to={path}
                                    className={clsx(classes.item)}
                                    activeClassName={classes.itemActiveItem}
                                    isActive={(match, location) => {
                                        if(location.pathname === '/' && path === "/about") {
                                            return true;
                                        }
                                        return match;
                                    }}
                                >
                                    <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>

                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                        }}
                                    >
                                        {childId}
                                    </ListItemText>
                                </ListItem>}
                            </React.Fragment>
                        ))}

                        <Divider className={classes.divider} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

export default withStyles(styles)(Navigator);