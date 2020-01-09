import { combineReducers } from 'redux';
import users_reducers from './users_reducers'
import pokemon_reducers from './pokemon_reducers'
import type_reducers from './type_reducers'
import category_reducers from './category_reducers'
const appReducer = combineReducers({
    users: users_reducers,
    pokemon: pokemon_reducers,
    category: category_reducers,
    type: type_reducers
})

export default appReducer
