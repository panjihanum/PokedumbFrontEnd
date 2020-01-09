const initialState = {
    data: [],
    readmore: {},
    isLoading: false,
    isLoadingPokemon: false,
    isAdd: false
}

const ebook = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POKEMON_FULFILLED":
            // alert(JSON.stringify(action.payload.data.data.data))
            return {
                ...state,
                data: action.payload.data.data.data,
                page: action.payload.data.data.page,
                isLoading: false
            }
        case "GET_POKEMON_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "GET_POKEMON_BY_NAME_FULFILLED":
            // alert(JSON.stringify(action.payload.data.data.perPage))
            return {
                ...state,
                data: action.payload.data.data.data,
                page: action.payload.data.data.perPage,
                isLoading: false
            }
        case "GET_POKEMON_BY_NAME_PENDING":
            return {
                ...state,
                isLoading: true
            }

        case "GET_POKEMON_BY_CATEGORY_FULFILLED":
            // alert(JSON.stringify(action.payload.data.ebook))
            return {
                ...state,
                data: action.payload.data.data.data,
                page: action.payload.data.data.page,
                isLoading: false
            }
        case "GET_POKEMON_BY_CATEGORY_PENDING":
            return {
                ...state,
                isLoading: true
            }

        case "GET_POKEMON_BY_PAGE_FULFILLED":
            // alert(JSON.stringify(action.payload.data))
            return {
                ...state,
                data: action.payload.data.data.data,
                page: action.payload.data.data.perPage,
                isLoading: false
            }

        case "GET_POKEMON_BY_PAGE_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "GET_POKEMON_BY_ID_FULFILLED":
            return {
                ...state,
                readmore: action.payload.data.rows,
                isLoadingPokemon: false
            }
        case "GET_POKEMON_BY_ID_PENDING":
            return {
                ...state,
                isLoadingPokemon: true
            }
        case "DELETE_POKEMON_FULFILLED":
        // alert(JSON.stringify(action.payload.data.pokemon))
            let deleted = []
            deleted.push(state.data.filter(val => {
                return val.id !== action.payload.data.pokemon.id
            }))
            // alert(JSON.stringify(deleted, null, 2))
            return {
                ...state,
                data: deleted[0],
                isLoading: false
            }
        case "DELETE_POKEMON_PENDING":
            return {
                ...state,
                isLoading: true
            }
        case "ADD_POKEMON_FULFILLED":
            let add = []
            add.push(state.data)
            add[0].push(action.payload.data.data)
            // alert(JSON.stringify(action.payload.data.data, null, 2))
            return {data: add[0], isAdd: false, isLoading: false}
        case "ADD_POKEMON_PENDING":
            return {
                ...state,
                isAdd: true,
                isLoading: true
            }

        case "UPDATE_POKEMON_FULFILLED":

            // alert(JSON.stringify(action.payload.data.data))
            let updated = []
            updated.push(state.data.map((val) => {
                if (val.id === action.payload.data.data.id) {
                    val = action.payload.data.data
                }
                return val
            }))

            // alert(JSON.stringify(updated, null, 2)) alert(JSON.stringify(update, null,
            // 2))

            return {
                ...state,
                data: updated[0],
                isAdd: false,
                isLoading: false
            }
        case "UPDATE_POKEMON_PENDING":

            return {
                ...state,
                isAdd: true,
                isLoading: true
            }
        default:
            return state;
    }
}

export default ebook;