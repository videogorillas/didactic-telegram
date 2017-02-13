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

import Spinner from 'react-native-loading-spinner-overlay'

export default class BuySellComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {spinner: true, products: false};
  }
  
  componentWillMount() {
    this.products().then(
      products => {
        this.setState((prevState, props) => ({
          spinner: false, products: products
      }));
    });
  }
  
  render() {
    console.log('BuySellComponent props: ' + JSON.stringify(this.props));
    let buttonsFlexDirection = 'row'; // << TODO
    let uri = this.props.photo;
//     uri = 'http://podol.videogorillas.com:4243/files/DVD_Blu_Rays_Portable_DVD_Player/27238.jpg';
//     let uri = 'file:///storage/emulated/0/DCIM/IMG_20170210_215538.jpg'; // << TODO
//     let uri = this.props.appState.photo;
    
    return (
      <View style={{backgroundColor: '#000000', flex: 1}}>
        <Image source={{uri: uri}} style={{flex: 1}}/>
        <View style={{justifyContent: 'space-around', flexDirection: buttonsFlexDirection}}>
           <TouchableHighlight onPress={this.sell.bind(this)}
               activeOpacity={1}
               underlayColor={'#d3d3d355'} 
               style={{borderRadius: 40, width: 80, height: 80, padding: 5, margin: 5}}>
             <View style={{flexDirection: 'column'}}>
               <Image source={require('./ic_remove_shopping_cart_white_24px.png')} style={{alignSelf: 'center'}} />
               <Text style={{color: 'white', textAlign: 'center'}}>Sell</Text>
             </View>
           </TouchableHighlight>
           <TouchableHighlight onPress={this.buy.bind(this)} 
               activeOpacity={1}
               underlayColor={'#d3d3d355'}
               style={{borderRadius: 40, width: 80, height: 80, padding: 5, margin: 5}}>
               <View style={{flexDirection: 'column'}}>
                 <Image source={require('./ic_add_shopping_cart_white_24dp.png')} style={{alignSelf: 'center'}} />
                 <Text style={{color: 'white', textAlign: 'center'}}>Buy</Text>
               </View>
           </TouchableHighlight>
        </View>
        <Spinner visible={this.state.spinner} />
      </View>
    )
  }
  
  setSpinner(spinner) {
      this.setState({spinner: spinner});
  }
  
  products() {
    const photo = this.props.photo;
    const url = 'http://podol.videogorillas.com:4243/upload';
    this.setSpinner(true);
    return this.uploadPicture(photo, url).then(result => {
            return result.json()
        }).then(json => {
            console.log('>> RESULT: ' + JSON.stringify(json));
            this.setSpinner(false);
            return (json);
        }).catch(err => {
          this.setSpinner(false);
          Alert.alert('Upload', '' + err + '(' + url + ')');
          console.log('>> setPhoto() error ' + err);
      });
  }
  
  buy() {
    Actions.buy({photo: this.props.photo, products: this.state.products}); 
  }
  
  sell() {
    Actions.sell({photo: this.props.photo, products: this.state.products}); 
  }
  
  uploadPicture(path, url) {
      var file = {
          uri: path,
          type: 'image/jpeg',
          name: 'file.jpg',
      };

      var body = new FormData();
      body.append('file', file);

      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: body
      });
  }
}



