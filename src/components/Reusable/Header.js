import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import CustomText from './CustomText'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'

const Header = ({ heading }) => {
    const title = useRoute().params?.title
    const { colors } = useSelector(state => state.theme)

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <CustomText weight={'bolder'} color={COLORS.SHADEDARK}>
                {heading ?? title}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        elevation: 3,
        paddingHorizontal: '3.5%',
        justifyContent: 'center',
    },
})

export default Header