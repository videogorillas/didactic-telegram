import React, { Component } from 'react'
import {
	  Alert,
	  StyleSheet,
	  Text,
      Image,
	  View,
	} from 'react-native'

import { Router, Scene } from 'react-native-router-flux';

import {styles} from './styles'

import CameraComponent from './camera-component';
import BuySellComponent from './buy-sell-component';
import BuyComponent from './buy-component';
import SellComponent from './sell-component';

class DidacticTelegram extends Component {

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="camera" component={CameraComponent} title="Take a photo" initial={true} />
          <Scene key="buySell" component={BuySellComponent} title="Choose an action" />
          <Scene key="buy" component={BuyComponent} title="Buy" />
          <Scene key="sell" component={SellComponent} title="Sell" />
        </Scene>
      </Router>
    )
  }
}

export {DidacticTelegram}