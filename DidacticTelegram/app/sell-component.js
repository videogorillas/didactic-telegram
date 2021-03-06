import React, { Component } from 'react';
import { ScrollView, View, Text, ListView, Image, Switch, TouchableHighlight } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { getCategories } from './product-utils'
import {styles} from './styles'

export default class SellComponent extends Component {
  static navigationOptions = {
    title: 'Sell your product',
  };
  
  constructor(props) {
      super(props);
      this.state = {cats: []};
  }
  
  componentWillMount() {
//     let products = this.props.products;
    let products = this.props.navigation.state.params.products;
    let cats = getCategories(products);
    this.setState(prevState => ({
      cats: cats
    }));
  }

  render() {
//     let uri = this.props.photo;
    let uri = this.props.navigation.state.params.photo;    

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});  
    let dataSource = ds.cloneWithRows(this.state.cats);
    
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{height: 200}}>
            <Image source={{uri: uri}} resizeMode='cover' style={{flex: 1}}/>
          </View>
          <Text style={{padding: 10}}>
            Select categories that apply to your product best:
          </Text>
          <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)}/>
        </ScrollView>
      </View>
    )
  }
//   <View style={{justifyContent: 'space-around', flexDirection: 'row', backgroundColor: 'black'}}>
//             <TouchableHighlight onPress={this.done.bind(this)} activeOpacity={1} underlayColor={'#d3d3d355'} style={{borderRadius: 48}}>
//               <Image source={require('./ic_forward_white_24dp.png')} style={styles.ibutton} />
//             </TouchableHighlight>
//           </View>
  
// <ActionButton icon="done" onPress={this.done.bind(this)}/>
  done() {
     console.log('>> cats selected: ' + JSON.stringify(this.state.cats));
  }
  
  renderRow(cat, sectionID, rowID) {
      return (
      <View key={cat.id} style={{margin: 10, flexDirection: 'row'}}>
        <Switch value={this.selected(cat)} onValueChange={(value) => this.checkCat.call(this, cat, value)}/>
        <Text style={{textAlign: 'left'}}>{cat.cat.split('_').join(' ')}</Text>
      </View>)
  }
  
  selected(cat) {
    return this.state.cats.find(c => c.cat == cat.cat).selected;
  }
 
   checkCat(cat, checked) {
     let cats = Array.from(this.state.cats);
     cats.find(c => c.cat == cat.cat).selected = checked;
     this.setState(prevState => ({
       cats: cats
     }));
   }
}