//import liraries
import React, {Component} from 'react';
import {
    Right,
    Left,
    Card,
    CardItem,
    Body,
    Content,
    Row,
    Alert
} from 'native-base'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'
import {PIC_URL} from 'react-native-dotenv'
// create a component
const window = Dimensions.get('window');

class RecommendedCardItem extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onNavigate}>
                <View style={{
                        borderRadius: 40
                    }}>
                    <Card style={styles.card}>
                    {this.props.user && this.props.user.level > 1 ? (
                        <CardItem header="header" bordered style={styles.cardItemHeader}>
                            <View style={styles.circle}>
                                <TouchableOpacity onPress={this.props._onUpdate}>
                                    <Icons name="ios-build" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                            <Body></Body>
                            <View style={styles.circle}>
                                <TouchableOpacity onPress={this.props._onClick}>
                                    <Icons name="ios-trash" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </CardItem>
                        ):(
                            <CardItem></CardItem>
                        )
                    }
                        <CardItem cardBody="cardBody" bordered>
                            <Image
                                style={{
                                    height: 200,
                                    width: '100%'
                                }}
                                source={{
                                    uri: `${PIC_URL}${this.props.image_url}`
                                }}/>
                        </CardItem>
                        <CardItem bordered>
                            {/* <Body> */}
                            <View style={styles.table}>
                                <View style={styles.align}>
                                    <Text
                                        style={{
                                            color: 'grey',
                                            fontSize: 13
                                        }}>Name :</Text>

                                    <Text style={styles.text}>{" " + this.props.name}</Text>
                                </View>
                                <View style={styles.align}>
                                    <Text
                                        style={{
                                            color: 'grey',
                                            fontSize: 13
                                        }}>Category :</Text>
                                    <Text
                                        style={{
                                            color: 'grey',
                                            fontSize: 12
                                        }}>{" " + this.props.category}</Text>

                                </View>
                                <View style={styles.align}>
                                    <Text style={{}}>Type :</Text>

                                    <Text style={styles.text}>{" " + this.props.type}</Text>
                                </View>
                            </View>

                            {/* </Body> */}
                        </CardItem>
                    </Card>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50'
    },
    card: {
        width: window.width / 1.1
    },
    swiper: {
        height: 100,
        borderRadius: 4
    },
    icon: {
        fontSize: 30,
        alignSelf: 'center'
    },
    align: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        alignItems: 'stretch'
    },
    cardItemHeader: {
        height: 35
    },
    circle: {
        height: 35,
        width: window.width/2.6,
        borderRadius: 50,
        backgroundColor: "#dbdbdb"
    },
    text: {
        color: 'grey',
        fontSize: 13
    },
    table: {
        flexDirection: "column"
    }
});

export default RecommendedCardItem;
//make this component available to the app