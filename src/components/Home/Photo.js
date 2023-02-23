import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Photo = ({ link, height, index, title }) => {

    const navigation = useNavigation()

    return (<TouchableOpacity onPress={() => navigation.navigate('List', {
        title
    })}>
        <Image source={{ uri: link }} style={[styles.image, { height, marginTop: index === 1 ? 5 : 0 }]} />
    </TouchableOpacity>)
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        resizeMode: 'cover',
        marginBottom: 10
    }
})

export default Photo