import React from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, View , StyleSheet} from 'react-native';

export default function Gallery({ navigation, route }){
    const { images } = route?.params || {};

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList 
                style={{ paddingHorizontal: 24, marginBottom: 24 }} 
                data={images} 
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )} />

                <TouchableOpacity onPress={onBack} style={styles.backContainer}>
                    <Image source={require('../../../../assets/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 20,
        marginTop: 24,
    },
    backContainer: {
        position: 'absolute',
        margin: 32,
    },
    backIcon: {
        width: 40,
        height: 40,
    }
});