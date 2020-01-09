
const initialState= {
    data: [],
    isLoading: false,
}

const type = (state=initialState, action) => {
    switch(action.type){
        case "GET_TYPE_FULFILLED":
        // alert(JSON.stringify(action.payload.data))
            return{
                ...state,
                data: action.payload.data.type,
                isLoading: false
            }
        case "GET_TYPE_PENDING":
            return{
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default type;