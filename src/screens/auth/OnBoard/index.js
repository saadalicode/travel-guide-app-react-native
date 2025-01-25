import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import colors from "../../../components/constants/colors";
import Button from "../../../components/button";

export default function OnBoard({ navigation }){
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <Image style={styles.image} source={require('../../../../assets/appsplash.png')} />

                <View style={styles.footer}/>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Travel App</Text>
                <Text style={styles.subtitle}>Travel Beyond Boundaries and Explore the World, Your Way!</Text>

                <Button onPress={() => {navigation.navigate('Signin')}} text={'Login'} />
                <Button onPress={() => {navigation.navigate('Signup')}} text={'Get Started'} type={'blue'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image: {
        width: '100%',
        flex: 1,
    },
    content:{
        backgroundColor: colors.white,
        padding: 16,
        paddingTop: 0,
    },
    title:{
        color: colors.black,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle:{
        color: colors.grey,
        textAlign: 'center',
        fontSize: 15,
        marginVertical: 16,
    },
    footer:{
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        backgroundColor: colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
});