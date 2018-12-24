import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Constants } from 'expo';
import { MonoText } from '../components/StyledText';
import axios from 'axios'
import { Button } from 'react-native-elements'

export default class UserProfile extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
  title: "Profile",
  });

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
 }

 follow = () => {
   const url = 'https://api.github.com/user/following/' + this.props.navigation.state.params.username;
   fetch(url, {
     method: "PUT",
     headers: {
       'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'
     }
   })
   .then(res => {
       alert('You have followed ' + this.props.navigation.state.params.username)
   })
   .catch(error => {
   });
  }

  unfollow = () => {
    const url = 'https://api.github.com/user/following/' + this.props.navigation.state.params.username;
    fetch(url, {
      method: "DELETE",
      headers: {
        'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'
      }
    })
    .then(res => {
        alert('You have unfollowed ' + this.props.navigation.state.params.username)
    })
    .catch(error => {
    });
   }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>

        <Image
          style={styles.image}
          resizeMode={"cover"}
          source={{uri: this.props.navigation.state.params.profile_pic}}
        />

        <Text style={styles.nameTextField}>
          {this.props.navigation.state.params.full_name}{'\n'}
        </Text>

        <Text style={styles.usernameTextField}>
          @{this.props.navigation.state.params.username}
        </Text>

        <View style={styles.followButton}>
          <Button
            raised
            title='Follow'
            onPress={() => this.follow()}
            buttonStyle={{
              backgroundColor: "#2ecc71",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
          />
        </View>

        <View style={styles.unfollowButton}>
          <Button
            raised
            title='Unfollow'
            onPress={() => this.unfollow()}
            buttonStyle={{
              backgroundColor: "#e74c3c",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
          />
        </View>

        <View style={styles.numberWrapper}>

          <TouchableOpacity
          onPress={(event) => {
              this.props.navigation.push('UserRepos', {
              username_from_profile: this.props.navigation.state.params.username,
            });
          }}>
            <Text style={styles.reposText}>
              Repos: {this.props.navigation.state.params.repo_count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={(event) => {
              this.props.navigation.push('UserFollowers', {
              username_from_profile: this.props.navigation.state.params.username,
            });
          }}>
            <Text style={styles.reposText}>
              Followers: {this.props.navigation.state.params.follower_count}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={(event) => {
              this.props.navigation.push('UserFollowing', {
              username_from_profile: this.props.navigation.state.params.username,
            });
          }}>
            <Text style={styles.followingText}>
              Following: {this.props.navigation.state.params.following_count}
            </Text>
          </TouchableOpacity>

        </View>



        <Text style={styles.createdAtTextField}>
          {this.props.navigation.state.params.created_at}
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
   bottom: '10%'
 },
 numberWrapper: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'space-between',
   padding: '15%',
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
 followButton: {
   marginTop: '5%'
 },
 unfollowButton: {
   marginTop: '5%'
 },
});
