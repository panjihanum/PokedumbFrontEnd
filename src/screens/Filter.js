//import liraries
import React, { Component } from 'react';
import { FlatList, View, Text, TextInput, Picker, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Button, Content, Body, Left, Right } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { deletePokemon, getPokemonByName, getPokemonByFilter } from '../actions/'
import Pokemon from '../components/Pokemon'
import LoadingScreen from '../components/LoadingScreen'
// create a component
import Icons from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import MultiSelect from 'react-native-multiple-select'


const sliderWidth = Dimensions.get('window').width;


class Filter extends Component {
    constructor(){
        super();
        this.state = {
            name_like: "",
            category: "",
            type_id: [],

        }
    }
    componentWillMount() {
        const name_like = this.state.name_like
        const category = this.state.category
        const type_id = this.state.type_id
        this.props.dispatch(getPokemonByFilter(name_like, category, type_id, 5))
    }

    loadmore = () => {
        const name_like = this.state.name_like
        const category = this.state.category
        const type_id = this.state.type_id
        const page = this.props.page + 5
        this.props.dispatch(getPokemonByFilter(name_like, category, type_id, page))
    }
    render() {
        if(this.props.isAdd && this.props.isLoading){
            <LoadingScreen />
        }
        if(this.props.user && !this.props.user.level){
            <LoadingScreen />
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        // alert(this.props.page)
        // alert(JSON.stringify(this.props.users))
        // alert(JSON.stringify(                    this.props.pokemon, null, 2))


        return (
            // <Container>
                <ImageBackground source={require("../assets/background.jpg")} style={{width: '100%', height: '100%'}}>
                    <Header 
                        _onPress= {() => this.props.navigation.navigate("AddPokemon")}
                        onSearch= {(input) => this.props.dispatch(getPokemonByName(input))}
                        _onMaps = {() => this.props.navigation.navigate("MapsPokemon", {
                            pokemon: this.props.pokemon
                        })}
                        icon = "ios-keypad"
                        iconFunction = {() => this.props.navigation.openDrawer()}     
                        true ={this.props.user && this.props.user.level > 1 }          
                    />
                    <View style={styles.width}>
                        <Picker  
                            mode="dropdown"
                            selectedValue={this.state.category_id}
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
                                this.props.category.map(value => (<Picker.item label={value.name} value={value.id}/>))
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
                            <Button style={styles.button} onPress={() => this.props.navigation.navigate("Filter")}>
                                <Text style={styles.buttonText}>Filter</Text>
                            </Button>         
                        </View>
                    {
                        this.props.isLoading ? (
                            <LoadingScreen style={styles.loading} /> 
                        ) : (
                            <ScrollView>
                                <FlatList
                                    contentContainerStyle={{alignItems: 'center'}}
                                    numColumns = '1'
                                    data={this.props.pokemon}
                                    renderItem={({item}) => (
                                        <Pokemon 
                                            style={{borderRadius: 40}}
                                            _onClick = {() => this.props.dispatch(deletePokemon(item.id))}
                                            _onUpdate = {() => this.props.navigation.navigate("UpdatePokemon", {
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
                                            name = {item.name}
                                            image_url = {item.image_url}
                                            id= {item.id}
                                            category = {item.category && item.category.name}
                                            onNavigate= {() => this.props.navigation.navigate("MapsPokemon",{
                                                pokemon: [item]
                                            })}
                                            user={this.props.user}
                                        />
                                        )}
                                />
                                {this.props.pokemon.length > 0 &&
                                    <View>
                                        <Button style={styles.button} onPress={() => this.loadmore()}>
                                            <Text style={styles.buttonText}>Load More ...</Text>
                                        </Button>
                                    </View>
                                }
                            </ScrollView>
                        )
                    }


            </ImageBackground>
    );
    }
}


const mapStateToProps = state => {
    return{
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
        alignItems: 'center',
    }, 
    scrollview: {
        top: 5
    },    icon: {
        fontSize: 35,
        marginTop: 10,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: "#dbdbdb",
        borderBottomWidth: 0,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'transparent',

    },
    viewmid: {
        borderWidth: 1,
        borderColor: '#dbdbdb',
        backgroundColor: 'transparent',
        borderRadius: 15,
        width: sliderWidth,
        height: 25
    },textmid: {
        top: 3,
        fontSize: 14,
        fontStyle: 'italic',
        alignItems: 'center',
        alignSelf: 'center',
    },content: {
        borderColor: '#dbdbdb',
        borderWidth: 1,
        width: sliderWidth/1.1,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },footer: {
        backgroundColor: 'transparent'
    },button: {
        backgroundColor: '#adadad',
        borderRadius: 400,
        width: sliderWidth,
        alignItems: 'center',
        justifyContent: 'center',


    },buttonText: {
        color: 'white',
        alignItems: 'center',
        textAlign: 'center',

    }
});

//make this component available to the app
export default connect(mapStateToProps)(Filter);