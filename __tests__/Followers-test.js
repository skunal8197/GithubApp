import 'react-native';
import React from 'react';
import App from '../App';
import FollowersScreen from '../screens/FollowersScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { APIRequest } from '../api.js'

describe('Followers snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  })
  it('renders correctly', () => {
    const tree = renderer.create(
      <FollowersScreen />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the followers endpoint and asserts the data passed in', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: 'testData' }))
    APIRequest('followers').then(res => {
      expect(res.data).toEqual('testData')
    })
    expect(fetch.mock.calls.length).toEqual(2)
    expect(fetch.mock.calls[0][0]).toEqual('https://api.github.com/users/skunal8197/followers')
  })
});
