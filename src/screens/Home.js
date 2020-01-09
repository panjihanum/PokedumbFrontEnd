//import liraries
import React, {Component} from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Picker,
    StyleSheet,
    Dimensions,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native';
import {Button, Content, Body, Left, Right} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {deletePokemon, getPokemonByName, getPokemonByFilter, getCategory, getType} from '../actions/'
import Pokemon from '../components/Pokemon'
import LoadingScreen from '../components/LoadingScreen'
// create a component
import Icons from 'react-native-vector-icons/Ionicons'
import {NavigationActions} from 'react-navigation'
import MultiSelect from 'react-native-multiple-select'

const sliderWidth = Dimensions
    .get('window')
    .width;

class Home extends Component {
    constructor() {
        super();
        this.onClick = this
            .onClick
            .bind(this);
        this.state = {
            name_like: "",
            category: "",
            type_id: "",
            showSearchBar: false
        }
    }
    componentWillMount() {
        const name_like = this.state.name_like
        let query = ""
        if(this.state.category !== null && this.state.category !== "" ){
            query += `${"&category="}${this.state.category}`
        }
        if(this.state.type_id === []){
            query = `${"&type_id="}${this.state.type_id}`
        }
        this.props.dispatch(getPokemonByFilter(name_like, query, 5))

        this.props.dispatch(getCategory())
        this.props.dispatch(getType())
    }
    onSelectedItemsChange = type_id => {
        this.setState({type_id: type_id});

    };

    onClick() {
        let {showSearchBar} = this.state;
        this.setState({
            showSearchBar: !showSearchBar
        });
    }
    loadmore = () => {
        let query = ""
        const name_like = this.state.name_like
        if(this.state.category && this.state.category !== null ){
            query += `${"&category="}${this.state.category}`
        }
        if(this.state.type_id && this.state.type_id.length > 0 ){
            query += `${"&type_id="}[${this.state.type_id}]`
        }
        this
            .props
            .dispatch(getPokemonByFilter(name_like, query, 10))
    }

    loadmores = () => {
        let query = ""
        const name_like = this.state.name_like
        if(this.state.category && this.state.category !== null ){
            query += `${"&category="}${this.state.category}`
        }
        if(this.state.type_id && this.state.type_id.length > 0 ){
            query += `${"&type_id="}[${this.state.type_id}]`
        }

        const page = this.props.page + 5
        // alert(page)

        this
            .props
            .dispatch(getPokemonByFilter(name_like, query, page))
    }



