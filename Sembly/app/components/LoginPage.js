import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Spinner from './Spinner';
import FacebookLoginButton from './FacebookLoginButton';
import { setUser } from '../controllers/userStorageController';

/* eslint-disable react/jsx-filename-extension */

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#F44336',
    borderColor: '#F44336',
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.serverLoginFromFacebookData = this.serverLoginFromFacebookData.bind(this);
  }

  componentWillMount() {
    this.props.getLocation();
  }

  navigate() {
    this.props.navigator.push({
      name: 'Map',
    });
  }

  serverLoginFromFacebookData(facebookUserData) {
    this.setState({ loading: true });
    console.log('This is being sent to our server on login ', facebookUserData);
    return fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(facebookUserData),
    })
    .then(response => response.json())
    .then((user) => {
      setUser(user);
      return user;
    })
    .then(user => this.props.setUser(user))
    .then(() => this.navigate())
    .catch((error) => {
      console.log('Login Error; make sure you npm start the backend server in the root folder, also server might be responding with a 404. ', error.message);
      throw error;
    });
  }

  render() {
    if (this.state.loading) {
      return (<View style={styles.container}><Spinner /></View>);
    }
    return (
      <View>
        <View style={styles.container}>
          <FacebookLoginButton onLogin={this.serverLoginFromFacebookData} />
        </View>
      </View>
    );
  }
}
