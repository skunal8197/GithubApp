import React from 'react';
import { View, StyleSheet, FlatList, Linking, Text, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { List, ListItem, SearchBar } from "react-native-elements";
import TimerMixin from 'react-timer-mixin';
import axios from 'axios'

mixins: [TimerMixin];

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  /*
  Constructor for initializing state
  */
  constructor(props){
   super(props);
   this.state = {
     data: [],
     timer: null,
   }
 }

 /*
 Gets notifications from the GitHub API
 */
 makeRequestForNotifications = () => {
    const url = `https://api.github.com/notifications`;
    axios.get(url, {
      headers: {
        'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27',
        'Cache-Control': 'no-cache'
      }
    })
    .then((response) => {
      console.log(response.data)
        this.setState({
          data: response.data
        });
    })
    .catch(error => {
        console.log(error)
    });
  };

  componentDidMount() {
    this.makeRequestForNotifications()
  }

 render() {
   return (
     <List>
       <FlatList
         data={this.state.data}
         renderItem={({ item, index }) => (
           <ListItem
             roundAvatar
             title={`${item.subject.title}`}
             subtitle={item.repository.name}
             avatar={{ uri: item.repository.owner.avatar_url }}
           />
         )}
         keyExtractor={item => Math.random().toString()}
       />
   </List>
   )
 }

}
