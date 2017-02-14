import React, { Component } from 'react';
import { ScrollView, View, Text, ListView, Image, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getCategories } from './product-utils'

export default class SellComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {cats: []};
  }

  render() {
    let uri = this.props.photo;
    let categories = getCategories(this.props.products);
        
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});  
    let dataSource = ds.cloneWithRows(categories);
    
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{height: 250}}>
            <Image source={{uri: uri}} resizeMode='cover' style={{flex: 1}}/>
          </View>
          <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)}/>
        </ScrollView>
      </View>
    )
  }
  
  renderRow(row) {
      return (<View key={row.id} style={{backgroundColor: 'white', margin: 10, flexDirection: 'row'}}>
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