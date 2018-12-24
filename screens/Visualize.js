import React from 'react';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import * as shape from 'd3-shape'

export default class Visualize extends React.Component {
  static navigationOptions = {
    title: 'Visualization',
  };

  /*
  Constructor for initializing state
  */
  constructor(props){
   super(props);
   this.state = {
     data: [],
     data2: [],
     page: 1,
     rendering: [],
     numberOfCommits: [],
     isGraphVisible: false,
     repoName: ''
   }
   this.showGraph = this.showGraph.bind(this)
  }

  getNumberOfAdditions = (repoName) => {
    const url = `https://api.github.com/repos/` + repoName + `/stats/code_frequency`;
    fetch(url, {
      headers: {
        'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: this.state.page === 1 ? res : [...this.state.data, ...res],
        });
      })
      .then(res => {
        this.grabNumberOfAdditions(this.state.data)
      })
      .catch(error => {
        console.log(error)
      });
  }

  getCommitCount = (repoName) => {
    const url = `https://api.github.com/repos/` + repoName + `/stats/participation`;
    fetch(url, {
      headers: {
        'Authorization' : 'Bearer ac6f7eadb1e579057cc97a99ed52cb6de99c2f27'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data2: this.state.page === 1 ? res : [...this.state.data2, ...res],
        });
      })
      .then(res => {
        this.grabNumberOfCommits(this.state.data2)
      })
      .catch(error => {
        console.log(error)
      });
  }

  showGraph(repoName) {
    this.getNumberOfAdditions(repoName)
    this.getCommitCount(repoName)
    this.setState({isGraphVisible: true})
  }


  grabNumberOfAdditions = (array) => {
    retArray = []
    for(var i = 0; i < array.length; i++){
      retArray.push(array[i][1])
    }
    this.setState({rendering: retArray})
  }

  grabNumberOfCommits = (array) => {
    this.setState({numberOfCommits: array["all"]})
  }

  render() {
    //const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const data = this.state.rendering
    const data2 = this.state.numberOfCommits
    const contentInset = { top: 20, bottom: 20 }

    const graph =
    <View>
    <Text> Number of Additions Per Week </Text>
    <View style={{ height: 200, flexDirection: 'row' }}>
      <YAxis
          data={ data }
          contentInset={ contentInset }
          svg={{
              fill: 'grey',
              fontSize: 10,
          }}
          numberOfTicks={ 10 }
          formatLabel={ value => `${value}` }
      />
      <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={ data }
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={ contentInset }
      >
          <Grid/>
      </LineChart>
    </View>
    <Text> Number of Commits Per Week </Text>
    <View style={{ height: 200, flexDirection: 'row' }}>
      <YAxis
          data={ data2 }
          contentInset={ contentInset }
          svg={{
              fill: 'grey',
              fontSize: 10,
          }}
          numberOfTicks={ 10 }
          formatLabel={ value => `${value}` }
      />
      <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={ data2 }
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={ contentInset }
      >
          <Grid/>
      </LineChart>
    </View>
    </View>;


    return (
      <View style={styles.container}>
      <TextInput
          style={styles.input}
          value={this.state.repoName}
          onChangeText={repoName => this.setState({repoName})}
          ref={ref => {this._nameInput = ref}}
          placeholder="Repository Name..."
          autoFocus={true}
          autoCapitalize="words"
          autoCorrect={true}
          keyboardType="default"
          returnKeyType="next"
          blurOnSubmit={false}
        />

        <Button
          onPress={() => this.showGraph(this.state.repoName)}
          title="See Stats!"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

      {this.state.isGraphVisible ? graph : null}

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
