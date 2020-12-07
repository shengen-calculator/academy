
const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '20px 16px',
        justifyContent: 'space-between',
        display: 'flex'
    },
    filterWrapper: {
        margin: '30px 16px',
        justifyContent: 'flex-end',
        display: 'flex'
    },
    filter: {
        width: 250
    },
    progress: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 236,
        width: '100%'
    }
});
export default styles;