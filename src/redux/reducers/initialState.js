const initialState = {
    authentication: {
        name: '',
        restaurant: '',
        userId: '',
        logging: false,
        registering: false
    },
    message: {
        type: '',
        text: ''
    },
    tables: [],
    reserves: []
};
export default initialState;