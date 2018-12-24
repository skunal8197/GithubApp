import React from 'react';
import { View, StyleSheet, FlatList, Linking, Button } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';

export default class UserFollowing extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
  title: "Following",
  });

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
     profile_pic: [],
     full_name: [],
     username: [],
     repo_count: [],
     follower_count: [],
     following_count: [],
     created_at: [],
   }
 }

 /*
 Gets user following information from the GitHub API
 */
 getUserFollowing = (username) => {
    const url = 'https://api.github.com/users/' + username + '/following';
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
      .then(res => {
        this.getAllUsernames()
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  async getAllUsernames() {
    profile_pic_i = []
    full_name_i = []
    username_i = []
    repo_count_i = []
    follower_count_i = []
    following_count_i = []
    created_at_i = []

    for(var i = 0; i < this.state.data.length; i++){
      let url = 'https://api.github.com/users/' + this.state.data[i]["login"]
      let headers = {'headers' : {'Authorization': 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'}}
      await axios.get(url, headers)
      .then((response) => {
        profile_pic_i.push(response.data["avatar_url"])
        full_name_i.push(response.data["name"])
        username_i.push(response.data["login"])
        repo_count_i.push(response.data["public_repos"])
        follower_count_i.push(response.data["followers"])
        following_count_i.push(response.data["following"])
        created_at_i.push(response.data["created_at"])

        if(this.mounted){
          this.setState({profile_pic: profile_pic_i})
          this.setState({full_name: full_name_i})
          this.setState({username: username_i})
          this.setState({repo_count: repo_count_i})
          this.setState({follower_count: follower_count_i})
          this.setState({following_count: following_count_i})
          this.setState({created_at: created_at_i})
        }
      })
      .catch(error => {
          console.log(error);
      })
    }
  }

  componentDidMount() {
    this.mounted = true
    this.getUserFollowing(this.props.navigation.state.params.username_from_profile);
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  renderSearchbar = () => {
    return (
      <SearchBar
        placeholder="Search for Users..."
        lightTheme
        round
        onChangeText={text => this.searchBarLogic(text)}
        autoCorrect={false}
      />
    );
  };

  searchBarLogic = text => {
    const newData = this.holdAPIResult.filter(item => {
    const itemData = `${item.login.toUpperCase()}`
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
          renderItem={({ item, index }) => (
            <ListItem
              button onPress={(event) => {
                  const { navigate } = this.props.navigation;
                  navigate('UserProfile', {
                  profile_pic: this.state.profile_pic[index],
                  full_name:  this.state.full_name[index],
                  username: this.state.username[index],
                  repo_count: this.state.repo_count[index],
                  follower_count: this.state.follower_count[index],
                  following_count: this.state.following_count[index],
                  created_at: this.state.created_at[index],
                });
              }}
              roundAvatar
              title={`${item.login}`}
              avatar={{ uri: item.avatar_url }}
            />
          )}
          keyExtractor={item => item.node_id}
          ListHeaderComponent={this.renderSearchbar}
        />
    </List>
    );
  }
}
