import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Info from '../Containers/Info';
import colors from '../Theme/colors';
import { Image, StyleSheet } from 'react-native';
import UserStack from './UserStack';

const Tab = createBottomTabNavigator();

const BottomTab = ()=> {
  return (
    <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarStyle:{
                height:80,
                backgroundColor: colors.loginBtnDark,
                paddingBottom: 20,
            },
            tabBarActiveTintColor: colors.yellowDark,
            tabBarInactiveTintColor: colors.white
        }}
    >
      <Tab.Screen name="Category" component={HomeStack} 
        options={{
            tabBarLabel: 'Deal Feed',
            tabBarIcon: ({color}) =>{
                return(
                    <Image source={require('../Assets/DealFeed.png')} style={[styles.tabIcon, {tintColor: color}]}/>
                )
            }
        }}
      />
      <Tab.Screen name="UserStack" component={UserStack} 
        options={{
            tabBarLabel: 'Registered User',
            tabBarIcon: ({color}) =>{
                return(
                    <Image source={require('../Assets/User.png')} style={[styles.tabIcon, {tintColor: color}]}/>
                )
            }
        }}
      />
      <Tab.Screen name="Info" component={Info} 
        options={{
            tabBarLabel: 'Info',
            tabBarIcon: ({color}) =>{
                return(
                    <Image source={require('../Assets/Earth.png')} style={[styles.tabIcon, {tintColor: color}]}/>
                )
            }
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    tabIcon: {
        height: 50,
        width: 50,
    }
})

export default BottomTab;