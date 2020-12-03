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
    reserves: [],
    apiCallsInProgress: 0
};
export default initialState;