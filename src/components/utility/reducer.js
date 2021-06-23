export const initialState = {
    user: null,
}

export const actionTypes = {
    SET_USER: "SET_USER",
	DELETE_USER: "DELETE_USER",
}

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state,
                user: action.user,
            }
        case actionTypes.DELETE_USER:
            return{
                ...state,
                user: null,
            }
        default:
            return state
    }
}

export default reducer