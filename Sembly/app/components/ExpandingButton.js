import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

/**
 * An expanding button. Starts "closed" as a circle aligned to
 * the left or right of the screen. When it is pressed it executes
 * the `closedAction` and opens up. The text changes from the
 * `closedText` to the `openedText`. Then the next time it is pressed
 * it executes the `openedAction`
 * Usage:
 *
 * // Defining style:
 * const styles = StyleSheet.create({
 *   button: {
 *     bottom: 250,
 *     position: 'absolute',
 *     backgroundColor: MKColor.Indigo,
 *     shadowRadius: 4,
 *     shadowOffset: { width: 0, height: 0.5 },
 *     shadowOpacity: 0.7,
 *     shadowColor: 'black',
 *     elevation: 4
 *   },
 * });
 *
 * // In render function:
 * render() {
 *   return (
 *       <ExpandingButton
 *         height={65}
 *         align="right"
 *         horizontalMargin={40}
 *         closedText="+"
 *         openedText="Place Event"
 *         transitionLength={300}
 *         style={styles.button}
 *         closedAction={() => {// do things //}}
 *         openedAction={() => {// do other things //}}
 *       />
 *   );
 * }
 */

/* eslint-disable react/jsx-filename-extension */
export default class ExpandingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedWidth: new Animated.Value(0),
      textClosedOpacity: new Animated.Value(0),
      textOpenOpacity: new Animated.Value(0),
      opened: false,
    };

    this.openButtonAnimation = Animated.timing(
      this.state.animatedWidth,
      {
        toValue: Dimensions.get('window').width - (props.horizontalMargin * 2),
        duration: props.transitionLength,
      }
    );

    this.closeButtonAnimation = Animated.timing(
      this.state.animatedWidth,
      {
        toValue: props.height,
        duration: props.transitionLength,
      }
    );

    this.fadeInText = propName =>
      Animated.timing(
        this.state[propName],
        {
          toValue: 1,
          duration: props.transitionLength,
          easing: Easing.in(Easing.circle),
        }
      );

    this.fadeOutText = propName =>
      Animated.timing(
        this.state[propName],
        {
          toValue: 0,
          duration: props.transitionLength,
          easing: Easing.out(Easing.circle),
        }
      );

    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    this.buttonProps = {
      height: this.props.height,
      width: this.state.animatedWidth,
      borderRadius: this.props.height / 2,
    };

    this.textProps = {
      fontSize: 20,
      color: 'white',
      backgroundColor: 'transparent',
      textAlign: 'center',
    };

    this.wrapperProps = {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: this.state.animatedWidth,
      height: this.props.height,
    };
    this.buttonProps[this.props.align] = this.props.horizontalMargin;
    this.state.animatedWidth.setValue(this.props.height);
    this.state.textClosedOpacity.setValue(1);
    this.state.textOpenOpacity.setValue(0);
  }

  shrinkButton() {
    this.closeButtonAnimation.start();
    this.fadeOutText('textOpenOpacity').start();
    this.fadeInText('textClosedOpacity').start();
  }

  expandButton() {
    this.openButtonAnimation.start();
    this.fadeOutText('textClosedOpacity').start();
    this.fadeInText('textOpenOpacity').start();
  }

  toggleOpenedClosed() {
    if (this.state.opened) {
      this.setState({ opened: false });
      this.shrinkButton();
    } else {
      this.setState({ opened: true });
      this.expandButton();
    }
  }

  handlePress() {
    if (this.state.opened && this.props.openedAction) {
      this.props.openedAction();
    } else if (!this.state.opened && this.props.closedAction) {
      this.props.closedAction();
    }
    this.toggleOpenedClosed();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Animated.View
          style={
            [
              this.props.style,
              this.buttonProps,
            ]}
        >
          <Animated.View style={[this.wrapperProps]}>
            <Animated.Text
              ellipsizeMode="middle"
              numberOfLines={1}
              style={[this.textProps, { opacity: this.state.textClosedOpacity }]}
            >
              {this.props.closedText}
            </Animated.Text>
          </Animated.View>
          <Animated.View style={[this.wrapperProps]}>
            <Animated.Text
              ellipsizeMode="middle"
              numberOfLines={1}
              style={[this.textProps, { opacity: this.state.textOpenOpacity }]}
            >
              {this.props.openedText}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

ExpandingButton.defaultProps = {
  height: 64,
  align: 'left',
  horizontalMargin: 32,
  closedText: '',
  openedText: '',
  transitionLength: 333,
  closedAction: null,
  openedActionn: null,
};

ExpandingButton.propTypes = {
  height: React.PropTypes.number,
  align: React.PropTypes.oneOf(['left', 'right']),
  horizontalMargin: React.PropTypes.number,
  closedText: React.PropTypes.string,
  openedText: React.PropTypes.string,
  transitionLength: React.PropTypes.number,
  closedAction: React.PropTypes.func,
  openedAction: React.PropTypes.func,
  style: React.PropTypes.number,
};

