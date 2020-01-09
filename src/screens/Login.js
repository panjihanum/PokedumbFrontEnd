//import liraries
import React, { Component } from 'react';
import { ToastAndroid, ImageBackground, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, StatusBar } from 'react-native';
import { Container, Header, Body, Right, Left } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux';
import { getUser } from '../actions/users.action'
import { resetAction } from '../helpers/RootStack'
// create a component
const window = Dimensions.get("window");
class Login extends Component {
    constructor(){
        super();
        this.state={
            username: "panji",
            password: "panji"
        }
    }




    _login = (username, password) => {
        this.props.dispatch(getUser(username, password));
    }

    render() {

        if(this.props.users.isLogged === true){
            this.props.navigation.dispatch(resetAction)
            ToastAndroid.show( this.props.users.user.username + ', Selamat datang di  Gradient Library ! ', ToastAndroid.SHORT);
        }

        return (
            <Container>
<ImageBackground
                        source={require("../assets/background.jpg")}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}>                    
                    <Body>
                        <StatusBar backgroundColor="#FF512F" barStyle="light-content" />
                        {/* <ScrollView> */}
                        <KeyboardAvoidingView style={styles.view} behavior="padding" contentContainerStyle >
                            <Image
                            style={styles.Image}
                            source={require("../assets/background.png")}
                            />
                            <View>
                                <TextInput style={styles.inputBox} 
                                // underlineColorAndroid="#dbdbdb"
                                    placeholder="username"
                                    placeholderTextColor="#dbdbdb"
                                    onChangeText={(input) => this.setState({username: input})}
                                />
                                <TextInput style={styles.inputBox} 
                                    // underlineColorAndroid="#dbdbdb"
                                    placeholder="password"
                                    secureTextEntry={true}
                                    placeholderTextColor="#dbdbdb"
                                    onChangeText={(input) => this.setState({password: input})}
                                />
                                <TouchableOpacity style={styles.button} onPress={() => this._login(this.state.username, this.state.password)}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.text}>Anda belum pernah mendaftar ? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                                    <Text style={styles.textClick}>Klik disini untuk mendaftar</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                        {/* </ScrollView> */}
                    </Body>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = state => {
    // alert(JSON.stringify(state.users))
    return{
        users: state.users  
    }
}

// define Login styles
const styles = StyleSheet.create({
    container: {
        flex:1 ,
        height: window.height / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    }, inputBox: {
        width:300,
        borderRadius : 52,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        marginVertical: 10,
    }, button: {
        top: 10,
        width: 300,
        backgroundColor: '#adadad',
        borderRadius: 52,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        marginVertical: 10,
        paddingVertical: 13,
        alignSelf: 'center'
    }, buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'white',
        textAlign:'center'
    }, Image: {
        height: 200,
        width: 200,
        borderRadius:400,
        alignSelf: 'center'
    },   text: {
        marginTop: 25,
        color: "#dbdbdb",
        fontSize: 15
    },
    textClick: {
        color: "#990000",
        fontSize: 13,
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        fontWeight: 'bold'
    }, view: {
        flex: 1,
        height: window.height,
        padding: 0,
        justifyContent: 'center',

    },
});

//make this component available to the app
export default connect(mapStateToProps)(Login);