import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Photo = ({ link, height, index }) =>
    <TouchableOpacity>
        <Image source={{ uri: link }} style={[styles.image, { height, marginTop: index === 1 ? 5 : 0 }]} />
    </TouchableOpacity>


const styles = StyleSheet.create({
    image: {
        width: '100%',
        resizeMode: 'cover',
        marginBottom: 10
    }
})

export default Photo