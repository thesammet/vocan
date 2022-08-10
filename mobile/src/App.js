import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Navigation from './navigation/Navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {

  return (

    <SafeAreaProvider >
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          barStyle='light-content'
        />
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;