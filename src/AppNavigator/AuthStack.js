import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Containers/Register';
import colors from '../Theme/colors';
import Login from '../Containers/Login';

const AuthStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: colors.headerColor},
          }}>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} 
              options = {{
                headerTintColor: colors.white,
                headerLeftLabelVisible: false,
              }}
            />
        </Stack.Navigator>
      );
}

export default AuthStack;