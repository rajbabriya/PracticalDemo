import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllDeals } from '../../Redux/actions/deals';
import FeedItem from '../../Components/FeedItem.js';

const DealFeed = ({navigation}) => {
  const deals = useSelector((state) => state.deals.deals);
  const dispatch = useDispatch()
  useEffect(()=>{
    AsyncStorage.getItem('user').then(res=>{
      const user = JSON.parse(res)
      dispatch(getAllDeals(user.iLanguageId,user.iCustomerId))
    })
  },[dispatch])

  const onPressDeal = (item) =>{}
    
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {deals.map((item,index)=><FeedItem item={item} key={index} onPress={onPressDeal}/>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
export default DealFeed;