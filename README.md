# Sembly

> Pithy project description

## Team

  - __Product Owner__: Omar Mohamed
  - __Scrum Master__: Spencer Lopez
  - __Development Team Members__: Carlos Flores

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
  1. [Installing Dependencies](#installing-dependencies)
  1. [Testing](#testing)
    1. [Adding Test Data](#adding-test-data)
  1. [Starting the App](#starting-the-app)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Mongo
- React-Native-Cli

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

From within Sembly directory:

```sh
npm install
```

**Set up Android emulation on Ubuntu 16.04**
1. Run `apt-get install lib32stdc++6 lib32z1 openjdk-8-jre openjdk-8-jdk`
1. [Download](https://developer.android.com/studio/index.html) and [install](https://developer.android.com/studio/install.html) Android Development Studio
1. Follow the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html#2-confirm-the-android-sdk-is-installed) guide.
1. Install these Android SDKs
  1. Android 7.0
    1. SDK Platform
    1. Sources for Android SDK
  1. Android 6.0
    1. SDK Platform
    1. Sources for Android SDK
    1. Google APIs System Image for your architecture
  1. Extras
    1. Google Play services
    1. Google Repository
1. Install these Android SDK Tools
  1. 23.0.1
  1. 23.0.3
1. (Optional) Install and configure [Watchman](https://facebook.github.io/watchman/docs/install.html#installing-from-source).

Encountering weird errors? Try running [`./gradlew clean`](https://github.com/airbnb/react-native-maps/issues/378#issuecomment-231757054) (Thanks [texas697](https://github.com/texas697)!).

### Testing

From within the root directory:

```sh
npm test
```

#### Adding Test Data

To prepopulate database for easier development...
From within the root directory:

```sh
npm run populate
```

### Starting the App

With your mongo database runnning
Start the server from the root directory:

```sh
npm start
```

From the Sembly directory in one terminal:

```sh
npm start
```

and in another terminal:

```sh
npm run build
```

**Start Android emulation on Ubuntu 16.04**
1. Start the application (instructions above)
1. Start an emulated Android device or connect a device (Android version 6.0+)
  - Emulated
    1. Create an [Android device](https://developer.android.com/studio/run/managing-avds.html#createavd) (with Google APIs!)
    1. [Start](https://github.com/facebook/react-native/issues/3091#issuecomment-221105669) the emulated device
  - Connected device
    1. Enable USB Debugging on your device
    1. Get your device's vendor id (refer to the [Android Docs](https://developer.android.com/studio/run/device.html#setting-up) this [Facebook guide](https://facebook.github.io/react-native/docs/running-on-device-android.html))
    1. Replace <VENDORID> with your device's vendor id and run this command:
      - `echo SUBSYSTEM=="usb", ATTR{idVendor}=="<VENDORID>", MODE="0666", GROUP="plugdev" | sudo tee /etc/udev/rules.d/51-android-usb.rules` 
    1. Confirm your device is connected (`adb devices`)
1. Run `react-native start & react-native run-android & wait`

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
