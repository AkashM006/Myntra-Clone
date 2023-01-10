/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MainScreen from './src/screens/MainScreen';
import { Config } from 'react-native-config'

const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor='white'
        />
        <NavigationContainer>
          <MainScreen />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  }
});

export default App;
