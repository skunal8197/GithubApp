import React from 'react';
import { View, StyleSheet, FlatList, Linking } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { List, ListItem, SearchBar } from "react-native-elements";

export default class UserRepos extends React.Component {
  static navigationOptions = {
    title: 'Repositories',
  };

  /*
  Constructor for initializing state
  */
  constructor(props){
   super(props);
   this.holdAPIResult = []
   this.state = {
     data: [],
     refreshing: false,
     loading: false,
     page: 1,
     starred: []
   }
 }

 /*
 Gets user repo information from the GitHub API
 - The user is this case is skunal8197
 */
 getUserRepos = (username) => {
    const url = 'https://api.github.com/users/' + username + '/repos';
    this.setState({ loading: true });
    fetch(url, {
      headers: {
        'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'
      }
    })
      .then(res => res.json())
      .then(res => {
        if(this.mounted){
          this.setState({
            data: this.state.page === 1 ? res : [...this.state.data, ...res],
            loading: false,
            refreshing: false
          });
          this.holdAPIResult = res
        }
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  componentDidMount() {
    this.mounted = true
    this.getUserRepos(this.props.navigation.state.params.username_from_profile);
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  star = (name) => {
    const url = 'https://api.github.com/user/starred/' +
     this.props.navigation.state.params.username_from_profile + '/'+ name;
    fetch(url, {
      method: "PUT",
      headers: {
        'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'
      }
    })
    .then(res => {
        alert('You have starred ' + name)

        const items = this.state.starred
        items[name] = true
        this.setState({starred})
    })
    .catch(error => {
    });
  }

  unstar = (name) => {
    const url = 'https://api.github.com/user/starred/' +
     this.props.navigation.state.params.username_from_profile + '/'+ name;
    fetch(url, {
      method: "DELETE",
      headers: {
        'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'
      }
    })
    .then(res => {
        alert('You have unstarred ' + name)
        const items = this.state.starred;
        items[name] = false
        this.setState({starred})

    })
    .catch(error => {
    });
  }

  handleStarring = (name) => {
    if(this.state.starred[name]){
      this.unstar(name)
    }
    if(!this.state.starred[name]){
      this.star(name)
    }
  }

  renderSearchbar = () => {
    return (
      <SearchBar
        placeholder="Search for Repos..."
        lightTheme
        round
        onChangeText={text => this.searchBarLogic(text)}
        autoCorrect={false}
      />
    );
  };

  searchBarLogic = text => {
    const newData = this.holdAPIResult.filter(item => {
    const itemData = `${item.name.toUpperCase()}`
    const textData = text.toUpperCase()

    return itemData.indexOf(textData) > -1
    });
    this.setState({ data: newData });
  };

  render() {
    return (
      <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name}`}
              subtitle={item.created_at}
              avatar={{ uri: item.owner.avatar_url }}
              onPress={() => this.handleStarring(item.name)}
            />
          )}
          keyExtractor={item => item.node_id}
          ListHeaderComponent={this.renderSearchbar}
        />
    </List>
    );
  }
}
