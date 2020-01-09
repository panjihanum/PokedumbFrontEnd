//import liraries
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    StatusBar,
    ScrollView,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import {Container, Header, Body, Right, Left} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import {registerUser} from '../actions/users.action'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import LoadingScreen from '../components/LoadingScreen';
import { resetAction } from '../helpers/RootStack'
// create a component
const window = Dimensions.get("window");
class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            num_hp: "",
            image: null
        }
    }

    Register = (username, name, email, password, confirm_password, num_hp, image) => {
        this
            .props
            .dispatch(
                registerUser(username, name, email, password, confirm_password, num_hp, image)
            )
    }

    handleChoosePhoto = async () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, response => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled photo picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                let source = {
                    uri: response.uri
                };
                this.setState({image: source})
            }
        });
    };

    render() {
        if (this.props.isLoading === true) {
            <LoadingScreen />
        }
        if (this.props.isRegister === true) {
            this
                .props
                .navigation
                .navigate("Home")
            this
                .props
                .navigation
                .dispatch(resetAction)
            ToastAndroid.show(
                this.props.users.user.username + ', Selamat datang di  Gradient Library ! ',
                ToastAndroid.SHORT
            );
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
                        <StatusBar backgroundColor="#FF512F" barStyle="light-content"/>
                        <ScrollView>

                            <KeyboardAvoidingView style={styles.view} behavior="padding">

                                <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                    {
                                        this.state.image === null
                                            ? (
                                                <Image
                                                    style={styles.Image}
                                                    source={require("../assets/blank-profile-picture-973460_960_720.png")}/>
                                            )
                                            : (
                                                <Image
                                                    style={styles.Image}
                                                    source={{
                                                        uri: this.state.image.uri
                                                    }}/>
                                            )
                                    }

                                </TouchableOpacity>
                                <View>
                                    <TextInput style={styles.inputBox}
                                        // underlineColorAndroid="#dbdbdb"
                                        placeholder="username" placeholderTextColor="#dbdbdb" onChangeText={(input) => this.setState({username: input})}/>
                                    <TextInput style={styles.inputBox}
                                        // underlineColorAndroid="#dbdbdb"
                                        placeholder="Nama Lengkap" placeholderTextColor="#dbdbdb" onChangeText={(input) => this.setState({name: input})}/>
                                    <TextInput style={styles.inputBox}
                                        // underlineColorAndroid="#dbdbdb"
                                        placeholder="email" placeholderTextColor="#dbdbdb" onChangeText={(input) => this.setState({email: input})}/>
                                    <TextInput style={styles.inputBox}
                                        // underlineColorAndroid="#dbdbdb"
                                        placeholder="password" secureTextEntry={true} placeholderTextColor="#dbdbdb" onChangeText={(input) => this.setState({password: input})}/>
                                    <TextInput style={styles.inputBox}
                                        // underlineColorAndroid="#dbdbdb"
                                        placeholder="confirm_password" secureTextEntry={true} placeholderTextColor="#dbdbdb" onChangeText={(input) => this.setState({confirm_password: input})}/>
                                    <TextInput style={styles.inputBox}
                                        // underlineColorAndroid="#dbdbdb"
                                        keyboardType="numeric" placeholder="nomor hp" placeholderTextColor="#dbdbdb" onChangeText={(input) => this.setState({num_hp: input})}/>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.Register(
                                            this.state.username,
                                            this.state.name,
                                            this.state.email,
                                            this.state.password,
                                            this.state.confirm_password,
                                            this.state.num_hp,
                                            this.state.image
                                        )}>
                                        <Text style={styles.buttonText}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>Sudah terdaftar ?
                                    </Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                                        <Text style={styles.textClick}>Klik disini untuk Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </ScrollView>

                    </Body>
                </ImageBackground>
            </Container>
        );
    }
}

// define Register styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50'
    },
    inputBox: {
        width: 300,
        borderRadius: 52,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        marginVertical: 10
    },
    button: {
        top: 10,
        width: 300,
        backgroundColor: '#adadad',
        borderRadius: 52,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        marginVertical: 10,
        paddingVertical: 13,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    Image: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    text: {
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
    },
    view: {
        flex: 1,
        padding: 0,
        // justifyContent: 'center',

    }
});

const mapStateToProps = state => {
    return {
        users: state.users,
        isLoading  : state.users.isLoading,
        isRegister: state.users.isRegister
    }
}
//make this component available to the app
export default connect(mapStateToProps)(Register);