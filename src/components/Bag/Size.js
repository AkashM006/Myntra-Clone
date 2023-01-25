import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const Size = ({ currentSize }) => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={styles.container}>
            <CustomText weight='bold'>
                Size: {currentSize}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 3,
        paddingHorizontal: 7,
        backgroundColor: 'lightgray', borderRadius: 5
    }
})

export default Size