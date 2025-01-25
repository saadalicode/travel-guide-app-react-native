import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../constants/colors';

export default function Input({...props}){
    return (
        <TextInput  style={styles.input} placeholderTextColor={colors.midGrey} {...props} />
    );
}

const styles = StyleSheet.create({
    input:{
        backgroundColor: colors.lightGrey,
        color: colors.black,
        borderRadius: 10,
        paddingHorizontal: 24,
        paddingVertical: 13,
        marginVertical: 12,
    },
});