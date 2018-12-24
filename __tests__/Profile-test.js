import 'react-native';
import React from 'react';
import App from '../App';
import ProfileScreen from '../screens/ProfileScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { APIRequest } from '../api.js'

describe('Profile snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  })
  it('renders correctly', () => {
    const tree = renderer.create(
      <ProfileScreen />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the profile endpoint and asserts the data passed in', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: 'testData' }))
    APIRequest('profile').then(res => {
      expect(res.data).toEqual('testData')
    })
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('https://api.github.com/users/skunal8197')
  })
});
