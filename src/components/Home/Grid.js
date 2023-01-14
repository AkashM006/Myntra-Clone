import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Grid = ({ item }) => {

    const navigation = useNavigation()

    const pressHandler = () => { navigation.navigate('List', { title: 'You maybe interested in' }) }

    return (
        <View style={styles.container}>
            <CustomText weight={'bold'} style={styles.heading}>
                {item.title}
            </CustomText>
            <View style={styles.imageContainer}>
                {item.url.map((img, index) =>
                (
                    <TouchableOpacity key={index} onPress={pressHandler} style={[styles.touchable, { height: +item.height }]}>
                        <Image style={styles.image} source={{ uri: img }} />
                    </TouchableOpacity>
                )
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        paddingVertical: 10
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black'
    },
    imageContainer: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    touchable: {
        width: '30%',
        marginHorizontal: '1.5%'
    }
})

export default Grid