    onSearch = (input) => {
        this.setState({
            name_like: input
        })
        setTimeout(()=>{ 
            this.loadmore()
        }, 0.001)
    }
    render() {
        // alert(this.state.name_like)
        if (this.props.isAdd) {
            <LoadingScreen/>
        }
        if (this.props.user && !this.props.user.level) {
            <LoadingScreen/>
        }
        // alert(this.props.page) alert(JSON.stringify(this.props.users))
        // alert(JSON.stringify(                    this.props.pokemon, null, 2))

        return (
            // <Container>
            <ImageBackground
                source={require("../assets/background.jpg")}
                style={{
                    width: '100%',
                    height: '100%'
                }}>
                <Header
                    _onPress = {() => this.props.navigation.navigate("AddPokemon")}
                    onSearch = {(input) => this.onSearch(input)}
                    _onMaps = {() => this.props.navigation.navigate("MapsPokemon", {
                            pokemon: this.props.pokemon
                        })}
                    icon="ios-keypad"
                    iconFunction =  {() => this.props.navigation.openDrawer()}
                    true={this.props.user && this.props.user.level > 1 }/> 
                    {
                    this.state.showSearchBar
                        ? (
                            <View>
                                <View style={styles.widths}>
                                    <TouchableOpacity onPress={() => this.onClick()}>
                                       <Icons name="ios-close-circle" style={styles.iconClose} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.width}>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={this.state.category}
                                        style={{
                                            backgroundColor: 'white',
                                            fontSize: 8,
                                            height: 40,
                                            color: "#bdbdb"
                                        }}
                                        itemTextStyle={{}}
                                        textStyle={{
                                            color: "#dbdbdb",
                                            fontSize: 8
                                        }}
                                        onValueChange={(itemValue) => this.setState({category: itemValue})}>
                                        <Picker.item label="Select Category" value={null}></Picker.item>
                                        {
                                            this
                                                .props
                                                .category
                                                .map(value => (<Picker.item label={value.name} value={value.id}/>))
                                        }
                                    </Picker>
                                </View>
                                <View style={styles.width}>
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
                                        searchInputPlaceholderText="Search Type..."
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
                                        style={styles.inputBox}/>
                                </View>
                                <Button style={styles.button} onPress={() => this.loadmore()}>
                                    <Text style={styles.buttonText}>Filter</Text>
                                </Button>
                            </View>

                        )
                        : (

                            <View>

                                <Button style={styles.button} onPress={() => this.onClick()}>
                                    <Text style={styles.buttonText}>Filter</Text>
                                </Button>
                            </View>
                        )
                    }
                            <ScrollView>
                                <FlatList
                                    contentContainerStyle={{
                                        alignItems: 'center'
                                    }}
                                    numColumns='1'
                                    data={this.props.pokemon}
                                    renderItem={({item}) => (
                                        <Pokemon
                                            style={{
                                                borderRadius: 40
                                            }}
                                            _onClick = {() => Alert.alert(
                                                'Yakin ingin dihapus ?',
                                                'Tidak akan bisa dikembalikan',
                                                [
                                                    {text: 'Batal', onPress: () => console.log('Berhasil di Cancel')},
                                                    {text: 'Hapus', onPress: () => this.props.dispatch(deletePokemon(item.id))}
                                                ]
                                            )}
                                            _onUpdate =  {() => this.props.navigation.navigate("UpdatePokemon", {
                                                id : item.id,
                                                all : item
                                            })}
                                            type = {item.type.map((val, i) => {
                                                if(i < item.type.length -1 ){
                                                    return val.name + ''
                                                }else{
                                                    return val.name
                                                }
                                            })}
                                            name={item.name}
                                            image_url={item.image_url}
                                            id={item.id}
                                            category={item.category && item.category.name}
                                            onNavigate ={() => this.props.navigation.navigate("MapsPokemon",{
                                                pokemon: [item]
                                            })}
                                            user={this.props.user}/>
                                    )}/> 
                                {
                                    this.props.isLoading && (
                                        <LoadingScreen />
                                    )
                                }
                                {
                                    this.props.pokemon.length > 0 && (<View>
                                            <Button style={styles.button} onPress={() => this.loadmores()}>
                                                <Text style={styles.buttonText}>Load More ...</Text>
                                            </Button>
                                        </View>)
                                }

                            </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        pokemon: state.pokemon.data,
        page: state.pokemon.page,
        isLoading: state.pokemon.isLoading,
        category: state.category.data,
        type: state.type.data
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollview: {
        top: 5
    },
    icon: {
        fontSize: 35,
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: "#dbdbdb",
        borderBottomWidth: 0,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    viewmid: {
        borderWidth: 1,
        borderColor: '#dbdbdb',
        backgroundColor: 'transparent',
        borderRadius: 15,
        width: sliderWidth,
        height: 25
    },
    textmid: {
        top: 3,
        fontSize: 14,
        fontStyle: 'italic',
        alignItems: 'center',
        alignSelf: 'center'
    },
    content: {
        borderColor: '#dbdbdb',
        borderWidth: 1,
        width: sliderWidth / 1.1,
        borderBottomWidth: 0,
        borderTopWidth: 0
    },
    footer: {
        backgroundColor: 'transparent'
    },
    button: {
        backgroundColor: '#adadad',
        borderRadius: 400,
        width: sliderWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconClose: {
        fontSize: 30,
        marginRight: 10,

    },
    buttonText: {
        color: 'white',
        alignItems: 'center',
        textAlign: 'center'
    },width: {
        width: sliderWidth,
        marginTop: 7
        // alignItems: 'center',
        // justifyContent: 'center'
    },widths: {
        width: sliderWidth,
        marginTop: 7,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // alignItems: 'center',
        // justifyContent: 'center'
    },

});

//make this component available to the app
export default connect(mapStateToProps)(Home);