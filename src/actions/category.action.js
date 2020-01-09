import axios from 'axios'
import { API_KEY } from 'react-native-dotenv'
const getCategory = () => {
    return {
        type: "GET_CATEGORY",
        payload: axios({
            method: 'get',
            url: `${API_KEY}category`,
        }).catch((err => alert(err)))
    }
}

export{
    getCategory
}