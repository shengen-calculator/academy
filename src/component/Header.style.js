const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    line: {
        color: theme.palette.primary.main,
        height: '4px'
    }
});

export default styles;
