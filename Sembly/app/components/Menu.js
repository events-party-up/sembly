import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { FBLogin } from 'react-native-facebook-login';
import { getUser, destroyUser } from '../controllers/userStorageController';

/* eslint-disable no-underscore-dangle */

const styles = StyleSheet.create({
  outer: {

  },
  menuView: {
    borderStyle: 'solid',
    borderColor: '#aeb3ba',
    marginLeft: 14,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aeb3ba',
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageView: {
    marginTop: 40,
    alignItems: 'center',
  },
  description: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
  icon: {
    fontSize: 26,
    marginRight: 10,
    color: 'gray',
  },
  image: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginRight: 10,
    marginBottom: 20,
  },
  firstListTouchable: {
  },
  listTouchable: {
  },
  listElem: {
    fontSize: 18,
    color: 'black',
    alignItems: 'center',
  },
  fbcontainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        photoUrl: 'http://www.pd4pic.com/images/plain-dull-blank-smiley-yellow-face-icon.png',
      },
    };
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this.getUserInfoFromStorage();
  }

  getUserInfoFromStorage() {
    getUser()
    .then((user) => {
      console.log('Menu.js user: ', user);
      this.setState({ user });
    });
  }

  logout() {
    destroyUser()
      .then(() => {
        this.props._navigate('LoginPage');
      });
  }

  render() {
    return (
      <View style={styles.outer}>
        <TouchableOpacity onPress={()=> {this.props._navigate('Profile'); }} >
          <View style={styles.imageView}>
            { this.props.user ? <Image style={styles.image} source={{ uri: this.state.user.photoUrl }} /> : <Text></Text>}
          </View>
          <Text style={styles.description}>
            {this.state.user.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.menuView}>
          <TouchableOpacity style={styles.flowRight} onPress={() => { this.props._navigate('Profile'); }} >
              <Icon name='account-circle' style={styles.icon}></Icon>
              <View style={styles.listTouchable}>
                <Text style={styles.listElem}>Profile</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={() => { this.props._navigate('Map'); }} >
            <Icon name='location-on' style={styles.icon}></Icon>
            <View style={styles.listTouchable}>
              <Text style={styles.listElem}>Map</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={() => { this.props._navigate('Feed'); }} >
            <Icon name='format-list-bulleted' style={styles.icon}></Icon>
            <View style={styles.listTouchable}>
              <Text style={styles.listElem}>Feed</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={() => { this.props._navigate('Invites'); }} >
            <Icon name='mail' style={styles.icon}></Icon>
            <View style={styles.listTouchable}>
              <Text style={styles.listElem}>Invites</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flowRight} onPress={() => { this.props._navigate('Saved'); }} >
            <Icon name='archive' style={styles.icon}></Icon>
            <View style={styles.listTouchable}>
              <Text style={styles.listElem}>Saved</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.fbcontainer}>
            <FBLogin onLogout={this.logout} />
          </View>
        </View>
      </View>

    );
  }

}
