import React from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";


export default function Categories({categories, selectCategory, onChange}){
    return(
        <FlatList 
            horizontal={true}
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (
                        <TouchableOpacity onPress={() => {onChange(item)}} style={[styles.itemContainer, selectCategory === item ? styles.selectedItemContainer : {}, index == 0 ? {marginLeft: 32 }: {}]}>
                            <Text style={[styles.item, selectCategory === item ? styles.selectedItem : {}]}>{item}</Text>
                        </TouchableOpacity>
                    );
            }}
            keyExtractor={(item) => item.toString()}
        />
    );
};

const styles = StyleSheet.create({
    item:{
        fontSize: 13,
        color: 'rgba(0,0,0,0.5)',
        paddingVertical: 2,
    },
    selectedItem:{
        color: '#000000',
    },
    itemContainer:{
        marginRight: 17,
        marginBottom: 14,
    },
    selectedItemContainer:{
        borderBottomColor: '#4681F3',
        borderBottomWidth: 1,
    }
});