const initialState = {
    authentication: {
        name: '',
        restaurant: '',
        userId: ''
    },
    message: {
        type: '',
        text: ''
    },
    tables: null,
    reserves: {
        past: {
            items: [],
            tableRef: 0
        },
        future: {
            items: [],
            tableRef: 0
        },
        report: []
    },
    apiCallsInProgress: 0
};
export default initialState;