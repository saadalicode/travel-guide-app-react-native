import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function InfoCard({icon, text}){
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={icon}/>
            <Text style={styles.title}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    icon:{
        width: 40,
        height: 40,
    },
    title:{
        maxWidth: '90%',
        color: '#000',
        fontSize: 12,
        marginHorizontal: 8,
    },
});