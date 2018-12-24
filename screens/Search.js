import React from 'react';
import { View, StyleSheet, TextInput, Button, Text, FlatList } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios'

export default class Search extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  /*
  Constructor for initializing state
  */
  constructor(props){
   super(props);
   this.state = {
     repos: [],
     users: [],
     data: [],
     data2: [],
     reposFiltered: [],
     usersFiltered:[],
     searchTerm: '',
     isListVisible: false,
   }
  }

  getRepoSearchResult = (q) => {
    var q2 = q.split(' ').join('+')
    const url = 'https://api.github.com/search/repositories?q=' + q2
    axios.get(url,
    {headers: {"Authorization" : "Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27"}})
    .then(response => {
      this.setState({repos: response.data.items})
    })
    .then(response => {
      arr = this.parseRepos(this.state.repos)
      this.setState({data: arr})
    })
    .catch(e => {
      console.log(e)
    })
  }

  getUserSearchResult = (q) => {
    var q2 = q.split(' ').join('+')
    const url = 'https://api.github.com/search/users?q=' + q2
    axios.get(url,
    {headers: {"Authorization" : "Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27"}})
    .then(response => {
      this.setState({users: response.data.items})
    })
    .then(response => {
      arr = this.parseUsers(this.state.users)
      this.setState({data2: arr})
    })
    .catch(e => {
      console.log(e)
    })
  }

  getRepoSearchResultWithFilter = (q) => {
    var q2 = q.split(' ').join('+')
    const url = 'https://api.github.com/search/repositories?q=' + q2 + "&sort=stars&order=asc"
    axios.get(url,
    {headers: {"Authorization" : "Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27"}})
    .then(response => {
      this.setState({reposFiltered: response.data.items})
    })
    .catch(e => {
      console.log(e)
    })
  }

  getUserSearchResultWithFilter = (q) => {
    var q2 = q.split(' ').join('+')
    const url = 'https://api.github.com/search/users?q=' + q2 + "&sort=followers&order=asc"
    axios.get(url,
    {headers: {"Authorization" : "Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27"}})
    .then(response => {
      this.setState({usersFiltered: response.data.items})
    })
    .catch(e => {
      console.log(e)
    })
  }

  parseRepos = (repos) => {
    arr = []
    for(var i = 0; i < repos.length; i++){
      arr.push({
		    name: repos[i].name,
		    avatar_url: repos[i].owner.avatar_url,
        node_id: i.toString()
		   });
    }
    return arr
  }

  parseUsers = (users) => {
    arr = []
    for(var i = 0; i < users.length; i++){
      arr.push({
		    name: users[i].login,
		    avatar_url: users[i].avatar_url,
        node_id: (i + 100).toString()
		   });
    }
    return arr
  }

  getBothSearchResults = (q) => {
    this.getRepoSearchResult(q)
    this.getUserSearchResult(q)
  }

  showList = (q) => {
    this.getBothSearchResults(q)
    this.setState({isListVisible: true})
  }

  showReposFiltered = (q) => {
    this.getRepoSearchResultWithFilter(q)
    this.setState({isRepoFilterList: true})
  }

  showUsersFiltered = (q) => {
    this.getUserSearchResultWithFilter(q)
    this.setState({isUserFilterList: true})
  }

  render(){
    const data = this.state.data.concat(this.state.data2).sort()
    const list =
    <List>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <ListItem
            roundAvatar
            title={item.name}
            avatar={{ uri: item.avatar_url }}
          />
        )}
        keyExtractor={item => item.node_id}
      />
  </List>

  const data2 = this.state.reposFiltered
  const filterList =
  <List>
    <FlatList
      data={data2}
      renderItem={({ item, index }) => (
        <ListItem
          roundAvatar
          title={item.name}
          avatar={{ uri: item.owner.avatar_url }}
        />
      )}
      keyExtractor={item => item.owner.node_id}
    />
  </List>

  const data3 = this.state.usersFiltered
  const filterList2 =
  <List>
    <FlatList
      data={data3}
      renderItem={({ item, index }) => (
        <ListItem
          roundAvatar
          title={item.login}
          avatar={{ uri: item.avatar_url }}
        />
      )}
      keyExtractor={item => item.node_id}
    />
  </List>

    return (
      <View style={styles.container}>
      <TextInput
          style={styles.input}
          value={this.state.searchTerm}
          onChangeText={searchTerm => this.setState({searchTerm})}
          placeholder="Search for any user or repo..."
          autoFocus={true}
        />

        <Button
          onPress={() => this.showList(this.state.searchTerm)}
          title="Search"
          color="#841584"
        />

        <Button
          onPress={() => this.showReposFiltered(this.state.searchTerm)}
          title="Search Repos by Star Count"
          color="#841584"
        />

        <Button
          onPress={() => this.showUsersFiltered(this.state.searchTerm)}
          title="Search Users by Follower Count"
          color="#841584"
        />

      {this.state.isListVisible ? list : null}
      {this.state.isRepoFilterList ? filterList: null}
      {this.state.isUserFilterList ? filterList2: null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});
