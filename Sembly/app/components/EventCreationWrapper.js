import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { MKColor } from 'react-native-material-kit';
import ExpandingButton from './ExpandingButton';
import DroppingPin from './DroppingPin';
import NewEventModal from './NewEventModal';

/* eslint-disable react/jsx-filename-extension */

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  button: {
    bottom: 32,
    position: 'absolute',
    backgroundColor: MKColor.Indigo,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    elevation: 4,
  },
});

export default class EventCreationWrapper extends Component {

  constructor(props) {
    super(props);

    this.handleClosedPress = this.handleClosedPress.bind(this);
    this.handleOpenedPress = this.handleOpenedPress.bind(this);
  }

  handleClosedPress() {
    this.droppingPin.dropPin();
  }

  handleOpenedPress() {
    this.eventModal.open();
  }

  render() {
    return (
      <View style={styles.container} pointerEvents="box-none">
        <ExpandingButton
          height={64}
          align="right"
          horizontalMargin={32}
          closedText="+"
          openedText="Place Event"
          transitionLength={300}
          style={styles.button}
          closedAction={this.handleClosedPress}
          openedAction={this.handleOpenedPress}
        />
        <DroppingPin
          ref={(x) => { this.droppingPin = x; }}
          height={50}
          styleSheet={styles}
        />
        <NewEventModal
          ref={(x) => { this.eventModal = x; }}
          createEvent={this.props.createEvent}
          userId={this.props.user._id} // currently just used to fetch friends. would love to get rid of this
        />
      </View>
    );
  }
}

EventCreationWrapper.propTypes = {
  createEvent: React.PropTypes.func.isRequired,
};
