import axios from 'axios'
import {API_KEY} from 'react-native-dotenv'
const getPokemon = () => {
    // alert( `${API_KEY}pokemon`)

    return {
        type: "GET_POKEMON",
        payload: axios({method: 'get', url: `${API_KEY}pokemon`}).catch(
            (err => alert(err))
        )
    }
}


const getPokemonByPage = (page) => {
    // alert(`${API_KEY}pokemon?page=${page}`)

    return {
        type: "GET_POKEMON_BY_PAGE",
        payload: axios({method: 'get', url: `${API_KEY}pokemon?limit=${page}`}).catch(
            (err => alert(err))
        )
    }
}



const getPokemonByFilter = (name, query, limit) => {
    // alert(category)
    // alert(JSON.stringify(query))
    return {
        type: "GET_POKEMON_BY_NAME",
        payload: axios(
            {method: 'get', url: `${API_KEY}pokemon?name_like=${name}` + query + "&limit=" + limit}
        ).catch((err => alert(err)))
    }
}

const getPokemonById = (id) => {
    return {
        type: "GET_POKEMON_BY_ID",
        payload: axios({method: 'get', url: `${API_KEY}pokemon/${id}`}).catch(
            (err => alert(err))
        )
    }
}

const AddPokemon = (
    name,
    image,
    type,
    category,
    latitude,
    longitude,
    token
) => {
    // alert(JSON.stringify(image))
    const data = new FormData();
    data.append("cover", {
        ...image,
        name: "image.jpg",
        type: "image/jpeg"
    });

    data.append("name", name)
    type.map(val => {
        // alert(val)
        data.append("type_id", val)
    })
    data.append("category_id", category)
    data.append("latitude", latitude)
    data.append("longitude", longitude)
    // alert(JSON.stringify(data))
    const tokens = token.type + ' ' + token.token

    return {
        type: "ADD_POKEMON",
        payload: axios
            .post(`${API_KEY}pokemon`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: tokens
                }
            })
            .catch(err => alert(err))
    }
}


const UpdatePokemon = (
    id,
    name,
    image,
    type,
    category,
    latitude,
    longitude,
    token
) => {
    // alert(JSON.stringify(image))
    const data = new FormData();
    if (image === null) {} else {
        data.append("cover", {
            ...image,
            name: "image.jpg",
            type: "image/jpeg"
        });
    }
    data.append("name", name)
    type.map(val => {
        // alert(val)
        data.append("type_id", val)
    })
    data.append("category_id", category)
    data.append("latitude", latitude)
    data.append("longitude", longitude)
    // alert(JSON.stringify(data))
    const tokens = token.type + ' ' + token.token

    return {
        type: "UPDATE_POKEMON",
        payload: axios
            .patch(`${API_KEY}pokemon/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: tokens
                }
            })
            .catch(err => alert(err))
    }
}

const deletePokemon = (id) => {
    return {
        type: "DELETE_POKEMON",
        payload: axios({method: 'delete', url: `${API_KEY}pokemon/${id}`})
    }
}

export {
    getPokemon,
    getPokemonByFilter,
    getPokemonByPage,
    getPokemonById,
    deletePokemon,
    AddPokemon,
    UpdatePokemon
}