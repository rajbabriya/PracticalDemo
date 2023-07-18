import { createStackNavigator } from '@react-navigation/stack';
import Categories from '../Containers/Categories';
import colors from '../Theme/colors';
import DealFeed from '../Containers/DealFeed';
import { Image, TouchableOpacity } from 'react-native';
import Map from '../Containers/Map';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
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
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="DealFeed" component={DealFeed} 
        options={{
          headerTitle:"Deal Feed",
          headerTintColor: colors.white,
          headerLeftLabelVisible: false,
          headerRight:()=>{
            return(
              <TouchableOpacity onPress={()=>navigation.navigate('Map')}>
                <Image style={{height: 30, width: 30, marginRight: 10, resizeMode: 'contain'}} source={require('../Assets/Location.png')}/>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Stack.Screen name="Map" component={Map} 
      options={{
        headerTintColor: colors.white,
        headerLeftLabelVisible: false,
      }}/>
    </Stack.Navigator>
  );
}

export default HomeStack;