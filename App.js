import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  useColorScheme,
} from 'react-native';

import MainNav from './src/AppNavigator/MainNav';
import colors from './src/Theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { UserProvider } from './src/Context/AuthContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = {
    flex: 1,
    backgroundColor: colors.headerColor,
  };

  return (
    <UserProvider>
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles} edges={['top','left','right']}>
          <MainNav />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
    </UserProvider>
  );
}

export default App;
