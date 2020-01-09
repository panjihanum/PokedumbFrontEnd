//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Content } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
// create a component
class LoadingScreen extends Component {
    render() {
        return (
        // <LinearGradient colors={['#FF512F', '#F09819']} style={styles.container}>
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#FF512F" />
            </View>
        // </LinearGradient>
        );
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
export default LoadingScreen;