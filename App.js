import React from 'react';
import { Asset, AppLoading, Font } from 'expo';
import { Platform, StatusBar } from 'react-native';
import { createRootNavigator } from "./router";
import images from "./constants/Images"
import fonts from "./constants/Fonts"

export default class App extends React.Component {

  state = {
    isReady: false,
    isVerified: false,
  };

  componentDidMount() {
    if(Platform.OS === "android") {
      StatusBar.setBackgroundColor('#000000', true);
      StatusBar.setBarStyle('light-content', true);
    }
  }

  componentWillMount() {

  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    const Layout = createRootNavigator();
    return <Layout />;
  }

  async _cacheResourcesAsync() {
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all([cacheImages, Font.loadAsync(fonts)])

  }
}
