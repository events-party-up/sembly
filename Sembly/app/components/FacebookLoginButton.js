import React, { PropTypes, Component } from 'react';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import Promise from 'bluebird';

class FacebookLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  getFbInfo(data) {
    return new Promise((resolve, reject) => {
      const fields = 'email, name';
      fetch(`https://graph.facebook.com/v2.8/${data.credentials.userId}/?access_token=${data.credentials.token}&fields=${fields}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
      .then(res => res.json())
      .then((res) => {
        resolve({
          token: data.credentials.token,
          name: res.name,
          email: res.email,
          userId: res.id,
        });
      })
      .catch((err) => {
        console.log('ERR FETCH: ', err);
        reject(err);
      });
    });
  }

  render() {
    const _this = this;
    return (
      <FBLogin
        style={{ marginBottom: 10 }}
        ref={(fbLogin) => { this.fbLogin = fbLogin; }}
        permissions={['email', 'user_friends']}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={(data) => {
          console.log('Logged in!');
          console.log('FRESH LOGIN', data);
          const fbInfoRequest = _this.getFbInfo(data);
          fbInfoRequest.then((res) => {
            _this.setState({ user: data.credentials });
            _this.props.onLogin(res);
            console.log('SEND RES TO onLogin:', res);
          })
          .catch(err => console.log('ERROR: ', err));
        }}
        onLogout={() => {
          console.log('Logged out.');
          _this.setState({ user: null });
        }}
        onLoginFound={(data) => {
          console.log('Existing login found.');
          const fbInfoRequest = _this.getFbInfo(data);
          fbInfoRequest.then((res) => {
            _this.setState({ user: data.credentials });
            _this.props.onLogin(res);
            console.log('SEND RES TO onLogin:', res);
          })
          .catch(err => console.log('ERROR: ', err));
        }}
        onLoginNotFound={() => {
          console.log('No user logged in.');
          _this.setState({ user: null });
        }}
        onError={(data) => {
          console.log('ERROR');
          console.log(data);
        }}
        onCancel={() => {
          console.log('User cancelled.');
        }}
        onPermissionsMissing={(data) => {
          console.log('Check permissions!');
          console.log(data);
        }}
      />
    );
  }
}

export default FacebookLoginButton;
