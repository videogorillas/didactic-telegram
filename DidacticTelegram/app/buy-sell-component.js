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
// import { Actions } from 'react-native-router-flux';
import {styles} from './styles'

import Spinner from 'react-native-loading-spinner-overlay'

export default class BuySellComponent extends Component {
  static navigationOptions = {
    title: 'Sell or buy?',
  };
  
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
//     this.setState((prevState, props) => ({
//       spinner: false, 
//       products: [
//         {"url":"files/Gaming_consoles_Xbox_360__Xbox/17421.jpg","dist":0,"cat":"Gaming_consoles_Xbox_360__Xbox"},
//         {"url":"files/Headphones_Ear-Hook/s-l400.jpg.300","dist":0,"cat":"Headphones_Ear-Hook"},
//         {"url":"files/Televisions_VCRs/11965.jpg","dist":0,"cat":"Televisions_VCRs"},
//         {"url":"files/Audiotehnika_MiniDisc_Decks/8501.jpg","dist":0,"cat":"Audiotehnika_MiniDisc_Decks"},
//         {"url":"files/Audiotehnika_Radio_Tuners/32034.jpg","dist":0,"cat":"Audiotehnika_Radio_Tuners"},
//         {"url":"files/glasses_case/397468924_5ebae5f656.jpg","dist":0,"cat":"glasses_case"},
//         {"url":"files/sport_rest_Heart_Rate_Monitors/279375.jpg","dist":0,"cat":"sport_rest_Heart_Rate_Monitors"},
//         {"url":"files/Gaming_consoles_Xbox_One/1446.jpg","dist":0,"cat":"Gaming_consoles_Xbox_One"},
//         {"url":"files/TV_Video__Audio_Accessories_Antennas__Dishes/21878.jpg","dist":0,"cat":"TV_Video__Audio_Accessories_Antennas__Dishes"},
//         {"url":"files/Gaming_consoles_Xbox_360__Xbox/18093.jpg","dist":0,"cat":"Gaming_consoles_Xbox_360__Xbox"}]
//     }));
  }
  
  render() {
    console.log('BuySellComponent props: ' + JSON.stringify(this.props));
    let buttonsFlexDirection = 'row'; // << TODO

    let uri = this.props.navigation.state.params.photo;
//     let uri = this.props.photo;
    
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
        <Spinner visible={this.state.spinner}/>
      </View>
    )
  }
  
//   textContent={"Processing..."} textStyle={{color: '#FFFFFF', fontSize: 15}}
  
  setSpinner(spinner) {
      this.setState({spinner: spinner});
  }
  
  products() {
//     const photo = this.props.photo;
    const photo = this.props.navigation.state.params.photo;
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
    this.props.navigation.navigate('Buy', {photo: this.props.navigation.state.params.photo, products: this.state.products});
//     Actions.buy({photo: this.props.photo, products: this.state.products}); 
  }
  
  sell() {
    this.props.navigation.navigate('Sell', {photo: this.props.navigation.state.params.photo, products: this.state.products});
//     Actions.sell({photo: this.props.photo, products: this.state.products}); 
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



