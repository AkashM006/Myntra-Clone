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
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Overlay from './src/components/Reusable/Overlay';
import { store, persistor } from './src/redux/store';
import MainScreen from './src/screens/MainScreen';
import { RootSiblingParent } from 'react-native-root-siblings'

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={<Overlay hideShadow={true} render={true} />} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor='white'
            />
            <NavigationContainer>
              <MainScreen />
            </NavigationContainer>
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
