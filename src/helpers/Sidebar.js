import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from "react";
import Home from '../screens/Home'
import SideBar from '../components/Sidebar'
import All_Pokemon from '../screens/MapsPokemon'

 const SideBarStack = createDrawerNavigator({
    Home: {
      screen: Home,
    },
    All_Pokemon:{
        screen: All_Pokemon
    }
  },{
    contentComponent: props => <SideBar {...props} />
});


  
export default SideBarStack;