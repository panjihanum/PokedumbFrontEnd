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
    ImageBackground
} from 'react-native';
import {
    Container,
    Picker,
    Thumbnail
} from 'native-base'
import Icons from 'react-native-vector-icons/Ionicons'
import {AddPokemon, getPokemon, getCategory, getType} from '../actions'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import LoadingScreen from '../components/LoadingScreen';
import MultiSelect from 'react-native-multiple-select'
import MapView from 'react-native-maps'
// create a component
const window = Dimensions.get("window");
class AddPokemonGo extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            type_id: "",
            image_url: null,
            category_id: "",
            coordinate: {
                latitude: -6.270565,
                longitude: 106.759550
            },
            access_token: ""
        }
    }

    componentDidMount() {

        this
            .props
            .dispatch(getCategory())
        this
            .props
            .dispatch(getType())
    }

    _AddPokemon = () => {
        const name = this.state.name;
        const type_id = this.state.type_id;
        const image_url = this.state.image_url;
        const category_id = this.state.category_id;
        const latitude = this.state.coordinate.latitude;
        const longitude = this.state.coordinate.longitude;
        const token = this
            .props
            .token
            this
            .props
            .dispatch(
                AddPokemon(name, image_url, type_id, category_id, latitude, longitude, token)
            )
    };

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
                this.setState({image_url: source})
            }
        });
    };

    onSelectedItemsChange = type_id => {
        this.setState({type_id: type_id});

    };

    render() {
        // alert(JSON.stringify(this.props.category))
        if (this.props.isLogged == false) {
            this
                .props
                .navigation
                .navigate("Login")
            alert("Login terlebih dahulu")
        }

        if (this.props.isLoading && this.props.isAdd) {
            this
                .props
                .navigation
                .navigate("Home");
        }
        // alert(JSON.stringify(this.state.coordinate))
        if (this.props.isLoading) {
            return (<LoadingScreen/>)
        } else {
            return (
                <Container>
                    <ImageBackground
                        source={require("../assets/background.jpg")}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}>
                        {/* <Body> */}
                            <StatusBar backgroundColor="#FF512F" barStyle="light-content"/>
                            <ScrollView>

                                <KeyboardAvoidingView style={styles.view} behavior="padding">
                                    <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                        <View>
                                            {
                                                this.state.image_url === null
                                                    ? (
                                                        <Thumbnail large
                                                            style={styles.Image}
                                                            source={require("../assets/blank-profile-picture-973460_960_720.png")}/>
                                                    )
                                                    : (
                                                        <Thumbnail large
                                                            style={styles.Image}
                                                            source={{
                                                                uri: (this.state.image_url && this.state.image_url.uri)
                                                            }}/>
                                                    )
                                            }

                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.width}>
                                        <TextInput style={styles.inputBox}
                                            // underlineColorAndroid="#dbdbdb"
                                            placeholder="name" placeholderTextColor="#bdbdb" itemStyle={{backgroundColor: 'transparent', borderRadius: 40}}
                                            style={{
                                                fontSize:15,
                                                backgroundColor: 'white'
                                            }} onChangeText={(input) => this.setState({name: input})}/>
                                        <View
                                           style={styles.width}></View>
                                        <Picker
                                                      
                                                      mode="dropdown"
                                            selectedValue={this.state.category_id}
                                            iosHeader="Select your SIM"
                                            iosIcon={<Icons name="arrow-dropdown-circle" style={{ color: "#dbdbdb" }} />}
                                            style={{
                                                backgroundColor: 'white',
                                                fontSize: 8,
                                                height: 40,
                                                color: "#bdbdb"


                                            }} 
                                            itemTextStyle={{
                                            }}
                                            textStyle={{
                                                color: "#dbdbdb",
                                                fontSize: 8
                                            }}
                                            onValueChange={(itemValue) => this.setState({category_id: itemValue})}>
                                            <Picker.item
                                                                                        
                                                label="Select Category"
                                                value={null}></Picker.item>
                                            {
                                                this
                                                    .props
                                                    .category
                                                    .map(value => (<Picker.item label={value.name} value={value.id}/>))
                                            }
                                        </Picker>
                                    </View>
                                    <View
                                        style={styles.width}>
                                        <MultiSelect
                                            hideTags="hideTags"
                                            items={this.props.type}
                                            uniqueKey="id"
                                            ref={(component) => {
                                                this.multiSelect = component
                                            }}
                                            onSelectedItemsChange={this.onSelectedItemsChange}
                                            selectedItems={this.state.type_id}
                                            selectText="Select Type"
                                            searchInputPlaceholderText="Search Category..."
                                            onChangeInput={(text) => console.log(text)}
                                            altFontFamily="ProximaNova-Light"
                                            tagRemoveIconColor="#CCC"
                                            tagBorderColor="#CCC"
                                            tagTextColor="#CCC"
                                            selectedItemTextColor="#CCC"
                                            selectedItemIconColor="#CCC"
                                            itemTextColor="#000"
                                            displayKey="name"
                                            searchInputStyle={{
                                                color: '#CCC'
                                            }}
                                            submitButtonColor="#CCC"
                                            submitButtonText="Submit"
                                            style={styles.inputBox}
                                            />
                                    </View>
                                    <View>

                                        <MapView
                                            style={styles.map}
                                            initialRegion={{
                                                latitude: -6.270565,
                                                longitude: 106.759550,
                                                latitudeDelta: 1,
                                                longitudeDelta: 1
                                            }}>
                                            <MapView.Marker draggable
                                                // identifier={"1"}
                                                
                                                // onPress={(event) => this.handleMarkerPress(event)}
                                                coordinate={this.state.coordinate} title={"Your Location"} style={{
                                                    height: 20,
                                                    widht: 20
                                                }} onDragEnd = {(e) => this.setState({
                                                        coordinate: e.nativeEvent.coordinate
                                                    })}
                                                // onSelect = {(a)=> alert(a)}
                                            ></MapView.Marker>
                                        </MapView>

                                    </View>
                                    
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this._AddPokemon(
                                            this.state.name,
                                            this.state.type_id,
                                            this.state.category_id,
                                            this.state.latitude,
                                            this.state.longitude
                                        )}>
                                        <Text style={styles.buttonText}>Add Pokemon</Text>
                                    </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </ScrollView>

                    {/* </Body> */}
                </ImageBackground>
            </Container>
            );
        }
    }
}

// define AddPokemon styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50'
    },
    inputBox: {
        width: window.width,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    button: {
        top: 10,
        width: 300,
        backgroundColor: '#dbdbdb',
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

    },
    map: {
        flex: 1,
        width: window.width,
        height: 300,
        justifyContent: 'center',
        alignContent: 'center'
    },
    width: {
        width: window.width/1,
        marginTop: 7
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    // alert(JSON.stringify(state.type.data))
    return {
        token: state.users.access_token,
        isAdd: state.pokemon.isAdd,
        isLoading: state.pokemon.isLoading,
        isLogged: state.users.isLogged,
        category: state.category.data,
        type: state.type.data
    }
}
//make this component available to the app
export default connect(mapStateToProps)(AddPokemonGo);