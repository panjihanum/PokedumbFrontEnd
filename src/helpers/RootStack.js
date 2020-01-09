import { NavigationActions, StackActions, createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../screens/Login'
import Home from '../screens/Home'
import SidebarStack from './Sidebar'
import Register from '../screens/Register'
import LoadingScreen from '../screens/AuthLoadingScreen'
import DetailPokemon from '../screens/DetailPokemon'
import AddPokemon from '../screens/AddPokemon'
import MapsPokemon from '../screens/MapsPokemon'
import UpdatePokemon from '../screens/UpdatePokemon'
import SideBar from '../components/Sidebar'
import Filter from '../screens/Filter'
const stackNavigator = createStackNavigator({
    LoadingScreen:{
        screen: LoadingScreen
    },
    Login:{
        screen: Login
    },Home: {
        screen: SidebarStack
    }, Register: {
        screen: Register,
    },DetailPokemon:{
        screen: DetailPokemon
    },AddPokemon :{
        screen: AddPokemon
    },UpdatePokemon:{
        screen: UpdatePokemon
    },MapsPokemon:{
        screen: MapsPokemon
    },Filter: {
        screen: Filter
    }
},{
    initialRouteName: "LoadingScreen",
    headerMode: "none",
    contentComponent: props => <SideBar {...props} />
})


export const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
  });

  export const resetActionLogout = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Login' }),
    ],
  });
  
export default createAppContainer(stackNavigator);