import axios from 'axios'
import { API_KEY } from 'react-native-dotenv'
const getType = () => {
    return {
        type: "GET_TYPE",
        payload: axios({
            method: 'get',
            url: `${API_KEY}type`,
        }).catch((err => alert(err)))
    }
}
export{
    getType
}