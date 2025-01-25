import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import colors from "../constants/colors";

export default function CheckBox({checked, onPress}){
    return (
        <Pressable 
            onPress={onPress} 
            style={[styles.container, checked === true ? styles.checkedBox: {}]}
        >
            {checked ? ( <View style={styles.innerBox} />) : null }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 18,
        height: 18,
        borderColor: colors.purple,
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    innerBox: {
        width: 10,
        height: 10,
        borderRadius: 3,
        backgroundColor: colors.purple,
    },
    checkedBox: {
        borderWidth: 2,
    },
});