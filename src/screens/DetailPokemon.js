//import liraries
import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    Header,
    Content,
    Body,
    Left,
    Right,
    Thumbnail,
    Item,
    Input,
    Button
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {connect} from 'react-redux'
import {getPokemonById, getEbook} from '../actions/pokemon.action'
import {PIC_URL} from 'react-native-dotenv'
import LoadingScreen from '../components/LoadingScreen'
import Icons from 'react-native-vector-icons/Ionicons'
import MapView from 'react-native-maps';
// create a component

const window = Dimensions.get('window');

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions
    .get('window')
    .width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

class Ebook extends Component {
    componentDidMount() {
        const id = this
            .props
            .navigation
            .getParam("id", "")
        // alert(JSON.stringify(this.props.access_token))
        this
            .props
            .dispatch(getPokemonById(id))

    }

    render() {
        // alert(JSON.stringify(this.props.users)) alert(this.props.isLoading)
        // alert(JSON.stringify(this.props.pokemon))
        // alert(JSON.stringify(this.props.pokemon))
        return (
            // <Container>
            <ImageBackground source={require("../assets/background.jpg")} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                    <Header style={styles.header}>
                        <StatusBar backgroundColor="#FF512F" barStyle="light-content"/>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                <Icons name="ios-arrow-dropleft" style={styles.icon}/>
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Item style={styles.item}>
                                <Icons name="ios-search" style={styles.search}/>
                                <Input placeholder="Search" style={styles.searchInput}/>
                            </Item>
                        </Body>
                        <Right>
                            <Icons name="ios-chatbubbles" style={styles.icon}/>
                            <Icons name="ios-archive" style={styles.icon}/>
                            <Icons name="md-notifications" style={styles.icon}/>
                        </Right>
                    </Header>
                    <Content>
                        <View>
                            {
                                this.props.pokemon && this
                                    .props
                                    .pokemon[0] && this
                                    .props
                                    .pokemon[0]
                                    .image_url && this
                                    .props
                                    .isLoading === false
                                        ? (
                                            <Carousel
                                                ref={(c) => {
                                                    this._carousel = c;
                                                }}
                                                data={this.props.pokemon}
                                                renderItem={({item}) => (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            alert("nothing functional")
                                                        }}>
                                                        <View style={styles.slideInnerContainer}>
                                                            <Thumbnail
                                                                source={{
                                                                    uri: `${PIC_URL}${item.image_url}`
                                                                }}
                                                                style={styles.slide}/>
                                                            <Text style={styles.title}>{item.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                                sliderWidth={sliderWidth}
                                                itemWidth={itemWidth}/>
                                        )
                                        : (<LoadingScreen/>)
                            }
                        </View>
                    </Content>
                    <View style={styles.viewmid}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("ReadEbook", {url: this.props.data.file})}></TouchableOpacity>
                    </View>
                    <View style={styles.viewmid}>
                        <TouchableOpacity>
                            <View>
                                <Text style={styles.button}>Tambahkan Ke Favorit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Content></Content>
                    <Content>

                        {
                            !!this.props.pokemon && !!this
                                .props
                                .pokemon[0] && !!this
                                .props
                                .pokemon[0]
                                .longitude
                                    ? (

                                        <MapView
                                            style={styles.map}
                                            initialRegion={{
                                                latitude: -6.270565,
                                                longitude: 106.759550,
                                                latitudeDelta: 1,
                                                longitudeDelta: 1
                                            }}>
                                            <MapView.Marker
                                                coordinate={{
                                                    "latitude" : this
                                                        .props
                                                        .pokemon[0]
                                                        .latitude,
                                                    "longitude" : this
                                                        .props
                                                        .pokemon[0]
                                                        .longitude
                                                }}
                                                title={"Your Location"}
                                                style={{
                                                    height: 20,
                                                    widht: 20
                                                }}
                                                image={{
                                                    uri: `${PIC_URL}${this
                                                        .props
                                                        .pokemon[0]
                                                        .image_url}`
                                                }}></MapView.Marker>
                                        </MapView>
                                    )
                                    : (<LoadingScreen/>)
                        }
                    </Content>
                </ScrollView>
            </ImageBackground>
            // </Container>
        );
    }
}

const mapStateToProps = state => {
    // alert(JSON.stringify(state.ebook.readmore.picture))
    return {pokemon: state.pokemon.readmore, isLoading: state.pokemon.isLoading}
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50'
    },
    header: {
        width: window.width,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        // position: 'absolute',
        borderRadius: 15,
        marginTop: 5
    },
    headerChild: {
        flex: 1
    },
    buttonView: {
        marginBottom: 30
    },
    button: {
        width: window.width,
        borderColor: "#dbdbdb",
        borderWidth: 1,
        borderRadius: 50,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5
    },
    icon: {
        fontSize: 25,
        marginRight: 10,
        color: '#dbdbdb'
    },
    search: {
        fontSize: 15,
        paddingTop: 5,
        justifyContent: 'center',
        bottom: 2
    },
    searchInput: {
        fontSize: 15,
        alignSelf: 'center'
    },
    item: {
        backgroundColor: '#dbdbdb',
        paddingHorizontal: 10,
        borderRadius: 50,
        width: window.width / 1.7,
        height: 35,
        right: 25
    },
    slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin
        // other styles for the item container
    },
    slideInnerContainer: {
        marginTop: 10,
        width: slideWidth,
        flex: 1
        // other styles for the inner container
    },
    image: {
        height: 400,
        width: 400,
        borderRadius: 100
    },
    imageContainer: {
        height: 400,
        width: 400
    },
    viewmid: {
        backgroundColor: 'transparent',
        width: sliderWidth,
        height: 25,
        marginTop: 8
    },
    map: {
        flex: 1,
        width: window.width,
        height: 300,
        marginTop: 80,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

//make this component available to the app
export default connect(mapStateToProps)(Ebook);