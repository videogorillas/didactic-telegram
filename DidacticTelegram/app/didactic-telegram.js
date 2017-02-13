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
  constructor(props) {
    super(props);
    this.state = {photo: undefined, photoW: 0, photoH: 0, frames: [], spinner: false, 
                  layout: {width: 0, height: 0, orientation: 'undefined', portrait: true, landscape: false},};
  }
  
  render() {
    return (
      <Router onLayout={this.onLayout.bind(this)}>
        <Scene key="root">
          <Scene key="camera" component={CameraComponent} title="Take a photo"  layout={this.state.layout}/>
          <Scene key="buySell" component={BuySellComponent} title="Choose an action" initial={true}/>
          <Scene key="buy" component={BuyComponent} title="Buy" />
          <Scene key="sell" component={SellComponent} title="Sell" />
        </Scene>
      </Router>
    )
  }
  
  onLayout(event) {
    let {width, height} = event.nativeEvent.layout;
    let orientation = width >= height ? 'landscape': 'portrait';
    let newLayout = {width: width, height: height, orientation: orientation, portrait: orientation=='portrait', landscape: orientation=='landscape'};
    if (!equal(this.state.layout, newLayout)) {
      this.setState((prevState, props) => ({
        layout: newLayout
      }));
      console.log(`>> onLayout new ${this.state.layout.width}x${this.state.layout.height} ${this.state.layout.orientation}`);
    }
  }
}

export {DidacticTelegram}
