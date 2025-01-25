import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, Linking, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../components/constants/colors";
import Button from "../../../components/button";
import Title from "../../../components/title/title";
import Input from "../../../components/input/Input";
import CheckBox from "../../../components/checkBox";
import { PRIVACY_LINK, TERMS_LINK } from "../../../components/constants/links";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

export default function Signup({ navigation }){
    const [agreed, setAgreed] = useState(false);
    const [values, setValues] = useState({});

    function onChangeChecked(){
        setAgreed( value => !value);
    }

    function onAgreeLinkPress(url){
        Linking.openURL(url);
    }

    const onChange = (value, key) => {
        setValues((vals) => ({
            ...vals, [key] : value,
        }))
    }

    const onSubmit = () => {
        if(values.password !== values.confirm_password){
            Alert.alert('Password do not match!!!');
            return;
        }

        if(!agreed){
            Alert.alert('You should agree to Terms and Policies!!!');
            return;
        }

        
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            // navigate to home screen by code in App.js
        })
        .catch(error => {
            if(error.code === 'auth/email-already-in-use') {
                Alert.alert("That email is already registered.");
            }
            if(error.code === 'auth/invalid-email') {
                Alert.alert("That email address is invalid.");
            }

            console.log(error);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Title text={'Join the World!'} style={{color: '#000000'}} />

                <Input onChangeText={(val) => onChange(val, 'first_name')} placeholder={'First Name'} />
                <Input onChangeText={(val) => onChange(val, 'last_name')} placeholder={'Last Name'} />
                <Input onChangeText={(val) => onChange(val, 'email')} placeholder={'Email'} keyboardType='email-address' />
                <Input onChangeText={(val) => onChange(val, 'password')} placeholder={'Password'} secureTextEntry />
                <Input onChangeText={(val) => onChange(val, 'confirm_password')} placeholder={'Confirm Password'} secureTextEntry />


                <View style={styles.row}>
                    <CheckBox onPress={onChangeChecked} checked={agreed}/>

                    <Text style={styles.agreeText}>
                        I agree to <Text style={styles.agreeLink} onPress={() => onAgreeLinkPress(TERMS_LINK)}>Terms and Conditions</Text> and <Text style={styles.agreeLink}  onPress={() => onAgreeLinkPress(PRIVACY_LINK)}>Privacy Policies</Text>.
                    </Text>
                </View>

                <Button onPress={onSubmit} text={'Create a new Account'} type={'blue'} /> 

                <Text style={styles.footerText}>
                    Already Registered?
                    <Text onPress={() => { navigation.navigate('Signin') }} style={styles.footerLink}> Sign in!</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 30,
        marginHorizontal: 24,
    },
    footerText:{
        color: colors.midGrey,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 28,
    },
    footerLink:{
        color: colors.purple,
        fontWeight: 'bold',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    agreeText:{
        fontSize: 12,
        marginLeft: 8,
        color: colors.grey,
    },
    agreeLink:{
        textDecorationLine: 'underline',
    },
});