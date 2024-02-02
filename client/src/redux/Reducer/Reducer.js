const initialState = {
    userData: null,
};

const reducer = (state = initialState, action) => {
    if (action.type == 'GETUSERDATA') {
        let data = {
            ...state,
            userData: action.payload,
        }
        // console.log('state', data)
        return data;
    } else if (action.type == 'GETUSER') {
        const filteredUsers = state.userData.filter(user => user.id === action.payload);
        return filteredUsers[0]
    } else {
        return state
    }
};


export default reducer