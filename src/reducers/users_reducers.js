import { storeData, retrieveData } from '../asyncStorage'


const initialState ={
    username: "",
    password: "",
    user: {},
    access_token: {},
    isLogged: false,
    isRegister: false,
    isLoading: false,
}


const users = (state = initialState, action) => {
    switch(action.type){
        case "GET_USER_FULFILLED":
            // alert(JSON.stringify(action.payloload.data))
            // alert(action.payload.data)
            if(action.payload.data === ""){
            }else{
                storeData('access_token', JSON.stringify(action.payload.data.access_token))
                storeData('user', JSON.stringify(action.payload.data.user))
                return{
                    ...state,
                    user: action.payload.data.user,
                    access_token: action.payload.data.access_token,
                    isLogged: true
                }
            }
        case "REGISTER_USER_FULFILLED":
            alert(JSON.stringify(action.payload.data))
            storeData('access_token', JSON.stringify(action.payload.data.access_token))
                return {
                    user: action.payload.data.user,
                    access_token: action.payload.data.access_token,
                    isRegister: true,
                    isLoading: false,
            }
        
        case "REGISTER_USER_PENDING":
            return{
                ...state,
                isRegister: false,
                isLoading: true
            }
        case "GET_USER_DATA_FULFILLED":
            // alert(JSON.stringify(action))
            return {
                ...state,
                // isLogged: true,
                user: action.payload.data.user,
                isLoading: false,
            }

        case "GET_TOKEN":
        // alert(JSON.stringify(action.payload.a))
            return {
                access_token: action.payload.a
            }
        
        case "USER_LOGOUT":
        // alert("A")
            return {
                ...state,
                isLogged: false
            }
        default:
            return state
    }
}

export default users;