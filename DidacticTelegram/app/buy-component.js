import React, { Component } from 'react';
import { ScrollView, View, Text, ListView, Image } from 'react-native';
// import { Actions } from 'react-native-router-flux';

export default class BuyComponent extends Component {
  static navigationOptions = {
    title: 'Buy',
  };
  
  render() {
//     let uri = this.props.photo;
//     let products = this.props.products;
    let uri = this.props.navigation.state.params.photo;
    let products = this.props.navigation.state.params.products;
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    products.forEach((item, i, arr) => { item.id = i });
    let dataSource = ds.cloneWithRows(products);
    
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{height: 250}}>
            <Image source={{uri: uri}} resizeMode='cover' style={{flex: 1}}/>
          </View>
          <Text style={{color: 'black', textAlign: 'left', padding: 5, fontSize: 20}}>Similar products:</Text>
          <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)}/>
        </ScrollView>
      </View>
    )
  }

  renderRow(cat) {
    let uri = 'http://podol.videogorillas.com:4243/' + cat.url;
      return (
      <View key={cat.id} style={{backgroundColor: 'white', marginTop: 20, flexDirection: 'column'}}>
        <View style={{height: 250}}>
          <Image source={{uri: uri}} resizeMode='contain' style={{flex: 1, backgroundColor: 'gray'}}/>
        </View>
        <Text style={{color: 'black', textAlign: 'center', padding: 5}}>{cat.cat.split('_').join(' ')}</Text>
      </View>)
   }
}