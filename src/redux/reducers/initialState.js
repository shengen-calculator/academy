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
        past: null,
        future: null,
        report: null
    },
    apiCallsInProgress: 0
};
export default initialState;