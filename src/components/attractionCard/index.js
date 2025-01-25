import React from "react";
import { Image, View, Text, StyleSheet, Dimensions, Pressable,  } from "react-native";
const { width } = Dimensions.get('window');

export default function AttractionCard({imageSrc, title, subTitle, onPress, style}){
    return(
       <Pressable onPress={onPress} style={[styles.card, style]}>
        <Image style={styles.image} source={{uri: imageSrc}} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
            <Image style={styles.icon} source={require('../../../assets/location.png')} />
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
       </Pressable>
    );
};

const styles = StyleSheet.create({
    card:{
        padding: 5,
        borderWidth: 1,
        borderColor: "#E2E2E2",
        borderRadius: 15,
        marginBottom: 12,
    },
    image:{
        width: ( width - 96) / 2,
        height: 100,
        borderRadius: 15,
    },
    title:{
        fontSize: 14,
        fontWeight: 500,
        marginTop: 12,
        marginLeft: 6,
        color: '#000000',
    },
    subTitle:{
        fontSize: 10,
        fontWeight: 300,
        color: 'rgba(0,0,0,0.5)',
    },
    icon:{
        width: 10,
        height: 10,
        marginRight: 6,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginLeft: 6,
        marginBottom: 12,
    }
});