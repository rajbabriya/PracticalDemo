import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../../Components/ListItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Redux/actions/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Categories = ({navigation}) => {
  const categories = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch()
  useEffect(()=>{
    AsyncStorage.getItem('user').then(res=>{
      const user = JSON.parse(res)
      dispatch(getAllCategories(user.iLanguageId,user.iCustomerId))
    })
  },[dispatch])

  const onPressCategory = (item) =>{
    navigation.navigate('DealFeed',{category: item});
  }
    
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {categories.map((item,index)=><ListItem item={item} key={index} isCategory={true} onPress={onPressCategory}/>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
export default Categories;