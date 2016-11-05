import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DatePickerIOS,
} from 'react-native';

import Modal from 'react-native-modalbox';
import { MKCheckbox, MKButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* eslint-disable react/jsx-filename-extension */

const styles = StyleSheet.create({
  modal: {
    marginTop: 40,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 10,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    color: 'grey',
    fontSize: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F44336',
  },
  textInput: {
    // flex: 1,
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    // borderWidth: 1,
    // borderColor: 'grey',
    textAlign: 'left',
  },
  friendsCheckGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  friendCheck: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  visibilityCheck: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  createEventButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createEventButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    width: 150,
    height: 40,
  },
});

export default class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      newEventName: '',
      newEventStartTime: new Date(),
      newEventTags: '',
      errorText: '',
    };
  }

  componentWillMount() {
    this.setFriends();
  }

  setFriends() {
    fetch('http://localhost:3000/api/friends/getFriends',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.props.userId, search: '' }),
      }
    )
    .then(response => response.json())
    .then(friends =>
      this.setState({
        friends,
      })
    );
  }

  handleSubmit() {
    // let context = this;
    if (this.state.newEventName === '') {
      this.setState({ errorText: 'Please enter an event name!' });
      return;
    }

    const eventToBePosted = {
      name: this.state.newEventName,
      startTime: this.state.newEventStartTime,
      image: null, // can add a URL here to go with the event
      tags: this.state.newEventTags.split(' '),
      invitedUsers: [],
      visibility: this.refs.visibilityCheckbox.state.checked ? 'invite' : 'public',
    };

    this.state.friends.forEach((friend, index) => {
      if (this.refs['friend' + index].state.checked) {
        eventToBePosted.invitedUsers.push(this.refs['friend' + index].props.friendCheckId);
      }
    });

    // TODO: swap the create button for a spinner

    this.props.createEvent(eventToBePosted)
    .then(() => {
      // TODO: hide the spinner
      this.setState({
        errorText: 'Event created successfully!',
        newEventName: '',
        newEventStartTime: new Date(),
        newEventTags: '',
      });
      setTimeout(() => {
        this.refs.newEventModal.close();
        this.setState({
          errorText: '',
        });
      }, 1000);
    })
    .catch(() => {
      this.setState({
        errorText: 'There was an error creating your event.',
        newEventName: '',
        newEventStartTime: new Date(),
        newEventTags: '',
      });
      setTimeout(() => {
        this.refs.newEventModal.close();
        this.setState({
          errorText: '',
        });
      }, 1000);
    });
  }

  open() {
    this.refs.newEventModal.open();
  }

  close() {
    this.refs.newEventModal.close();
  }

  render() {
    const context = this;
    return (
      <Modal ref={'newEventModal'} style={styles.modal}>
        <View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.errorText}>{this.state.errorText}</Text>
            <TouchableOpacity onPress={() => context.refs.newEventModal.close()}>
              <Icon style={styles.closeButton} name="close" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.header}>Create a New Event!</Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter a title for your Event'
              onChangeText={(text) => this.setState({newEventName: text})}
              />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter tags, separated by a space'
              onChangeText={(text) => this.setState({newEventTags: text})}
              />
          </View>

          <View style={styles.dateInputContainer}>
            <DatePickerIOS
              date={this.state.newEventStartTime}
              onDateChange={(d) => {this.setState({newEventStartTime:d})}}
            />
          </View>

          <View style={styles.friendsCheckGroup}>
            <Text>Invite your friends!</Text>
            {this.state.friends.map((friend, index) => {
              return (
                <View style={styles.friendCheck} key={friend._id}>
                  <MKCheckbox
                    checked={false} ref={'friend' + index} friendCheckId={friend._id}
                  />
                  <Text>{friend.firstName + ' ' + friend.lastName}</Text>
                </View>
              )
            })}
          </View>

          <View style={styles.visibilityCheck}>
            <Text>Make your event invite only?</Text>
            <MKCheckbox ref={'visibilityCheckbox'} checked={false}/>
          </View>

          <View style={styles.createEventButtonContainer}>
            <MKButton
              style={styles.createEventButton}
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              onPress={this.handleSubmit.bind(this)}
              >
              <Text pointerEvents="none"
                    style={{ color: 'white', fontWeight: 'bold' }}>
                CREATE EVENT
              </Text>
            </MKButton>
          </View>
        </View>
      </Modal>
    );
  }
}

NewEventModal.defaultProps = {
  modalVisibility: false,
};

NewEventModal.propTypes = {
  modalVisibility: React.PropTypes.bool,
  createEvent: React.PropTypes.func.isRequired,
};

