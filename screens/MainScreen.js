import React from 'react';
import { Platform, Text, Image, View, Dimensions, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Colors from './../constants/Colors';
import Config from './../constants/Config'
import { LinearGradient } from 'expo';
import { observer } from 'mobx-react/native';
import Network, { getStocks } from './../Utilites/Network'

@observer
export default class MainScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={{
        color: 'black',
        fontFamily: 'sfUiDisplayMedium',
        textAlign: 'center',
        fontSize: Dimensions.get('window').width*24/375,
      }}>
        Курсы
      </Text>
    )
  });

  state = {

  };

  componentWillMount() {
    this._onRefresh();
  }

  constructor(props) {
    super(props);
  }

  _onRefresh = () => {
    if(!Network.isLoading) {
      Network.isLoading = true;
      getStocks()
      .then(() => {

      })
      .catch((err) => {

      });
    }
  }

  _renderItem = ({item}) => {

    return (
    <View style={{
      width: Dimensions.get('window').width,
      height: 50,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    key={item.name}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: 49,
      }}>
        <Text style={{
          fontFamily: 'sfUiDisplayRegular',
          textAlign: 'left',
          fontSize: Dimensions.get('window').width*16/375,
          color: 'black',
          marginLeft: Dimensions.get('window').width*10/375,
        }}>
          {item.name}
        </Text>
        <Text style={{
          fontFamily: 'sfUiDisplayRegular',
          textAlign: 'center',
          fontSize: Dimensions.get('window').width*14/375,
          color: 'black',
        }}>
          {item.volume}
        </Text>
        <Text style={{
          fontFamily: 'sfUiDisplayRegular',
          textAlign: 'right',
          fontSize: Dimensions.get('window').width*14/375,
          color: 'black',
          marginRight: Dimensions.get('window').width*10/375,
        }}>
          {parseFloat(item.price.amount).toFixed(2)}
        </Text>
      </View>
      <View style={{
        backgroundColor: 'gray',
        width: Dimensions.get('window').width,
        height: 1,
      }}>
      </View>
    </View>);
  }

  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.mainBackgroundColor,
      }}>
        <FlatList
          style={{
            width: Dimensions.get('window').width,
            flex: 1,
          }}
          data={Network.stockList.slice()}
          numColumns={1}
          keyExtractor={(item, index) => item.name}
          renderItem={this._renderItem}
          onEndReachedThreshold={1200}
          disableVirtualization={false}
          refreshControl={
            <RefreshControl
              refreshing={Network.isLoading}
              onRefresh={() => this._onRefresh()}
          />}
        />
      </View>
    );
  }
}
