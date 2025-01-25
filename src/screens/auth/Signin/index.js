import React, { useState } from "react";
import { StyleSheet , Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../../../components/button";
import colors from "../../../components/constants/colors";
import Title from "../../../components/title/title";
import Input from "../../../components/input/Input";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signin({ navigation }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          Alert.alert("Success", "You are now signed in!");
          // navigat to Home screen by App.js code
        } catch (error) {
            Alert.alert("Error: Invalid Credentails!!!");
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <Title text={'Welcome Back!'} style={{color: '#000000'}} />

            <Input onChangeText={(value) => setEmail(value)} placeholder={'Email'} keyboardType='email-address' />
            <Input onChangeText={(value) => setPassword(value)} placeholder={'Password'} secureTextEntry />

            <Button onPress={handleSignIn} text={'Login'} />

            <Text style={styles.footerText}>
                Not Registered?
                <Text onPress={() => { navigation.navigate('Signup') }} style={styles.footerLink}> Sign up!</Text>
            </Text>
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
        color: colors.grey,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 28,
    },
    footerLink:{
        color: colors.purple,
        fontWeight: 'bold',
    },
});