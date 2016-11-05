import React, { Component } from 'react';
import {
  // StatusBar,
  StyleSheet,
  // Text,
  // View,
  Navigator,
} from 'react-native';

// import TopBar from './TopBar';
import LoginPage from './LoginPage';
// import Main from './Main';
import Map from './Map';
import Profile from './Profile';
import Feed from './Feed';
import FacebookLoginButton from './FacebookLoginButton';


let app;

const styles = StyleSheet.create({
  container: {
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        token: null,
        userId: null,
        name: null,
      },
    };

    app = this;
  }

  getLocation() {
    const context = this;
    navigator.geolocation.getCurrentPosition((data) => {
      context.setState({
        currentLoc: [data.coords.latitude, data.coords.longitude],
        mongoLocation: [data.coords.longitude, data.coords.latitude],
      });
    });
  }

  setUser(user) {
    this.setState({ user });
  }

  renderScene(route, navigator) {
    if (route.name === 'LoginPage') {
      return (
        <LoginPage
          getLocation={app.getLocation.bind(app)}
          setUser={app.setUser.bind(app)}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Profile') {
      return (<Profile user={app.state.user} navigator={navigator} />);
    }
    if (route.name === 'Map') {
      return (
        <Map
          user={app.state.user}
          mongoLocation={app.state.mongoLocation}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Feed') {
      return (
        <Feed
          name={route.name}
          user={app.state.user}
          mongoLocation={app.state.mongoLocation}
          page={'bundle'}
          navigator={navigator}
        />
      );
    }
    if (route.name === 'Invites') {
      return (<Feed name={'Invited To'} user={app.state.user} page={'invited'} navigator={navigator} />);
    }
    if (route.name === 'Saved') {
      return (<Feed name={route.name} user={app.state.user} page={'saved'} navigator={navigator} />);
    }
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.FadeAndroid;
  }


  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        style={styles.container}
        initialRoute={{ name: 'LoginPage' }}
        renderScene={this.renderScene}
      />
    );
  }
}

