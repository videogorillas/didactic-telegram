import React, { Component } from 'react';
import { ScrollView, View, Text, ListView, Image } from 'react-native';
// import { Actions } from 'react-native-router-flux';

export default class BuyComponent extends Component {
  static navigationOptions = {
    title: 'Buy similar products',
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
          <View style={{height: 200}}>
            <Image source={{uri: uri}} resizeMode='cover' style={{flex: 1}}/>
          </View>
          <Text style={{padding: 10}}>
            Check out these products that our customers sell:
          </Text>
          <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)}/>
        </ScrollView>
      </View>
    )
  }

  renderRow(cat) {
    let uri = 'http://podol.videogorillas.com:4243/' + cat.url;
      return (
      <View key={cat.id} style={{marginBottom: 20, flexDirection: 'column'}}>
        <View style={{height: 250}}>
          <Image source={{uri: uri}} resizeMode='cover' style={{flex: 1, backgroundColor: 'gray'}}/>
        </View>
        <Text style={{textAlign: 'left', padding: 10}}>{cat.cat.split('_').join(' ')}</Text>
      </View>)
   }
}