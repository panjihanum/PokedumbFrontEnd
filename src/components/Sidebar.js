import React from "react";
import { AppRegistry, StatusBar, Image } from "react-native";
import { Container, Content, Text, List, ListItem,Thumbnail } from "native-base";
import { removeData } from '../asyncStorage'
import { resetActionLogout } from '../helpers/RootStack'
import { connect } from 'react-redux'
import { userLogout } from '../actions/users.action'
import { PIC_URL } from 'react-native-dotenv'
const routes = ["Home", "All_Pokemon"];

class SidebaSideBarr extends React.Component {
    _onClick = (data) => {
        this.props.navigation.navigate(data, {
          pokemon: this.props.pokemon
        })
    }
    _LogOut = async() => {
      this.props.dispatch(userLogout())
            this.props.navigation.dispatch(resetActionLogout)
            removeData("access_token")
    }
    _onLogin = () => {
      this.props.navigation.navigate("Login")
    }
  render() {
    if(this.props.user && this.props.user.id){
      return (
        <Container>
          <Content>
            <Thumbnail
              large
              source={{uri : `${PIC_URL}${this.props.user.image_url}`}}
              style={{
                height: 200,
                width: 200,
                borderRadius: 400,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }} />
            <List
              dataArray={routes}
              renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => this._onClick(data)}>
                    <Text>{data}</Text>
                  </ListItem>
                );
              }}
            />
            <ListItem button onPress={() => this._LogOut()}><Text>Logout</Text></ListItem>
          </Content>
        </Container>
      );
    }else{
      return (
        <Container>
          <Content>
            <Thumbnail
              large
              source={require('../assets/background.png')}
              style={{
                height: 200,
                width: 200,
                borderRadius: 400,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }} />
            <List
              dataArray={routes}
              renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => this._onClick(data)}>
                    <Text>{data}</Text>
                  </ListItem>
                );
              }}
            />
            <ListItem button onPress={() => this._onLogin()}><Text>Login</Text></ListItem>
          </Content>
        </Container>
      );
    }

  }
}

const mapStateToProps = state => {
    return{
        user: state.users.user,
        pokemon: state.pokemon.data,
        page: state.pokemon.page,
        isLoading: state.pokemon.isLoading,
    }
}
export default connect(mapStateToProps)(SidebaSideBarr);