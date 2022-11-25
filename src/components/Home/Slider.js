import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Slider = ({ card }) => {

    const renderItem = ({ item }) =>
        <TouchableOpacity>
            <Image source={{ uri: item }} style={[{ height: +card.height, width: +card.width, }, styles.image]} />
        </TouchableOpacity>

    return (
        <View style={styles.container}>
            <CustomText style={styles.text}>{card.title}</CustomText>
            <FlatList
                data={card.url}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    },
    container: {
        backgroundColor: 'white'
    }
})

export default Slider