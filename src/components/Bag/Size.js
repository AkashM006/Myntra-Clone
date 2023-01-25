import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Size = ({ currentSize }) => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={styles.container}>
            <CustomText right={3} weight='bold'>
                Size: {currentSize}
            </CustomText>
            <FastImage
                source={{ uri: ICONS.ICON_DOWN_CARET }}
                style={{ height: 10, width: 10 }}
                tintColor={colors['DARK']}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 3,
        paddingHorizontal: 7,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Size