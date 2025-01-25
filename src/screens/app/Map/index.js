import React from 'react';
import { Image, SafeAreaView, TouchableOpacity, View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

export default function Map({ navigation, route }) {
    const { item } = route?.params || {};

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} initialRegion={{
                        latitude: item.coordinates.lat,
                        longitude: item.coordinates.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    >

                        <Marker coordinate={{
                            latitude: item.coordinates.lat,
                            longitude: item.coordinates.lon,
                            }} title={item.name} />
                    </MapView>
                </View>

                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}>
                        <Image style={styles.backIcon} source={require('../../../../assets/back.png')}  />
                    </TouchableOpacity>
                    <Text style={styles.title}>{`${item.name}, ${item.city}`}</Text>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
    },
    mapContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    header:{
        backgroundColor: '#fff',
        borderRadius: 15,
        position: "absolute",
        top: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 48,
        margin: 24,
        padding: 16,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    title:{
        fontSize: 20,
    },
});
