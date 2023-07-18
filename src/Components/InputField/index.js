import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../Theme/colors';
const AppBackground = require('../../Assets/AppBackground.png')

const InputField = (props) => {
    return(
            <TextInput 
                style={styles.inputView}
                placeholderTextColor={colors.white}
                {...props}
            />
    )
}

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: colors.primary,
        height: 45,
        color: colors.white,
        paddingHorizontal: 15,
        fontSize: 18,
    },

})

export default InputField;