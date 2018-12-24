import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import { WebBrowser, Constants } from 'expo';
import { MonoText } from '../components/StyledText';
import axios from 'axios'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  /*
  Constructor for initializing state
  */
  constructor(props){
   super(props);
   this.state = {
     profile_pic: 'null',
     full_name: 'null',
     username: 'null',
     repo_count: 'null',
     follower_count: 'null',
     following_count: 'null',
     created_at: 'null',
   }
   this.getUserProfileInfo = this.getUserProfileInfo.bind(this);
 }

   /*
   Gets user profile information from the GitHub API
   - The user is this case is skunal8197
   */
  getUserProfileInfo(){
    let url = 'https://api.github.com/users/skunal8197'
    let headers = {'headers' : {'Authorization': 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'}}
    axios.get(url, headers)
    .then((response) => {
      if(this.mounted){
        this.setState({profile_pic: response.data["avatar_url"]})
        this.setState({full_name: response.data["name"]})
        this.setState({username: response.data["login"]})
        this.setState({repo_count: response.data["public_repos"]})
        this.setState({follower_count: response.data["followers"]})
        this.setState({following_count: response.data["following"]})
        this.setState({created_at: response.data["created_at"]})
      }
    })
    .then((response) => {
      this.storeData('full_name', this.state.full_name)
      this.storeData('username', this.state.username)
      this.storeData('repo_count', this.state.repo_count.toString())
      this.storeData('follower_count', this.state.follower_count.toString())
      this.storeData('following_count', this.state.following_count.toString())
      this.storeData('created_at', this.state.created_at)
    })
    .then((response) =>  {
      console.log("Hello from AsyncStorage!")
      this.retrieveData('full_name')
      this.retrieveData('username')
      this.retrieveData('repo_count')
      this.retrieveData('follower_count')
      this.retrieveData('following_count')
      this.retrieveData('created_at')
    })
    .catch(error => {
      console.log(error)
    })
  }

  /*
  Storing data in AsyncStorage
  */
  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error)
    }
  }

  retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(key + ":", value);
    }
   } catch (error) {
     console.log(error)
   }
 }

  /*
  Make API request on mount of the component
  */
  componentDidMount(){
    this.mounted = true
    this.getUserProfileInfo()
  }

  /*
  Cancel Promise for API request to avoid memory leaks
  */
  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <View style={styles.container}>

        <Image
          style={styles.image}
          resizeMode={"cover"}
          source={{uri: this.state.profile_pic}}
        />

        <Text style={styles.nameTextField}>
          {this.state.full_name}{'\n'}
        </Text>

        <Text style={styles.usernameTextField}>
          @{this.state.username}
        </Text>

        <View style={styles.numberWrapper}>

          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Repositories')}>
            <Text style={styles.reposText}>
              Repos: {this.state.repo_count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Followers')}>
            <Text style={styles.reposText}>
              Followers: {this.state.follower_count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Following')}>
            <Text style={styles.followingText}>
              Following: {this.state.following_count}
            </Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.createdAtTextField}>
          {this.state.created_at}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'flex-start',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
 },
 image: {
   height: 80,
   width: 80,
   borderRadius: 40,
 },
 nameTextField: {
   fontSize: 25,
   fontWeight: 'bold',
   marginTop: '5%',
 },
 usernameTextField: {
   marginTop: '-7.5%',
   fontWeight: '300',
 },
 createdAtTextField: {
   position: 'absolute',
   bottom: '15%'
 },
 numberWrapper: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'space-between',
   padding: '25%',
   alignItems: 'center',
 },
 reposText: {
   fontSize: 20,
   fontWeight: '500',
 },
 followersText: {
   fontSize: 20,
   fontWeight: '500',
 },
 followingText: {
   fontSize: 20,
   fontWeight: '500',
 },
});
