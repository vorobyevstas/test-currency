import React from 'react';
import { observable, computed } from "mobx";
import * as mobx from 'mobx';
import { observer } from "mobx-react";
import { ListView, AsyncStorage, Platform } from 'react-native';
import Frisbee from 'frisbee';
import Config from './../constants/Config';
// import PouchDB from 'pouchdb-react-native';

class Network extends React.Component {

  @observable stockList = [];
  @observable isLoading = false;

  constructor(props) {
    super(props);
    mobx.autorun(() => {
      setInterval(() => {
        console.log('load on timeout');
        if(!this.isLoading) {
          this.isLoading = true;
          getStocks()
          .then(() => {
            
          })
          .catch((err) => {
            console.log('error: '+err);
          });
        }
      }, 15000);
    });
  }

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
}

const network = new Network();
export default network;

const api = new Frisbee({
  baseURI: Config.apiDomain,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export function getStocks() {
  return new Promise(function(resolve, reject) {
    api.get('/stocks.json', {
      body: {
      }
    })
    .then((response) => {
      network.isLoading = false;
      network.stockList = response.body.stock;
      resolve(response.body.stock);
    }).catch((error) => {
      console.log('err='+error);
      network.isLoading = false;
      reject('Неизвестная ошибка. Повторите снова.');
    });
  });
}
