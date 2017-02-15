import React, { Component } from 'react';
import {
	  Alert,
	  Text,
	  Image,
	  TouchableHighlight,
	  View,
      Dimensions,
	} from 'react-native'

// import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera'
import {styles} from './styles'

var equal = require('deep-equal');

export default class CameraComponent extends Component {
    static navigationOptions = {
      title: 'Take a photo',
    };
  
    constructor(props) {
      super(props);
      this.state = {layout: {width: 0, height: 0, orientation: 'undefined', portrait: true, landscape: false},
                   spinner: false};
    }
  
    render() {
        let layout = this.state.layout;
        return (
            <View style={{flex: 1, backgroundColor: '#000000', justifyContent:'flex-end', 
                            flexDirection: layout.portrait ? 'column' : 'row',}}
                  onLayout={this.onLayout.bind(this)}>
              <Camera
                ref={(cam) => {
                  this.camera = cam;
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: layout.height,
                  width: layout.width
                }}
                aspect={Camera.constants.Aspect.fit}
                captureQuality={"high"}
                playSoundOnCapture={false}
                orientation={"auto"}/>

              <View style={{justifyContent: 'space-around', flexDirection: layout.portrait ? 'row' : 'column'}}>
                <TouchableHighlight onPress={this.takePicture.bind(this)} activeOpacity={1} underlayColor={'#d3d3d355'} style={{borderRadius: 48}}>
                  <Image source={require('./ic_photo_camera_white_24dp.png')} style={styles.ibutton} />
                </TouchableHighlight>
              </View>
              
            </View>
        )
    }
  
    takePicture() {
        console.log('>> takePicture()');
        this.camera.capture()
          .then(data => {
              console.log('>> picture taken. data: ' + JSON.stringify(data));
//               Actions.buySell({photo: data.path});
              this.props.navigation.navigate('BuySell', {photo: data.path});
          }).catch(err => {
            console.error(err);
            Alert.alert('Capturing ', '' + err);
        });
    }
  
    onLayout(event) {
      console.log('>> CameraComponent.onLayout()');
      let {width, height} = event.nativeEvent.layout;
      let orientation = width >= height ? 'landscape': 'portrait';
      let newLayout = {width: width, height: height, orientation: orientation, portrait: orientation=='portrait', landscape: orientation=='landscape'};
      if (!equal(this.state.layout, newLayout)) {
        this.setState((prevState, props) => ({
          layout: newLayout
        }));
        console.log(`>> CameraComponent onLayout new ${this.state.layout.width}x${this.state.layout.height} ${this.state.layout.orientation}`);
      }
    }
}
