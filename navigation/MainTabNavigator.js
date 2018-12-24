import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
import RepositoriesScreen from '../screens/RepositoriesScreen';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import UserProfileScreen from '../screens/UserProfile';
import UserFollowersScreen from '../screens/UserFollowers';
import UserFollowingScreen from '../screens/UserFollowing';
import UserReposScreen from '../screens/UserRepos';
import VisualizeScreen from '../screens/Visualize';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/Search';

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person${focused ? '' : '-outline'}`
          : 'md-person'
      }
    />
  ),
};

const RepositoriesStack = createStackNavigator({
  Repositories: RepositoriesScreen,
});

RepositoriesStack.navigationOptions = {
  tabBarLabel: 'Repositories',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-folder-open${focused ? '' : '-outline'}` : 'md-folder-open'}
    />
  ),
};

const FollowersStack = createStackNavigator({
  Followers: FollowersScreen,
  UserProfile: UserProfileScreen,
  UserFollowers: UserFollowersScreen,
  UserFollowing: UserFollowingScreen,
  UserRepos: UserReposScreen,
});

FollowersStack.navigationOptions = {
  tabBarLabel: 'Followers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-people${focused ? '' : '-outline'}` : 'md-people'}
    />
  ),
};

const FollowingStack = createStackNavigator({
  Following: FollowingScreen,
  UserProfile: UserProfileScreen,
  UserFollowers: UserFollowersScreen,
  UserFollowing: UserFollowingScreen,
  UserRepos: UserReposScreen,
});

FollowingStack.navigationOptions = {
  tabBarLabel: 'Following',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-add-circle${focused ? '' : '-outline'}` : 'md-add-circle'}
    />
  ),
};

const UserProfileStack = createStackNavigator({
  UserProfile: UserProfileScreen,
});

UserProfileStack.navigationOptions = {
  tabBarVisible: false,
  header: null
};

const VisualizeStack = createStackNavigator({
  Visualize: VisualizeScreen,
});

VisualizeStack.navigationOptions = {
  tabBarLabel: 'Visualize',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-analytics${focused ? '' : '-outline'}` : 'md-fanalytics'}
    />
  ),
  header: null
};

const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen,
});

NotificationsStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-notifications${focused ? '' : '-outline'}` : 'md-notifications'}
    />
  ),
  header: null
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search'}
    />
  ),
  header: null
};


export default createBottomTabNavigator({
  ProfileStack,
  RepositoriesStack,
  FollowersStack,
  FollowingStack,
  NotificationsStack,
  VisualizeStack,
  SearchStack,
});
