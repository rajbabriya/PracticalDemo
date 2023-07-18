import { createStackNavigator } from '@react-navigation/stack';
import Categories from '../Containers/Categories';
import colors from '../Theme/colors';
import Users from '../Containers/Users.js';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.headerColor
            },
            headerTitleStyle: {
                color: colors.white
            }
        }}
    >
      <Stack.Screen name="UserRegister" component={Users} options={{
        headerTitle:"Registered User",
      }}/>
    </Stack.Navigator>
  );
}

export default UserStack;