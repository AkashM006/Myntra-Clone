import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const Header = ({ update }) => {

    const { width } = useWindowDimensions()
    const { colors } = useSelector(state => state.theme)

    const title = update?.isMandatory ? 'App Update Required' : 'App Update Available'
    const version = update?.appVersion

    return (
        <View style={styles.container}>
            <CustomText size={24} color={colors['DARK']} weight='bold'>
                {title}
            </CustomText>
            <CustomText left={width / 10} size={16} color={colors['PRIMARY']} weight='light'>
                v{version}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Header