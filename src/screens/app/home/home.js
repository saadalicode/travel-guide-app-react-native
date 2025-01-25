import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Text, Pressable, Image } from "react-native";
import Title from "../../../components/title/title";
import Categories from "../../../components/categories";
import AttractionCard from "../../../components/attractionCard";
import jsonData from '../../../data/attraction.json';
import categoryData from '../../../data/categories';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../auth/firebase"; 
import { signOut } from "firebase/auth";

export default function Home(){
    const navigation = useNavigation();
    const All = 'All'
    const [selectedCategory, setSelectedCategory] = useState(All);
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        setCardData(jsonData);
    },[]);

    useEffect(()=>{
        if(selectedCategory === All){
            setCardData(jsonData)
        }
        else{
            const filteredData = jsonData.filter(item => item.categories.includes(selectedCategory))
            setCardData(filteredData)
        }
    },[selectedCategory])

    function selectedCategoryHandler(input){
        setSelectedCategory(input);
    }

    const handleLogout = async () => {
        try {
          await signOut(auth); // Firebase sign-out method
         // Redirect to Signin screen after logout
          console.log("User signed out successfully");
        } catch (error) {
          console.error("Error during sign out:", error.message);
        }
      };

    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
                ListHeaderComponent={(
                    <>
                    <View style={{margin: 32}}>
                        <View style={styles.header}>
                            <View>
                                <Title text="Where do" style={{fontWeight:'normal'}} />
                                <Title text="you want to go?" />
                            </View>
                            <Pressable onPress={handleLogout} hitSlop={8}>
                                <Image style={styles.logOutIcon} source={require('../../../../assets/logOut.png')} />
                            </Pressable>
                        </View>
            
                        <Title text="Explore Attractions" style={styles.subTitle} />
                    </View>
        
                    <Categories 
                        selectCategory={selectedCategory} 
                        onChange={selectedCategoryHandler} 
                        categories={[All, ...categoryData]}
                    />
                    </>
                )}
                ListEmptyComponent={(<Text style={styles.emptyText}>No Items Found.</Text>)}
                style={{ flexGrow: 1}}
                numColumns={2}
                data={cardData}
                renderItem={({item, index}) => (
                    <AttractionCard 
                    style={index % 2 === 0 ? {marginRight: 14, marginLeft: 32} : {marginRight: 32} } 
                    title={item.name} 
                    subTitle={item.city} 
                    imageSrc={item.images.length ? item.images[0] : null}
                    onPress={() => navigation.navigate('AttractionDetails', {item})} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
    },
    subTitle: {
        fontSize: 24,
        color: '#000000',
        marginTop: 40,
    },
    header:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logOutIcon:{
        width: 44,
        height: 44,
        marginLeft: 16,
        overflow: 'hidden',
    },
    row:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    emptyText:{
        textAlign: 'center',
        fontSize: 12,
        marginTop: 54,
        color: 'rgba(0,0,0,0.5)',
    },

});