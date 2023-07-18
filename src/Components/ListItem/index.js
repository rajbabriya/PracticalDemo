import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../Theme/colors';

const ListItem = ({item, onPress, isCategory}) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.card,{
            backgroundColor: isCategory? item.vCategoryBackgroundColorInHashCode : colors.white,
        }]}
        onPress={()=>{
            onPress(item)
        }}
        >
            {isCategory ? <Image style={styles.leftImage} source={{uri: item.vCategoryImage_I_64X64}}/>: <Image style={styles.leftImage} source={require('../../Assets/UserChat.png')}/>}
            <Text numberOfLines={1} style={[styles.title, {color: isCategory? colors.white: colors.black}]}>{isCategory? item.vCategoryName : item.vCustomerName}</Text>
            <TouchableOpacity onPress={()=>{}}>
                <Image style={styles.rightImage} source={isCategory? require('../../Assets/Star.png'): require('../../Assets/Delete.png')}/>
            </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
    padding: 10
  },
  leftImage: {
    height: 40,
    width: 40
  },
  rightImage: {
    height: 30,
    width: 30
  },
  title: {
    flex: 1,
    paddingHorizontal: 15,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  }
})
export default ListItem;