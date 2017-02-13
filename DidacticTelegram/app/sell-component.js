import React, { Component } from 'react';
import { ScrollView, View, Text, ListView, Image, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SellComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {cats: []};
    }
  
  render() {
    let uri = this.props.photo;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let products = this.props.products;
    
    let dataSource = ds.cloneWithRows(products);
    
    return (
      <ScrollView style={{backgroundColor: '#000000', flex: 1}}>
        <Image source={{uri: uri}} style={{flex: 1}}/>
        <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)}/>
      </ScrollView>
    )
  }
  
  renderRow(row) {
      return (<View style={{backgroundColor: 'white', margin: 10, flexDirection: 'row'}}>
        <Switch style={{marginBottom: 10}} value={this.state.cats[row.cat]} onValueChange={(value) => this.checkCat(row.cat, value)}/>
        <Text style={{color: 'black', textAlign: 'left', alignSelf: 'center'}}>{row.cat}</Text>
      </View>)
   }
  
   checkCat(cat, checked) {
     console.log('>> ' + cat + ' ' + checked + ' cats: ' + this.state.cats);
     let c = this.state.cats;
     c[cat] = checked;
     this.setState({cats: c});
     ;
   }
}