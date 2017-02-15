import React, { Component } from 'react'
import {
	  Alert,
	  StyleSheet,
	  Text,
      Image,
	  View,
	} from 'react-native'

import { StackNavigator } from 'react-navigation';

import {styles} from './styles'

import CameraComponent from './camera-component';
import BuySellComponent from './buy-sell-component';
import BuyComponent from './buy-component';
import SellComponent from './sell-component';


const DidacticTelegram = StackNavigator({
  Camera: { screen: CameraComponent },
  BuySell: { screen: BuySellComponent},
  Buy: {screen: BuyComponent},
  Sell: {screen: SellComponent},
});

export {DidacticTelegram}
