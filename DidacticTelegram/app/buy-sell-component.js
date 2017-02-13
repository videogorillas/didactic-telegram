import React, { Component } from 'react';
import {
	  Alert,
	  Dimensions,
	  StyleSheet,
	  Text,
	  Image,
	  TouchableHighlight,
	  View,
      ListView,
	} from 'react-native'
import { Actions } from 'react-native-router-flux';
import {styles} from './styles'

export default class BuySellComponent extends Component {
  render() {
    console.log('BuySellComponent props: ' + JSON.stringify(this.props));
    let buttonsFlexDirection = 'row'; // << TODO
//     let uri = this.props.photo.path;
    let uri = 'file:///storage/emulated/0/DCIM/IMG_20170210_215538.jpg'; // << TODO
    return (
      <View style={{backgroundColor: '#000000', flex: 1}}>
        <Image source={{uri: uri}} style={{flex: 1}}/>
        <View style={{justifyContent: 'space-around', flexDirection: buttonsFlexDirection}}>
           <TouchableHighlight onPress={Actions.sell}
               activeOpacity={1}
               underlayColor={'#d3d3d355'} 
               style={{borderRadius: 40, width: 80, height: 80, padding: 5, margin: 5}}>
             <View style={{flexDirection: 'column'}}>
               <Image source={require('./ic_remove_shopping_cart_white_24px.png')} style={{alignSelf: 'center'}} />
               <Text style={{color: 'white', textAlign: 'center'}} onPress={Actions.sell}>Sell</Text>
             </View>
           </TouchableHighlight>
           <TouchableHighlight onPress={Actions.buy} 
               activeOpacity={1}
               underlayColor={'#d3d3d355'}
               style={{borderRadius: 40, width: 80, height: 80, padding: 5, margin: 5}}>
               <View style={{flexDirection: 'column'}}>
                 <Image source={require('./ic_add_shopping_cart_white_24dp.png')} style={{alignSelf: 'center'}} />
                 <Text style={{color: 'white', textAlign: 'center'}} onPress={Actions.buy}>Buy</Text>
               </View>
           </TouchableHighlight>
        </View>
      </View>
    )
  }
}
//