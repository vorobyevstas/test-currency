
import React from "react";
import { Platform, StatusBar, Image, Dimensions } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";

import Colors from './constants/Colors';
import Config from './constants/Config'

import MainScreen from './screens/MainScreen'
import RefreshButton from './components/RefreshButton'

export const MainScreens = {
  Main: {
    screen: MainScreen,
    navigationOptions: ({navigation}) => {
      return {
        gesturesEnabled: false,
        headerRight: <RefreshButton navigation={navigation} />,
        headerStyle: {
            backgroundColor: Colors.navBarColor,
            // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        headerTintColor: {
            color: 'black'
        },
      }
    }
  },
};

export const SignedIn = StackNavigator(MainScreens);

export const createRootNavigator = () => {

  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: ({navigation}) => {
          return {
            gesturesEnabled: false,
          }
        }
      },
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: "SignedIn"
    }
  );
};
