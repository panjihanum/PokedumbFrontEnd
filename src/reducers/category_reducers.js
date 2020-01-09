
const initialState= {
    data: [],
    isLoading: false,
}

const category = (state=initialState, action) => {
    switch(action.type){
        case "GET_CATEGORY_FULFILLED":
        // alert(JSON.stringify(action.payload.data))
            return{
                ...state,
                data: action.payload.data.category,
                isLoading: false
            }
        case "GET_CATEGORY_PENDING":
            return{
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default category;