import React from "react";
import { View, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import Network, { getStocks } from './../Utilites/Network'

export default class RefreshButton extends React.Component {
    goToSettings = () => {
      if(!Network.isLoading) {
        Network.isLoading = true;
        getStocks()
        .then(() => {

        })
        .catch((err) => {
          console.log('stock error: '+err);
        });
      }
    };

    render() {
        return (
            <View style={{
              backgroundColor: 'transparent',
              flex: 0,
            }}>
                <TouchableWithoutFeedback onPress={this.goToSettings}>
                  <View style={{
                    width: Dimensions.get('window').width*45/375,
                    height: Dimensions.get('window').width*45/375,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Image source={require('./../assets/refresh.png')} style={{
                      resizeMode: 'contain',
                      width: Dimensions.get('window').width*25/375,
                      height: Dimensions.get('window').width*25/375,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }} />
                </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
