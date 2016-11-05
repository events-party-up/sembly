import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Navigator,
  // TouchableHighlight,
  TouchableOpacity,
} from 'react-native';


import Spinner from './Spinner';
import FacebookLoginButton from './FacebookLoginButton';


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
  }

  componentWillMount() {
    this.props.getLocation();
  }

  navigate() {
    this.props.navigator.push({
      name: 'Map',
    });
  }

  login(userData) {
    this.setState({ loading: true });
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
     // .then(response => response.json())
     // .then((res) => console.log(res))
     .then((user) => {
      //Temp until chash responds with a real user
      user = user || 'Luis Villeda';
      //
       this.props.setUser(user);
       this.navigate();
     })
     .catch((err) => {
        console.log('LoginPage ERR, make sure you npm start the backend server in the root folder ', err)
        this.navigate();
    });
  }

  render() {
    if (this.state.loading) {
      return (<View style={styles.container}><Spinner/></View>)
    }
    else {
      return (
        <View>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => { this.login(); }} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <FacebookLoginButton onLogin={userData => this.login(userData)} />
          </View>
        </View>
      );
    }
  }
}
