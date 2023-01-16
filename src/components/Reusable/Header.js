import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'

const Header = () => {
    const title = useRoute().params?.title

    return (
        <View style={styles.container}>
            <CustomText weight={'bolder'} color={COLORS.SHADEDARK}>{title}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        elevation: 3,
        backgroundColor: 'white',
        paddingHorizontal: '3.5%',
        justifyContent: 'center',
    },
})

export default Header