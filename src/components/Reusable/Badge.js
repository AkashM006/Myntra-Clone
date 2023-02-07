import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from './CustomText'

const Badge = ({ count, top, bottom, left, right, dim, style }) => {

    const { colors } = useSelector(state => state.theme)

    let customStyle = {
        height: dim ?? 20,
        width: dim ?? 20,
        borderRadius: dim ? dim / 2 : 10,
        backgroundColor: colors['PRIMARY'],
    }

    if (top !== null) customStyle.top = top
    if (bottom !== null) customStyle.bottom = bottom
    if (left !== null) customStyle.left = left
    if (right !== null) customStyle.right = right

    return (
        <>
            {count > 0 && <View style={[styles.container, style, customStyle,]}>
                <CustomText size={9} color={colors['WHITE']} weight='bold'>
                    {count > 99 ? '99+' : count}
                </CustomText>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Badge