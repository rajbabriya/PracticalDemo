import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../Theme/colors';
import InputField from '../../Components/InputField';
import DatePicker from 'react-native-date-picker';
const AppBackground = require('../../Assets/AppBackground.png')
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import { getProfile, registerUser } from '../../Apis/auth';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { getAllLanguages, setLanguage } from '../../Redux/actions/languages';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../Context/AuthContext';

const Register = (props) => {
    const { setUserData } = useContext(AuthContext);
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [birthPicker, setBirthPicker] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [pickerLanguages, setPickerLanguages] = useState([]);
    const languages = useSelector((state) => state.languages.languages);

    useEffect(() => {
        dispatch(getAllLanguages());
      }, [dispatch]);

      useEffect(()=>{
        const temp = []
        languages.map(item => {
            let obj = {}
            obj.label = item.vLanguageName;
            obj.value = item.vLanguageName;
            temp.push(obj);
        })
        setPickerLanguages(temp);
      },[languages])

    const handleButtonPressed = async () =>  {
        const res = await request(Platform.OS === 'android' ? Platform.Version >= 32 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY);
        if(res === RESULTS.GRANTED){
          const imageRes = await launchImageLibrary({mediaType: 'photo', includeBase64: true});
          if(!imageRes.didCancel && !imageRes.errorCode && !imageRes.errorMessage){
            setImageUri(imageRes.assets ? "data:image/png;base64,"+ imageRes.assets[0].base64 : '')
          }
        }
      }

    const handleRegister = async () =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;;
        if (!!!name) {
            Alert.alert('Required', 'Name required')
            return
        }
        else if (!!!birthday) {
            Alert.alert('Required', 'Birthday required')
            return
        }
        else if (!!!gender) {
            Alert.alert('Required', 'Gender required')
            return
        }
        else if (!!!email && reg.test(email) === false) {
            Alert.alert('Required', 'Email required')
            return
        }
        else if(!reg.test(email)){
            Alert.alert('Invalid', 'Invalid Email')
            return
        }
        else if (!!!username) {
            Alert.alert('Required', 'Username required')
            return
        }
        else if (!!!password) {
            Alert.alert('Required', 'Password required')
            return
        }
        else if (!!!selectedLanguage) {
            Alert.alert('Required', 'Password required')
            return
        }
        dispatch(setLanguage(languages.find(x=>x.vLanguageName === selectedLanguage)));
        const payload = new FormData();
        payload.append('languageid',languages.find(x=>x.vLanguageName === selectedLanguage).iLanguageId)
        payload.append('name',name);
        payload.append('email',email);
        payload.append('password',password);
        payload.append('username',username);
        payload.append('gender',gender.toLocaleLowerCase());
        payload.append('sendnotification',true);
        payload.append('birthdate',moment(birthday).format('YYYY-MM-DD'));
        !!imageUri && payload.append('profileimage',imageUri);
        

        const res = await registerUser(payload)
        if(res.vStatusCode === 100 || res.vStatusCode === 200){
           const user = await getProfile(languages.find(x=>x.vLanguageName === selectedLanguage).iLanguageId, res.iCustomerId)
           if(!!user){
            Alert.alert('Registered Succesffully...', res.vMessageResponse)
            AsyncStorage.setItem('user', JSON.stringify(user))
            setUserData(user)
            props.navigation.navigate('Login');
           }
            
        }
        else{
            Alert.alert('Invalid', res.vMessageResponse)
        }
    }

    const renderSpace = () =>{
        return(
            <View style={{height: 20}}/>
        )
    }

    return(
        <>
        <ImageBackground style={styles.container} source={AppBackground}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <View style={styles.nameBirthContainer}>
                    <View style={{flex: 1}}>
                        <InputField 
                            placeholder= 'Name'
                            value={name}
                            onChangeText={setName}
                        />
                        <View style={styles.devider}/>
                        <TouchableOpacity activeOpacity={0.8} style={styles.itemView} onPress={()=>setBirthPicker(true)}>
                            <Text style={styles.itemText}>{!!birthday ? moment(birthday).format('YYYY-MM-DD'): 'Birthday'}</Text>
                            <Image style={styles.dropdown} source={require('../../Assets/DropDown.png')}/>
                        </TouchableOpacity>
                    </View>
                    {!imageUri ? 
                    <TouchableOpacity style={styles.cameraView} activeOpacity={0.8} onPress={handleButtonPressed}>
                        <Image style={styles.camera} source={require('../../Assets/Camera.png')}/>
                    </TouchableOpacity> : 
                    <TouchableOpacity style={[styles.cameraView]} activeOpacity={0.8} onPress={handleButtonPressed}>
                        <Image style={styles.image} source={{uri: imageUri}}/>
                    </TouchableOpacity>
                    }
                </View>
                {renderSpace()}
                <View style={[styles.itemView,{paddingRight: 0}]}>
                    <View style={[styles.itemView,{flex: 1}]}>
                        <Text style={styles.itemText}>Gender</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.genderItem, {backgroundColor: gender==='Male' ? colors.green : colors.primary}]} onPress={()=>{setGender('Male')}}>
                        <Image style={styles.icon} source={require('../../Assets/Male.png')}/>
                        <Text style={styles.itemText}>Male</Text>
                    </TouchableOpacity>       
                    <TouchableOpacity style={[styles.genderItem, {backgroundColor: gender==='Female' ? colors.green : colors.primary}]} onPress={()=>{setGender('Female')}}>
                        <Image style={styles.icon} source={require('../../Assets/Female.png')}/>
                        <Text style={styles.itemText}>Female</Text>
                    </TouchableOpacity>  
                    </View>  
                </View>
                {renderSpace()}
                <InputField 
                            placeholder= 'Email'
                            value={email}
                            onChangeText={setEmail}
                />
                <View style={styles.devider}/>
                <InputField 
                            placeholder= 'Username'
                            value={username}
                            onChangeText={setUsername}
                        />
                <View style={styles.devider}/>
                <InputField 
                            placeholder= 'Password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                {renderSpace()}
                {!!languages.length && 
                <RNPickerSelect
                    onValueChange={(value) => setSelectedLanguage(value)}
                    items={pickerLanguages}
                >
                    <TouchableOpacity style={[styles.itemView]}>
                    <Text style={styles.itemText}>{!!selectedLanguage? selectedLanguage: 'Language'}</Text>
                    </TouchableOpacity>
                </RNPickerSelect>
                }
                
                {renderSpace()}
                <TouchableOpacity style={[styles.buttonView]} onPress={handleRegister}>
                    <Text style={[styles.itemText,{color: colors.black}]}>Register</Text>
                </TouchableOpacity>
                
            </ScrollView>
            <TouchableOpacity style={[styles.itemView, {marginBottom: 30}]} onPress={()=>props.navigation.navigate('Login')}>
                    <Text style={[styles.itemText,{textAlign: 'right', width: '100%'}]}>Already Registered?</Text>
            </TouchableOpacity>
            <DatePicker
                style={{alignSelf: 'center', zIndex: 999}}
                modal
                open={birthPicker}
                date={!!birthday ? birthday: new Date()}
                mode='date'
                maximumDate={new Date()}
                onConfirm={(date) => {
                    setBirthPicker(false)
                    setBirthday(date)
                }}
                onCancel={() => {
                    setBirthPicker(false)
                }}
                />
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
    image: {
        height: 91,
        width: 100
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
        backgroundColor: colors.yellow,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderBottomWidth: 4,
        borderBottomColor: colors.yellowDark,
    }
})

export default Register;