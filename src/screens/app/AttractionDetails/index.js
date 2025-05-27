import React from "react";
import { SafeAreaView, Text, StyleSheet, ImageBackground, Dimensions, View, Pressable, Image } from "react-native";
import Title from "../../../components/title/title";
import InfoCard from "../../../components/infoCard";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import { Share } from 'react-native';
const { height } = Dimensions.get('window');

export default function AttractionDetails({navigation, route}){
    const { item } = route.params || {}
    const mainImage = item?.images?.length ? item?.images[0] : null
    const slicedImage = item?.images?.length ? item?.images.slice(0,5) : []
    const differImage = item?.images?.length - slicedImage?.length
    const openingHours = `OPEN 
${item.opening_time} - ${item.closing_time}`

    function onBack(){
        navigation.goBack();
    }

    function OnGalleryNavigator(){
        navigation.navigate('Gallery', {images: item.images})
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: item.name,
                message: `Hey, I want to share this amazing attraction!\n${mainImage}`, // Share the URL in the message
            });
    
            if (result.action === Share.sharedAction) {
                console.log('Content Shared');
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (e) {
            console.error('Sharing Error: ', e);
        }
    };
    


    return(
        <SafeAreaView  style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground 
                style={styles.mainImage} 
                imageStyle={{borderRadius: 20}} 
                source={{uri: mainImage}} >
                    <View style={styles.header}>
                        <Pressable onPress={onBack} hitSlop={8}>
                            <Image style={styles.icon}  source={require('../../../../assets/back.png')} />
                        </Pressable>
                        <Pressable onPress={onShare} hitSlop={8}>
                            <Image style={styles.icon} source={require('../../../../assets/share.png')} />
                        </Pressable>
                    </View>
                    <Pressable onPress={OnGalleryNavigator} style={styles.footer}>
                        { slicedImage.map((image, index) => (
                            <View key={image}>
                                <Image source={{uri: image}} style={styles.miniImage} />
                                {differImage > 0 && index === slicedImage.length -1 ? (
                                    <View style={styles.moreImagesContainer}>
                                        <Text style={styles.moreImages}>{`+${differImage}`}</Text>
                                    </View>
                                    
                                ) : null}
                            </View>
                        ))}
                    </Pressable>
                </ImageBackground>

                <View style={styles.headerContainer}>
                    <View style={{maxWidth: '70%'}}>
                        <Title style={styles.title} text={item.name} />
                        <Text style={styles.city}>{item.city}</Text>
                    </View>
                        <Title style={styles.title} text={item.entry_price}/>
                </View>

                <InfoCard text={item.address} icon={require('../../../../assets/location_circle.png')}/>
                <InfoCard text={openingHours} 
                    icon={require('../../../../assets/clock_circle.png')}
                />
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
                            }} title={item.name}
                        />
                    </MapView>
                </View>
                <Text style={styles.mapText} onPress={() => navigation.navigate('Map', { item })}>View Full Map</Text>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 32,
    },
    mainImage: {
        width: '100%',
        height: height / 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon:{
        width: 44,
        height: 44,
        margin: 16,
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(256, 256, 256, 0.40)',
        margin: 16,
        paddingHorizontal: 8,
    },
    miniImage:{
        width: 40,
        height: 40,
        marginHorizontal: 4,
        marginVertical: 8,
        borderRadius: 10,
    },
    moreImagesContainer:{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.38)',
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: 8,
        left: 4,
    },
    moreImages:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 30,
    },
    title:{
        color: '#000',
    },
    city:{
        color: '#000',
        fontSize: 18,
        fontWeight: 400,
        marginTop: 8,
    },
    mapContainer:{
        borderRadius: 10, 
        marginTop: 10,
        overflow: 'hidden',
    },
    map:{
        width:'100%', 
        height: 200, 
    },
    mapText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4681F3',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
});