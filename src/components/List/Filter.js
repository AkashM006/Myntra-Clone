import { View, Text, StyleSheet, Modal } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Filter = ({ visible, setVisibility }) => {
    return (
        <Modal animationType='slide' visible={visible}>
            <CustomText>Sort by</CustomText>
            <CustomText>Price - high to low</CustomText>
            <CustomText>Discount</CustomText>
            <CustomText>Price - low to high</CustomText>
            <CustomText>Rating</CustomText>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        // position: 'absolute',
        // zIndex: 20,
        // height: 300,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        // bottom: 0,
        // left: 0,
        // right: 0
    }
})

export default Filter