import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Slider = ({ card }) => {

    const navigation = useNavigation()
    const { colors } = useSelector(state => state.theme)

    const renderItem = ({ item }) =>
        <TouchableOpacity onPress={() => navigation.navigate('List', { title: 'Exclusives' })}>
            <Image source={{ uri: item }} style={[{ height: +card.height, width: +card.width, }, styles.image]} />
        </TouchableOpacity>

    return (
        <View style={{ backgroundColor: colors['LIGHT'] }}>
            <CustomText weight={'light'} size={18} style={styles.text}>{card.title}</CustomText>
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
        textAlign: 'center',
    },
})

export default Slider