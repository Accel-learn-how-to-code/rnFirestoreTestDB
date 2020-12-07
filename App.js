/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import animals from './Data/data';
class App extends Component {
  componentDidMount() {
    firestore()
      .collection('Animals')
      .get()
      .then((querySnapshot) => {
        console.log('Animals Number : ' + querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          const {damage, name} = documentSnapshot.data();

          animals.push({
            id: documentSnapshot.id,
            damage,
            name,
          });
        });
      });
  }

  showAnimal = () => {
    console.log('test length: ' + JSON.stringify(animals));
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this.showAnimal}>
            <Text style={styles.label}>Show</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    fontSize: 15,
    color: '#fff',
  },
});

export default App;
