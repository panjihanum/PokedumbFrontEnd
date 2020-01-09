




//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { getUserData, getDataToken } from '../actions'
import AsyncStorage from '@react-native-community/async-storage';
import { resetAction } from '../helpers/RootStack'
// create a component
class LoadingScreen extends Component {
    constructor(){
        super();
        this._bootstrapAsyc();
    }
    _bootstrapAsyc = async() =>{
        setTimeout(() =>{
            this.props.navigation.dispatch(resetAction)

        },2000);
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem("access_token")
        const user = await AsyncStorage.getItem("user")
        this.props.dispatch(getUserData(token))
        if(token && user){
            this.props.dispatch(getDataToken(token))
            const parseToken = JSON.parse(token);
            this.props.dispatch(getUserData(parseToken))
        }
    }

    render() {
        return (
        <ImageBackground source={require("../assets/background.jpg")} style={{width: '100%', height: '100%'}}>
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#FF512F" />
            </View>
        </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    // alert(JSON.stringify(state.users))
    return{
        users: state.users   
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },view: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
        // alignSelf: 'center',
        // position: 'absolute'
    }
});

//make this component available to the app
export default connect(mapStateToProps)(LoadingScreen)