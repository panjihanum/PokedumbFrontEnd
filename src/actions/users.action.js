import axios from 'axios'
import { API_KEY } from 'react-native-dotenv'
const getUser = (username, password) => {
    // alert( `${API_KEY}pokemon`)

    return {
        type: "GET_USER",
        payload: axios({
            method: 'post',
            url: `${API_KEY}users/login`,
            data: {
                "username" : username,
                "password" : password
            }
        }).catch((err => alert("Data yang anda Masukkan Salah")))
    }
}

const registerUser = (username, name,  email, password, confirm_password, num_hp, image) => {
    const data = new FormData();
    data.append("cover", {
        ...image,
        name: "image.jpg",
        type: "image/jpeg"
    });
    data.append("username", username)
    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    data.append("confirm_password", confirm_password)
    data.append("num_hp", num_hp)

// alert(JSON.stringify(data))
    return {
        type: "REGISTER_USER",
        payload: axios
        .post(`${API_KEY}users/register`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response)=> {
            // alert(JSON.stringify(response.data))
            if(response.data.message === 0){
                alert("Mohon isi seluruh data terlebih dahulu")
            }else if(response.data.message === 1){
                alert("Password yang anda masukkan tidak sama")
            }else{
                return response
            }
        })
        .catch((err) => alert(err))
    }
}


const getUserData = (token) => {
    // alert(JSON.stringify(token))
    return {
        type: 'GET_USER_DATA',
        payload: axios({
            method:'get',
            url:`${API_KEY}users/data`, 
            headers: {
                Authorization: token.type + ' ' + token.token
            }
        })
    }
}

const getDataToken = token => {
    const a =  JSON.parse(token)
    const data ={
        a
    }
    return {
        type: 'GET_TOKEN',
        payload: data
    }
}

const userLogout = () => {
    return {
        type: "USER_LOGOUT",
        payload: ""
    }
}
export {
    getUser,
    registerUser,
    getUserData,
    getDataToken,
    userLogout
}