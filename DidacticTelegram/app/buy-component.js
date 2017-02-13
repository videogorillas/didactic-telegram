import React, { Component } from 'react';
import { ScrollView, View, Text, ListView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class BuyComponent extends Component {
  render() {
    let uri = this.props.photo;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let products = this.props.products;
    products.forEach((item, i, arr) => { item.id = i });
    let dataSource = ds.cloneWithRows(this.props.products);
    
    return (
      <View style={{backgroundColor: '#000000', flex: 1}}>
        <Image source={{uri: uri}} style={{flex: 1}}/>
        <ListView dataSource={dataSource} renderRow={this.renderRow}/>
      </View>
    )
  }
//   {this.props.products.map(this.renderRow)}
// <ListView dataSource={dataSource} renderRow={this.renderRow}/>
  renderRow(row) {
      let url = 'http://podol.videogorillas.com:4243/' + row.url;
      console.log('>> url: ' + url);
        return (<View key={row.id} style={{backgroundColor: 'white', margin: 10, flexDirection: 'column'}}>
          <Image source={{uri: url}} style={{flex: 1}}/>
          <Text style={{color: 'black', textAlign: 'left', padding: 10}}>{row.cat}</Text>
        </View>)
     }
}