import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Redux/actions/users';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../../Components/ListItem';

const Users = ({navigate}) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch()
  useEffect(()=>{
    AsyncStorage.getItem('user').then(res=>{
      const user = JSON.parse(res)
      dispatch(getAllUsers(user.iLanguageId))
    })
  },[dispatch])

  const onPressCategory = (item) =>{
  }
    
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {users && users.length && users.map((item,index)=><ListItem item={item} isCategory={false} key={index} onPress={onPressCategory}/>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Users;