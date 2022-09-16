import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Navigation from './navigation/Navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/Auth';
import { LanguageProvider } from './context/Language';
import SplashScreen from 'react-native-splash-screen';
import { GuestProvider } from './context/Guest';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider >
      <AuthProvider>
        <LanguageProvider>
          <GuestProvider>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: 'black',
              }}>
              <StatusBar
                animated={true}
                barStyle='light-content'
              />
              <Navigation />
            </SafeAreaView>
          </GuestProvider>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
