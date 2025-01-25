import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../constants/colors";

export default function Button({ onPress, text, type }){
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, type === 'blue' ? styles.blueBg : {}]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.purple,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 13,
        marginVertical: 8,
    },
    text:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    blueBg:{
        backgroundColor: colors.blue,
    },
})