import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { Content } from 'native-base'
import {connect} from 'react-redux'
import {getPokemon, getPokemonByName} from '../actions/pokemon.action'
import {PIC_URL} from 'react-native-dotenv'
import MapView from "react-native-maps";
import Header from '../components/Header'
import { Item } from "native-base";
import { resetAction } from '../helpers/RootStack'

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 30;

class screens extends Component {
    constructor(){
        super();
        this.state = {
        markers: [],
        region: {
            latitude: -6.270565,
            longitude: 106.759550,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068
        }
    }}

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        // We should detect when scrolling has stopped then animate We should just
        // debounce the event listener here
        const id = this.props.navigation.getParam("pokemon", "")
        this.props.dispatch(getPokemon())
        let array = []
        const pokemon = this.props.pokemon
        const pokemonById = id
        // alert(JSON.stringify(pokemon, null, 2))

        array.push(pokemon.map((val) => {
            return {
                id: val.id,
                name: val.name,
                category: val.category,
                type: val.type,
                image_url: val.image_url,
                coordinate:{
                    latitude: parseFloat(val.latitude),
                    longitude: parseFloat(val.longitude)
                }
            }
        }))

        let regionz = []
        regionz.push(pokemonById.map(val => {
            return {
                region: {
                    latitude: parseFloat(val.latitude),
                    longitude: parseFloat(val.longitude),
                    latitudeDelta: 0.04864195044303443,
                    longitudeDelta: 0.040142817690068
                }
            }
        }))

        this.setState({
            markers : array[0],
            region:  regionz[0][0].region
            })

            
            // alert(JSON.stringify(array[0]))
        this
            .animation
            .addListener(({value}) => {
                let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
                if (index >= this.state.markers.length) {
                    index = this.state.markers.length - 1;
                }
                if (index <= 0) {
                    index = 0;
                }

                clearTimeout(this.regionTimeout);
                this.regionTimeout = setTimeout(() => {
                    if (this.index !== index) {
                        this.index = index;
                        const {coordinate} = this
                            .state
                            .markers[index];
                        this
                            .map
                            .animateToRegion({
                                ...coordinate,
                                latitudeDelta: this.state.region.latitudeDelta,
                                longitudeDelta: this.state.region.longitudeDelta
                            }, 350);
                    }
                }, 10);
            });
    }
    render() {
        
        const interpolations = this
            .state
            .markers
            .map((marker, index) => {
                const inputRange = [
                    (index - 1) * CARD_WIDTH,
                    index * CARD_WIDTH,
                    ((index + 1) * CARD_WIDTH)
                ];
                const scale = this
                    .animation
                    .interpolate({
                        inputRange,
                        outputRange: [
                            1, 2.5, 1
                        ],
                        extrapolate: "clamp"
                    });
                const opacity = this
                    .animation
                    .interpolate({
                        inputRange,
                        outputRange: [
                            0.35, 1, 0.35
                        ],
                        extrapolate: "clamp"
                    });
                return {scale, opacity};
            });

        return (

            <View style={styles.container}>
            <Header 
            _onPress= {() => this.props.navigation.navigate("AddPokemon")}
            _onMaps = {() => this.props.navigation.navigate("MapsPokemon", {
                pokemon: this.props.pokemon
            })}
            icon = "ios-arrow-dropleft"
            iconFunction = {() => this.props.navigation.dispatch(resetAction)}                     
            />
            <Content>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.containers}>
                    {
                        this
                            .state
                            .markers
                            .map((marker, index) => {
                                const scaleStyle = {
                                    transform: [
                                        {
                                            scale: interpolations[index].scale
                                        }
                                    ]
                                };
                                const opacityStyle = {
                                    opacity: interpolations[index].opacity
                                };
                                return (
                                    <MapView.Marker key={index} coordinate={marker.coordinate} image={{
                                        uri: `${PIC_URL}${marker.image_url}`
                                    }}>
                                        <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                            <Animated.View style={[styles.ring, scaleStyle]}/>
                                            <View style={styles.marker}/>
                                        </Animated.View>
                                    </MapView.Marker>
                                );
                            })
                    }
                </MapView>
                <Animated.ScrollView
                    horizontal="horizontal"
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: this.animation
                                }
                            }
                        }
                    ], {useNativeDriver: true})}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}>
                    {
                        this
                            .state
                            .markers
                            .map((marker, index) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("DetailPokemon", {
                                    id:marker.id
                                })}>
                                <View style={styles.card} key={index}>
                                    <Image source={{uri: `${PIC_URL}${marker.image_url}`}} style={styles.cardImage} resizeMode="cover"/>
                                    <View style={styles.textContent}>
                                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                                        <Text numberOfLines={1} style={styles.cardDescription}>
                                            {marker.category.name}
                                        </Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                            ))
                    }
                </Animated.ScrollView>
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },containers:{
        height: height / 1.1,
        width: width
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            x: 2,
            y: -2
        },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: 25,
        overflow: "hidden"
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    textContent: {
        flex: 1
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold"
    },
    cardDescription: {
        fontSize: 12,
        color: "#444"
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center"
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)"
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)"
    }
});


const mapStateToProps = state => {
    // alert(JSON.stringify(state.MapsPokemon.readmore.picture))
    return {
        pokemon: state.pokemon.data, 
        isLoading: state.pokemon.isLoading
    }
}
AppRegistry.registerComponent("mapfocus", () => screens);
export default connect(mapStateToProps)(screens);
