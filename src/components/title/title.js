import React from "react";
import { Text, StyleSheet, } from "react-native";

export default function Title(props){
    return(
            <Text style={[styles.title, props.style]}>
                {props.text}
            </Text>
    );
}


// Title.defaultProps = {
//     text:"Default one"
// };

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4681F3',
    },
});