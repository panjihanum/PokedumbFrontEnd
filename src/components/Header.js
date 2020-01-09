//import liraries
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Header,
    Right,
    Left,
    Body,
    Item,
    Input
} from 'native-base'
import Icons from 'react-native-vector-icons/Ionicons'
// create a component
import Searchbar from './SearchBar'
const window = Dimensions.get('window')
class Headers extends Component {

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            showSearchBar : false
        }
    }
    onClick() {
        let { showSearchBar } = this.state;
        this.setState({
            showSearchBar : !showSearchBar
        })
    }

    render() {
        const { showSearchBar } = this.state;
        return (
            <Header style={styles.header}>
                <StatusBar backgroundColor="#FF512F" barStyle="light-content"/>
                <Left>
                    <TouchableOpacity onPress={this.props.iconFunction}>
                        <Icons name={this.props.icon} style={styles.icon}/>
                    </TouchableOpacity>

                </Left>
                <Body>
                    {this.props.onSearch && (
                        <Item style={styles.item}>
                            <Icons name="ios-search" style={styles.search} />
                            <Input placeholder="Search" style={styles.searchInput} onChangeText={this.props.onSearch} onPress={this.onClick}/>
                        </Item>
                    )}

                </Body>
                <Right>
                    <TouchableOpacity onPress={this.props._onMaps}>
                        <Icons name="ios-eye" style={styles.icon}/>
                    </TouchableOpacity>
                    {this.props.true && (
                    <TouchableOpacity onPress={this.props._onPress}>
                        <Icons name="ios-add" style={styles.icon}/>
                    </TouchableOpacity>
                    )}
                </Right>
            </Header>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
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
    icon: {
        fontSize: 30,
        marginRight: 15,
        color: 'grey'
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
    }
});

//make this component available to the app
export default Headers;