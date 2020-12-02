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
    tables: [],
    reserves: [],
    apiCallsInProgress: 0
};
export default initialState;