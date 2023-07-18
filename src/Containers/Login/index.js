import React, { useContext, useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../Theme/colors';
import InputField from '../../Components/InputField';
const AppBackground = require('../../Assets/AppBackground.png')
import { getProfile, login } from '../../Apis/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../Context/AuthContext';

const Login = ({navigation}) => {
    const { setUserData } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const renderSpace = () =>{
        return(
            <View style={{height: 20}}/>
        )
    }

    const handleLogin = async () => {
        if (!!!username) {
            Alert.alert('Required', 'Username required')
            return
        }
        else if (!!!password) {
            Alert.alert('Required', 'Password required')
            return
        }
        const res = await login(username, password)

        if(res.vStatusCode === 100 || res.vStatusCode === 200){
            const user = await getProfile(res.iLanguageId, res.iCustomerId)
            if(!!user){
                    AsyncStorage.setItem('user', JSON.stringify(user))
                    setUserData(user);
                    Alert.alert('Login Successfully...');
            }
        }else {
            Alert.alert('Unauthorized User', res.vMessageResponse)
        }
        
    }

    return(
        <>
        <ImageBackground style={styles.container} source={AppBackground}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../Assets/Logo.png')} style={{height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width - 50, resizeMode: 'contain'}}/>
                </View>
                <InputField 
                            placeholder= 'Email/Username'
                            value={username}
                            onChangeText={setUsername}
                        />
                <View style={styles.devider}/>
                <InputField 
                            placeholder= 'Password'
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                        />
                        {renderSpace()}
                <TouchableOpacity style={[styles.buttonView]} onPress={handleLogin}>
                    <Text style={[styles.itemText,{color: colors.black}]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color: colors.white, fontSize: 16, marginTop: 20, alignSelf: 'flex-end', marginRight: 15}}>Forgot password?</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>  
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        marginVertical: 12
    },
    nameBirthContainer: {
        width: '100%',
        flexDirection: 'row'
    },
    nameBirthView: {
        flex: 1
    },
    cameraView: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: colors.green,
        width: 100
    },
    devider: {
        height: 1,
    },
    camera: {
        height: 45,
        width: 45
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        backgroundColor: colors.primary,
        paddingHorizontal: 15
    },
    itemText:{
        color: colors.white,
        fontSize: 18
    },
    genderItem:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        height: 45,
        backgroundColor: colors.primary,
    },
    dropdown: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    icon:{
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    buttonView:{
        height: 50,
        backgroundColor: colors.loginBtn,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderBottomWidth: 4,
        borderBottomColor: colors.loginBtnDark 
    }
})

export default Login;