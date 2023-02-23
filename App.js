/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import MainScreen from './src/screens/MainScreen';
import { RootSiblingParent } from 'react-native-root-siblings'
import LoadingScreen from './src/screens/LoadingScreen';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaView style={styles.container}>
            <MainScreen />
          </SafeAreaView>
        </RootSiblingParent>
      </PersistGate>
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
